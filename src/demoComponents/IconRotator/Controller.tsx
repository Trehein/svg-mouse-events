import React, { useState } from 'react'
import IconRotator from './IconRotator'
import {FaArrowRight, FaArrowAltCircleRight } from 'react-icons/fa'
import {BsArrowRightCircle} from 'react-icons/bs'
import * as d3 from "d3";


const rotationScale = d3.scaleLinear()
    .domain([25, -25])
    .range([-90, 90])

const colorScale = d3.scaleLinear([-25, 0, 25], ["blue", "lightgrey", "orange"]);

const Controller: React.FC = () => {
    const [state, setState] = useState({
        percentageChange: 0,
    })

    const handleOnClick = (isPlus: boolean) => {
        setState({
            percentageChange: isPlus ? state.percentageChange + 5 : state.percentageChange - 5
        })
    }

    return (
        <div>
            <button disabled={state.percentageChange >= 25} onClick={() => handleOnClick(true)}>+5% Button</button>
            <button disabled={state.percentageChange <= -25} onClick={() => handleOnClick(false)}>-5% Button</button>

            <IconRotator 
                rotationDegrees={rotationScale(state.percentageChange)}
                iconColor={colorScale(state.percentageChange)}
            >
                <FaArrowRight />
            </IconRotator>
            <IconRotator                
                rotationDegrees={rotationScale(state.percentageChange)}
                iconColor={colorScale(state.percentageChange)}
            >
                <FaArrowAltCircleRight />
            </IconRotator>
            <IconRotator                
                rotationDegrees={rotationScale(state.percentageChange)}
                iconColor={colorScale(state.percentageChange)}
            >
                <BsArrowRightCircle />
            </IconRotator>
        </div>
    )
}

export default Controller