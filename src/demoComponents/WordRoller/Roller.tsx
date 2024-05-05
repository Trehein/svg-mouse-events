import { a, useTrail } from '@react-spring/web'
import React, { ReactNode } from 'react'

const Roller: React.FC<{ rolled: boolean, children: ReactNode }> = ({ rolled, children }) => {
  const items = React.Children.toArray(children)
  const trail = useTrail(items.length, {
    config: { mass: 5, tension: 2000, friction: 200 },
    opacity: rolled ? 1 : 0,
    x: rolled ? 0 : 20,
    height: rolled ? 110 : 0,
    from: { opacity: 0, x: 20, height: 0 },
  })
  return (
    <div>
      {trail.map(({ height, ...style }, index) => (
        <a.div key={index}  style={style}>
          <a.div style={{ height }}>{items[index]}</a.div>
        </a.div>
      ))}
    </div>
  )
}

export default Roller