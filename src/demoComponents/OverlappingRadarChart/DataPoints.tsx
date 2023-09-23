import { generatePointWithAngleAndRadius } from "../../data/generateCircleCoords"

export type DataPointsProps = {
    data: any,
    scale: any,
    height: number,
    width: number
}

const DataPoints: React.FC<DataPointsProps> = (props) => {
    const {data, scale, height, width} = props
    const generatedPoint = generatePointWithAngleAndRadius(data[0].values.length, 0, scale(25000), {originX: width * .5, originY: height * .5})


    return (
        <g>

        </g>
    )
}

export default DataPoints