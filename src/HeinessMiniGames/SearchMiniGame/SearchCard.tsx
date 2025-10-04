import React from 'react'
import { CardWithLocation } from './SearchMiniGameController'
import CardsActiveNowIndicator from './CardsActiveNowIndicator'
import { IconContext } from 'react-icons'

export type SearchCardProps = {
  index: number,
  gap: number,
  squareSize: number,
  cardData: CardWithLocation,
  handleOnSquareClick: Function,
  isCardWorthPoints: boolean,
  isCardsActive: boolean
}

const SearchCard: React.FC<SearchCardProps> = ({index, gap, squareSize, cardData, handleOnSquareClick, isCardWorthPoints, isCardsActive}) => {
  return (
    <g 
      key={index} 
      transform={`translate(${(index % 6) * ((gap * 2) + squareSize)}, ${Math.floor(index / 6) * ((gap * 2) + squareSize)})`}
      cursor={'pointer'}
    >
      <g 
        transform={`translate(${gap}, ${gap})`}
        onClick={() => handleOnSquareClick((index % 6), Math.floor(index / 6), cardData)}
      >
        <rect
          fill={(isCardWorthPoints && cardData.isFlipped) ? cardData.color : 'white'}
          height={squareSize}
          width={squareSize}
          stroke={(isCardWorthPoints && cardData.isFlipped) ? cardData.color : 'lightgrey'}
          strokeWidth={2}
          rx={'.75%'}
        />
        { (!cardData.isFlipped && isCardsActive) && 
          <g transform={`translate(${squareSize * .25}, ${squareSize * .25})`}>
            <CardsActiveNowIndicator 
              squareSize={squareSize}
            />
          </g>
        }
        { cardData.isFlipped &&                 
          <g transform={`translate(${squareSize * .25}, ${squareSize * .25})`}>
            <circle 
              fill={isCardWorthPoints ? cardData.color : 'white'}
              cx={squareSize * .25}
              cy={squareSize * .25}
              r={squareSize * .35}
            />
            <IconContext.Provider 
              value={{ 
                size: `${squareSize * .45}px`,
                color: isCardWorthPoints ? 'white' : cardData.color 
              }}
            >
              {cardData.icon}
            </IconContext.Provider>
          </g>
        }
      </g>
    </g>
  )
}

export default SearchCard