import React from 'react'
import { generateCircleCoords } from '../../data/generateCircleCoords'
import { pathFinderXY } from '../../data/pathFinder';
import { generateRandomPoints } from '../../data/generateRandomPoints';


export type PointObj = {
    x: number,
    y: number
}

const WaterColorBlurV2: React.FC = () => {
    const height: number = 750
    const width: number = 750
    const maxRandomNumberForInitDeform = 25
    const maxNumberOfRecurrsionsForInitDeform = 9
    const opacity = .15

    const initPoints = generateCircleCoords(10, width * .275, {originX: width * .5, originY: height * .5}).map((point: any) => {
        return {x: point.x, y: point.y}
    })

    const firstDeform = generateRandomPoints(initPoints, maxRandomNumberForInitDeform, maxNumberOfRecurrsionsForInitDeform)

    console.log('firstDeform', firstDeform)

    return (
        <svg height={height} width={width}>
            {/* <polygon points={pathFinder2(firstDeform)} fill='salmon' opacity={'100%'}/> */}
            <polygon points={pathFinderXY(generateRandomPoints(firstDeform, 15, 1))} fill='salmon' opacity={opacity} />
            <polygon points={pathFinderXY(generateRandomPoints(firstDeform, 15, 1))} fill='rebeccapurple' opacity={opacity} />
        </svg>
    )
}

export default WaterColorBlurV2