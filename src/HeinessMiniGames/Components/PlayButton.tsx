import React from 'react'
import { IconContext } from 'react-icons'
import { FaPlay, FaEye  } from 'react-icons/fa'
import { SiAdblock } from 'react-icons/si'
import { SelectorType } from '../SearchMiniGame/SearchMiniGameController'

export type PlayButtonProps = {
  playButtonHeight: number,
  isReadyToPlay: boolean,
  onClick: Function,
  isSelectorsLocked: boolean
}

const pointSelectorsStyles = () => {
  return {
    playButton: {
      padding: '0px',
      margin: '0px auto',
      backgroundColor: 'white',
      border: 'none',
      width: 'fit-content',
    },
  }
}

const PointSelectors: React.FC<PlayButtonProps> = ({playButtonHeight, isReadyToPlay, onClick, isSelectorsLocked}) => {
  const styles = pointSelectorsStyles()

  return (
    <button className={'playButton'} style={{...styles.playButton, cursor: isReadyToPlay ? 'pointer' : 'not-allowed'}}>
      <svg height={playButtonHeight} width={playButtonHeight}>
        <g 
          transform={`translate(${(playButtonHeight) * .05} ${(playButtonHeight) * .05})`}    
          onClick={() => onClick(SelectorType.COLOR)}    
        >
          <rect 
            width={playButtonHeight * .9}
            height={playButtonHeight * .9}
            rx={'6.5%'}
            stroke={'black'}
            strokeWidth={2}
            fill='white'
          />
          <g 
            transform={`translate(${(playButtonHeight) * .1} ${(playButtonHeight) * .1})`}              
          >
            <IconContext.Provider 
              value={{ 
                size: `${playButtonHeight * .7}`,
                color: 'black'
              }}
            >
              {/* <FaPlay /> */}
              {(isReadyToPlay && !isSelectorsLocked) && <FaPlay />}
              {(isReadyToPlay && isSelectorsLocked) && <FaEye  />}
              {!isReadyToPlay && <SiAdblock />}
              {}
            </IconContext.Provider>
          </g>
        </g>
      </svg>
    </button>
  )
}

export default PointSelectors