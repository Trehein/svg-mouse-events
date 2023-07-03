import React, {useState, useMemo} from 'react'
import * as d3 from "d3";

const MouseCollisionController: React.FC = () => {
    const [charge, setCharge] = useState(-3);

    // create nodes with unique ids
    // radius: 5px
    const nodes = useMemo(
      () =>
        d3.range(50).map((n) => {
          return { id: n, r: 5 };
        }),
      []
    );

    return (
        <svg width="800" height="600">
            {/* <ForceGraph nodes={nodes} charge={charge} /> */}
        </svg>
    )
}

export default MouseCollisionController 