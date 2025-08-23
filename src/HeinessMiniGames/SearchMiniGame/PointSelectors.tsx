import React, { ReactElement, ReactNode } from 'react'
import { IconContext } from 'react-icons';

type PointSelectorsProps = {
  setPointSelectors: React.Dispatch<React.SetStateAction<{
    pointsForIcons: number[];
    pointsForColors: number[];
  } | undefined>>,
  pointSelectors: {
    pointsForIcons: number[];
    pointsForColors: number[];
  } | undefined,
  iconArray: ReactElement[],
  colorArray: string[]
}

const pointSelectorsStyles = (containerHeight: number) => {
  return {
    selectorInnerContainer: {
      // width: `${containerHeight}em`,
      display: 'flex',
      flexDirection: 'column' as 'column',
      // height: `${containerHeight}em`,
      marginTop: `${containerHeight * .5}em`
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
      margin: `${containerHeight * .25}em 0em`
    },
    colorSelectorOuter: {
      width: `${containerHeight}em`,
      height: `${containerHeight}em`,

    }
  }
}

const PointSelectors: React.FC<PointSelectorsProps> = ({iconArray, colorArray}) => {
  const containerHeight = 4
  const styles = pointSelectorsStyles(containerHeight)


  return (
    <div className={'selectorInnerContainer'} style={styles.selectorInnerContainer}>
      <div className={'arrayContainer'} style={styles.arrayContainer}>
        {
          iconArray.map((icon: ReactElement) => {
            return (
              <div className={'arrayItem'} style={styles.arrayItem}>
                <IconContext.Provider 
                  value={{ 
                    size: `${containerHeight * .75}em`,
                    // color: item.color 
                  }}
                >
                  {icon}
                </IconContext.Provider>
              </div>
            )
          })
        }
      </div>
      <div className={'arrayContainer'} style={styles.arrayContainer}>
        {
          colorArray.map((color: string) => {
            return (
              <div className={'arrayItem'} style={styles.arrayItem}>
                <div className={'colorSelectorOuter'} style={{...styles.colorSelectorOuter, backgroundColor: color}}>

                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default PointSelectors