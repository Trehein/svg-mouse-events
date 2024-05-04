import React from 'react'

export const BallMoveAlongPathController: React.FC = () => {
  const size: number = 500

  return (
    <svg 
      height={size}
      width={size}
    >
      <rect 
        height={size}
        width={size}
        fill={'black'}
      />
    </svg>
  )
}