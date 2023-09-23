import WebLines from "./WebLines"
import WebRings from "./WebRings"

export type WebProps = {
    circleCoords: any[],
    height: number,
    width: number
}

const Web: React.FC<WebProps> = (props) => {
    const {circleCoords, height, width} = props

    return (
        <g>
            <WebRings circleCoords={circleCoords}/>
            <WebLines circleCoords={circleCoords} height={height} width={width} />
        </g>
    )
}

export default Web