import React from 'react'
import { ParentSize } from '@visx/responsive'
import HeatmapChart from './HeatmapChart'

export type HeatmapProps = {
  titleText: string,
  data: any[],
  valueAccessKey: string
}

const Heatmap: React.FC<HeatmapProps> = (props) => {
  const {titleText, data, valueAccessKey} = props
  return (
    <div style={{height: '100%', width: '100%'}}>
      <ParentSize className='graph-container' debounceTime={10}>
        {({width: visWidth, height: visHeight}) => {
          return (
            <HeatmapChart data={data} height={visHeight * .99} width={visWidth} valueAccessKey={valueAccessKey} titleText={titleText} />
          )
        }}
      </ParentSize>
    </div>
  )
}

export default Heatmap