import React from 'react'
import Heatmap from '../demoComponents/Heatmap/Heatmap'

const demoData = Array.from({ length: 35 }, (_, i) => ({
  date: `2024-08-${String(i + 1).padStart(2, '0')}`,
  count: Math.floor(Math.random() * 2000) - 1000,
  hours: Math.floor(Math.random() * 200) - 100,
}))

const DemoHeatmapController: React.FC = () => {
  return (
    <div style={{height: 600, width: 800}}>
      <Heatmap titleText={"August Heatmap"} data={demoData} valueAccessKey={'count'} />
    </div>
  )
}

export default DemoHeatmapController