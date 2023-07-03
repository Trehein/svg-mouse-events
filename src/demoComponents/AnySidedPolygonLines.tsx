import React from 'react'
import { generateCircleCoords } from '../data/generateCircleCoords'

export type PolyLinesProps = {
    circleCoords: any[],
    strokeColor?: string
}

export type SidedShapesProps = {
    numberOfShapes: number
}

const AnySidedPolygonLines: React.FC = () => {
    const height = 500
    const width = 500
    const radius = width * .25
    const numberOfPoints = 10
    const circleCoords = generateCircleCoords(numberOfPoints, radius, {originX: width * .5, originY: height * .5})
    const sixSided = generateCircleCoords(6, width * .15, {originX: width * .5, originY: height * .5})

    const generateLineCoordsWithXYCoords = (coords: any[]) => {
        return coords.map((coord: any, i: number) => {
            return {
                x1: coord.cx,
                y1: coord.cy,
                x2: i + 1 <= coords.length - 1 ? coords[i + 1].cx : coords[0].cx,
                y2: i + 1 <= coords.length - 1 ? coords[i + 1].cy : coords[0].cy
            }
        })
    }

    const PolyLines: React.FC<PolyLinesProps> = (props) => {
        const {circleCoords, strokeColor} = props
        const lineCoords = generateLineCoordsWithXYCoords(circleCoords)

        return (
            <>
                {
                    lineCoords.map((coord: any) => {
                        return (
                            <line 
                                x1={coord.x1}
                                x2={coord.x2}
                                y1={coord.y1}
                                y2={coord.y2}
                                stroke={strokeColor ? strokeColor : 'black'}
                            />
                        )
                    })
                }
            </>
        )
    }

    const SidedShapes: React.FC<SidedShapesProps> = (props) => {
        const {numberOfShapes} = props
        const emptyArray: undefined[] = new Array(numberOfShapes).fill(undefined)
        return (
            <>
                {emptyArray.map((val: any, index: number) => {
                    const circleCoords = generateCircleCoords(3 + index, radius, {originX: width * .5, originY: height * .5})

                    return <PolyLines circleCoords={circleCoords} />
                })}
            </>
        )
        
    }


    return (
        <svg
            height={height}
            width={width}
        >
            <PolyLines circleCoords={circleCoords} strokeColor={'orange'}/>
            <PolyLines circleCoords={sixSided} strokeColor={'blue'}/>
            <SidedShapes numberOfShapes={5}/>
        </svg>
    )
}

export default AnySidedPolygonLines