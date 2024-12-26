import React from 'react'
import { AnchorPoint } from './CreateAndDragArrowsController'
import { pointsToPath } from './utils/pointsToPath'

export type Arrow = {
  start: AnchorPoint,
  end: AnchorPoint,
  curvePoint: AnchorPoint | undefined
}

export type DraggableArrowProps = {
  arrow: Arrow
}



const DraggableArrow: React.FC<DraggableArrowProps> = (props) => {
  const {arrow} = props
  return (
    <g>
      <path 
        d={pointsToPath(arrow)}
        stroke='blue'
        strokeWidth={8}
        fill="none"
        marker-end="url(#triangle)"
        // onClick={(e) => {
        //   handleOnClick(e)
        // }}
      />
      <path 
        d={pointsToPath(arrow)}
        stroke='yellow'
        strokeWidth={4}
        fill="none"
        // marker-end="url(#triangle)"
        // onClick={(e) => {
        //   handleOnClick(e)
        // }}
      />
    </g>
  )
}

export default DraggableArrow