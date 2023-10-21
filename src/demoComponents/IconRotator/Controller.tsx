import React, { useState } from 'react'
import IconRotator from './IconRotator'
import {FaArrowRight, FaArrowAltCircleRight } from 'react-icons/fa'


const Controller: React.FC = () => {
    const [state, setState] = useState({})

    return (
        <div>
            <div>Number Here</div>
            <IconRotator><FaArrowRight /></IconRotator>
        </div>
    )
}

export default Controller