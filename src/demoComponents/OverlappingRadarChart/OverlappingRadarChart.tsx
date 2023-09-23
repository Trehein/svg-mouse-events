import React from 'react'
import { generateCircleCoords, generatePointWithAngleAndRadius } from '../../data/generateCircleCoords'
import Web from './Web/Web'
import * as d3 from 'd3'
import DataPoints from './DataPoints'

export type OverlappingRadarChartProps = {
    height: number,
    width: number,
    data: any[]
}

const OverlappingRadarChart: React.FC<OverlappingRadarChartProps> = (props: OverlappingRadarChartProps) => {
    const {height, width, data} = props
    const emptyArray: undefined[] = new Array(5).fill(undefined)

    console.log(data)

    const getMinMaxValuesOfNestedArray = (data: any[], objKey: string) => {
        const emptyArray: undefined[] = new Array(data.length).fill(undefined)

        const minInNestedArr: any[] = emptyArray.map((empty: any, index) => {
            return d3.min(data[index].values, (d: any) => d[objKey])
        })

        const maxInNestedArr: any[] = emptyArray.map((empty: any, index) => {
            return d3.max(data[index].values, (d: any) => d[objKey])
        })

        const dataMin = d3.min(minInNestedArr)
        const dataMax = d3.max(maxInNestedArr)

        return {dataMin: dataMin, dataMax: dataMax}
    }

    const {dataMin, dataMax} = getMinMaxValuesOfNestedArray(data, 'dollars')
    // todo - make dynamic based on max like 10, 100, 1000...
    const roundedMax = Math.round(dataMax/10000)*10000

    const scaleLinear = d3.scaleLinear()
        .domain([0, roundedMax])
        .range([1, width * .25]) // radius of the chart

    const gridCircleCoords = emptyArray.map((d, ringIndex) => {
        const numberOfRings = 5
        const spaceBetweenRings = roundedMax / numberOfRings
        return generateCircleCoords(data[0].values.length, scaleLinear(ringIndex * spaceBetweenRings) + scaleLinear(spaceBetweenRings), {originX: width * .5, originY: height * .5})

    })

    const generatedPoint = generatePointWithAngleAndRadius(data[0].values.length, 0, scaleLinear(25000), {originX: width * .5, originY: height * .5})

    return (
        <svg height={height} width={width}>
            <rect height={height} width={width} fill={'white'} />
            <Web circleCoords={gridCircleCoords} height={height} width={width}/>
            <DataPoints data={data} scale={scaleLinear} height={height} width={width}/>
            <circle cx={generatedPoint.cx} cy={generatedPoint.cy} r={6} fill={'rebeccapurple'}/>
        </svg>
    )
}

export default OverlappingRadarChart