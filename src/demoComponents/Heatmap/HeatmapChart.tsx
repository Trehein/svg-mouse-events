import { animated, useTrail, useTransition } from '@react-spring/web'
import React, { useState } from 'react'

export type HeatmapChartProps = {
  data: any[],
  height: number,
  width: number,
  valueAccessKey: string,
  titleText: string
}

export const findXIndex = (index: number, numberOfColumns: number) => {
  if (index === 0 || index % numberOfColumns === 0) {
    return 0
  } else if (index >= numberOfColumns){
    return index % numberOfColumns
  } else {
    return index
  }
}

const HeatmapChart: React.FC<HeatmapChartProps> = (props) => {
  const {data, height, width, valueAccessKey, titleText} = props
  const margins = {
    top: height * .15,
    bottom: height * .02,
    left: width * .1,
    right: width * .02
  }

  const innerHeight = height - (margins.bottom + margins.top)
  const innerWidth = width - (margins.left + margins.right)
  const numberOfColumns = 7 // hard coded for week

  const binWidth = innerWidth / numberOfColumns
  const binHeight = innerHeight / Math.ceil(data.length / numberOfColumns)
  
  const translation = `${150}px,0px,0` // needs to be hard coded number

  const transitions = useTransition(data, {
    from: { 
      fillOpacity: 0,
      fill: 'aqua',
      transform: `translate3d(${translation})`
    },
    enter: { 
      fillOpacity: 1,
      fill: 'rebeccapurple',
      transform: `translate3d(0px,0px,0)` 
    },
    leave: { 
      fillOpacity: 0,
      fill: 'salmon',
      transform: `translate3d(-${translation})` 
    },
    trail: 100,
    config: {
      duration: 300
    }
  })

  console.log(data)
  return (
    <svg height={height} width={width}>
      <g transform={`translate(${margins.left} ${margins.top})`}>
        {transitions((props, item, state, index) => (
          <animated.rect 
            style={{...props}}
            height={binHeight} 
            width={binWidth} 
            x={findXIndex(index, numberOfColumns) * binWidth} 
            y={Math.floor(index / numberOfColumns) * binHeight}
            stroke={'white'}
            strokeWidth={2}
            // paintOrder={'stroke'} // stroke is auto centered but drawn second by default, 1st in paint order puts half under the fill
          />
        ))}
      </g>
    </svg>
  )
}

export default HeatmapChart