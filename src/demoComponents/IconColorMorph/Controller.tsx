import React from 'react'
import { FaHeart } from "react-icons/fa";
import IconColorMorph from './IconColorMorph';

const Controller: React.FC = () => {

  const onClick = () => console.log('clicked')

  return (
    <div>
      <IconColorMorph onClick={onClick}>
        <FaHeart />
      </IconColorMorph>
    </div>
  )
}

export default Controller