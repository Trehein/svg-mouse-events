import React from 'react'
import { SteamDataObj } from './SteamGameExplorerController'
import ForceGraph from 'react-force-graph-2d'

interface GameForceWebControllerProps {
  data: SteamDataObj[] | any
}

const GameForceWebController: React.FC<GameForceWebControllerProps> = ({data}) => {

  const nodes = data

  // Return the SVG element.
  return (
    <ForceGraph 
        graphData={{nodes, links: []}}
        nodeLabel="Game"
    />
  )
}

export default GameForceWebController