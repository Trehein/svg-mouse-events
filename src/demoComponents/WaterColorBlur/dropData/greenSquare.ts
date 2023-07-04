import { WaterDropProps } from "../WaterDrop";

export const greenSquare: (height: number, width: number) => Array<WaterDropProps> = (height: number, width: number) => {
    const initPolygonPoints: number = 4
    const initPolygonRadius: number = width
    const originX: number = width * .5
    const originY: number = height * .5
    const colors: Array<string> = ['rgb(46, 125, 50)']
    const opacity: number = .065
    const numberOfOverlays: number = 3
    const maxRandomNumberForInitDeform: number = 20
    const maxNumberOfRecurrsionsForInitDeform: number = 7
    const maxRandomNumberForOverlayDeform: number = 5
    const maxNumberOfRecurrsionsForOverlayDeform: number = 5
    
    const testArray: WaterDropProps[] = new Array(15).fill(undefined).map((undefinedSlot: undefined, i: number) => {
        return {
            initPolygonPoints,
            initPolygonRadius: initPolygonRadius * (.5 - .05 * i),
            originX,
            originY,
            colors: [colors[0]],
            opacity,
            numberOfOverlays,
            maxRandomNumberForInitDeform,
            maxNumberOfRecurrsionsForInitDeform,
            maxRandomNumberForOverlayDeform,
            maxNumberOfRecurrsionsForOverlayDeform
        }
    })

    return testArray
} 