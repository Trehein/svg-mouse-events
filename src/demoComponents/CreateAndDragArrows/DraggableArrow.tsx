import React, { useState } from 'react'
import { AnchorPoint } from './CreateAndDragArrowsController'
import { pointsToPath } from './utils/pointsToPath'
import { colorPaletteStore } from './colorPaletteStore'
import { useOuterClick } from './utils/useOuterClick'
import { arrowsStore } from './stores/arrowsStore'

export type Arrow = {
  start: AnchorPoint,
  end: AnchorPoint,
  curvePoint: AnchorPoint | undefined
}

export type DraggableArrowProps = {
  arrow: Arrow,
  arrowIndex: number
}

const DraggableArrow: React.FC<DraggableArrowProps> = (props) => {
  const {arrow, arrowIndex} = props

  const savedArrows: Arrow[] = arrowsStore((state: any) => state.savedArrowsStore)
  const setSavedArrows: Function = arrowsStore((state: any) => state.setSavedArrowsStore)
  const colors: any = colorPaletteStore((state: any) => state.colors)
  const [tempArrow, setTempArrow] = useState<Arrow>(arrow)
  const [isHovering, setIsHovering] = useState<boolean>(false)
  const [isSelected, setIsSelected] = useState<boolean>(false)
  const [isDragging, setIsDragging] = useState<boolean>(false)

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

  const handleOnNodeDragStart = () => {
    setIsDragging(true)
    console.log('started dragging')
    // setTempArrow({...tempArrow, [node]: {x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY}})

    // setNewArrow({...newArrow, end: {x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY}})
    // const savedArrowsSnapshot = savedArrows
    // savedArrowsSnapshot[arrowIndex] = {...savedArrowsSnapshot[arrowIndex], start: {x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY}}
    

    // // setIsCreatingArrow(false)
    // // setSavedArrows(savedArrowsSnapshot)
    // console.log(savedArrowsSnapshot[arrowIndex])
    // setSavedArrows(savedArrowsSnapshot)

  }

  const handleOnNodeDragging = (e: any, node: string) => {
    setTempArrow({...tempArrow, [node]: {x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY}})

  }

  const handleOnNodeDragEnd = () => {
    setIsDragging(false)
    console.log('done')
  }

  
  return (
    <g ref={innerRef}>
      <path
        d={pointsToPath(tempArrow)}
        onClick={() => handleOnClick()}
        onMouseOver={() => handleOnMouseOver()} 
        onMouseOut={() => handleOnMouseOut()} 
        stroke={isSelected ? colors.selectedArrowColor :  
          isHovering ? colors.hoverArrowColor : colors.mainArrowColor}
        strokeWidth={isHovering ? 3.35 : 3}
        fill="none"
        opacity={isHovering ? 1 : .8}
        markerEnd={ isSelected ? 'url(#selectedArrow)' : 
          isHovering ? 'url(#hoverArrow)' : 'url(#mainArrow)'}
        // marker-start={isSelected ? 'url(#selectedStartCircle)' : ''}
      />
      
      {/* // start */}
      <g>
        <g
          onMouseDown={handleOnNodeDragStart}
          // onMouseDown={(e) => handleOnNodeDrag(e, 'start')}
          onMouseUp={handleOnNodeDragEnd}
          onMouseMove={(e) => handleOnNodeDragging(e, 'start')}
          cursor={isDragging ? 'grabbing' : 'grab'}
        >
          <circle 
            cx={tempArrow.start.x}
            cy={tempArrow.start.y}
            r={isSelected ? 6 : 0}
            fill={isSelected ? colors.selectedArrowColor :  
              isHovering ? colors.hoverArrowColor : colors.mainArrowColor}

          />
          <circle 
            cx={tempArrow.start.x}
            cy={tempArrow.start.y}
            r={isSelected ? 3 : 0}
            fill={'white'}
          />
        </g>
        {/* middle */}
        <g>
          {/* <g>
            <circle 
              cx={arrow.start.x}
              cy={arrow.start.y}
              r={isSelected ? 5 : 0}
              fill={isSelected ? colors.selectedArrowColor :  
                isHovering ? colors.hoverArrowColor : colors.mainArrowColor}
            />
            <circle 
              cx={arrow.start.x}
              cy={arrow.start.y}
              r={isSelected ? 3 : 0}
              fill={'white'}
            />
          </g> */}
        </g>
        {/* end */}
        <g>
          <circle 
            cx={tempArrow.end.x}
            cy={tempArrow.end.y}
            r={isSelected ? 6 : 0}
            fill={isSelected ? colors.selectedArrowColor :  
              isHovering ? colors.hoverArrowColor : colors.mainArrowColor}
          />
          <circle 
            cx={tempArrow.end.x}
            cy={tempArrow.end.y}
            r={isSelected ? 3 : 0}
            fill={'white'}
          />
        </g>
      </g>
    </g>
  )
}

export default DraggableArrow