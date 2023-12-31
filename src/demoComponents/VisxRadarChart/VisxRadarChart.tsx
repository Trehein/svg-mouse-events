import React from 'react';
import { Group } from '@visx/group';
import { scaleLinear } from '@visx/scale';
import { Point } from '@visx/point';
import { Line, LineRadial } from '@visx/shape';
import { radarData } from './radarData';
import * as d3 from 'd3';

export type RadarDataType = {
    labelText: string,
    hoursActual: number,
    hoursScheduled: number,
    dollarsActual: number,
    dollarsScheduled: number
}

const orange = '#ff9933';
export const pumpkin = '#f5810c';
const silver = '#d9d9d9';
export const background = '#FAF7E9';

const degrees = 360;
const data: RadarDataType[] = radarData()

const hoursActual = (d: RadarDataType) => d.hoursActual

const genAngles = (length: number) =>
  [...new Array(length + 1)].map((_, i) => ({
    angle: i * (degrees / length) + (length % 2 === 0 ? 0 : degrees / length / 2),
  }));

const genPoints = (length: number, radius: number) => {
    const step = (Math.PI * 2) / length;
    return [...new Array(length)].map((_, i) => ({
        x: radius * Math.sin(i * step),
        y: radius * Math.cos(i * step),
    }));
};

function genPolygonPoints<Datum>(
    dataArray: any[],
    scale: (n: number) => number,
    getValue: (d: Datum) => number,
  ) {
    const step = (Math.PI * 2) / dataArray.length;
    const points: { x: number; y: number, dollarsActual: number, dollarsScheduled: number, hoursActual: number, hoursScheduled: number }[] = new Array(dataArray.length).fill({ x: 0, y: 0 });
    
    const pointString: string = new Array(dataArray.length + 1).fill('').reduce((res, _, i) => {      
      if (i > dataArray.length) return res;
      const xVal = scale(getValue(dataArray[i - 1])) * Math.sin(i * step);
      const yVal = scale(getValue(dataArray[i - 1])) * Math.cos(i * step);
      points[i - 1] = { 
        x: xVal, 
        y: yVal, 
        dollarsActual: dataArray[i - 1].dollarsActual, 
        dollarsScheduled: dataArray[i - 1].dollarsActual,
        hoursActual: dataArray[i - 1].hoursActual,
        hoursScheduled: dataArray[i - 1].hoursScheduled
      };
      res += `${xVal},${yVal} `;
      return res;
    });

    return { points, pointString };
  }

const defaultMargin = { top: 40, left: 80, right: 80, bottom: 80 };

export type RadarProps = {
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
  levels?: number;
};

const VisxRadarChart: React.FC<RadarProps> = ({ width, height, levels = 5, margin = defaultMargin }: RadarProps) => {
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;
  const radius = Math.min(xMax, yMax) / 2;

  // todo - pass in dynamic field keys
  const maxValue = d3.max(data, (d: any) => d.hoursActual)
  console.log('maxValue', maxValue)
  
  const radialScale = scaleLinear<number>({
    range: [0, Math.PI * 2],
    domain: [degrees, 0],
  });

  const yScale = scaleLinear<number>({
    range: [0, radius],
    domain: [0, Math.max(...data.map(hoursActual))],
  });

  const webs = genAngles(data.length);
  const points = genPoints(data.length, radius);
  const polygonPoints = genPolygonPoints(data, (d) => yScale(d) ?? 0, hoursActual);
  const zeroPoint = new Point({ x: 0, y: 0 });

  return width < 10 ? null : (
    <svg width={width} height={height}>
      <rect fill={background} width={width} height={height} rx={14} />
      <Group top={height / 2 - margin.top} left={width / 2}>
        {[...new Array(levels)].map((_, i) => (
          <LineRadial
            key={`web-${i}`}
            data={webs}
            angle={(d) => radialScale(d.angle) ?? 0}
            radius={((i + 1) * radius) / levels}
            fill="none"
            stroke={silver}
            strokeWidth={2}
            strokeOpacity={0.8}
            strokeLinecap="round"
          />
        ))}
        {[...new Array(data.length)].map((_, i) => (
          <Line key={`radar-line-${i}`} from={zeroPoint} to={points[i]} stroke={silver} />
        ))}
        <polygon
          points={polygonPoints.pointString}
          fill={orange}
          fillOpacity={0.3}
          stroke={orange}
          strokeWidth={1}
        />
        {polygonPoints.points.map((point, i) => (
          <circle 
            key={`radar-point-${i}`} 
            cx={point.x} 
            cy={point.y} 
            r={4} 
            fill={pumpkin} 
            onClick={() => console.log(point)}
          />
        ))}
      </Group>
    </svg>
  );
}

export default VisxRadarChart