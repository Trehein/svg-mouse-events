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
  arrowIndex: number
}

const DraggableArrow: React.FC<DraggableArrowProps> = (props) => {
  const {arrow, arrowIndex} = props
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

  const handleOnNodeDrag = () => {
    console.log('over')
  }

  
  return (
    <g ref={innerRef}>
      <path
        d={pointsToPath(arrow)}
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
          onClick={handleOnNodeDrag}
          cursor={'grab'}
        >
          <circle 
            cx={arrow.start.x}
            cy={arrow.start.y}
            r={isSelected ? 6 : 0}
            fill={isSelected ? colors.selectedArrowColor :  
              isHovering ? colors.hoverArrowColor : colors.mainArrowColor}

          />
          <circle 
            cx={arrow.start.x}
            cy={arrow.start.y}
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
            cx={arrow.end.x}
            cy={arrow.end.y}
            r={isSelected ? 6 : 0}
            fill={isSelected ? colors.selectedArrowColor :  
              isHovering ? colors.hoverArrowColor : colors.mainArrowColor}
          />
          <circle 
            cx={arrow.end.x}
            cy={arrow.end.y}
            r={isSelected ? 3 : 0}
            fill={'white'}
          />
        </g>
      </g>
    </g>
  )
}

export default DraggableArrow