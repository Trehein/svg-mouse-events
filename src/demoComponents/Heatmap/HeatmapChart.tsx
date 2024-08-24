import { animated, useTrail } from '@react-spring/web'
import React, { useState } from 'react'

export type HeatmapChartProps = {
  data: any[],
  height: number,
  width: number,
  valueAccessKey: string,
  titleText: string
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

  console.log(data)
  return (
    <svg height={height} width={width}>
      <g transform={`translate(${margins.left} ${margins.top})`}>
      {trail.map((props, index) => (
        <animated.rect 
          style={{...props}}
          height={binHeight} 
          width={binWidth} 
          x={0 + index * 10} 
          y={0}
        />
      ))}
        {/* <rect height={innerHeight} width={innerWidth} fill={'orange'}/> */}
        {/* <rect fill={'aqua'} height={binHeight} width={binWidth} x={0} y={0}/> */}
      </g>
    </svg>
  )
}

export default HeatmapChart