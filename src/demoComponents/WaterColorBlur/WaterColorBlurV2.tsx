import React from 'react'
import { generateCircleCoords } from '../../data/generateCircleCoords'
import { pathFinder, pathFinder2 } from '../../data/pathFinder';

export const randomGauss = () => {
    const theta = 2 * Math.PI * Math.random();
    const rho = Math.sqrt(-2 * Math.log(1 - Math.random()));
    return (rho * Math.cos(theta)) / 10.0 + 0.5;
};

export const randomIntFromInterval = (min: number, max: number) => { // min and max included 
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export type PointObj = {
    x: number,
    y: number
}

// generate random points roughly between each existing point
export const generateRandomPoints = (currentPoints: any[], maxRandomNumber: number, numberOfRecurssionsRemaining: number) => {
    let x1, y1, midx, midy, nx, ny
    let x2, y2
    let generatedPoints: Array<PointObj> = []

    console.log('numberOfRecurssionsRemaining', numberOfRecurssionsRemaining)
    console.log('currentPoints', currentPoints)

    if(numberOfRecurssionsRemaining > 0) {
        currentPoints.forEach((currentPoint: {x: number, y: number}, i: number) => {
            x1 = currentPoint.x
            y1 = currentPoint.y
            if (i + 1 < currentPoints.length) {
                x2 = currentPoints[i + 1].x
                y2 = currentPoints[i + 1].y
            } else {
                x2 = currentPoints[0].x
                y2 = currentPoints[0].y
            }
            generatedPoints.push({x: x1, y: y1})
            midx = (x1 + x2) * .5
            midy = (y1 + y2) * .5

            nx = midx + (randomGauss() * maxRandomNumber) * (randomIntFromInterval(1, 2) % 2 === 0 ? 1 : - 1)
            ny = midy + (randomGauss() * maxRandomNumber) * (randomIntFromInterval(1, 2) % 2 === 0 ? 1 : - 1)

            generatedPoints.push({x: nx, y: ny}) 

        })
        console.log('generatedPoints', generatedPoints)

        // console.log('forReturn', generateRandomPoints(generatedPoints, maxRandomNumber, numberOfRecurssionsRemaining - 1))
        generatedPoints = generateRandomPoints(generatedPoints, maxRandomNumber, numberOfRecurssionsRemaining - 1)
    }

    return generatedPoints.length > 0 ? generatedPoints : currentPoints
}

const WaterColorBlurV2: React.FC = () => {
    const height: number = 750
    const width: number = 750
    const maxRandomNumberForInitDeform = 25
    const maxNumberOfRecurrsionsForInitDeform = 9
    const opacity = .04

    const initPoints = generateCircleCoords(10, width * .35, {originX: width * .5, originY: height * .5}).map((point: any) => {
        return {x: point.x, y: point.y}
    })

    const firstDeform = generateRandomPoints(initPoints, maxRandomNumberForInitDeform, maxNumberOfRecurrsionsForInitDeform)

    console.log('firstDeform', firstDeform)

    return (
        <svg height={height} width={width}>
            {/* <polygon points={pathFinder2(firstDeform)} fill='salmon' opacity={'100%'}/> */}
            <polygon points={pathFinder2(generateRandomPoints(firstDeform, 4, 3))} fill='salmon' opacity={opacity} />
            <polygon points={pathFinder2(generateRandomPoints(firstDeform, 4, 3))} fill='rebeccapurple' opacity={opacity} />
            <polygon points={pathFinder2(generateRandomPoints(firstDeform, 4, 3))} fill='salmon' opacity={opacity} />
            <polygon points={pathFinder2(generateRandomPoints(firstDeform, 4, 3))} fill='rebeccapurple' opacity={opacity} />
            <polygon points={pathFinder2(generateRandomPoints(firstDeform, 4, 3))} fill='salmon' opacity={opacity} />
            <polygon points={pathFinder2(generateRandomPoints(firstDeform, 4, 3))} fill='rebeccapurple' opacity={opacity} />
            <polygon points={pathFinder2(generateRandomPoints(firstDeform, 4, 3))} fill='salmon' opacity={opacity} />
            <polygon points={pathFinder2(generateRandomPoints(firstDeform, 4, 3))} fill='rebeccapurple' opacity={opacity} />
            <polygon points={pathFinder2(generateRandomPoints(firstDeform, 4, 3))} fill='salmon' opacity={opacity} />
            <polygon points={pathFinder2(generateRandomPoints(firstDeform, 4, 3))} fill='rebeccapurple' opacity={opacity} />
            <polygon points={pathFinder2(generateRandomPoints(firstDeform, 4, 3))} fill='salmon' opacity={opacity} />
            <polygon points={pathFinder2(generateRandomPoints(firstDeform, 4, 3))} fill='rebeccapurple' opacity={opacity} />
            <polygon points={pathFinder2(generateRandomPoints(firstDeform, 4, 3))} fill='salmon' opacity={opacity} />
            <polygon points={pathFinder2(generateRandomPoints(firstDeform, 4, 3))} fill='rebeccapurple' opacity={opacity} />
            <polygon points={pathFinder2(generateRandomPoints(firstDeform, 4, 3))} fill='salmon' opacity={opacity} />
            <polygon points={pathFinder2(generateRandomPoints(firstDeform, 4, 3))} fill='rebeccapurple' opacity={opacity} />
            <polygon points={pathFinder2(generateRandomPoints(firstDeform, 4, 3))} fill='salmon' opacity={opacity} />
            <polygon points={pathFinder2(generateRandomPoints(firstDeform, 4, 3))} fill='rebeccapurple' opacity={opacity} />
            <polygon points={pathFinder2(generateRandomPoints(firstDeform, 4, 3))} fill='salmon' opacity={opacity} />
            <polygon points={pathFinder2(generateRandomPoints(firstDeform, 4, 3))} fill='rebeccapurple' opacity={opacity} />
            <polygon points={pathFinder2(generateRandomPoints(firstDeform, 4, 3))} fill='salmon' opacity={opacity} />
            <polygon points={pathFinder2(generateRandomPoints(firstDeform, 4, 3))} fill='rebeccapurple' opacity={opacity} />
            <polygon points={pathFinder2(generateRandomPoints(firstDeform, 4, 3))} fill='salmon' opacity={opacity} />
            <polygon points={pathFinder2(generateRandomPoints(firstDeform, 4, 3))} fill='rebeccapurple' opacity={opacity} />
            <polygon points={pathFinder2(generateRandomPoints(firstDeform, 4, 3))} fill='salmon' opacity={opacity} />
            <polygon points={pathFinder2(generateRandomPoints(firstDeform, 4, 3))} fill='rebeccapurple' opacity={opacity} />
            <polygon points={pathFinder2(generateRandomPoints(firstDeform, 4, 3))} fill='salmon' opacity={opacity} />
            <polygon points={pathFinder2(generateRandomPoints(firstDeform, 4, 3))} fill='rebeccapurple' opacity={opacity} />
            <polygon points={pathFinder2(generateRandomPoints(firstDeform, 4, 3))} fill='salmon' opacity={opacity} />
            <polygon points={pathFinder2(generateRandomPoints(firstDeform, 4, 3))} fill='rebeccapurple' opacity={opacity} />
            <polygon points={pathFinder2(generateRandomPoints(firstDeform, 4, 3))} fill='salmon' opacity={opacity} />
            <polygon points={pathFinder2(generateRandomPoints(firstDeform, 4, 3))} fill='rebeccapurple' opacity={opacity} />
            <polygon points={pathFinder2(generateRandomPoints(firstDeform, 4, 3))} fill='salmon' opacity={opacity} />
            <polygon points={pathFinder2(generateRandomPoints(firstDeform, 4, 3))} fill='rebeccapurple' opacity={opacity} />
            <polygon points={pathFinder2(generateRandomPoints(firstDeform, 4, 3))} fill='salmon' opacity={opacity} />
            <polygon points={pathFinder2(generateRandomPoints(firstDeform, 4, 3))} fill='rebeccapurple' opacity={opacity} />
            <polygon points={pathFinder2(generateRandomPoints(firstDeform, 4, 3))} fill='salmon' opacity={opacity} />
            <polygon points={pathFinder2(generateRandomPoints(firstDeform, 4, 3))} fill='rebeccapurple' opacity={opacity} />
            <polygon points={pathFinder2(generateRandomPoints(firstDeform, 4, 3))} fill='salmon' opacity={opacity} />
            <polygon points={pathFinder2(generateRandomPoints(firstDeform, 4, 3))} fill='rebeccapurple' opacity={opacity} />
            <polygon points={pathFinder2(generateRandomPoints(firstDeform, 4, 3))} fill='salmon' opacity={opacity} />
            <polygon points={pathFinder2(generateRandomPoints(firstDeform, 4, 3))} fill='rebeccapurple' opacity={opacity} />
            <polygon points={pathFinder2(generateRandomPoints(firstDeform, 4, 3))} fill='salmon' opacity={opacity} />
            <polygon points={pathFinder2(generateRandomPoints(firstDeform, 4, 3))} fill='rebeccapurple' opacity={opacity} />
            <polygon points={pathFinder2(generateRandomPoints(firstDeform, 4, 3))} fill='salmon' opacity={opacity} />
            <polygon points={pathFinder2(generateRandomPoints(firstDeform, 4, 3))} fill='rebeccapurple' opacity={opacity} />
            <polygon points={pathFinder2(generateRandomPoints(firstDeform, 4, 3))} fill='salmon' opacity={opacity} />
            <polygon points={pathFinder2(generateRandomPoints(firstDeform, 4, 3))} fill='rebeccapurple' opacity={opacity} />
            <polygon points={pathFinder2(generateRandomPoints(firstDeform, 4, 3))} fill='salmon' opacity={opacity} />
            <polygon points={pathFinder2(generateRandomPoints(firstDeform, 4, 3))} fill='rebeccapurple' opacity={opacity} />
            <polygon points={pathFinder2(generateRandomPoints(firstDeform, 4, 3))} fill='salmon' opacity={opacity} />
            <polygon points={pathFinder2(generateRandomPoints(firstDeform, 4, 3))} fill='rebeccapurple' opacity={opacity} />


        </svg>
    )
}

export default WaterColorBlurV2