import { useSpring, config, animated } from '@react-spring/web'
import React from 'react'
import { IconContext } from 'react-icons'

export type IconColorMorphProps = {
  children: React.ReactNode,
  onClick: Function
}

const IconColorMorph: React.FC<IconColorMorphProps> = (props) => {
  const {children, onClick} = props
  const fullSize = 500
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

  const [{ color }] = useSpring(
    () => ({
      from: { color: 'blue' },
      to: [
        { color: 'red' },
        { color: 'yellow' },
        { color: 'orange' },
        { color: 'green' },
        { color: 'purple' },
      ],
      config: config.molasses,
      loop: {
        reverse: true,
      },
    }),
    []
  )


  return (
    <animated.div className='animated' style={{color}} >
      <svg height={fullSize} width={fullSize} >
        <g
          onClick={() => handleOnClick()}
          transform={`${centerString}`}       // transform={`translate(0, 0)`}
        >
          <IconSizedSVG />
        </g>
      </svg>
    </animated.div>
  )
}

export default IconColorMorph