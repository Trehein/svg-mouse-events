import React, { useState } from 'react'
import { AnchorPoint } from './CreateAndDragArrowsController'
import { pointsToPath } from './utils/pointsToPath'
import { colorPaletteStore } from './colorPaletteStore'
import { useOuterClick } from './utils/useOuterClick'

export type Arrow = {
  start: AnchorPoint,
  end: AnchorPoint,
  curvePoint: AnchorPoint | undefined
}

export type DraggableArrowProps = {
  arrow: Arrow,
}

const DraggableArrow: React.FC<DraggableArrowProps> = (props) => {
  const {arrow} = props
  const colors: any = colorPaletteStore((state: any) => state.colors)
  const [isHovering, setIsHovering] = useState<boolean>(false)
  const [isSelected, setIsSelected] = useState<boolean>(false)

  const innerRef = useOuterClick((e: any) => {
    if(isSelected) {
      setIsSelected(false)
    }
  })

  const handleOnMouseOver = () => {
    setIsHovering(true)
  }

  const handleOnMouseOut = () => {
    setIsHovering(false)
  }

  const handleOnClick = () => {
    setIsSelected(true)
  }

  
  return (
    <g ref={innerRef}>
      <path
        onClick={() => handleOnClick()}
        onMouseOver={() => handleOnMouseOver()} 
        onMouseOut={() => handleOnMouseOut()} 
        d={pointsToPath(arrow)}
        stroke={isSelected ? colors.selectedArrowColor :  
          isHovering ? colors.hoverArrowColor : colors.mainArrowColor}
        strokeWidth={isHovering ? 3.35 : 3}
        fill="none"
        opacity={isHovering ? 1 : .8}
        marker-end={ isSelected ? 'url(#selectedArrow)' : 
          isHovering ? 'url(#hoverArrow)' : 'url(#mainArrow)'}
      />
    </g>
  )
}

export default DraggableArrow