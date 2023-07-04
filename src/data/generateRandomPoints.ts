import { PointObj } from "../demoComponents/WaterColorBlur/WaterColorBlurV2"
import { randomGauss } from "./randomGauss"
import { randomIntFromInterval } from "./randomIntFromInterval"

// generate random points roughly between each existing point
export const generateRandomPoints = (currentPoints: any[], maxRandomNumber: number, numberOfRecurssionsRemaining: number) => {
    let x1, y1, midx, midy, nx, ny
    let x2, y2
    let generatedPoints: Array<PointObj> = []

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
        generatedPoints = generateRandomPoints(generatedPoints, maxRandomNumber, numberOfRecurssionsRemaining - 1)
    }

    return generatedPoints.length > 0 ? generatedPoints : currentPoints
}