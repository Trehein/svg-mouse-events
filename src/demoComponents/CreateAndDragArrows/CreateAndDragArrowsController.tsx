import React, { useState } from "react";

export type AnchorPoint = {
  x: number,
  y: number
}

export type DraggableArrow = {
  start: AnchorPoint,
  end: AnchorPoint,
  curvePoint: AnchorPoint | undefined
}

export const pointsToPath = (draggableArrow: DraggableArrow) => {
  if(!draggableArrow.curvePoint) {
    return `M ${draggableArrow.start.x} ${draggableArrow.start.y} ${draggableArrow.end.x} ${draggableArrow.end.y}`
  } else {
    // todo update with curve Q logic
    return `M ${draggableArrow.start.x} ${draggableArrow.start.y} ${draggableArrow.end.x} ${draggableArrow.end.y}`
  }
}

const CreateAndDragArrowsController: React.FC = () => {
  const height: number = 800
  const width: number = 1000

  const [mousePosition, setMousePosition] = useState({x: 0, y: 0})
  const [savedArrows, setSavedArrows] = useState<DraggableArrow[]>([])
  const [newArrow, setNewArrow] = useState<DraggableArrow>({start: {x: 0, y: 0}, end: {x: 0, y: 0}, curvePoint: undefined})
  const [isCreatingArrow, setIsCreatingArrow] = useState<boolean>(false)

  const handleOnStartClick = (e: any) => {



    // todo - once new arrow created
    // const clicksSnapshot = savedArrows
    // clicksSnapshot.push({start})
    // setSavedArrows(clicksSnapshot)
  }

  const handleOnClick = (e: any) => {
    if(isCreatingArrow) {
      setNewArrow({...newArrow, end: {x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY}})
      setIsCreatingArrow(false)
    } else {
      setNewArrow({start: {x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY}, end: {x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY}, curvePoint: undefined})
      setIsCreatingArrow(true)
    }
  }

  const handleOnMouseMove = (e: any) => {
    if(isCreatingArrow) {
      setNewArrow({...newArrow, end: {x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY}})

    }
  }


  return (
    <div>
        <div>
            xVal: {mousePosition.x}
        </div>
        <div>
            yVal: {mousePosition.y}
        </div>
        <svg
            height={height}
            width={width}
        >
            <defs>
              <marker
                id="triangle"
                viewBox="0 0 10 10"
                refX="1"
                refY="5"
                markerUnits="strokeWidth"
                markerWidth="10"
                markerHeight="10"
                orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#f00" />
              </marker>
            </defs>
            <rect
                fill="white"
                width={width}
                height={height}
                x={0}
                y={0}
                onClick={(e) => {
                  handleOnClick(e)
                }}
                onMouseMove={(e) => {
                    console.log(e)
                    setMousePosition({x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY})
                    handleOnMouseMove(e)
                }}
            />
            {isCreatingArrow && 
              <path 
                d={pointsToPath(newArrow)}
                stroke='orange'
                strokeWidth={4}
                fill="none"
                marker-end="url(#triangle)"
                onClick={(e) => {
                  handleOnClick(e)
                }}
              />
            }


            {/* <path
              d={`M ${width * (1/3)} ${height * (2/3)} Q ${width * (1/2)} ${height * (1/3)} ${width * (2/3)} ${height * (2/3)}`}
              stroke='orange'
              strokeWidth={4}
              fill="none"
              marker-end="url(#triangle)"
            /> */}


        </svg>
    </div>
  )
}

export default CreateAndDragArrowsController