export type WebLinesProps = {
    circleCoords: any[],
    height: number,
    width: number
}

const WebLines: React.FC<WebLinesProps> = (props) => {
    const {circleCoords, height, width} = props

    return (
        <g>
            {
                circleCoords[0].map((d: any, lineIndex: number) => {
                    return (
                        <line 
                            key={lineIndex}
                            x1={circleCoords[0][lineIndex].cx}
                            y1={circleCoords[0][lineIndex].cy}
                            x2={circleCoords[circleCoords.length - 1][lineIndex].cx}
                            y2={circleCoords[circleCoords.length - 1][lineIndex].cy}
                            stroke={'black'}
                        />
                    )                 
                })
            }
        </g>
    )
}

export default WebLines