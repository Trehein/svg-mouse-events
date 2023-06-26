import React, { useEffect, useRef, useState } from 'react'
import { linePointGenerator } from '../../data/linePointGenerator';
import calculatePathSmooth from './utils/smoothPath';
import AnimatedPath from './AnimatedPath';


const AnimatedPathController: React.FC = () => {
    const height: number = 500
    const width: number = 500
    const TIMING = 2000;
    const [playAnimation, setPlayAnimation] = useState<boolean>(false);
    const lineColor: string = 'rebeccapurple'

    const linePoints = linePointGenerator({
        numberOfPoints: 3,
        yMin: height * .2,
        yMax: height * .8,
        xMin: width * .2,
        xMax: width * .8
    })

    const dummyPathEl = useRef<SVGPathElement>(null);
    const metricRef = useRef(null);

    const [pathLength, setPathLength] = useState<number>(0);
    const svgPath = calculatePathSmooth(linePoints);
    console.log(calculatePathSmooth(linePoints))

    useEffect(() => {
        // get the length of the svg path
        if (dummyPathEl?.current) {
          setPathLength(dummyPathEl.current.getTotalLength());
        }
      }, []);

    console.log(linePoints)

    return (
        <div ref={metricRef}>
            <svg
                width={width}
                height={height}
            >
                <path ref={dummyPathEl} d={svgPath} fill="none" stroke="none" />
                {pathLength && (
                    <AnimatedPath
                        path={svgPath}
                        length={pathLength}
                        timing={TIMING}
                        lineColor={lineColor}
                        playAnimation={playAnimation}
                        setPlayAnimation={setPlayAnimation}
                    />
                )}
            </svg>
        </div>
    )
}

export default AnimatedPathController