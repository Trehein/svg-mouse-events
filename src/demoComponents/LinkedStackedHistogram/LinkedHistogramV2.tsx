import { LinkedHistogramProps } from "./LinkedHistogram"
import { scaleLinear } from '@visx/scale';
import { AxisBottom } from '@visx/axis'
import { Group } from '@visx/group';


export const axisBottomTickLabelProps = {
    textAnchor: 'middle' as const,
    fontFamily: 'Arial',
    fontSize: 10,
    fill: 'black'
}
export const calcBarTotals: (data: any, barKeyField: string) => number[] = (data: any, barKeyField: string) => {
    const returnArr = data.map((element: any) => {
        const dataObjKeys = Object.keys(element).filter((key: string) => key !== barKeyField)
        const objToNumberArray: number[] = dataObjKeys.map((key: string) => {
            return element[key]
        })

        const sum = objToNumberArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        return sum
    })

    return returnArr
}

const LinkedHistogramV2: React.FC<LinkedHistogramProps> = (props) => {
    const {data, height, width, barKeyField} = props
    const barKeys: string[] = data.map((data: any) => data[barKeyField])

    const yAccessor = (d: any) => d[barKeyField]

    // margin
    const margin = {
        top: height * .075,
        bottom: height * .145,
        left: width * .175,
        right: width * .075,
    };

    // bounds
    const chartHeight = height - margin.top - margin.bottom
    const xMax = Math.max(width - margin.left - margin.right, 0);
    const yMax = chartHeight;

    const xScale = scaleLinear<number>({
        domain: [0, Math.max(...calcBarTotals(data, barKeyField))],
        nice: true,
    });   

    xScale.rangeRound([0, xMax]);

    return (
        <svg height={height} width={width}>
            <Group top={margin.top} left={margin.left}>
                <line x1={0} x2={0} y1={0 + margin.top} y2={chartHeight} stroke={'black'} />
                {data.map((d: any, i: number) => {
                    return (
                        <g>
                            <line 
                                x1={-5} 
                                x2={0} 
                                y1={(chartHeight / (data.length + 1)) * (i) + (chartHeight / (data.length + 1))} 
                                y2={(chartHeight / (data.length + 1)) * (i) + (chartHeight / (data.length + 1))}
                                stroke={'black'}
                            />
                            <text 
                                text-anchor="end"
                                x={-10} 
                                y={(chartHeight / (data.length + 1)) * (i) + (chartHeight / (data.length + 1)) + 5} 
                            >
                                {d[barKeyField]}    
                            </text>
                        </g>
                    )
                })}
                <AxisBottom 
                    top={yMax}
                    scale={xScale}
                    numTicks={10}
                    stroke={'black'}
                    tickStroke={'black'}
                    tickLabelProps={() => axisBottomTickLabelProps}
                />
            </Group>
        </svg>
    )
}

export default LinkedHistogramV2