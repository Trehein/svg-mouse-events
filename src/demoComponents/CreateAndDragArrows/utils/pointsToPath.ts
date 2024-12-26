import { Arrow } from "../DraggableArrow"

export const pointsToPath = (draggableArrow: Arrow) => {
  if(!draggableArrow.curvePoint) {
    return `M ${draggableArrow.start.x} ${draggableArrow.start.y} ${draggableArrow.end.x} ${draggableArrow.end.y}`
  } else {
    // todo update with curve Q logic
    return `M ${draggableArrow.start.x} ${draggableArrow.start.y} ${draggableArrow.end.x} ${draggableArrow.end.y}`
  }
}