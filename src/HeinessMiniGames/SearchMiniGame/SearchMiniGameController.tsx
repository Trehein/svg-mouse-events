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

const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max);
}

const searchMiniGameControllerStyles = () => {
  return {
    mainContentContainer: {
      width: '100%',
      display: 'flex',
    },
    pointSelectorsContainer: {
      width: '24em',
    }
  }
}

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
  const styles =   searchMiniGameControllerStyles()

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


  const [pointSelectors, setPointSelectors] = useState<{pointsForIcons: number[], pointsForColors: number[]}>()
  // const [occupiedXY, setOccupiedXY] = useState<{x: number, y: number}>({x: -1, y: -1})


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
                    onClick={(e: any) => handleOnSquareClick((index % 6), Math.floor(index / 6))}
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
          setPointSelectors={setPointSelectors}
          pointSelectors={pointSelectors}
          colorArray={colorArray}
          iconArray={iconArray}
        />
      </div>
    </div>
  )
}

export default SearchMiniGameController