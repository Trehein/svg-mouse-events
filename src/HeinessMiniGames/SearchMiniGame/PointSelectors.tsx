import React, { ReactElement } from 'react'
import { IconContext } from 'react-icons';
import { SelectorType } from './SearchMiniGameController';
import { FaPlay, FaQuestion, FaPlus } from "react-icons/fa";


type PointSelectorsProps = {
  pointSelectors: {
    pointsForIcons: number[];
    pointsForColors: number[];
  },
  iconArray: ReactElement[],
  colorArray: string[],
  sectionWidth: number,
  handleOnSelectorsClick: Function,
  handleOnLockSelectorsClick: Function
}

const pointSelectorsStyles = (containerHeight: number) => {
  return {
    selectorInnerContainer: {
      display: 'flex',
      flexDirection: 'column' as 'column',
      marginTop: '2.5em'
    },
    arrayItem: {
      width: `100%`,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    arrayContainer: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between' as 'space-between',
      alignItems: 'center',
      height: 'fit-content',
    },
    activePointSelectors: {
      margin: `${containerHeight * .1}px 0px`,
      display: 'flex',
      alignItems: 'center',
    },
    playButton: {
      padding: '0px',
      margin: '0px',
      backgroundColor: 'white',
      border: 'none'
    },
    selectionsContainer: {
      display: 'flex',
      alignItems: 'center',
      width: 'fit-content',
      margin: '0px auto'
    },
  }
}

const PointSelectors: React.FC<PointSelectorsProps> = ({
  iconArray, 
  colorArray, 
  sectionWidth, 
  pointSelectors, 
  handleOnSelectorsClick,
  handleOnLockSelectorsClick
}) => {
  const containerHeight = sectionWidth / 6
  const styles = pointSelectorsStyles(containerHeight)
  const playButtonHeight = containerHeight * 1.5
  const activeSelectionHeight = containerHeight * .75

  return (
    <div className={'selectorInnerContainer'} style={styles.selectorInnerContainer}>

      {/* ICONS */}
      <div className={'arrayContainer'} style={styles.arrayContainer}>
        {
          iconArray.map((icon: ReactElement, index: number) => {
            const isIconActive = pointSelectors.pointsForIcons.includes(index)
            return (
              <div className={'arrayItem'} style={styles.arrayItem} key={`iconArrayItem-${index}`}>
                <svg height={containerHeight} width={containerHeight}>
                  <g 
                    transform={`translate(${containerHeight * .1} ${containerHeight * .1})`}
                    onClick={() => handleOnSelectorsClick(SelectorType.ICON, index)} 
                    cursor={'pointer'}                   
                  >
                    <rect 
                      width={containerHeight * .8}
                      height={containerHeight * .8}
                      fill={isIconActive ? 'black' : 'white'}
                      rx={'5%'}
                      stroke={'black'}
                      strokeWidth={2}
                    />
                    <g 
                      transform={`translate(${containerHeight * .15} ${containerHeight * .15})`}                    
                    >
                      <IconContext.Provider 
                        value={{ 
                          size: `${containerHeight * .5}`,
                          color: isIconActive ? 'white' : 'black'
                        }}
                      >
                        {icon}
                      </IconContext.Provider>
                    </g>
                  </g>
                </svg>
              </div>
            )
          })
        }
      </div>

      {/* COLORS */}
      <div className={'arrayContainer'} style={styles.arrayContainer}>
        {
          colorArray.map((color: string, index: number) => {
            const isColorActive = pointSelectors.pointsForColors.includes(index)

            return (
              <div className={'arrayItem'} style={styles.arrayItem} key={`colorArrayItem-${index}`}>
                <svg height={containerHeight} width={containerHeight}>
                  <g 
                    transform={`translate(${containerHeight * .1} ${containerHeight * .1})`}
                    onClick={() => handleOnSelectorsClick(SelectorType.COLOR, index)} 
                    cursor={'pointer'}                       
                  >
                    <rect 
                      height={containerHeight * .8}
                      width={containerHeight * .8}
                      rx={'5%'}
                      fill={color}
                      stroke={color}
                      strokeWidth={2}
                    />
                    <g 
                      transform={`translate(${containerHeight * .15} ${containerHeight * .15})`}                    
                    >
                      <rect 
                        height={containerHeight * .5}
                        width={containerHeight * .5}
                        rx={'5%'}
                        fill={isColorActive ? color : 'white'}
                        stroke={color}
                        strokeWidth={2}
                      />
                    </g>

                  </g>
                </svg>
              </div>
            )
          })
        }
      </div>

      {/* ACTIVE SELECTORS */}
      <div className={'activePointSelectors'} style={styles.activePointSelectors}>
        {/* PLAY BUTTON */}
        <button className={'playButton'} style={styles.playButton}>
          <svg height={playButtonHeight} width={playButtonHeight}>
            <g 
              transform={`translate(${(playButtonHeight) * .05} ${(playButtonHeight) * .05})`}    
              onClick={() => handleOnLockSelectorsClick()}    
              cursor='pointer'      
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
                  <FaPlay />
                </IconContext.Provider>
              </g>
            </g>
          </svg>
        </button>
        {/* SELECTIONS CONTAINER */}
        <div className={'selectionsContainer'} style={styles.selectionsContainer}>
          {/* SELECTED ICONS */}
          <div className={'arrayContainer'} style={{...styles.arrayContainer, justifyContent: 'start', width: 'fit-content'}}>
            {
              pointSelectors.pointsForIcons.length === 0 && 
                <div className={'arrayItem'} style={styles.arrayItem}>
                  <IconContext.Provider 
                    value={{ 
                      size: `${(activeSelectionHeight) * .5}`,
                      color: 'black'
                    }}
                  >
                    {<FaQuestion />}
                  </IconContext.Provider>
                </div>
            }
            {
              pointSelectors.pointsForIcons.length > 0 && pointSelectors.pointsForIcons.map((iconIndex: number, index: number) => {
                return (
                  <div className={'arrayItem'} style={styles.arrayItem} key={`iconArrayItem-${index}`}>
                    <IconContext.Provider 
                      value={{ 
                        size: `${(activeSelectionHeight) * .5}`,
                        color: 'black'
                      }}
                    >
                      {iconArray[iconIndex]}
                    </IconContext.Provider>
                  </div>
                )
              })
            }
          </div>
          {/* ADDITION ICON */}
          <div className={'arrayItem'} style={{...styles.arrayItem, margin: '0px 1em'}}>
            <IconContext.Provider 
              value={{ 
                size: `${(activeSelectionHeight) * .5}`,
                color: 'black'
              }}
            >
              {<FaPlus />}
            </IconContext.Provider>
          </div>
          {/* SELECTED ICONS */}
          <div className={'arrayContainer'} style={{...styles.arrayContainer, justifyContent: 'start', width: 'fit-content'}}>
            {
              pointSelectors.pointsForColors.length === 0 && 
                <div className={'arrayItem'} style={styles.arrayItem}>
                  <IconContext.Provider 
                    value={{ 
                      size: `${(activeSelectionHeight) * .5}`,
                      color: 'black'
                    }}
                  >
                    {<FaQuestion />}
                  </IconContext.Provider>
                </div>
            }
            {
              pointSelectors.pointsForColors.length > 0 && pointSelectors.pointsForColors.map((colorIndex: number, index: number) => {
                return (
                  <div className={'arrayItem'} style={styles.arrayItem} key={`iconArrayItem-${index}`}>
                    <svg height={containerHeight * .5} width={containerHeight * .5}>
                      <g 
                        transform={`translate(${containerHeight * .05} ${containerHeight * .05})`}
                        onClick={() => handleOnSelectorsClick(SelectorType.COLOR, index)} 
                        cursor={'pointer'}                       
                      >
                        <rect 
                          height={(containerHeight * .5) * .8}
                          width={(containerHeight * .5) * .8}
                          rx={'5%'}
                          fill={colorArray[colorIndex]}
                          stroke={colorArray[colorIndex]}
                          strokeWidth={2}
                        />
                      </g>
                    </svg>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default PointSelectors