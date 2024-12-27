import React from 'react'
import { Arrow } from './DraggableArrow'
import { pointsToPath } from './utils/pointsToPath'

export type SavedArrowsProps = {
  savedArrows: Array<Arrow>
}

const SavedArrows: React.FC<SavedArrowsProps> = (props) => {
  const {savedArrows} = props

  console.log('savedArrows', savedArrows)
  return (
    <g>
      { savedArrows.map((savedArrow: Arrow) => {
      return (
        // <DraggableArrow arrow={savedArrow} />
          <g>
            <path 
              d={pointsToPath(savedArrow)}
              stroke='blue'
              strokeWidth={8}
              fill="none"
              // onClick={(e) => {
              //   handleOnClick(e)
              // }}
            />
            <path 
              d={pointsToPath(savedArrow)}
              stroke='yellow'
              strokeWidth={3}
              fill="none"
              marker-end="url(#triangle)"
              // marker-end="url(#triangle)"
              // onClick={(e) => {
              //   handleOnClick(e)
              // }}
            />
          </g>
      )
      })}
    </g>
    
  )

} 

export default SavedArrows