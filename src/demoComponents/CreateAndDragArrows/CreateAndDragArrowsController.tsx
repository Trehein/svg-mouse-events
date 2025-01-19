import React, { useEffect, useState } from "react";
import { pointsToPath } from "./utils/pointsToPath";
import { Arrow } from "./DraggableArrow";
import SavedArrows from "./SavedArrows";
import ArrowPointDefs from "./ArrowPointDefs";
import { colorPaletteStore } from "./colorPaletteStore";
import { arrowsStore } from "./stores/arrowsStore";

export type AnchorPoint = {
  x: number,
  y: number
}

const CreateAndDragArrowsController: React.FC = () => {
  const height: number = 800
  const width: number = 1000
  const colors: any = colorPaletteStore((state: any) => state.colors)

  const savedArrows: Arrow[] = arrowsStore((state: any) => state.savedArrowsStore)
  const setSavedArrows: Function = arrowsStore((state: any) => state.setSavedArrowsStore)
  
  const [mousePosition, setMousePosition] = useState({x: 0, y: 0})
  const [newArrow, setNewArrow] = useState<Arrow>({start: {x: 0, y: 0}, end: {x: 0, y: 0}, curvePoint: undefined})
  const [isCreatingArrow, setIsCreatingArrow] = useState<boolean>(false)
  const [triggerTime, setTriggerTime] = useState<number>(Date.now().valueOf())

  const handleOnNodeDrag = (e: any, arrowIndex: number) => {

  }

  const handleCreateOnClick = (e: any) => {
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

  // to force changes on the mapped saved arrows array to update the dom
  useEffect(() => {}, [triggerTime])

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
          <ArrowPointDefs />
          <rect
              fill="white"
              width={width}
              height={height}
              x={0}
              y={0}
              onClick={(e) => {
                handleCreateOnClick(e)
              }}
              onMouseMove={(e) => {
                  setMousePosition({x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY})
                  handleOnMouseMove(e)
              }}
          />
          {isCreatingArrow && 
            <path 
              d={pointsToPath(newArrow)}
              stroke={colors.createArrowColor}
              strokeWidth={3}
              fill="none"
              markerEnd="url(#createArrow)"
              markerStart="url(#circle)"
              onClick={(e) => {
                handleCreateOnClick(e)
              }}
            />
          }

          {savedArrows.length > 0 &&
            <SavedArrows savedArrows={savedArrows}/>
          }

        </svg>
    </div>
  )
}

export default CreateAndDragArrowsController