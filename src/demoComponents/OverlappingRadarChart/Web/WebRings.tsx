import PolyLines from "../PolyLines"

export type WebRingsProps = {
    circleCoords: any[]
}

const WebRings: React.FC<WebRingsProps> = (props) => {
    const {circleCoords} = props
    return (
        <g>
            {
                circleCoords.map((d, ringIndex: number) => {
                    return (
                        <g key={ringIndex}>
                            <PolyLines 
                                circleCoords={d} 
                            />
                        </g>
                    )                 
                })
            }
        </g>
    )
}

export default WebRings