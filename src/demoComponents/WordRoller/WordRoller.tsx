import React, { useState } from 'react'
import Roller from './Roller'

const WordRoller: React.FC = () => {
  const [state, setState] = useState(true)
  return (
    <div className={'container'}>
      <button onClick={() => setState(!state)}>Toggle</button>
      <Roller rolled={state}>
        <span>Lorem</span>
        <span>Ipsum</span>
        <span>Dolor</span>
        <span>Sit</span>
      </Roller>
    </div>
  )
}

export default WordRoller