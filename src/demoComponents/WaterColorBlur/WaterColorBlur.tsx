import React, { useEffect, useState } from 'react'
import { generateCircleCoords } from '../../data/generateCircleCoords'
import { pathFinder } from '../../data/pathFinder'

const WaterColorBlur: React.FC = () => {
    const height: number = 500
    const width: number = 500

    const thePoints = generateCircleCoords(10, width * .25, {originX: width * .5, originY: height * .5}).map((point: any) => {
        return {x: point.x, y: point.y}
    })

    const deform = (depth: number, variance: number, vdiv: number) => {
        return pathFinder(
            gaussianLoop(gaussianLoop(gaussianLoop(gaussianLoop(gaussianLoop(gaussianLoop(gaussianLoop(thePoints, variance, 1, 1), variance, 1, 1), variance, 1, 1), variance, 1, 1), variance, 1, 1), variance, 1, 1), variance, 1, 1)
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

            midx = (x1 + x2) * .5
            midy = (y1 + y2) * .5

            nx = midx + (randomGauss() * variance) 
            ny = midy + (randomGauss() * variance) 
            // console.log('nx', nx)
            // console.log('ny', ny)

            // subdivide(x1, y1, nx, ny, depth - 1, variance/vdiv, vdiv);
            newPoints.push({x: nx, y: ny, z: 1}) 
        })
        return newPoints
    }

    // const randomGaussian: () => number = () => {
    //     let u = 0, v = 0;
    //     while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    //     while(v === 0) v = Math.random();
    //     let num: number = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
    //     num = num / 10.0 + 0.5; // Translate to 0 -> 1
    //     // if (num > 1 || num < 0) return randomGaussian() // resample between 0 and 1
    //     // console.log('num', num)
    //     return num
    // }

    const randomGauss = () => {
        const theta = 2 * Math.PI * Math.random();
        const rho = Math.sqrt(-2 * Math.log(1 - Math.random()));
        return (rho * Math.cos(theta)) / 10.0 + 0.5;
      };
      

    return (
        <svg height={height} width={width}>
            {/* <polygon 
                points={deform(2, 20, 1)}
                fill='rebeccapurple'
                filter="url(#blurMe)"
            /> */}
            <polygon points={deform(1, 20, 1)} fill='salmon' opacity={'60'}/>
            {/* <polygon points={  pathFinder(gaussianLoop(thePoints, 3, 1, 1))} fill='purple'/> */}
            {/* <polyline points={pathFinder(thePoints)} fill={'orange'}/> */}


        </svg>
    )
}

export default WaterColorBlur