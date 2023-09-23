import { calcXYCoordsOffCircleWithAngle } from "./calcXYCoordsOffCircleWithAngle"

export const generateCircleCoords = (numberOfPoints: number, radius: number, origin: {originX: number, originY: number}) => {
    const {originX, originY} = origin
    const emptyArray: undefined[] = new Array(numberOfPoints).fill(undefined)
    const angleInterval = 360 / numberOfPoints
    return emptyArray.map((u: any, i: number) => {
        return calcXYCoordsOffCircleWithAngle(angleInterval * i, radius, originX, originY)
    })
}

export const generatePointWithAngleAndRadius = (
numberOfPoints: number, 
currentAngleIndex: number, 
radius: number, 
origin: {originX: number, originY: number}) => {
    const {originX, originY} = origin
    const angle = (360 / numberOfPoints) * currentAngleIndex
    return  calcXYCoordsOffCircleWithAngle(angle, radius, originX, originY)
}