import React from 'react'
import { SteamDataObj } from './SteamGameExplorerController'
import ForceGraph from 'react-force-graph-2d'

interface GameForceWebControllerProps {
  data: SteamDataObj[] | any
}

const GameForceWebController: React.FC<GameForceWebControllerProps> = ({data}) => {

  const nodes = data.map((data: any, index: number) => {
    return {...data, title: data.Game, id: `${index}-${data.Game}`}
  })

  // todo make dynamic instead of just Publisher
const anchorNodes = nodes.reduce((accumulator: any, currentItem: any) => {
  if (!accumulator.seen.has(currentItem.Publisher)) {
    accumulator.unique.push(currentItem);
    accumulator.seen.add(currentItem.Publisher);
  }
  return accumulator;
}, { seen: new Set(), unique: [] }).unique;

  const mappedAnchorNodes = anchorNodes.map((node: any, index: number) => {
    // todo make key dynamic
    return {
      id: `${index}-${node.Publisher}`,
      title: node.Publisher,
      nodeType: 'anchor' // todo make an enum
    }
  })


  const createdLinks: any[] = []

  nodes.forEach((node: any) => {
    mappedAnchorNodes.forEach((publisherNode: any)=> {
      if(node.Publisher === publisherNode.title) {
        createdLinks.push({source: publisherNode.id, target: node.id})
      }
    })
  })

  console.log('mappedLinks', createdLinks)

  console.log(anchorNodes)

  // Return the SVG element.
  return (
    <ForceGraph 
        graphData={{nodes: [...nodes, ...mappedAnchorNodes], links: createdLinks}}
        nodeLabel="title"
    />
  )
}

export default GameForceWebController