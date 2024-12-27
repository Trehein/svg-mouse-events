import React, { useEffect, useState } from "react";
import { pointsToPath } from "./utils/pointsToPath";
import { Arrow } from "./DraggableArrow";
import SavedArrows from "./SavedArrows";

export type AnchorPoint = {
  x: number,
  y: number
}

const CreateAndDragArrowsController: React.FC = () => {
  const height: number = 800
  const width: number = 1000

  const [mousePosition, setMousePosition] = useState({x: 0, y: 0})
  const [savedArrows, setSavedArrows] = useState<Arrow[]>([])
  const [newArrow, setNewArrow] = useState<Arrow>({start: {x: 0, y: 0}, end: {x: 0, y: 0}, curvePoint: undefined})
  const [isCreatingArrow, setIsCreatingArrow] = useState<boolean>(false)
  const [triggerTime, setTriggerTime] = useState<number>(Date.now().valueOf())


  const handleOnClick = (e: any) => {
    if(isCreatingArrow) {
      setNewArrow({...newArrow, end: {x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY}})
      const savedArrowsSnapshot = savedArrows
      savedArrowsSnapshot.push(newArrow)
      
      setIsCreatingArrow(false)
      setSavedArrows(savedArrowsSnapshot)
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

  const handleOnClear = () => {
    setSavedArrows([])
  }

  const removePrevArrow = () => {
    const savedArrowsSnapshot = savedArrows
    savedArrowsSnapshot.pop()
    setSavedArrows(savedArrowsSnapshot)
    fireTriggerTime()
  }

  const fireTriggerTime = () => {
    setTriggerTime(Date.now().valueOf())
  }

  useEffect(() => {

  }, [triggerTime])
  // console.log('savedArrows', savedArrows.length)

  return (
    <div>
        <div>
            xVal: {mousePosition.x}
        </div>
        <div>
            yVal: {mousePosition.y}
        </div>
        <div style={{display: 'flex'}}>
          <button onClick={() => handleOnClear()}>Clear</button>
          <button onClick={() => removePrevArrow()}>Remove Prev</button>
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
                    setMousePosition({x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY})
                    handleOnMouseMove(e)
                }}
            />
            {isCreatingArrow && 
              <path 
                d={pointsToPath(newArrow)}
                stroke='orange'
                strokeWidth={3}
                fill="none"
                marker-end="url(#triangle)"
                onClick={(e) => {
                  handleOnClick(e)
                }}
              />
            }

            {savedArrows.length > 0 &&
              <SavedArrows savedArrows={savedArrows} />
            }


        </svg>
    </div>
  )
}

export default CreateAndDragArrowsController