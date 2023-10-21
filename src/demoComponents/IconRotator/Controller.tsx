import React, { useState } from 'react'
import IconRotator from './IconRotator'

const Controller: React.FC = () => {
    const [state, setState] = useState({})



    return (
        <div>
            <div>Number Here</div>
            <IconRotator><div style={{height: 50, width: 50, backgroundColor: 'orange'}}></div></IconRotator>
        </div>
    )
}

export default Controller