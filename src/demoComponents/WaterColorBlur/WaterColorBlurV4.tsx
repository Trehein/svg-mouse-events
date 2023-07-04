import React from 'react'
import WaterDrop, { WaterDropProps } from './WaterDrop';
import { purpleTriangle } from './dropData/purpleTriangle';
import { greenSquare } from './dropData/greenSquare';

const WaterColorBlurV4: React.FC = () => {
    const height: number = window.innerHeight * .98
    const width: number = window.innerHeight * .98

    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <svg height={height} width={width}>
            <rect fill='white' height={height} width={width} x={0} y={0}/>
            {greenSquare(height, width).map((waterDrop: WaterDropProps, i: number) => {
                const {initPolygonPoints, initPolygonRadius, originX, originY, colors, opacity, numberOfOverlays, maxRandomNumberForInitDeform, maxNumberOfRecurrsionsForInitDeform, maxRandomNumberForOverlayDeform, maxNumberOfRecurrsionsForOverlayDeform} = waterDrop
                return (
                    <WaterDrop 
                        key={i}
                        initPolygonPoints={initPolygonPoints}
                        initPolygonRadius={initPolygonRadius} 
                        originX={originX} 
                        originY={originY} 
                        colors={colors} 
                        opacity={opacity} 
                        numberOfOverlays={numberOfOverlays} 
                        maxRandomNumberForInitDeform={maxRandomNumberForInitDeform} 
                        maxNumberOfRecurrsionsForInitDeform={maxNumberOfRecurrsionsForInitDeform} 
                        maxRandomNumberForOverlayDeform={maxRandomNumberForOverlayDeform} 
                        maxNumberOfRecurrsionsForOverlayDeform={maxNumberOfRecurrsionsForOverlayDeform}                    
                    />
                )
            })}
            {purpleTriangle(height, width).map((waterDrop: WaterDropProps, i: number) => {
                const {initPolygonPoints, initPolygonRadius, originX, originY, colors, opacity, numberOfOverlays, maxRandomNumberForInitDeform, maxNumberOfRecurrsionsForInitDeform, maxRandomNumberForOverlayDeform, maxNumberOfRecurrsionsForOverlayDeform} = waterDrop
                return (
                    <WaterDrop 
                        key={i}
                        initPolygonPoints={initPolygonPoints}
                        initPolygonRadius={initPolygonRadius} 
                        originX={originX} 
                        originY={originY} 
                        colors={colors} 
                        opacity={opacity} 
                        numberOfOverlays={numberOfOverlays} 
                        maxRandomNumberForInitDeform={maxRandomNumberForInitDeform} 
                        maxNumberOfRecurrsionsForInitDeform={maxNumberOfRecurrsionsForInitDeform} 
                        maxRandomNumberForOverlayDeform={maxRandomNumberForOverlayDeform} 
                        maxNumberOfRecurrsionsForOverlayDeform={maxNumberOfRecurrsionsForOverlayDeform}                    
                    />
                )
            })}
            {/* <polygon points={pathFinderXY(firstDeform)} fill='salmon' opacity={'100%'}/> */}
            {/* <polygon points={pathFinderXY(generateRandomPoints(firstDeform, 15, 8))} fill='blue' opacity={opacity} />
            <polygon points={pathFinderXY(generateRandomPoints(firstDeform, 25, 8))} fill='rebeccapurple' opacity={opacity} />
            <polygon points={pathFinderXY(generateRandomPoints(firstDeform, 35, 8))} fill='blue' opacity={opacity} />
            <polygon points={pathFinderXY(generateRandomPoints(firstDeform, 45, 8))} fill='rebeccapurple' opacity={opacity} />
            <polygon points={pathFinderXY(generateRandomPoints(firstDeform, 55, 8))} fill='blue' opacity={opacity} />
            <polygon points={pathFinderXY(generateRandomPoints(firstDeform, 65, 8))} fill='rebeccapurple' opacity={opacity} />
            <polygon points={pathFinderXY(generateRandomPoints(firstDeform, 75, 8))} fill='blue' opacity={opacity} />
            <polygon points={pathFinderXY(generateRandomPoints(firstDeform, 85, 8))} fill='rebeccapurple' opacity={opacity} />
            <polygon points={pathFinderXY(generateRandomPoints(firstDeform, 95, 8))} fill='blue' opacity={opacity} />
            <polygon points={pathFinderXY(generateRandomPoints(firstDeform, 95, 8))} fill='rebeccapurple' opacity={opacity} />
            <polygon points={pathFinderXY(generateRandomPoints(firstDeform, 95, 8))} fill='blue' opacity={opacity} />
            <polygon points={pathFinderXY(generateRandomPoints(firstDeform, 95, 8))} fill='rebeccapurple' opacity={opacity} />
            <polygon points={pathFinderXY(generateRandomPoints(firstDeform, 95, 8))} fill='blue' opacity={opacity} />
            <polygon points={pathFinderXY(generateRandomPoints(firstDeform, 95, 8))} fill='rebeccapurple' opacity={opacity} />
            <polygon points={pathFinderXY(generateRandomPoints(firstDeform, 65, 8))} fill='rebeccapurple' opacity={opacity} />
            <polygon points={pathFinderXY(generateRandomPoints(firstDeform, 75, 8))} fill='blue' opacity={opacity} />
            <polygon points={pathFinderXY(generateRandomPoints(firstDeform, 65, 8))} fill='rebeccapurple' opacity={opacity} />
            <polygon points={pathFinderXY(generateRandomPoints(firstDeform, 75, 8))} fill='blue' opacity={opacity} />
            <polygon points={pathFinderXY(generateRandomPoints(firstDeform, 65, 8))} fill='rebeccapurple' opacity={opacity} />
            <polygon points={pathFinderXY(generateRandomPoints(firstDeform, 75, 8))} fill='blue' opacity={opacity} />
            <polygon points={pathFinderXY(generateRandomPoints(firstDeform, 15, 7))} fill='violet' opacity={.1} /> */}

        </svg>
        </div>

    )
}

export default WaterColorBlurV4