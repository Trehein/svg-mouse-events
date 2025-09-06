import React, { ReactElement, useState } from 'react'
import { GiWingfoot } from "react-icons/gi";
import { GiStrongMan } from "react-icons/gi";
import { GiFallingLeaf } from "react-icons/gi";
import { GiBrain } from "react-icons/gi";
import { GiPotionBall } from "react-icons/gi";
import { GiArmorUpgrade  } from "react-icons/gi";
import PointSelectors from './PointSelectors';
import DifficultySelector from './DifficultySelector';
import SearchCardDeck from './SearchCardDeck';
import Scoring from './Scoring';
import PlayButton from '../Components/PlayButton';

interface Card {
  icon: ReactElement,
  color: string,
  order: number,
  iconId: number,
  colorId: number,
  isFlipped: boolean,
  isBeingOccupied: boolean
}

export interface CardWithLocation extends Card {
  x: number,
  y: number
}

export enum SelectorType {
  ICON = 'ICON',
  COLOR = 'COLOR',
  DIFFICULTY = 'DIFFICULTY'
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
    sideContainer: {
      width: selectorsWidth,
      display: 'flex',
      flexDirection: 'column' as 'column'
    },
    setupSelectors: {

    },
    playButton: {
      padding: '0px',
      margin: '0px',
      backgroundColor: 'white',
      border: 'none'
    },
  }
}

export type ScoredPoint = {
  iconId: number,
  colorId: number,
  isFlipped: boolean
}

export type DifficultyOption = {
  text: string,
  numberOfSelectors: number,
  oddsOfHit: number,
  color: string
}

export const difficultyOptions: DifficultyOption[] = [
  {
    text: 'VE',
    numberOfSelectors: 6,
    oddsOfHit: 9,
    color: 'seagreen'
  },
  {
    text: 'E',
    numberOfSelectors: 5,
    oddsOfHit: 6,
    color: 'olivedrab'
  },
  {
    text: 'M',
    numberOfSelectors: 4,
    oddsOfHit: 4,
    color: 'darkkhaki'
  },
  {
    text: 'H',
    numberOfSelectors: 3,
    oddsOfHit: 2,
    color: 'chocolate'
  },
  {
    text: 'VH',
    numberOfSelectors: 2,
    oddsOfHit: 1,
    color: 'darkred'
  },
]

export type PointSelectorsState = {
  pointsForIcons: number[], 
  pointsForColors: number[], 
}

export type LocksState = {
  isDifficultyLocked: boolean,
  isSelectorsLocked: boolean
}

const SearchMiniGameController: React.FC = () => {
  const outerHeight = window.innerHeight * .6
  const outerWidth = window.innerHeight * .6
  const margin = .05

  const height = outerHeight - outerHeight * (margin * 2)
  const width = outerWidth - outerWidth * (margin * 2)
  const gap = outerWidth * (margin * .15)
  const squareSize = (width / 6) - (gap * 2)
  const maxSidePanelWidth = 360

  const selectorsWidth: number = window.innerWidth < maxSidePanelWidth ? window.innerWidth : maxSidePanelWidth
  const styles =   searchMiniGameControllerStyles(selectorsWidth)

  const containerHeight = selectorsWidth / 6
  const playButtonHeight = containerHeight * 1.5

  const iconArray: ReactElement[] = [<GiWingfoot />, <GiStrongMan />, <GiFallingLeaf />, <GiBrain />, <GiPotionBall />, <GiArmorUpgrade  />]
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
  const [pointSelectors, setPointSelectors] = useState<PointSelectorsState>({pointsForIcons: [], pointsForColors: []})
  
  const [locks, setLocks] = useState<LocksState>({isDifficultyLocked: false, isSelectorsLocked: false})

  const [pointsScored, setPointsScored] = useState<ScoredPoint[]>([])
  // const [occupiedXY, setOccupiedXY] = useState<{x: number, y: number}>({x: -1, y: -1})

  // BOARD
  const handleOnSquareClick = (x: number, y: number, cardData: CardWithLocation) => {
    const copyMappedWithLocations = mappedWithLocations.map((item: CardWithLocation) => {
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
    setMappedWithLocations(copyMappedWithLocations)

    const isIconMatch = pointSelectors.pointsForIcons.includes(cardData.iconId)
    const isColorMatch = pointSelectors.pointsForColors.includes(cardData.colorId)
    
    if(isIconMatch && isColorMatch) {
      const isAlreadyInPointsScored = pointsScored.filter((scoredPoint: ScoredPoint) => {return scoredPoint.colorId === cardData.colorId && scoredPoint.iconId === cardData.iconId})

      const copyPointsScored = pointsScored
      if (isAlreadyInPointsScored.length === 0) {
        copyPointsScored.push({iconId: cardData.iconId, colorId: cardData.colorId, isFlipped: true})
      }

      setPointsScored(copyPointsScored)
    }

  }

  // DIFFICULTY
  const handleOnSelectDifficulty = (selectedDifficulty: DifficultyOption) => {
    setDifficulty(selectedDifficulty)
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
  const handleOnLock = (selectorType: SelectorType) => {
    console.log(selectorType)
    if(selectorType === SelectorType.DIFFICULTY) {
      setLocks({...locks, isDifficultyLocked: true})
    } else if (selectorType === SelectorType.COLOR || selectorType === SelectorType.ICON) {
      setLocks({...locks, isSelectorsLocked: true})
    }
  }

  const isReadyToPlay: () => boolean = () => {
    const numberOfSelectedColors = pointSelectors.pointsForColors.length
    const numberOfSelectedIcons = pointSelectors.pointsForIcons.length

    return difficulty !== undefined 
      && ((numberOfSelectedColors + numberOfSelectedIcons) <= difficulty.numberOfSelectors)
      && (numberOfSelectedColors > 0 && numberOfSelectedIcons > 0)
      && Math.abs(numberOfSelectedColors - numberOfSelectedIcons) < 2
  }

  console.log('locks', locks)

  return (
    <div className={'mainContentContainer'} style={styles.mainContentContainer}>
      <SearchCardDeck 
        margin={margin} 
        height={height} 
        outerHeight={outerHeight}
        width={width} 
        outerWidth={outerWidth}
        squareSize={squareSize} 
        gap={gap} 
        cardsData={mappedWithLocations} 
        handleOnSquareClick={handleOnSquareClick}    
        pointSelectors={pointSelectors}    
      />
      <div className={'sideContainer'} style={styles.sideContainer}>
        <div className={'setupSelectors'} style={styles.setupSelectors}>
          <DifficultySelector 
            difficultyOptions={difficultyOptions} 
            difficulty={difficulty} 
            setDifficulty={handleOnSelectDifficulty}        
          />
          <PointSelectors 
            pointSelectors={pointSelectors}
            colorArray={colorArray}
            iconArray={iconArray}
            sectionWidth={selectorsWidth}
            handleOnSelectorsClick={handleOnSelectorsClick}
            difficulty={difficulty} 
          />
        </div>
        {/* PLAY BUTTON */}
        <PlayButton 
          playButtonHeight={playButtonHeight}
          isReadyToPlay={isReadyToPlay()}
          onClick={handleOnLock}
          isSelectorsLocked={locks.isSelectorsLocked}
        />
        
        {
          locks.isSelectorsLocked &&
          <Scoring 
            scoredPoints={pointsScored}
            iconArray={iconArray}
            colorArray={colorArray}
            width={maxSidePanelWidth}
            pointSelectors={pointSelectors}
          />
        }
      </div>
    </div>
  )
}

export default SearchMiniGameController