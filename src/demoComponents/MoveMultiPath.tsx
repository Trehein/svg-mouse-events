import React from 'react'
import { useSpring, animated, useSpringRef } from '@react-spring/web'

const MoveMultiPath: React.FC = () => {
    const height: number = 500
    const width: number = 500

    const xySpring = useSpring({
        loop: true,
        from: { 
            y: height * .5,
            cx: width * .5,
            r: 20 
        },
        to: [
            {
                y: height * .5,
                cx: width * .5,
                r: 20 
            },
            {
                y: height * .25,
                cx: width * .5,
                r: 10 
            },
            {
                y: height * .5,
                cx: width * .25,
                r: 20 
            },
            {
                y: height * .5,
                cx: width * .5,
                r: 20 
            },
        ],
      })



    return (
        <div>
            <svg
                height={height}
                width={width}
            >
                <rect height={height} width={width} fill={'steelblue'}/>
                <animated.circle 
                    style={{...xySpring}}
                    // cx={100}
                />
            </svg>
        </div>
    )
}

export default MoveMultiPath