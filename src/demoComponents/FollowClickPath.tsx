import { animated, config, useSpring, useSpringRef } from '@react-spring/web'
import React, {useState} from 'react'

const FollowClickPath: React.FC = () => {
    const height: number = 500
    const width: number = 500
    const [savedClicks, setSavedClicks] = useState([{cx: width * .5, y: height * .5, fill: '#FFD6E0'}])
    const moveApi = useSpringRef()

    const moveSprings = useSpring({
        ref: moveApi,
        from: {
            cx: width * .5,
            y: height * .5,
            r: 20,
            fill: '#FFD6E0'
        },
    })

    const handleClick = () => {
        moveApi.start({
            config: config.stiff,
            to: savedClicks
        })
    }

    const handleOnClick = (e: any) => {
        const clicksSnapshot = savedClicks
        clicksSnapshot.push({cx: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY, fill: '#7BF1A8'})
        setSavedClicks(clicksSnapshot)
    }

    return (
        <div style={{display: 'flex', flexDirection: 'column' as 'column'}}>
            <button style={{width: '25%'}} onClick={() => handleClick()}>
                Trigger
            </button>
            <svg
                height={height}
                width={width}
                onClick={(e) => {
                    handleOnClick(e)
                }}
            >
                <rect 
                    height={height}
                    width={width}
                    fill='#107E7D'
                />
                <circle 
                    cy={height * .5}
                    cx={width * .5}
                    r={15}
                    fill={'#FFD6E0'}
                />
                <animated.circle 
                    style={{...moveSprings}}
                />
            </svg>
        </div>
    )
}

export default FollowClickPath