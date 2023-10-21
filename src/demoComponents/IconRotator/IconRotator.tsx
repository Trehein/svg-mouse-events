import React, { useState } from 'react'
import { animated, useSpring } from '@react-spring/web'
import {BsArrowRightCircle} from 'react-icons/bs'
import {FaArrowRight, FaArrowAltCircleRight } from 'react-icons/fa'
import { IconContext } from "react-icons";
import useMeasure from 'react-use-measure';


export type IconRotatorProps = {
    children: React.ReactNode
}

const IconRotator: React.FC<IconRotatorProps> = (props) => {
    const [isPassive, setIsPassive] = useState(false)
    const [ref, bounds] = useMeasure()
    const {children} = props

      const springProps = useSpring({

        to: { 
            rotateZ: isPassive ? 0 : -90
        },
        config: {duration: 500},
        reverse: isPassive
      })

    // const handleClick = () => {
    // api.start({
    //     y: 20,
    //     config: {
    //     friction: 10,
    //     },
    // })
    // }

    console.log('bounds', bounds.height)

    
    
    return (
        <animated.div style={{...springProps, width: 'fit-content', height: bounds.height}} onClick={() => setIsPassive(!isPassive)}>
            <IconContext.Provider value={{ color: 'orange', size: '5em' }}>
                <div ref={ref}>
                    {children}
                </div>
            </IconContext.Provider>
        </animated.div>
    )
}

export default IconRotator