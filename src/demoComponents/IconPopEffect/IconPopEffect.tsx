import { useSpring, config, animated, SpringValue } from '@react-spring/web'
import { is } from 'date-fns/locale'
import React from 'react'
import { IconContext } from 'react-icons'

export type IconPopEffectProps = {
  children: React.ReactNode,
  onClick: Function,
  isActive: boolean
}

const IconPopEffect: React.FC<IconPopEffectProps> = (props) => {
  const {children, onClick, isActive} = props
  const fullSize = 100
  const iconSizeRatio = 0.6
  const transformCenter = parseFloat((1.0 - iconSizeRatio).toFixed(1)) * (fullSize * .5)

  const centerString = `translate(${transformCenter}, ${transformCenter})`

  const IconSizedSVG: React.FC = () => {
    return (
      <IconContext.Provider value={{ size: `${fullSize * iconSizeRatio}px` }}>
          {children}
      </IconContext.Provider>
    )
  }

  const handleOnClick = () => {
    onClick()

  }

  const [colorSpring] = useSpring(
    () => ({
      from: { 
        color: isActive ? 'red' : 'grey', 
        // scale: isActive ? '90%' : '90%',
        // rotateZ: 0
      },
      to: [
        { 
          color: isActive ? 'red' : 'grey',
          // scale: isActive ? '90%' : '90%',
          // rotateZ: isActive ? 0 : 0
        },
        { 
          color: isActive ? 'purple' : 'grey',
          // scale: isActive ? '110%' : '90%',
          // rotateZ: isActive ? 30 : 0
        },
        { 
          color: isActive ? 'red' : 'grey',
          // scale: isActive ? '90%' : '90%',
          // rotateZ: isActive ? 0 : 0
        },
        { 
          color: isActive ? 'purple' : 'grey',
          // scale: isActive ? '70%' : '90%',
          // rotateZ: isActive ? -30 : 0
        },
        { 
          color: isActive ? 'red' : 'grey',
          // scale: isActive ? '90%' : '90%',
          // rotateZ: isActive ? 0 : 0
        },
        // { 
        //   color: isActive ? 'purple' : 'grey',
        //   scale: isActive ? '80%' : '90%',
        //   rotateZ: isActive ? 15 : 0
        // },
        // { 
        //   color: isActive ? 'red' : 'grey',
        //   scale: isActive ? '90%' : '90%',
        //   rotateZ: isActive ? 0 : 0
        // },
      ],
      // config: {...config.wobbly}
      // config: config.wobbly,
      config: {
        duration: 150,
        mass: 2.32,
        tension: 170,
        friction: 26
        // easing: easings.easeInOutBack
      },
    }),
    [isActive]
  )

  const [scaleSpring] = useSpring(
    () => ({
      from: { 
        // color: isActive ? 'red' : 'grey', 
        scale: isActive ? '90%' : '90%',
        // rotateZ: 0
      },
      to: [
        { 
          // color: isActive ? 'red' : 'grey',
          scale: isActive ? '90%' : '90%',
          // rotateZ: isActive ? 0 : 0
        },
        { 
          // color: isActive ? 'purple' : 'grey',
          scale: isActive ? '110%' : '90%',
          // rotateZ: isActive ? 30 : 0
        },
        { 
          // color: isActive ? 'red' : 'grey',
          scale: isActive ? '90%' : '90%',
          // rotateZ: isActive ? 0 : 0
        },
        { 
          // color: isActive ? 'purple' : 'grey',
          scale: isActive ? '70%' : '90%',
          // rotateZ: isActive ? -30 : 0
        },
        { 
          // color: isActive ? 'red' : 'grey',
          scale: isActive ? '90%' : '90%',
          // rotateZ: isActive ? 0 : 0
        },
        // { 
        //   color: isActive ? 'purple' : 'grey',
        //   scale: isActive ? '80%' : '90%',
        //   rotateZ: isActive ? 15 : 0
        // },
        // { 
        //   color: isActive ? 'red' : 'grey',
        //   scale: isActive ? '90%' : '90%',
        //   rotateZ: isActive ? 0 : 0
        // },
      ],
      // config: {...config.wobbly}
      // config: config.wobbly,
      config: {
        duration: 150,
        mass: 2.32,
        tension: 170,
        friction: 26
        // easing: easings.easeInOutBack
      },
    }),
    [isActive]
  )


  return (
    <animated.div style={{...colorSpring}}>
      <svg height={fullSize} width={fullSize}>
        <animated.g
          // style={{...scaleSpring}}
          onClick={() => handleOnClick()}
          transform={`${centerString}`}
        >
            <IconSizedSVG />
        </ animated.g>
      </svg>
    </animated.div>
  )
}

export default IconPopEffect