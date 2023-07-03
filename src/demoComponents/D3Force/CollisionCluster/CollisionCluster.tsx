import * as d3 from "d3";
import { useEffect, useState } from "react";
import { forceSimulation } from "d3-force";

export type CollisionClusterProps = {
    nodes: Array<any>,
    charge: number,
    dimensions: {
        height: number,
        width: number
    }
}

const CollisionCluster: React.FC<CollisionClusterProps> = ({ nodes, charge, dimensions }) => {
    const {height, width} = dimensions
    const [animatedNodes, setAnimatedNodes]: any = useState([]);
    const runForceSimulation = () => {
        const simulation = forceSimulation(nodes)
            .force("x", d3.forceX(400))
            .force("y", d3.forceY(300))
            .force("center", d3.forceCenter(width * .5, height * .5))
            .force("charge", d3.forceManyBody().strength(charge));
    
      // update state on every frame
      simulation.on("tick", () => {
        setAnimatedNodes([...simulation.nodes()]);
      });
  
      // copy nodes into simulation
      simulation.nodes([...nodes]);
      // slow down with a small alpha
      simulation.alpha(0.1).restart();
  
      // stop simulation on unmount
      return () => simulation.stop();
    }
  
    // re-create animation every time nodes change
    useEffect(() => {
        runForceSimulation()
    }, [nodes, charge]);
  
    return (
        <svg height={height} width={width}>
            <g>
                {animatedNodes.map((node: any) => (
                <circle
                    cx={node.x}
                    cy={node.y}
                    r={node.r}
                    key={node.id}
                    stroke="black"
                    fill="transparent"
                />
                ))}
            </g>
        </svg>
    );
  }

  export default CollisionCluster