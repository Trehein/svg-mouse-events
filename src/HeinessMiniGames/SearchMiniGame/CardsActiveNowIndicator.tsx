import React from 'react'
import { easings, animated, config, useTrail } from '@react-spring/web'

export type CardsActiveNowIndicatorProps = {
  squareSize: number
}

const CardsActiveNowIndicator: React.FC<CardsActiveNowIndicatorProps> = ({squareSize}) => {
  const circlesArray: number[] = Array(5).fill(null).map((u, i) => i)  
  
  const trail = useTrail(circlesArray.length, {
      from: {
        opacity: .05
      },
      to: {
        opacity: .25
      },
      loop: { reverse: true },
      config: {
        ...config.gentle, 
        duration: 750, 
        easing: easings.easeInBounce
      },
  })
  
  return (
    <g>
      {
        trail.map((props, index) => (
          <animated.circle 
              key={circlesArray[index]}
              style={{...props}}
              fill={'black'}
              cx={squareSize * .25}
              cy={squareSize * .25}
              r={squareSize * (.05 + .05 * index)}
          />
        ))
      }
    </g>
  )
}

export default CardsActiveNowIndicator