import React, { useEffect, useState } from 'react'
import * as d3 from "d3";

export type SliderProps = {
  height: number,
  width: number,
  max: number,
  min: number,
  selectedValue: number,
  setSelectedValue: Function
}

const Slider: React.FC<SliderProps> = (props) => {
  const {height, width, max, min, setSelectedValue, selectedValue} = props
  const [isDragging, setIsDragging] = useState(false)
  const xMargin = width * .05

  const scale = d3.scaleLinear()
    .domain([min, max])
    .range([0, width - (width * .1)])

  const [cx, setCx] = useState(scale(selectedValue) + xMargin)

  useEffect(() => {
    setCx(scale(selectedValue) + xMargin)
  }, [selectedValue])

  return (
    <svg height={height} width={width}
      onMouseUp={(e) => {
        setIsDragging(false)
      }}
    >
      <line x1={width * .05} y1={height * .5} x2={width - (width * .05)} y2={height * .5} stroke={'black'}/>
      <line x1={width * .5} y1={height * .4} x2={width - (width * .5)} y2={height * .6} stroke={'black'}/>
      <circle 
        r={height * .15}
        cx={cx}
        cy={height * .5}
        fill={'orange'}
        onMouseDown={() => {
          // so it doesn't get stuck at the ends
          if (cx <= xMargin) {
            setCx(cx + 1)
          } else if (cx >= width - xMargin) {
            setCx(cx - 1)
          }
          setIsDragging(true)
        }}
        onMouseUp={() => {
          setIsDragging(false)
        }}
        onMouseMove={(e) => {
          if (isDragging) {
            // stops the drag at the ends
            if (cx >= width - xMargin || cx <= xMargin) {
              setIsDragging(false)
            }
            else {
              setCx(e.nativeEvent.offsetX)
              setSelectedValue(Math.round(scale.invert(e.nativeEvent.offsetX - xMargin)))
            }
          }
        }}
      />
    </svg>
  )
}

export default Slider