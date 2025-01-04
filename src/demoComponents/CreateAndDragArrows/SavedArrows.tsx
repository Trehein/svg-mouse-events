import React from 'react'
import DraggableArrow, { Arrow } from './DraggableArrow'

export type SavedArrowsProps = {
  savedArrows: Array<Arrow>
}

const SavedArrows: React.FC<SavedArrowsProps> = (props) => {
  const {savedArrows} = props

  return (
    <g>
      { savedArrows.map((savedArrow: Arrow) => {
        return (
          <DraggableArrow 
            arrow={savedArrow} 
          />
        )
      })}
    </g>
    
  )

} 

export default SavedArrows