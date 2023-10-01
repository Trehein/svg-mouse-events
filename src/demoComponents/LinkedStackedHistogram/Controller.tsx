import { ParentSize } from '@visx/responsive';
import { useState } from 'react'
import LinkedHistogram from './LinkedHistogram';
import { generatePayrollPhaseData } from './dataGen';

export type ControllerState = {
    data: PayrollPhaseData[]
}

export type PayrollPhaseData = {
    phase: string
    bopus: number
    fitting: number
    register: number
    restock: number
    signs: number
    trucks: number
    visuals: number
}

const Controller = () => {

  const [state, setState] = useState<ControllerState>({data: generatePayrollPhaseData()})

  
  return (
      <div style={{display: 'flex', flexDirection: 'column'}}>

        <div style={{ height: '75vh', width: '100%' }}>
          <ParentSize className="graph-container" debounceTime={10}>
            {({ width: visWidth, height: visHeight }) => (
                <LinkedHistogram 
                  data={state.data} 
                  width={visWidth} 
                  height={visHeight} 
                  barKeyField={'phase'}
                />        
            )}
          </ParentSize> 
        </div>
      </div>
  )
}

export default Controller