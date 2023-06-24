import React, { useState } from 'react'

// todo - another version using outer ring circle mouseOver to control a boolean
const getHypothenus = (a: number, b: number) => {
    return Math.sqrt((a * a) + (b * b))
}

const isOutOfRange = (radius: number, cusrorX: number, cursorY: number, originX: number, originY: number) => {
    const xDistance: number = cusrorX < originX ? originX - cusrorX : cusrorX - originX
    const yDistance: number = cursorY < originY ? originY - cursorY : cursorY - originY
    
    const isHypGreaterThanRad: boolean = getHypothenus(xDistance, yDistance) > radius

    return isHypGreaterThanRad
}

const ShowBeyondRange: React.FC = () => {
    const height: number = 500
    const width: number = 500
    const originHeight: number = height * .5
    const originWidth: number = width * .5
    const white: string = 'white'
    const black: string = 'black'
    const radius: number = 100

    const [mousePosition, setMousePosition] = useState({x: 0, y: 0})
    const [isOut, setIsOut] = useState<boolean>(true)

    return (
        <div>
            <div>
                xVal: {mousePosition.x}
            </div>
            <div>
                yVal: {mousePosition.y}
            </div>
            <svg
                height={height}
                width={width}
            >
                <g
                    onMouseMove={(e) => {
                        console.log(e)
                        setMousePosition({x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY})
                        setIsOut(
                            isOutOfRange(
                                radius, 
                                e.nativeEvent.offsetX, 
                                e.nativeEvent.offsetY, 
                                originWidth, 
                                originHeight
                            )
                        )
                    }}
                >
                    {/* background */}
                    <rect 
                        x={0}
                        y={0}
                        height={height}
                        width={width}
                        fill={isOut ? black : white}
                    />
                    {/* ring */}
                    <circle
                        cx={originWidth}
                        cy={originHeight}
                        r={radius}
                        fill='transparent'
                        stroke={isOut ? white : black}
                    />
                    {/* origin */}
                    <circle 
                        cx={originWidth}
                        cy={originHeight}
                        r={10}
                        fill={isOut ? white : black}
                    />
                    {/* line */}
                    <line 
                        x1={originWidth}
                        y1={originHeight}
                        x2={mousePosition.x}
                        y2={mousePosition.y}
                        stroke={isOut ? white : black}
                    />
                    {/* cursor */}
                    <circle 
                        cx={mousePosition.x}
                        cy={mousePosition.y}
                        r={5}
                        fill={isOut ? white : black}
                    />
                </g>
            </svg>
        </div>

    )
}

export default ShowBeyondRange