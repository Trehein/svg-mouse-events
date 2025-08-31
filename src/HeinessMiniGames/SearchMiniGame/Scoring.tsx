import React, { ReactElement } from 'react'
import { PointSelectorsState, ScoredPoint } from './SearchMiniGameController'
import { IconContext } from 'react-icons'

export type ScoringProps = {
  scoredPoints: ScoredPoint[],
  iconArray: ReactElement[],
  colorArray: string[],
  width: number,
  pointSelectors: PointSelectorsState
}

export type PointSlot = {
  iconId: number,
  colorId: number,
  isFlipped: boolean
}

const Scoring: React.FC<ScoringProps> = ({scoredPoints, iconArray, colorArray, width, pointSelectors}) => {
  const margin = .05
  const innerWidth = width - ((width * margin) * 2)
  const squareContainerSize = innerWidth / 5
  const innerHeight = squareContainerSize * (pointSelectors.pointsForIcons.length + 1)
  const gap = .05
  const largeSquareSize = squareContainerSize - ((squareContainerSize * gap * 2) * 2)
  
  const blankArray: () => undefined[] = () => new Array(pointSelectors.pointsForColors.length * pointSelectors.pointsForIcons.length).fill(undefined)

  const pointSlots: any[] = blankArray().map((_, index: number) => {

    const iconId = pointSelectors.pointsForIcons[Math.floor(index / pointSelectors.pointsForColors.length)]
    const colorId = pointSelectors.pointsForColors[Math.floor(index % pointSelectors.pointsForColors.length)]

    const isFlippedForPoints = scoredPoints.filter((scoredPoint: ScoredPoint) => {
      return scoredPoint.colorId === colorId && scoredPoint.iconId === iconId
    })
 
    return {
      iconId: iconId,
      colorId: colorId,
      isFlipped: isFlippedForPoints.length > 0
    }
  })

  return (
    <svg width={width} height={innerHeight + (innerHeight * margin * 2) }>
      <g transform={`translate(${width * margin * .5}, ${width * margin * .5})`}>
        {/* ACTIVE ICONS */}
        <g transform={`translate(0, ${squareContainerSize})`}>
          {
            pointSelectors.pointsForIcons.map((iconId: number, index: number) => {
              return (
                <g transform={`translate(0, ${squareContainerSize * index})`}>
                  <rect 
                    height={largeSquareSize}
                    width={largeSquareSize}
                    rx={'.75%'}
                    fill={'black'}
                    stroke={'black'}
                    strokeWidth={2}
                  />
                  <g 
                    transform={`translate(${largeSquareSize * .15} ${largeSquareSize * .15})`}                    
                  >
                    <IconContext.Provider 
                      value={{ 
                        size: `${largeSquareSize * .7}`,
                        color: 'white'
                      }}
                    >
                      {iconArray[iconId]}
                    </IconContext.Provider>
                  </g>
                </g>
              )
            })
          }
        </g>
        {/* ACTIVE COLORS */}
        <g transform={`translate(${squareContainerSize}, 0)`}>
          {
            pointSelectors.pointsForColors.map((colorId: number, index: number) => {
              return (
                <g transform={`translate(${squareContainerSize * index}, 0)`}>
                  <rect 
                    height={largeSquareSize}
                    width={largeSquareSize}
                    rx={'.75%'}
                    fill={colorArray[colorId]}
                    stroke={colorArray[colorId]}
                    strokeWidth={2}
                    />
                </g>
              )
            })
          }
        </g>

        {/* ACTIVE COLORS */}
        <g transform={`translate(${squareContainerSize}, 0)`}>
          {
            pointSelectors.pointsForColors.map((colorId: number, index: number) => {
              return (
                <g transform={`translate(${squareContainerSize * index}, 0)`}>
                  <rect 
                    height={largeSquareSize}
                    width={largeSquareSize}
                    rx={'.75%'}
                    fill={colorArray[colorId]}
                    stroke={colorArray[colorId]}
                    strokeWidth={2}
                    />
                </g>
              )
            })
          }
        </g>


        <g transform={`translate(${squareContainerSize}, ${squareContainerSize})`}>
          {
            pointSlots.map((pointSlot: PointSlot, index) => {
              return (
                <g transform={`translate(${squareContainerSize * Math.floor(index % pointSelectors.pointsForColors.length)}, ${squareContainerSize * Math.floor(index / pointSelectors.pointsForColors.length)})`}>
                  <rect 
                    height={largeSquareSize}
                    width={largeSquareSize}
                    rx={'.75%'}
                    fill={pointSlot.isFlipped ? colorArray[pointSlot.colorId] : 'white'}
                    stroke={pointSlot.isFlipped ? colorArray[pointSlot.colorId] : 'lightgray'}
                    strokeWidth={2}
                  />
                  <g 
                    transform={`translate(${largeSquareSize * .15} ${largeSquareSize * .15})`}                    
                  >
                    <IconContext.Provider 
                      value={{ 
                        size: `${largeSquareSize * .7}`,
                        color: pointSlot.isFlipped ? 'white' : 'lightgray'
                      }}
                    >
                      {iconArray[pointSlot.iconId]}
                    </IconContext.Provider>
                  </g>
                </g>
              )
            })
          }
        </g>

      </g>
    </svg>
  )
}

export default Scoring