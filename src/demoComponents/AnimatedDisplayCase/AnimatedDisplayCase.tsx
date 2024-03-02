import React, { useState } from 'react'
import {
  useTransition,
  useSpring,
  useChain,
  config,
  animated,
  useSpringRef,
} from '@react-spring/web'
import AnimatedPathController from '../AnimatedPath/AnimatedPathController'

export const animatedDisplayCaseStyles = () => {
  return {
    mainFrame: {
      height: '100vh',
      width: '100%',
      backgroundColor: '#2a2a2a',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    contentCard: {
      display: 'flex',
      width: '100%',
      height: '100%',
      border: '1px solid orange',
    },
    cardContainer: {
      position: 'relative' as 'relative',
      display: 'grid',
      gridTemplateColumns: 'repeat(3, minmax(100px, 1fr))',
      gridGap: '25px',
      padding: '25px',
      // background: 'white',
      borderRadius: '5px',
      cursor: 'pointer',
      // boxShadow: '0px 10px 10px -5px rgba(0, 0, 0, 0.05)',
    }
  }
}

export type DemoComponentData = {
  title: string,
  url: string
}

export const demoComponentData: DemoComponentData[] = [
  {
    title: '',
    url: '/animatedPath'
  },
  {
    title: '',
    url: '/animatedPath'
  },
  {
    title: '',
    url: '/animatedPath'
  },
  {
    title: '',
    url: '/animatedPath'
  },
  {
    title: '',
    url: '/animatedPath'
  },
  {
    title: '',
    url: '/animatedPath'
  },
]

const AnimatedDisplayCase: React.FC = () => {
  const styles = animatedDisplayCaseStyles()
  const [state, setState] = useState({isOpen: false})

  const data = demoComponentData

  const springApi = useSpringRef()
  const { size, ...rest } = useSpring({
    ref: springApi,
    config: config.stiff,
    from: { size: '20%', background: 'rebeccapurple' },
    to: {
      size: state.isOpen ? '90%' : '20%',
      background: state.isOpen ? 'white' : 'rebeccapurple',
    },
  })

  const transApi = useSpringRef()
  const transition = useTransition(state.isOpen ? data : [], {
    ref: transApi,
    trail: 400 / data.length,
    from: { opacity: 0, scale: 0 },
    enter: { opacity: 1, scale: 1 },
    leave: { opacity: 0, scale: 0 },
  })

  // This will orchestrate the two animations above, comment the last arg and it creates a sequence
  useChain(state.isOpen ? [springApi, transApi] : [transApi, springApi], [
    0,
    state.isOpen ? 0.1 : 0.6,
  ])

  return (
    <div className={'mainFrame'} style={styles.mainFrame}>
      <animated.div
        className={'cardContainer'}
        style={{ ...rest, width: size, height: size, ...styles.cardContainer }}
        // className={styles.container}
        onClick={() => setState({...state, isOpen: !state.isOpen})}
      >
        {transition((style, item) => (
          <animated.div
            // className={styles.item}
            style={{ ...style, ...styles.contentCard }}
            onClick={() => console.log('')}
          />
        ))}
      </animated.div>
    </div>
  )
}

export default AnimatedDisplayCase