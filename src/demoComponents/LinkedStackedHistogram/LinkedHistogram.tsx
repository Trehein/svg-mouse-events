import { scaleBand, scaleLinear } from '@visx/scale';
import { Grid } from '@visx/grid';
import { Group } from '@visx/group';
import { AxisBottom, AxisLeft } from '@visx/axis'

export type LinkedHistogramProps ={
    data: any[],
    height: number,
    width: number,
    barKeyField: string
}

export const axisLeftTickLabelProps = {
    dx: '-0.35em',
    dy: '0.25em',
    fontFamily: 'Arial',
    fontSize: 10,
    textAnchor: 'end' as const,
    fill: 'black',
};
  
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

const LinkedHistogram: React.FC<LinkedHistogramProps> = (props) => {
    const {data, height, width, barKeyField} = props
    const barHeight = height * (data.length * .1)

    const barKeys: string[] = data.map((data: any) => data[barKeyField])

    // margin
    const margin = {
        top: height * .075,
        bottom: height * .145,
        left: width * .175,
        right: width * .075,
      };

    // bounds
    const xMax = Math.max(width - margin.left - margin.right, 0);
    const yMax = height - margin.top - margin.bottom;

    // data min max

    // accessor
    const yAccessor = (d: any) => d[barKeyField]
    const yAccessorBand = (d: any) => d[barKeyField]

    // scales
    const xScale = scaleLinear<number>({
        domain: [0, Math.max(...calcBarTotals(data, barKeyField))],
        nice: true,
    });   

    const yScale = scaleBand<string>({
        domain: data.map(yAccessor),
        padding: .75
    });

    xScale.rangeRound([0, xMax]);
    yScale.rangeRound([yMax, 0])

    // console.log('barKeys', barKeys)
    // console.log(calcBarTotals(data, barKeyField))

    return (
        <svg height={height} width={width}>
            <Grid
                top={margin.top}
                left={margin.left}
                xScale={xScale}
                yScale={yScale}
                width={xMax}
                height={yMax}
                stroke="black"
                strokeOpacity={0.1}
            />
            <Group top={margin.top} left={margin.left}>
                {/* {data.map((d: any, index: number) => {
                return (<rect 
                    key={index}
                    x={xScale(d.complete + d.incomplete)}
                    y={yScale(d.taskType)}
                    width={xScale(d.overdue)}
                    height={yScale.bandwidth()}
                    fill={'gold'}  
                    cursor={'pointer'}
                    onClick={() => alert(`${d.taskType} - Overdue - ${d.overdue}`)}

                />)
                })}
                {data.map((d: any, index: number) => {
                return (<rect 
                    key={index}
                    x={xScale(d.complete)}
                    y={yScale(d.taskType)}
                    width={xScale(d.incomplete)}
                    height={yScale.bandwidth()}
                    fill={'teal'}  
                    cursor={'pointer'}
                    onClick={() => alert(`${d.taskType} - Incomplete - ${d.incomplete}`)}

                />)
                })}
                {data.map((d: any, index: number) => {
                return (<rect 
                    key={index}
                    x={0}
                    y={yScale(d.taskType)}
                    width={xScale(d.complete)}
                    height={yScale.bandwidth()}
                    fill={'salmon'}  
                    cursor={'pointer'}
                    onClick={() => alert(`${d.taskType} - Complete - ${d.overdue}`)}
                />)
                })} */}
                {data.map((d: any, index: number) => {
                return (<rect 
                    key={index}
                    x={0}
                    y={yScale(d[barKeyField])}
                    width={xScale(d.bopus)}
                    height={yScale.bandwidth()}
                    fill={'salmon'}  
                    cursor={'pointer'}
                    onClick={() => alert(`${d.taskType} - Complete - ${d.overdue}`)}
                />)
                })}

                <AxisBottom 
                top={yMax}
                scale={xScale}
                numTicks={10}
                stroke={'black'}
                tickStroke={'black'}
                tickLabelProps={() => axisBottomTickLabelProps}
                />
                <AxisLeft
                scale={yScale}
                stroke={'black'}
                tickStroke={'black'}
                tickLabelProps={() => axisLeftTickLabelProps}
                />
            </Group>
        </svg>
    )

}

export default LinkedHistogram