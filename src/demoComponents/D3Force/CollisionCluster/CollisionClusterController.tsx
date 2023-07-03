import React, {useState, useMemo} from 'react'
import * as d3 from "d3";
import CollisionCluster from './CollisionCluster';

const CollisionClusterController: React.FC = () => {
    // const [charge, setCharge] = useState(-3);
    const charge = -20
    const dimensions = {
        height: 500,
        width: 500
    }

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
        <CollisionCluster nodes={nodes} charge={charge} dimensions={dimensions} />
    )
}

export default CollisionClusterController 