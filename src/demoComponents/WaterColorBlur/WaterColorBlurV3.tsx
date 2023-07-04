import React from 'react'
import { generateCircleCoords } from '../../data/generateCircleCoords'
import { pathFinderXY } from '../../data/pathFinder';
import { generateRandomPoints } from '../../data/generateRandomPoints';

const WaterColorBlurV3: React.FC = () => {
    const windowHeight = window.innerHeight
    const height: number = 750
    const width: number = 750
    const maxRandomNumberForInitDeform = 25
    const maxNumberOfRecurrsionsForInitDeform = 5
    const opacity = .04

    const initPoints = generateCircleCoords(10, width * .02, {originX: width * .5, originY: height * .5}).map((point: any) => {
        return {x: point.x, y: point.y}
    })

    const firstDeform = generateRandomPoints(initPoints, maxRandomNumberForInitDeform, maxNumberOfRecurrsionsForInitDeform)

    console.log('firstDeform', firstDeform)

    return (
        <svg height={height} width={width}>
            {/* <polygon points={pathFinderXY(firstDeform)} fill='salmon' opacity={'100%'}/> */}
            <polygon points={pathFinderXY(generateRandomPoints(firstDeform, 15, 8))} fill='blue' opacity={opacity} />
            <polygon points={pathFinderXY(generateRandomPoints(firstDeform, 25, 8))} fill='rebeccapurple' opacity={opacity} />
            <polygon points={pathFinderXY(generateRandomPoints(firstDeform, 35, 8))} fill='blue' opacity={opacity} />
            <polygon points={pathFinderXY(generateRandomPoints(firstDeform, 45, 8))} fill='rebeccapurple' opacity={opacity} />
            <polygon points={pathFinderXY(generateRandomPoints(firstDeform, 55, 8))} fill='blue' opacity={opacity} />
            <polygon points={pathFinderXY(generateRandomPoints(firstDeform, 65, 8))} fill='rebeccapurple' opacity={opacity} />
            <polygon points={pathFinderXY(generateRandomPoints(firstDeform, 75, 8))} fill='blue' opacity={opacity} />
            <polygon points={pathFinderXY(generateRandomPoints(firstDeform, 85, 8))} fill='rebeccapurple' opacity={opacity} />
            <polygon points={pathFinderXY(generateRandomPoints(firstDeform, 95, 8))} fill='blue' opacity={opacity} />
            <polygon points={pathFinderXY(generateRandomPoints(firstDeform, 95, 8))} fill='rebeccapurple' opacity={opacity} />
            <polygon points={pathFinderXY(generateRandomPoints(firstDeform, 95, 8))} fill='blue' opacity={opacity} />
            <polygon points={pathFinderXY(generateRandomPoints(firstDeform, 95, 8))} fill='rebeccapurple' opacity={opacity} />
            <polygon points={pathFinderXY(generateRandomPoints(firstDeform, 95, 8))} fill='blue' opacity={opacity} />
            <polygon points={pathFinderXY(generateRandomPoints(firstDeform, 95, 8))} fill='rebeccapurple' opacity={opacity} />
            <polygon points={pathFinderXY(generateRandomPoints(firstDeform, 65, 8))} fill='rebeccapurple' opacity={opacity} />
            <polygon points={pathFinderXY(generateRandomPoints(firstDeform, 75, 8))} fill='blue' opacity={opacity} />
            <polygon points={pathFinderXY(generateRandomPoints(firstDeform, 65, 8))} fill='rebeccapurple' opacity={opacity} />
            <polygon points={pathFinderXY(generateRandomPoints(firstDeform, 75, 8))} fill='blue' opacity={opacity} />
            <polygon points={pathFinderXY(generateRandomPoints(firstDeform, 65, 8))} fill='rebeccapurple' opacity={opacity} />
            <polygon points={pathFinderXY(generateRandomPoints(firstDeform, 75, 8))} fill='blue' opacity={opacity} />
            <polygon points={pathFinderXY(generateRandomPoints(firstDeform, 15, 7))} fill='violet' opacity={.1} />

        </svg>
    )
}

export default WaterColorBlurV3