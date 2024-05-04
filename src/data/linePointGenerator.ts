import { roundNumberGenerator } from "./roundNumberGenerator"

export type LinePointGeneratorParams = {
    yMin: number,
    yMax: number,
    xMin: number,
    xMax: number,
    numberOfPoints: number
}

export type AnimatedPathDataObj = {
    x: number,
    y: number,
}

export const linePointGenerator: (params: LinePointGeneratorParams) => any[] = (params) => {
    const {yMin, yMax, xMin, xMax, numberOfPoints} = params
    const emptyArray: undefined[] = new Array(numberOfPoints).fill(undefined)
    const filledArray: AnimatedPathDataObj[] = emptyArray.map((u: any, index: number) => {
        if(index === 0) {
            return {x: 125, y: 125}
        }
        return {x: roundNumberGenerator(xMin, xMax), y: roundNumberGenerator(yMin, yMax)}
    })
    return filledArray
}