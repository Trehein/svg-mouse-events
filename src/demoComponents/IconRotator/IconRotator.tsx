import React, { useState } from 'react'
import { animated, useSpring } from '@react-spring/web'


export type IconRotatorProps = {
    children: React.ReactNode
}

const IconRotator: React.FC<IconRotatorProps> = (props) => {
    const [isPassive, setIsPassive] = useState(false)

    const {children} = props

      const springProps = useSpring({
        to: { 
            rotateZ: isPassive ? 0 : -45
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

    
    
    return (
        <animated.div style={{...springProps, width: 'fit-content'}} onClick={() => setIsPassive(!isPassive)}>
            {children}
        </animated.div>
    )
}

export default IconRotator