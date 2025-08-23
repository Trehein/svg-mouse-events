import React from 'react'

export type DiceProps = {
  size: number,
  diceColor: string,
  dotColor: string,
  displayValue: number
}

interface DotLayout {
  [key: number]: boolean[]
}

const dotLayouts : DotLayout = {
  1: [false, false, false, false, true, false, false, false, false],
  2: [true, false, false, false, false, false, false, false, true],
  3: [false, false, true, false, true, false, true, false, false],
  4: [true, false, true, false, false, false, true, false, true],
  5: [true, false, true, false, true, false, true, false, true],
  6: [true, false, true, true, false, true, true, false, true]
}

const calcX = (size: number, index: number) => {
  const remainder = Math.floor(index / 3)
  return ((remainder + 1) * .25) * size
}

const calcY = (size: number, index: number) => {
  const remainder = index % 3
  return ((remainder + 1) * .25) * size
}

const Dice: React.FC<DiceProps> = (props: DiceProps) => {
  const {size, diceColor, dotColor, displayValue} = props
  const selectedDotLayout = dotLayouts[displayValue]


  return (
    <svg height={size} width={size} >
      <rect 
        x={0}
        y={0}
        height={size}
        width={size}
        fill={diceColor}
      />
      <g>
        {selectedDotLayout.map((slot: boolean, index: number) => {
          return (
            slot 
              ? <circle 
                fill={dotColor}
                cx={calcX(size, index)}
                cy={calcY(size, index)}
                r={size * .1}
              />
              : <></>
          )
        })}
      </g>
    </svg>
  )
}

export default Dice