import React from 'react'
import { pathFinderXY } from '../../data/pathFinder'
import { generateRandomPoints } from '../../data/generateRandomPoints'
import { generateCircleCoords } from '../../data/generateCircleCoords'

export type WaterDropProps = {
    initPolygonPoints: number,
    initPolygonRadius: number,
    originX: number,
    originY: number,
    colors: Array<string>,
    opacity: number,
    numberOfOverlays: number,
    maxRandomNumberForInitDeform: number,
    maxNumberOfRecurrsionsForInitDeform: number,
    maxRandomNumberForOverlayDeform: number,
    maxNumberOfRecurrsionsForOverlayDeform: number
}

const WaterDrop: React.FC<WaterDropProps> = (props) => {
    const {colors, maxRandomNumberForInitDeform, maxNumberOfRecurrsionsForInitDeform, maxRandomNumberForOverlayDeform, maxNumberOfRecurrsionsForOverlayDeform, numberOfOverlays, initPolygonRadius, originX, originY, opacity, initPolygonPoints} = props
    const emptyArray: undefined[] = new Array(numberOfOverlays).fill(undefined)

    const initPoints = generateCircleCoords(initPolygonPoints, initPolygonRadius, {originX: originX, originY: originY}).map((point: any) => {
        return {x: point.x, y: point.y}
    })

    const firstDeform = generateRandomPoints(initPoints, maxRandomNumberForInitDeform, maxNumberOfRecurrsionsForInitDeform)

    return (
        <>
            {emptyArray.map((emptySlot: undefined, i: number) => {
                return <polygon
                    key={i } 
                    points={pathFinderXY(generateRandomPoints(firstDeform, maxRandomNumberForOverlayDeform, maxNumberOfRecurrsionsForOverlayDeform))} 
                    fill={colors[0]} 
                    opacity={opacity} 
                />
            })}
            {/* <polygon points={pathFinderXY(generateRandomPoints(firstDeform, 15, 8))} fill='blue' opacity={opacity} /> */}
        </>

    )
}

export default WaterDrop