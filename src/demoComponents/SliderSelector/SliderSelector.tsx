import React, { useState } from 'react'
import Slider from './Slider'

const SliderSelector: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState<number>(0) 

  return (
    <div>
          <Slider 
            height={50} 
            width={300}
            max={2500}
            min={-2500}
            selectedValue={selectedValue}
            setSelectedValue={setSelectedValue}
          />
      <div>
      <input 
        type="number" 
        max={2500}
        min={2500}
        step={100}
        value={selectedValue}
        onChange={
          (e) => {
            if(e.target.value.length) {
              setSelectedValue(e.target.value.length ? parseInt(e.target.value) : 0)
            }
          }
        }
      />
      {selectedValue}

      </div>
    </div>
  )
}

export default SliderSelector