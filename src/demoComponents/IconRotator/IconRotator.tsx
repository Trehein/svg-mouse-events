import React from 'react'
import { animated, useSpring } from '@react-spring/web'
import { IconContext } from "react-icons";
import useMeasure from 'react-use-measure';


export type IconRotatorProps = {
    children: React.ReactNode,
    rotationDegrees: number,
    iconColor: string
}

const IconRotator: React.FC<IconRotatorProps> = (props) => {
    const [ref, bounds] = useMeasure()
    const {children, rotationDegrees, iconColor} = props
    console.log(iconColor)

    const [springProps] = useSpring(
        () => ({
            from: { rotateZ: 0, color: iconColor, scale: '90%' },
            to: { rotateZ: rotationDegrees, color: iconColor, scale: '100%' },
            config: {
                // duration: 500,
                mass: 4.32,
                tension: 471,
                friction: 26
                // easing: easings.easeInOutBack
            },
        }),
        [rotationDegrees, iconColor]
      )

    return (
        <animated.div style={{...springProps, width: 'fit-content', height: bounds.height}}>
            <div ref={ref}>
                <IconContext.Provider value={{ size: '5em' }}>
                    {children}
                </IconContext.Provider>
            </div>
        </animated.div>
    )
}

export default IconRotator