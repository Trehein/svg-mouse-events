import React from 'react'
import { animated, useSpring, useSpringRef, config } from '@react-spring/web'

const SingleBallBounce: React.FC = () => {
    const height: number = 500
    const width: number = 500
    const molassesApi = useSpringRef()
    const bounceApi = useSpringRef()

    const bounceSprings = useSpring({
        ref: bounceApi,
        from: {
            x: width * .75,
            y: height * .25,
            r: 20,
            fill: 'rebeccapurple'
        },
    })

    const circleSprings = useSpring({
        ref: molassesApi,
        from: {
            x: width * .5,
            y: height * .25,
            r: 20,
            fill: 'rebeccapurple'
        },
    })

    const handleClick = () => {
        molassesApi.start({
            config: config.molasses,
            to: {
                y: circleSprings.y.get() === height * .25 ? height * .75 : height * .25,
                r: circleSprings.r.get() === 20 ? 10 : 20,
                fill: circleSprings.fill.get() === 'steelblue' ? 'rebeccapurple' : 'steelblue'
            }
        })

        bounceApi.start({
            config: config.wobbly,
            to: {
                y: circleSprings.y.get() === height * .25 ? height * .75 : height * .25,
                r: circleSprings.r.get() === 20 ? 10 : 20,
                fill: circleSprings.fill.get() === 'steelblue' ? 'rebeccapurple' : 'steelblue'
            }
        })
    }

      
    return (
        <div style={{display: 'flex', flexDirection: 'column' as 'column'}}>
            <button onClick={handleClick}>Drop Ball</button>
            <svg
                width={width}
                height={width}
            >
                <animated.circle 
                    style={{
                        ...circleSprings,
                    }}
                />
                <animated.circle 
                    style={{
                        ...bounceSprings,
                    }}
                />
            </svg>
        </div>
    )
}

export default SingleBallBounce