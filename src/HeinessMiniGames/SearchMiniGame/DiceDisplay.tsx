import React from 'react'
import Dice from '../Components/Dice'
import { IconContext } from 'react-icons'
import { GiCancel } from "react-icons/gi";

export type DiceDisplayProps = {
  searchChances: number[],
  containerWidth: number
}

const diceDisplayStyles = () => {
  return {
    diceContainer: {
      display: 'flex',
      justifyContent: 'space-evenly'
    }
  }
}

const DiceDisplay: React.FC<DiceDisplayProps> = ({searchChances, containerWidth}) => {
  const diceSize = containerWidth * .3
  const styles = diceDisplayStyles()
  const activeDiceIndex = searchChances.findIndex((searchChances: number) => {
        return searchChances > 0
      })

  return (
    <div className='diceContainer' style={styles.diceContainer}>
      {
        searchChances.map((chances: number, index: number) => {
          if (chances === 0) {
            return (
              <svg height={diceSize} width={diceSize}>
                <g 
                  transform={`translate(${(diceSize) * .05} ${(diceSize) * .05})`}    
                >
                  <rect 
                    width={diceSize * .9}
                    height={diceSize * .9}
                    rx={'6.5%'}
                    stroke={'black'}
                    strokeWidth={2}
                    fill='white'
                  />
                  <g 
                    transform={`translate(${(diceSize) * .1} ${(diceSize) * .1})`}              
                  >
                    <IconContext.Provider 
                      value={{ 
                        size: `${diceSize * .7}`,
                        color: 'black'
                      }}
                    >
                      <GiCancel />
                    </IconContext.Provider>
                  </g>
                </g>
              </svg>
            )
          }

          return (
            <svg height={diceSize} width={diceSize}>
                <g 
                  transform={`translate(${(diceSize) * .05} ${(diceSize) * .05})`}    
                >
                  <rect 
                    width={diceSize * .9}
                    height={diceSize * .9}
                    rx={'6.5%'}
                    stroke={'black'}
                    strokeWidth={2}
                    fill={activeDiceIndex === index ? 'black' : 'white'}
                  />
                  <Dice 
                    size={diceSize * .9} 
                    diceColor={activeDiceIndex === index ? 'black' : 'white'} 
                    dotColor={activeDiceIndex === index ? 'white' : 'black'} 
                    displayValue={chances}              
                  />
                </g>
            </svg>

          )
        })
      }
    </div>
  )
}

export default DiceDisplay