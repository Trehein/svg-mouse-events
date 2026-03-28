import React, { useEffect, useRef, useState } from 'react'
import { SteamDataObj } from './SteamGameExplorerController'
import ForceGraph from 'react-force-graph-2d'

interface GameForceWebControllerProps {
  data: SteamDataObj[] | any
}

const generateAnchorNodes = (gameNodes: any, anchorField: string) => {
  return gameNodes.reduce((accumulator: any, currentItem: any) => {
    // todo make dynamic
    if (currentItem[anchorField].length > 0) {
      const parsedAnchorFieldValues = currentItem[anchorField].split('|')
      parsedAnchorFieldValues.forEach((valueInField: string) => {
      if (!accumulator.seen.has(valueInField.trim())) {
        accumulator.unique.push(valueInField.trim());
        accumulator.seen.add(valueInField.trim());
      }
      })
    }

    return accumulator;
  }, { seen: new Set(), unique: [] }).unique;
}

const generateLinkData = (gameNodes: any, mappedAnchorNodes: any, anchorField: string) => {
  const createdLinks: any[] = []

  gameNodes.forEach((node: any) => {
    mappedAnchorNodes.forEach((anchorNode: any)=> {
      if(node[anchorField].length > 0) {
        if(node[anchorField].includes(anchorNode.title)) {
          createdLinks.push({source: anchorNode.id, target: node.id})
        }
      }
    })
  })

  return createdLinks
}



const GameForceWebController: React.FC<GameForceWebControllerProps> = ({data}) => {
  const [state, setState] = useState({anchorField: 'Genre'})
  const gameNodes = data.map((data: any, index: number) => {
    return {...data, title: data.Game, id: `${index}-${data.Game}`}
  })

  const anchorNodes = generateAnchorNodes(gameNodes, state.anchorField)

  const mappedAnchorNodes = anchorNodes.map((node: any, index: number) => {
    return {
      id: `${index}-${node}`,
      title: node,
      nodeType: 'anchor' // todo make an enum
    }
  })

  const createdLinks = generateLinkData(gameNodes, mappedAnchorNodes, state.anchorField)

  console.log(gameNodes)

  // Return the SVG element.
  return (
    <ForceGraph 
        graphData={{nodes: [...gameNodes, ...mappedAnchorNodes], links: createdLinks}}
        nodeLabel="title"
        nodeVal={(d) => {
          return d.nodeType === 'anchor' ? 25 : 7
        }}
        nodeRelSize={1}
        nodeColor={(d) => {
          return d.nodeType === 'anchor' ? 'rebeccaPurple' : 'salmon'
        }}
        linkDirectionalParticles={(d) => {
          return 1
        }}
    />
  )
}

export default GameForceWebController