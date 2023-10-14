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
    const chartHeight: number = height - margin.top - margin.bottom
    const barHeight: number = chartHeight / (data.length) * .15 // todo - determine .15 should be hard set or dynamic
    const xMax = Math.max(width - margin.left - margin.right, 0);
    const yMax = chartHeight;
    const bandPadding: number = 2.5
    const bandPaddingY: number = 5

    const xScale = scaleLinear<number>({
        domain: [0, Math.max(...calcBarTotals(data, barKeyField))],
        nice: true,
    });   

    xScale.rangeRound([0, xMax]);

    return (
        <svg height={height} width={width}>
            <Group top={margin.top} left={margin.left}>
                {/* axis */}
                <g>
                    <line x1={0} x2={0} y1={0 + margin.top} y2={chartHeight} stroke={'black'} />
                    {data.map((d: any, i: number) => {
                        return (
                            <g key={i}>
                                <line 
                                    x1={-5} 
                                    x2={0} 
                                    y1={(chartHeight / (data.length + 1)) * (i) + (chartHeight / (data.length + 1))} 
                                    y2={(chartHeight / (data.length + 1)) * (i) + (chartHeight / (data.length + 1))}
                                    stroke={'black'}
                                />
                                <text 
                                    textAnchor="end"
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
                </g>
                <g>
                    {data.map((d: any, i: number) => {
                        return (
                            <g key={i}>
                                <rect 
                                    x={0} 
                                    y={(chartHeight / (data.length + 1)) * (i) + (chartHeight / (data.length + 1)) - (barHeight * .5)} 
                                    height={barHeight}
                                    width={xScale(d.bopus)}
                                    fill={'orange'}
                                />
                                <rect 
                                    x={xScale(d.bopus)} 
                                    y={(chartHeight / (data.length + 1)) * (i) + (chartHeight / (data.length + 1)) - (barHeight * .5)} 
                                    height={barHeight}
                                    width={xScale(d.fitting)}
                                    fill={'blue'}
                                />
                                <rect 
                                    x={xScale(d.bopus + d.fitting)} 
                                    y={(chartHeight / (data.length + 1)) * (i) + (chartHeight / (data.length + 1)) - (barHeight * .5)} 
                                    height={barHeight}
                                    width={xScale(d.register)}
                                    fill={'red'}
                                />
                                <rect 
                                    x={xScale(d.bopus + d.fitting + d.register)} 
                                    y={(chartHeight / (data.length + 1)) * (i) + (chartHeight / (data.length + 1)) - (barHeight * .5)} 
                                    height={barHeight}
                                    width={xScale(d.restock)}
                                    fill={'purple'}
                                />
                            </g>
                        )
                    })}
                </g>
                <g>
                    {data.filter((dataElement: any, index: number) => index !== data.length - 1).map((d: any, i: number) => {
                        console.log(d)
                        return (
                            <g key={i}>
                                <polygon
                                    points={`
                                     ${bandPadding * 2},${(chartHeight / (data.length + 1)) * (i) + (chartHeight / (data.length + 1)) + (barHeight * .5) + bandPaddingY}
                                     ${bandPadding * 2},${(chartHeight / (data.length + 1)) * (i + 1) + (chartHeight / (data.length + 1)) - (barHeight * .5) - bandPaddingY} 
                                     ${xScale(data[i + 1].bopus) - bandPadding},${(chartHeight / (data.length + 1)) * (i + 1) + (chartHeight / (data.length + 1)) - (barHeight * .5) - bandPaddingY}
                                     ${xScale(d.bopus) - bandPadding},${(chartHeight / (data.length + 1)) * (i) + (chartHeight / (data.length + 1)) + (barHeight * .5) + bandPaddingY}
                                     `} 
                                     opacity={.5}
                                     fill={'orange'}
                                     stroke={'black'}
                                     strokeWidth={2}
                                />
                                <polygon
                                    points={`
                                     ${xScale(data[i + 1].bopus + data[i + 1].fitting) - bandPadding},${(chartHeight / (data.length + 1)) * (i + 1) + (chartHeight / (data.length + 1)) - (barHeight * .5) - bandPaddingY} 
                                     ${xScale(data[i + 1].bopus) + bandPadding},${(chartHeight / (data.length + 1)) * (i + 1) + (chartHeight / (data.length + 1)) - (barHeight * .5) - bandPaddingY}
                                     ${xScale(d.bopus) + bandPadding},${(chartHeight / (data.length + 1)) * (i) + (chartHeight / (data.length + 1)) + (barHeight * .5) + bandPaddingY}
                                     ${xScale(d.bopus + d.fitting) - bandPadding},${(chartHeight / (data.length + 1)) * (i) + (chartHeight / (data.length + 1)) + (barHeight * .5) + bandPaddingY}
                                     `} 
                                     opacity={.5}
                                     fill={'blue'}
                                />
                                <polygon
                                    points={`
                                     ${xScale(data[i + 1].bopus + data[i + 1].fitting + data[i + 1].register) - bandPadding},${(chartHeight / (data.length + 1)) * (i + 1) + (chartHeight / (data.length + 1)) - (barHeight * .5) - bandPaddingY} 
                                     ${xScale(data[i + 1].bopus + data[i + 1].fitting) + bandPadding},${(chartHeight / (data.length + 1)) * (i + 1) + (chartHeight / (data.length + 1)) - (barHeight * .5) - bandPaddingY}
                                     ${xScale(d.bopus + d.fitting) + bandPadding},${(chartHeight / (data.length + 1)) * (i) + (chartHeight / (data.length + 1)) + (barHeight * .5) + bandPaddingY}
                                     ${xScale(d.bopus + d.fitting + d.register) - bandPadding},${(chartHeight / (data.length + 1)) * (i) + (chartHeight / (data.length + 1)) + (barHeight * .5) + bandPaddingY}
                                     `} 
                                     opacity={.5}
                                     fill={'red'}
                                />
                            </g>
                        )
                    })}
                </g>

            </Group>
        </svg>
    )
}

export default LinkedHistogramV2