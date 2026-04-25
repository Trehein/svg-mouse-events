import React, { useEffect, useRef, useState } from 'react'
import { SteamDataObj } from './SteamGameExplorerController'
import ForceGraph from 'react-force-graph-2d'
import { gameDataStore } from './dataStore/gameDataStore'
import { chartDataStore, NodeStyleData } from './dataStore/chartDataStore'

interface GameForceWebControllerProps {
  data: SteamDataObj[] | any
}

const generateAnchorNodes = (gameNodes: any, anchorField: string) => {
  return gameNodes.reduce((accumulator: any, currentItem: any) => {

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
  const [state, setState] = useState({height: 0})
  const gameNodeData: any[] = gameDataStore((state: any) => state.gameNodeData)
  const forceGraphAnchorNodeKeyField: string = gameDataStore((state: any) => state.forceGraphAnchorNodeKeyField)
  const anchorNodes = generateAnchorNodes(gameNodeData, forceGraphAnchorNodeKeyField)
  const anchorNodeStyle: NodeStyleData = chartDataStore((state: any) => state.anchorNodeStyle)
  const gameNodeStyle: NodeStyleData = chartDataStore((state: any) => state.gameNodeStyle)


  const mappedAnchorNodes = anchorNodes.map((node: any, index: number) => {
    return {
      id: `${index}-${node}`,
      title: node,
      nodeType: 'anchor' // todo make an enum 
    }
  })

  const createdLinks = generateLinkData(gameNodeData, mappedAnchorNodes, forceGraphAnchorNodeKeyField)

  const containerRef: any = useRef(null)

  useEffect(() => {
    setState({...state, height: containerRef.current.clientHeight})
  }, [])

  // Return the SVG element.
  return (
    <div style={{width: '100%', height: '100%'}} ref={containerRef}>
      <ForceGraph 
          height={state.height}
          graphData={{nodes: [...gameNodeData, ...mappedAnchorNodes], links: createdLinks}}
          nodeLabel="title"
          nodeVal={(d) => {
            return d.nodeType === 'anchor' ? anchorNodeStyle.radius :  gameNodeStyle.radius
          }}
          nodeRelSize={2}
          nodeColor={(d) => {
            return d.nodeType === 'anchor' ? anchorNodeStyle.color : gameNodeStyle.color
          }}
          linkDirectionalParticles={(d) => {
            return 1
          }}
      />
    </div>
  )
}

export default GameForceWebController