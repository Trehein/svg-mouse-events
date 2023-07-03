import React, { useEffect, useState } from 'react'
import { generateCircleCoords } from '../../data/generateCircleCoords'

// todo - try again once you have polygon line generator
const WaterColorBlur: React.FC = () => {
    const height: number = 500
    const width: number = 500
    const originPoint = 280
    const endPoint = 386
    const basePolygonPoints = [
        {
            x: 280.90169943749476,
            y: 308.7785252292473
        },
        {
            x: 330.90169943749476,
            y: 250
        },
        {
            x:350,
            y: 191.2214747707527
        },
        {
            x:330.90169943749476,
            y: 154.89434837048464
        },
        {
            x:280.90169943749476,
            y: 154.89434837048464
        },
        {
            x:219.09830056250527,
            y: 191.22147477075268
        },
        {
            x:169.09830056250527,
            y: 249.99999999999997
        },
        {
            x:150,
            y: 308.7785252292473
        },
        {
            x:169.09830056250524,
            y: 345.10565162951536
        }
    ]
    const thePoints = generateCircleCoords(10, 50, {originX: width * .5, originY: height * .5})

    const deform = (depth: number, variance: number, vdiv: number) => {
        let x1
        let y1
        let x2 = 0
        let y2 = 0
        let midx
        let midy
        let nx
        let ny
        let new_points: any[] = []

        const recursiveArr: any[] = []            
        
        // new_points.forEach((againPoint: any, i: number) => {
        //     x1 = againPoint.x;
        //     y1 = againPoint.y;
        //     if (new_points[i].x === undefined) {
        //         x2 = new_points[i + 1].x
        //         y2 = new_points[i + 1].y
        //     } else {
        //         x2 = new_points[i].x
        //         y2 = new_points[i].x
        //     }
        //     recursiveArr.push({x: x1, y: y1})
        //     // subdivide(depth, variance, vdiv, x1, y1, x2, y2)

        //     midx = (x1 + x2) * .5
        //     midy = (y1 + y2) * .5

        //     nx = midx + randomGaussian() * variance
        //     ny = midy + randomGaussian() * variance

        //     // subdivide(x1, y1, nx, ny, depth - 1, variance/vdiv, vdiv);
        //     recursiveArr.push({x: nx, y: ny, z: 1})   
        // })
        // console.log(recursiveArr)
        // gaussianLoop(

        //     , 3)
        return pathFinder(
            gaussianLoop(
                gaussianLoop(
                    gaussianLoop(
                        gaussianLoop(
                            gaussianLoop(
                                thePoints, 3
                            )
                        , 3)
                    , 3)
                , 3)
            , 3)
        )
    }  


    const gaussianLoop = (points: any[], variance: number) => {
        console.log(points)
        let mapToXY: Array<{x: number, y: number}> = [] 
        const maxReruns = 3
        
        if(points[0].x === undefined) {
            mapToXY = points.map((point: {cx: number, cy: number}) => {
                return {
                    x: point.cx,
                    y: point.cy
                }
            }) 
        } else {
            mapToXY = points
        }

        const recursiveArr: any[] = [] 
        let x1
        let y1
        let x2 = 0
        let y2 = 0
        let midx
        let midy
        let nx
        let ny        
        
        for (let i = 0; i < maxReruns; i++) {
            mapToXY.forEach((newPoint: {x: number, y: number}, i: number) => {
                x1 = newPoint.x ? newPoint.x : 0;
                y1 = newPoint.x ? newPoint.y : 0;
                if (mapToXY.length < i) {
                    x2 = mapToXY[i + 1].x
                    y2 = mapToXY[i + 1].y
                } else {
                    x2 = newPoint.x ? newPoint.x : 0
                    y2 = newPoint.y ? newPoint.y : 0
                }
                recursiveArr.push({x: x1, y: y1})
                // subdivide(depth, variance, vdiv, x1, y1, x2, y2)
    
                midx = (x1 + x2) * .5
                midy = (y1 + y2) * .5
    
                nx = midx + randomGaussian() * variance * 15
                ny = midy + randomGaussian() * variance * 15
    
                // subdivide(x1, y1, nx, ny, depth - 1, variance/vdiv, vdiv);
                recursiveArr.push({x: nx, y: ny}) 
             })
        }

        return recursiveArr
    }

    // const subdivide = (
    //     depth: number, 
    //     variance: number, 
    //     vdiv: number,
    //     x1: number,
    //     y1: number,
    //     x2: number,
    //     y2: number
    //     ) => {
    //         let midx, midy, nx, ny

    //         if (depth >= 0) {
    //             midx = (x1 + x2) * .5
    //             midy = (y1 + y2) * .5

    //             nx = midx + randomGaussian() * variance
    //             ny = midy + randomGaussian() * variance

    //             // subdivide(x1, y1, nx, ny, depth - 1, variance/vdiv, vdiv);
    //             const tempPushArr = newPoints
    //             tempPushArr.push({x: nx, y: ny})
    //             setPoints(tempPushArr)
    //             // subdivide(nx, ny, x2, y2, depth - 1, variance/vdiv, vdiv);
    //         }
    // }


    const pathFinder = (pathArr: any[]) => {
        let starterString = `${pathArr[0].cx}`
        console.log(pathArr)
        pathArr.forEach((point: {x?: number, y?: number, cx?: number, cy?: number}) => {
            starterString = `${starterString}
                , ${point.cx ? point.cx : point.x} ${point.cy ? point.cy : point.y}`
        })

        const fullString = `${starterString}, ${pathArr[pathArr.length - 1].cy}`
        return fullString
    }

    const randn_bm = (min: number, max: number, skew: number) => {
        let u = 0, v = 0;
        while(u === 0) u = Math.random() //Converting [0,1) to (0,1)
        while(v === 0) v = Math.random()
        let num = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v )
        
        num = num / 10.0 + 0.5 // Translate to 0 -> 1
        if (num > 1 || num < 0) 
          num = randn_bm(min, max, skew) // resample between 0 and 1 if out of range
        
        else{
          num = Math.pow(num, skew) // Skew
          num *= max - min // Stretch to fill range
          num += min // offset to min
        }
        return num
      }

      const randomGaussian: () => number = () => {
        let u = 0, v = 0;
        while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
        while(v === 0) v = Math.random();
        let num: number = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
        num = num / 10.0 + 0.5; // Translate to 0 -> 1
        // if (num > 1 || num < 0) return randomGaussian() // resample between 0 and 1
        return num
      }
      

    return (
        <svg height={height} width={width}>
            {/* <filter id="blurMe">
                <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
                <feGaussianBlur in="SourceGraphic" stdDeviation="35" />

            </filter> */}
            {/* <polygon 
                points={deform(2, 20, 1)}
                fill='rebeccapurple'
                filter="url(#blurMe)"
            />
              <polyline points={deform(2, 20, 1)} />
              <polyline points={pathFinder(basePolygonPoints)} fill={'orange'}/> */}
              <polyline points={pathFinder(thePoints)} fill={'orange'}/>
              {/* <polyline points={deform(2, 20, 1)} fill={'none'} opacity={'60'} stroke='black'/> */}

            

        </svg>
    )
}

export default WaterColorBlur