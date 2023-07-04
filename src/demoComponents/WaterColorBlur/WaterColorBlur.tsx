import React from 'react'
import { generateCircleCoords } from '../../data/generateCircleCoords'
import { pathFinder } from '../../data/pathFinder'

const WaterColorBlur: React.FC = () => {
    const height: number = 500
    const width: number = 500
    const variance = 25

    const thePoints = generateCircleCoords(10, width * .25, {originX: width * .5, originY: height * .5}).map((point: any) => {
        return {x: point.x, y: point.y}
    })

    const randomGauss = () => {
        const theta = 2 * Math.PI * Math.random();
        const rho = Math.sqrt(-2 * Math.log(1 - Math.random()));
        return (rho * Math.cos(theta)) / 10.0 + 0.5;
      };
      

    const deform = (depth: number, variance: number, vdiv: number) => {
        return pathFinder(
            gaussianLoop(
                gaussianLoop(
                    gaussianLoop(
                        gaussianLoop(
                            gaussianLoop(
                                gaussianLoop(
                                    gaussianLoop(firstPass, variance, 1, 1)
                                , variance, 1, 1)
                            , variance, 1, 1)
                        , variance, 1, 1)
                    , variance, 1, 1)
                , variance, 1, 1)
            , variance, 1, 1)
        )
        // console.log('deform', gaussianLoop(thePoints, 3, 1, 1))
        // return pathFinder(gaussianLoop(thePoints, 5, 1, 1))
    }  

    const gaussianLoop = (points: any[], variance: number, depth: number, vdiv: number) => {
        console.log(variance)
        let x1
        let y1
        let x2 = 0
        let y2 = 0
        let midx
        let midy
        let nx
        let ny
        const newPoints: any[] = []        
        points.forEach((newPoint: {x: number, y: number}, i: number) => {
            x1 = newPoint.x
            y1 = newPoint.y
            if (points.length > i + 1) {
                x2 = points[i + 1].x
                y2 = points[i + 1].y
            } else {
                // console.log('hit else', points[0].x)
                x2 = points[0].x
                y2 = points[0].y
            }
            newPoints.push({x: x1, y: y1})
            // gaussianLoop()
            // if(depth > 0) {
            //     gaussianLoop(newPoints, 3, 0, 0)
            // }
            midx = (x1 + x2) * .5
            midy = (y1 + y2) * .5

            nx = midx + (randomGauss() * variance) 
            ny = midy + (randomGauss() * variance) 
            // console.log('nx', nx)
            // console.log('ny', ny)

            // subdivide(x1, y1, nx, ny, depth - 1, variance/vdiv, vdiv);
            newPoints.push({x: nx, y: ny, z: 1}) 
        })

        // if(depth > 0) {
        //     gaussianLoop(newPoints, 3, 1, 0)
        // }
        return newPoints
    }

    const firstPass = gaussianLoop(
                gaussianLoop(
                    gaussianLoop(
                        gaussianLoop(thePoints, variance, 1, 1)
                    , variance, 1, 1)
                , variance, 1, 1)
            , variance, 1, 1)


    return (
        <svg height={height} width={width}>
            {/* <polygon 
                points={deform(2, 20, 1)}
                fill='rebeccapurple'
                filter="url(#blurMe)"
            /> */}
            <polygon points={deform(1, 3, 1)} fill='salmon' opacity={'100%'}/>

            {/* <polygon points={  pathFinder(gaussianLoop(thePoints, 3, 1, 1))} fill='purple'/> */}
            {/* <polyline points={pathFinder(thePoints)} fill={'orange'}/> */}


        </svg>
    )
}

export default WaterColorBlur