import React from 'react'
import { colorPaletteStore } from './colorPaletteStore'

const ArrowPointDefs: React.FC = () => {
  const colors: any = colorPaletteStore((state: any) => state.colors)

  return (
    <defs>
      <marker
        id="mainArrow"
        viewBox="0 0 10 10"
        refX="5"
        refY="5"
        markerUnits="strokeWidth"
        markerWidth="5"
        markerHeight="5"
        orient="auto">
        <path 
          d="M 0 0 L 10 5 L 0 10 z" 
          fill={colors.mainArrowColor} 
        />
      </marker>
      <marker
        id="createArrow"
        viewBox="0 0 10 10"
        refX="5"
        refY="5"
        markerUnits="strokeWidth"
        markerWidth="5"
        markerHeight="5"
        orient="auto">
        <path 
          d="M 0 0 L 10 5 L 0 10 z" 
          fill={colors.createArrowColor} 
        />
      </marker>
      <marker
        id="selectedArrow"
        viewBox="0 0 10 10"
        refX="5"
        refY="5"
        markerUnits="strokeWidth"
        markerWidth="5"
        markerHeight="5"
        orient="auto">
        <path 
          d="M 0 0 L 10 5 L 0 10 z" 
          fill={colors.selectedArrowColor} 
        />
      </marker>
      <marker
        id="hoverArrow"
        viewBox="0 0 10 10"
        refX="5"
        refY="5"
        markerUnits="strokeWidth"
        markerWidth="5"
        markerHeight="5"
        orient="auto">
        <path 
          d="M 0 0 L 10 5 L 0 10 z" 
          fill={colors.hoverArrowColor} 
        />
      </marker>
    </defs>
  )
}

export default ArrowPointDefs