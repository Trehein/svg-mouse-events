import React from 'react'
import { IconContext } from 'react-icons'
import { CardWithLocation, PointSelectorsState } from './SearchMiniGameController'
import CardsActiveNowIndicator from './CardsActiveNowIndicator'

export type SearchCardDeckProps = {
  margin: number,
  height: number,
  outerHeight: number,
  width: number,
  outerWidth: number,
  squareSize: number,
  gap: number
  cardsData: CardWithLocation[],
  handleOnSquareClick: Function,
  pointSelectors: PointSelectorsState
}

const SearchCardDeck: React.FC<SearchCardDeckProps> = ({
  margin, 
  height, 
  width, 
  cardsData, 
  squareSize, 
  gap,
  outerHeight,
  outerWidth,
  handleOnSquareClick,
  pointSelectors
}) => {



  return (
    <svg height={outerHeight} width={outerWidth}>
      <g transform={`translate(${outerHeight * margin}, ${outerWidth * margin})`}>
        <rect
          height={height}
          width={width}
          fill={'white'}
        />
        {
          cardsData.map((cardData: CardWithLocation, index: number) => {
            const isCardWorthPoints = pointSelectors.pointsForIcons.includes(cardData.iconId) && pointSelectors.pointsForColors.includes(cardData.colorId)
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
                  { !cardData.isFlipped && 
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
          })
        }
      </g>
    </svg>
  )
}

export default SearchCardDeck