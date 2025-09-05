import React, { ReactElement } from 'react'
import { IconContext } from 'react-icons';
import { DifficultyOption, SelectorType } from './SearchMiniGameController';
import { FaPlay, FaQuestion, FaPlus, FaLessThanEqual } from "react-icons/fa";
import { SiAdblock } from "react-icons/si";

type PointSelectorsProps = {
  pointSelectors: {
    pointsForIcons: number[];
    pointsForColors: number[];
  },
  iconArray: ReactElement[],
  colorArray: string[],
  sectionWidth: number,
  handleOnSelectorsClick: Function,
  handleOnLockSelectorsClick: Function,
  difficulty: DifficultyOption | undefined
}

const pointSelectorsStyles = (containerHeight: number) => {
  return {
    selectorInnerContainer: {
      display: 'flex',
      flexDirection: 'column' as 'column',
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
      // display: 'flex',
      // alignItems: 'center',
      width: 'fit-content',
      margin: '0px auto'
    },
    maxSelectorsSum: {
      fontFamily: `"Varela Round", sans-serif`,
      fontSize: '1.85em',
      fontWeight: 800
    },
    activeSelectorsContainer: {
      display: 'flex',
      maxWidth: '2em'
      // width: '3em',
      // flexDirection: 'column' as 'column'
    }
  }
}

const PointSelectors: React.FC<PointSelectorsProps> = ({
  iconArray, 
  colorArray, 
  sectionWidth, 
  pointSelectors, 
  handleOnSelectorsClick,
  handleOnLockSelectorsClick,
  difficulty
}) => {
  const containerHeight = sectionWidth / 6
  const styles = pointSelectorsStyles(containerHeight)
  const playButtonHeight = containerHeight * 1.5
  const activeSelectionHeight = containerHeight * .75
  const isReadyToPlay: () => boolean = () => {
    const numberOfSelectedColors = pointSelectors.pointsForColors.length
    const numberOfSelectedIcons = pointSelectors.pointsForIcons.length

    return difficulty !== undefined 
      && ((numberOfSelectedColors + numberOfSelectedIcons) <= difficulty.numberOfSelectors)
      && (numberOfSelectedColors > 0 && numberOfSelectedIcons > 0)
      && Math.abs(numberOfSelectedColors - numberOfSelectedIcons) < 2
  }

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
        {/* SELECTIONS CONTAINER */}
        <div className={'selectionsContainer'} style={{...styles.selectionsContainer, display: 'flex', alignItems: 'center'}}>
          {/* SELECTED ICONS */}
          <div style={{width: '25%'}}>
            {/* QUESTION */}
            {
              pointSelectors.pointsForIcons.length === 0 && 
                <div className={'arrayItem'} style={{...styles.arrayItem}}>
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
            {/* SELECTED ICONS */}
            {
              pointSelectors.pointsForIcons.length > 0 && 
                <div style={{width: '4em', display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' as 'wrap'}}>
                  {                
                    pointSelectors.pointsForIcons.map((iconIndex: number, index: number) => {
                      return (
                        <div 
                          className={'arrayItem'} 
                          style={{...styles.arrayItem, width: '50%', margin: '.15em 0em', cursor: 'pointer'}} 
                          key={`iconArrayItem-${index}`}
                          onClick={() => handleOnSelectorsClick(SelectorType.ICON, iconIndex)} 
                        >
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
                    })}
                </div>
            }
          </div>
          {/* ADDITION ICON */}
          <div className={'arrayItem'} style={{...styles.arrayItem, margin: '0px .75em', width: 'fit-content'}}>
            <IconContext.Provider 
              value={{ 
                size: `${(activeSelectionHeight) * .5}`,
                color: 'black'
              }}
            >
              {<FaPlus />}
            </IconContext.Provider>
          </div>

          <div style={{width: '25%'}}>
            {/* QUESTION */}
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

            {/* SELECTED COLORS */}
            {
              pointSelectors.pointsForColors.length > 0 && 
                <div style={{width: '4em', display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' as 'wrap'}}>
                  {             
                  pointSelectors.pointsForColors.map((colorIndex: number, index: number) => {
                    return (
                      <div className={'arrayItem'} style={{...styles.arrayItem, width: '50%'}} key={`iconArrayItem-${index}`}>
                        <svg height={containerHeight * .5} width={containerHeight * .5}>
                          <g 
                            transform={`translate(${containerHeight * .05} ${containerHeight * .05})`}
                            onClick={() => handleOnSelectorsClick(SelectorType.COLOR, colorIndex)} 
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
                  })}
                </div>
            }
          </div>


          {/* >= ICON */}
          <div className={'arrayItem'} style={{width: '3em', display: 'flex', justifyContent: 'center'}}>
            <IconContext.Provider 
              value={{ 
                size: `${(activeSelectionHeight) * .5}`,
                color: 'black'
              }}
            >
              {<FaLessThanEqual />}
            </IconContext.Provider>
          </div>
          {/* MAX SELECTORS SUM ICON */}
          <h1 className={'maxSelectorsSum'} style={styles.maxSelectorsSum}>
            {difficulty?.numberOfSelectors}
          </h1>
        </div>
      </div>
    </div>
  )
}

export default PointSelectors