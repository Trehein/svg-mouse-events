import React from 'react'
import DraggableArrow, { Arrow } from './DraggableArrow'

export type SavedArrowsProps = {
  savedArrows: Array<Arrow>
}

const SavedArrows: React.FC<SavedArrowsProps> = (props) => {
  const {savedArrows} = props

  return (
    <g>
      { savedArrows.map((savedArrow: Arrow, arrowIndex: number) => {
        return (
          <DraggableArrow 
            arrow={savedArrow} 
            arrowIndex={arrowIndex}
            key={arrowIndex}
          />
        )
      })}
    </g>
    
  )

} 

export default SavedArrows