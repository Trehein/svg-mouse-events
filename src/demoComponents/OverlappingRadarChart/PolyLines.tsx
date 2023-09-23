import { generateLineCoordsWithXYCoords } from "../../data/generateLineCoordsWithXYCoords"
import { PolyLinesProps } from "../AnySidedPolygonLines"

const PolyLines: React.FC<PolyLinesProps> = (props) => {
    const {circleCoords, strokeColor} = props
    const lineCoords = generateLineCoordsWithXYCoords(circleCoords)

    return (
        <>
            {
                lineCoords.map((coord: any, index: number) => {
                    return (
                        <line 
                            key={index}
                            x1={coord.x1}
                            x2={coord.x2}
                            y1={coord.y1}
                            y2={coord.y2}
                            stroke={strokeColor ? strokeColor : 'black'}
                        />
                    )
                })
            }
        </>
    )
}

export default PolyLines