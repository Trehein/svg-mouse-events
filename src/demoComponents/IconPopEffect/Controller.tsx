import React, { useState } from 'react'
import { FaHeart } from "react-icons/fa";
import IconPopEffect from './IconPopEffect';

const Controller: React.FC = () => {
  const [isActive, setIsActive] = useState(false)
  const onClick = () => setIsActive(!isActive)

  return (
    <div>
      <IconPopEffect onClick={onClick} isActive={isActive}>
        <FaHeart />
      </IconPopEffect>
    </div>
  )
}

export default Controller