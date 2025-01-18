import React from 'react'
import ButtonV1 from './ButtonV1'
import ButtonV2 from './ButtonV2'
import ButtonV3 from './ButtonV3'

const ButtonDisplayer: React.FC = () => {
  return (
    <>
      <div style={{height: '100px', width: '100vw', display:'flex', justifyContent: 'space-evenly', alignItems: 'center'}}>
        <ButtonV1 
          onClick={() => console.log('buttoned')} 
          textColor={'black'} 
          backgroundColor={'white'} 
          displayText={'Button'} 
          fontSize={'1.1em'}
        />
        <ButtonV1 
          onClick={() => console.log('buttoned')} 
          textColor={'white'} 
          backgroundColor={'orange'} 
          displayText={'Button'} 
          fontSize={'1.1em'}
        />
      </div>
      <div style={{height: '100px', width: '100vw', display:'flex', justifyContent: 'space-evenly', alignItems: 'center'}}>
        <ButtonV2 
          onClick={() => console.log('buttoned')} 
          textColor={'black'} 
          backgroundColor={'white'} 
          displayText={'Button'} 
          fontSize={'1.1em'}
        />
        <ButtonV2 
          onClick={() => console.log('buttoned')} 
          textColor={'white'} 
          backgroundColor={'blue'} 
          displayText={'Button'} 
          fontSize={'1.1em'}
        />
      </div>

      <div style={{height: '100px', width: '100vw', display:'flex', justifyContent: 'space-evenly', alignItems: 'center', backgroundColor: 'white'}}>
        <ButtonV3
          onClick={() => console.log('buttoned')} 
          textColor={'black'} 
          backgroundColor={'white'} 
          displayText={'Button'} 
          fontSize={'1.1em'}
        />
        <ButtonV3
          onClick={() => console.log('buttoned')} 
          textColor={'white'} 
          backgroundColor={'blue'} 
          displayText={'Button'} 
          fontSize={'1.1em'}
        />
      </div>
    </>
  )
}

export default ButtonDisplayer