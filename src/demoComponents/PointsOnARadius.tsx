import React from 'react'
import { generateCircleCoords } from '../data/generateCircleCoords'

const PointsOnARadius: React.FC = () => {
    const height = 500
    const width = 500
    const r = 5

    const SalmonPoints = () => {
        return (
            <>
                {generateCircleCoords(3, 30, {originX: width * .5, originY: height * .5}).map((coord: {cx: number, cy: number}, i: number) => {
                    const {cx, cy} = coord
                    return (
                        <circle 
                            key={i}
                            cx={cx}
                            cy={cy}
                            r={r}
                            fill={'salmon'}
                        />
                    )
                })}
            </>
        )
    }

    const PurplePoints = () => {
        return (
            <>
                {generateCircleCoords(10, 75, {originX: width * .5, originY: height * .5}).map((coord: {cx: number, cy: number}, i: number) => {
                    const {cx, cy} = coord
                    return (
                        <circle 
                            key={i}
                            cx={cx}
                            cy={cy}
                            r={r}
                            fill={'rebeccapurple'}
                        />
                    )
                })}
            </>
        )
    }

    const TealPoints = () => {
        return (
            <>
                {generateCircleCoords(50, 130, {originX: width * .5, originY: height * .5}).map((coord: {cx: number, cy: number}, i: number) => {
                    const {cx, cy} = coord
                    return (
                        <circle 
                            key={i}
                            cx={cx}
                            cy={cy}
                            r={r}
                            fill={'teal'}
                        />
                    )
                })}
            </>
        )
    }

    


    return (
        <svg
            height={height}
            width={width}
        >
            <circle 
                r={r}
                cx={width * .5}
                cy={height * .5}
                fill={'aqua'}
            />
            <SalmonPoints />
            <PurplePoints />
            <TealPoints />
        </svg>
    )
}

export default PointsOnARadius