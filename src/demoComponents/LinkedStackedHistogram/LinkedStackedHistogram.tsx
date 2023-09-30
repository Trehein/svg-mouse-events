import { scaleBand, scaleLinear, scaleOrdinal } from '@visx/scale';
import { Grid } from '@visx/grid';
import { Group } from '@visx/group';
import { BarStack } from '@visx/shape';
import * as d3 from 'd3'
import { AxisBottom, AxisLeft } from '@visx/axis'

const axisLeftTickLabelProps = {
  dx: '-0.35em',
  dy: '0.25em',
  fontFamily: 'Arial',
  fontSize: 10,
  textAnchor: 'end' as const,
  fill: 'black',
};

const axisBottomTickLabelProps = {
  textAnchor: 'middle' as const,
  fontFamily: 'Arial',
  fontSize: 10,
  fill: 'black'
}

const LinkedStackedHistogram = (props: {data: any, height: number, width: number}) => {
  const {data, height, width} = props
  const colorComplete = 'steelblue'
  const colorIncomplete = 'rebeccaPurple'
  const colorOverdue = 'salmon'

  const margin = {
    top: height * .075,
    bottom: height * .145,
    left: width * .175,
    right: width * .075,
  };
    // bounds
  const xMax = Math.max(width - margin.left - margin.right, 0);
  const yMax = height - margin.top - margin.bottom;

  const keys = Object.keys(data[0]).filter((d) => d !== 'taskType') 

  const totalNumberOfTasksForType = data.reduce((allTotals: any, currentTaskType: any) => {
    const totalNumberOfTasks = keys.reduce((typeTotal, k) => {
      typeTotal += Number(currentTaskType[k]);
      return typeTotal;
    }, 0);
    allTotals.push(totalNumberOfTasks);
    return allTotals;
  }, [] as number[]);
  
  // accessors
  const yAccessor = (d: any) => d.taskType

  const xScale = scaleLinear<number>({
    domain: [0, Math.max(...totalNumberOfTasksForType)],
    nice: true,
  });
  const yScale = scaleBand<string>({
    domain: data.map(yAccessor),
    padding: 0.2,
  });
  const colorScale = scaleOrdinal<string>({
    domain: keys,
    range: [colorComplete, colorIncomplete, colorOverdue],
  });

  xScale.rangeRound([0, xMax]);
  yScale.rangeRound([yMax, 0])

  const legendSquareSize = 15
  const legendArray = [
    {name: "Complete", color: "steelblue"},
    {name: "Incomplete", color: "rebeccapurple"},
    {name: "Overdue", color: "salmon"},
  ]
  
  return (
    <svg height={height} width={width}>
    <rect x={0} y={0} width={width} height={height} fill={'white'} />
      <Group>
        <text
          x={width * 1/2}
          y={height * .035}
          textAnchor={'middle'}
          fill={'black'}
          fontSize={'1em'}
        >
          Overall Completion Status 
        </text>
      </Group>
      
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
        {data.map((d: any, index: number) => {
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
        })}
        <AxisBottom 
          top={yMax}
          scale={xScale}
          numTicks={width < 500 ? 5 : 10}
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
      <Group>
        {legendArray.map((legendItem: any, index:number) => {
          return (<rect
              key={index}
              x={width * 1/3 * index + (width * .05)}
              y={height - (height * .075)}
              height={legendSquareSize}
              width={legendSquareSize}
              fill={legendItem.color}
            />)
        })}
        {legendArray.map((legendItem: any, index:number) => {
          return (<text
              key={index}
              x={width * 1/3 * index + (width * .115)}
              y={height - (height * .075) + 12.5}
              textAnchor={'start'}
              fill={legendItem.color}
              fontSize={'.85em'}
            >{legendItem.name}</text>)
        })}
      </Group>
    </svg>
  )
}

export default LinkedStackedHistogram