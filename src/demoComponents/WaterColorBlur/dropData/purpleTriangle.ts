import { WaterDropProps } from "../WaterDrop";

export const purpleTriangle: (height: number, width: number) => Array<WaterDropProps> = (height: number, width: number) => {
    const initPolygonPoints: number = 3
    const initPolygonRadius: number = width
    const originX: number = width * .5
    const originY: number = height * .5
    const colors: Array<string> = ['rebeccapurple']
    const opacity: number = .15
    const numberOfOverlays: number = 3
    const maxRandomNumberForInitDeform: number = 20
    const maxNumberOfRecurrsionsForInitDeform: number = 5
    const maxRandomNumberForOverlayDeform: number = 5
    const maxNumberOfRecurrsionsForOverlayDeform: number = 5
    
    const testArray: WaterDropProps[] = new Array(10).fill(undefined).map((undefinedSlot: undefined, i: number) => {
        return {
            initPolygonPoints,
            initPolygonRadius: initPolygonRadius * (.3 - .025 * i),
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