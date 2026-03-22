import React from 'react'
import { SteamDataObj } from './SteamGameExplorerController'
import ForceGraph from 'react-force-graph-2d'

interface GameForceWebControllerProps {
  data: SteamDataObj[] | any
}

const GameForceWebController: React.FC<GameForceWebControllerProps> = ({data}) => {

  const gameNodes = data.map((data: any, index: number) => {
    return {...data, title: data.Game, id: `${index}-${data.Game}`}
  })

  // todo make dynamic instead of just Publisher
const anchorNodes = gameNodes.reduce((accumulator: any, currentItem: any) => {
  // todo make dynamic
  if (currentItem.Publisher.length > 0) {
    const parsedPublishers = currentItem.Publisher.split('|')
    parsedPublishers.forEach((publisher: string) => {
    if (!accumulator.seen.has(publisher.trim())) {
      accumulator.unique.push(publisher.trim());
      accumulator.seen.add(publisher.trim());
    }
    })
  }

  return accumulator;
}, { seen: new Set(), unique: [] }).unique;


  const mappedAnchorNodes = anchorNodes.map((node: any, index: number) => {
    // todo make key dynamic
    return {
      id: `${index}-${node}`,
      title: node,
      nodeType: 'anchor' // todo make an enum
    }
  })


  const createdLinks: any[] = []

  gameNodes.forEach((node: any) => {
    mappedAnchorNodes.forEach((anchorNode: any)=> {
      if(node.Publisher.length > 0) {
        if(node.Publisher.includes(anchorNode.title)) {
          createdLinks.push({source: anchorNode.id, target: node.id})
        }
      }
    })
  })

  console.log('mappedLinks', createdLinks)

  console.log(anchorNodes)

  // Return the SVG element.
  return (
    <ForceGraph 
        graphData={{nodes: [...gameNodes, ...mappedAnchorNodes], links: createdLinks}}
        nodeLabel="title"
        nodeVal={(d) => {
          return d.nodeType === 'anchor' ? 15 : 7
        }}
        nodeColor={(d) => {
          return d.nodeType === 'anchor' ? 'rebeccaPurple' : 'salmon'
        }}
    />
  )
}

export default GameForceWebController