import React, { useState } from 'react'

const TrackMouse: React.FC = () => {
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
                    fill="rebeccapurple"
                    width={width * .5}
                    height={height * .5}
                    x={width * .25}
                    y={0}
                    onMouseMove={(e) => {
                        console.log(e)
                        setMousePosition({x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY})
                    }}

                />
            </svg>
        </div>

    )
}

export default TrackMouse