import React, { useState } from 'react'

const MoveLineFromOrigin: React.FC = () => {
    const height: number = 500
    const width: number = 500

    const [mousePosition, setMousePosition] = useState({x: 0, y: 0})

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
                <rect
                    fill="orange"
                    width={width * .5}
                    height={height * .5}
                    x={width * .25}
                    y={0}
                    onMouseMove={(e) => {
                        console.log(e)
                        setMousePosition({x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY})
                    }}

                />

                <circle 
                    cx={width * .5}
                    cy={height * .5 - height * .25}
                    r={10}
                    fill='white'
                />
                <line 
                    x1={width * .5}
                    y1={height * .5 - height * .25}
                    x2={mousePosition.x}
                    y2={mousePosition.y}
                    stroke={'white'}
                />
                <circle 
                    cx={mousePosition.x}
                    cy={mousePosition.y}
                    r={5}
                    fill={'white'}
                />

            </svg>
        </div>

    )
}

export default MoveLineFromOrigin