import React from 'react'
import { DifficultyOption } from './SearchMiniGameController'

type DifficultySelectorProps = {
  difficultyOptions: DifficultyOption[],
  difficulty: DifficultyOption | undefined,
  setDifficulty: Function
}

const difficultySelectorStyles = () => {
  return {
    difficultySelectorsContainer: {
      display: 'flex',
      height: '4em',
      marginTop: '2.5em',
      alignItems: 'center',
    },
    difficultyOptionContainer: {
      width: '20%',
      display: 'flex',
      height: '85%'
    },
    difficultyOptionButton: {
      width: '85%',
      margin: '0px auto',
      fontWeight: 700,
      fontFamily: `"Varela Round", sans-serif`,
      fontSize: '1em',
      borderRadius: '.25em'
    },
    difficultyOptionButtonInnerContainer: {
      display: 'flex',
      flexDirection: 'column' as 'column'
    }
  }
}

const DifficultySelector: React.FC<DifficultySelectorProps> = ({difficulty, difficultyOptions, setDifficulty}) => {
  const styles = difficultySelectorStyles()
  
  return (
    <div 
      className='difficultySelectorsContainer' 
      style={{...styles.difficultySelectorsContainer}}
    >
      {
        difficultyOptions.map((difficultyOption: DifficultyOption, index: number) => {
          const isSelectedDifficulty = difficultyOption.text === difficulty?.text

          return (
            <div 
              className='difficultyOptionContainer' 
              style={styles.difficultyOptionContainer}
              key={`${index}-${difficultyOption.text}`}
            >
              <button className={'difficultyOptionButton'} 
                style={{
                  ...styles.difficultyOptionButton,
                  backgroundColor: isSelectedDifficulty ? difficultyOption.color : 'white',
                  border: `2px solid ${difficultyOption.color}`,
                  cursor: 'pointer',
                  color: isSelectedDifficulty ? 'white' : difficultyOption.color,
                }}
                onClick={() => {setDifficulty(difficultyOption)}}
              >
                <div className='difficultyOptionButtonInnerContainer' style={styles.difficultyOptionButtonInnerContainer}>
                  <div>
                    {difficultyOption.text}
                  </div>
                  <div>
                    {`${difficultyOption.oddsOfHit / difficultyOption.oddsOfHit}/${36/difficultyOption.oddsOfHit}`}
                  </div>
                </div>
              </button>
            </div>
          )
        })
      }
    </div>
  )
}

export default DifficultySelector