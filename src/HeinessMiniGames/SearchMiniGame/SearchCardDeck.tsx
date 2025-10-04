import React from 'react'
import { CardWithLocation, PointSelectorsState } from './SearchMiniGameController'
import SearchCard from './SearchCard'

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
  pointSelectors: PointSelectorsState,
  isCardsActive: boolean
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
  pointSelectors,
  isCardsActive
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
              <SearchCard 
                index={index} 
                gap={gap} 
                squareSize={squareSize} 
                cardData={cardData} 
                handleOnSquareClick={handleOnSquareClick} 
                isCardWorthPoints={isCardWorthPoints} 
                isCardsActive={isCardsActive}                
              />
            )
          })
        }
      </g>
    </svg>
  )
}

export default SearchCardDeck