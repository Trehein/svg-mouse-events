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

  console.log(binHeight)
  console.log(binWidth)

  const [open, setOpen] = useState(false)

  const trail = useTrail(data.length, {
    config: { mass: 5, tension: 2000, friction: 200 },
    from: {
      fill: 'orange'
    },
    to: {
      fill: 'purple'
    }
  })

  const transitions = useTransition(data, {
    from: { 
      fillOpacity: 0,
      fill: 'aqua' 
    },
    enter: { 
      fillOpacity: 1,
      fill: 'rebeccapurple' 
    },
    leave: { 
      fillOpacity: 0,
      fill: 'salmon' 
    },
    trail: 100,
    config: {
      duration: 1000
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
          />
        ))}
      </g>
    </svg>
  )
}

export default HeatmapChart