import React, { ReactElement, useState } from 'react'
import { IconContext } from 'react-icons';
import { GiWingfoot } from "react-icons/gi";
import { GiStrongMan } from "react-icons/gi";
import { GiFallingLeaf } from "react-icons/gi";
import { GiBrain } from "react-icons/gi";
import { GiPotionBall } from "react-icons/gi";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
import PointSelectors from './PointSelectors';

interface Card {
  icon: ReactElement,
  color: string,
  order: number,
  iconId: number,
  colorId: number,
  isFlipped: boolean,
  isBeingOccupied: boolean
}

interface CardWithLocation extends Card {
  x: number,
  y: number
}

export enum SelectorType {
  ICON = 'ICON',
  COLOR = 'COLOR'
}

const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max);
}

const searchMiniGameControllerStyles = (selectorsWidth: number) => {
  return {
    mainContentContainer: {
      width: '100%',
      display: 'flex',
    },
    pointSelectorsContainer: {
      width: selectorsWidth,
    }
  }
}

type DifficultyOption = {
  text: string,
  numberOfSelectors: number,
  oddsOfHit: number
}

const difficultyOptions: DifficultyOption[] = [
  {
    text: 'VE',
    numberOfSelectors: 6,
    oddsOfHit: 9
  },
  {
    text: 'E',
    numberOfSelectors: 5,
    oddsOfHit: 6
  },
  {
    text: 'M',
    numberOfSelectors: 4,
    oddsOfHit: 4
  },
  {
    text: 'H',
    numberOfSelectors: 3,
    oddsOfHit: 2
  },
  {
    text: 'VH',
    numberOfSelectors: 2,
    oddsOfHit: 1
  },
]

// TODO - swap icon and background if it is a hit
// TODO - animate circle size - add additional with opacity layer to ripple
// TODO - border for current occupied

const SearchMiniGameController: React.FC = () => {
  const outerHeight = window.innerHeight * .6
  const outerWidth = window.innerHeight * .6
  const margin = .05

  const height = outerHeight - outerHeight * (margin * 2)
  const width = outerWidth - outerWidth * (margin * 2)
  const gap = outerWidth * (margin * .15)
  const squareSize = (width / 6) - (gap * 2)

  const selectorsWidth: number = window.innerWidth < 360 ? window.innerWidth : 360
  const styles =   searchMiniGameControllerStyles(selectorsWidth)

  const iconArray: ReactElement[] = [<GiWingfoot />, <GiStrongMan />, <GiFallingLeaf />, <GiBrain />, <GiPotionBall />, <GiPerspectiveDiceSixFacesRandom />]
  const colorArray = ['mediumseagreen', 'mediumvioletred',	'tomato', 'dodgerblue', 'goldenrod', 'rebeccapurple']

  const emptyArray = new Array(36).fill(undefined);
  const mappedColorsAndIconsArray: Card[] = emptyArray.map((_, index) => {
    return {
      icon: iconArray[Math.floor(index / 6)],
      iconId: Math.floor(index / 6),
      color: colorArray[(index % 6)],
      colorId: (index % 6),
      order: getRandomInt(1000),
      isFlipped: false,
      isBeingOccupied: false
    }
  }).sort((a, b) => a.order - b.order)

  const [mappedWithLocations, setMappedWithLocations] = useState<CardWithLocation[]>(mappedColorsAndIconsArray.map((item, index) => {
    return {
      ...item,
      x: (index % 6),
      y: Math.floor(index / 6)
    }
  })) 

  const [difficulty, setDifficulty] = useState<DifficultyOption | undefined>(undefined)
  const [pointSelectors, setPointSelectors] = useState<{pointsForIcons: number[], pointsForColors: number[], isSelectorsLocked: boolean} >({pointsForIcons: [], pointsForColors: [], isSelectorsLocked: false})
  // const [occupiedXY, setOccupiedXY] = useState<{x: number, y: number}>({x: -1, y: -1})

  // BOARD
  const handleOnSquareClick = (x: number, y: number) => {
    const copy = mappedWithLocations.map((item: CardWithLocation) => {
      if(item.x === x && item.y === y) {
        return {
          ...item,
          isBeingOccupied: true,
          isFlipped: true
        }
      } else {
        return {
          ...item,
          isBeingOccupied: false
        }
      }
    })
    // setOccupiedXY({x, y})
    setMappedWithLocations(copy)
  }

  // CLICK SELECTORS
  const handleOnSelectorsClick = (selectorType: SelectorType, selectorIndex: number) => {
    if(selectorType === SelectorType.ICON) {
      if(pointSelectors.pointsForIcons.includes(selectorIndex)) {
        const filteredIconSelectors = pointSelectors.pointsForIcons.filter((pointsForIcon: number) => {
          return selectorIndex !== pointsForIcon
        })
        setPointSelectors({...pointSelectors, pointsForIcons: filteredIconSelectors})
      } else {
        const copy: number[] = pointSelectors.pointsForIcons
        copy.push(selectorIndex)
        setPointSelectors({...pointSelectors, pointsForIcons: copy})
      }
    } else if (selectorType === SelectorType.COLOR) {
      if(pointSelectors.pointsForColors.includes(selectorIndex)) {
        const filteredColorsSelectors = pointSelectors.pointsForColors.filter((pointsForColor: number) => {
          return selectorIndex !== pointsForColor
        })
        setPointSelectors({...pointSelectors, pointsForColors: filteredColorsSelectors})
      } else {
        const copy: number[] = pointSelectors.pointsForColors
        copy.push(selectorIndex)
        setPointSelectors({...pointSelectors, pointsForColors: copy})
      }
    }
  }

  // LOCK SELECTORS
  const handleOnLockSelectorsClick = () => {
    setPointSelectors({...pointSelectors, isSelectorsLocked: !pointSelectors.isSelectorsLocked})
  }

  return (
    <div className={'mainContentContainer'} style={styles.mainContentContainer}>
      <svg height={outerHeight} width={outerWidth}>
        <g transform={`translate(${outerHeight * margin}, ${outerWidth * margin})`}>
          <rect
            height={height}
            width={width}
            fill={'white'}
          />
          {
            mappedWithLocations.map((item, index) => {
              return (
                <g 
                  key={index} 
                  transform={`translate(${(index % 6) * ((gap * 2) + squareSize)}, ${Math.floor(index / 6) * ((gap * 2) + squareSize)})`}
                  cursor={'pointer'}
                >
                  <g 
                    transform={`translate(${gap}, ${gap})`}
                    onClick={() => handleOnSquareClick((index % 6), Math.floor(index / 6))}
                  >
                    <rect
                      fill={'white'}
                      height={squareSize}
                      width={squareSize}
                      stroke={'lightgrey'}
                      strokeWidth={2}
                      rx={'.75%'}
                    />
                    { item.isFlipped &&                 
                      <g transform={`translate(${squareSize * .25}, ${squareSize * .25})`}>
                        <circle 
                          fill={'white'}
                          cx={squareSize * .25}
                          cy={squareSize * .25}
                          r={squareSize * .35}
                        />
                        <IconContext.Provider 
                          value={{ 
                            size: `${squareSize * .45}px`,
                            color: item.color 
                          }}
                        >
                          {item.icon}
                        </IconContext.Provider>
                      </g>
                    }
                  </g>
                </g>
              )
            })
          }
        </g>
      </svg>
      <div className={'pointSelectorsContainer'} style={styles.pointSelectorsContainer}>
        <PointSelectors 
          pointSelectors={pointSelectors}
          colorArray={colorArray}
          iconArray={iconArray}
          sectionWidth={selectorsWidth}
          handleOnSelectorsClick={handleOnSelectorsClick}
          handleOnLockSelectorsClick={handleOnLockSelectorsClick}
        />
      </div>
    </div>
  )
}

export default SearchMiniGameController