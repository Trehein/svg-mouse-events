import React, { useEffect } from 'react'
import { steamPurchaseHistoryPiped } from '../data/steamPurchaseHistoryPiped'
import GameForceWebController from './GameForceWebController'
import DataSelectionController from './DataSelectionController'
import { gameDataStore } from './dataStore/gameDataStore'

export interface SteamDataObj {
  Developer: string,
  'Full Price': number,
  Game: string,
  Genre: string,
  Price: number,
  Publisher: string,
  'Purchase Date': Date,
  'Release Date': Date,
  SteamLink: string
}

const SteamGameExplorerController: React.FC = () => {  
  const gameNodeData: any[] = gameDataStore((state: any) => state.gameNodeData)
  const setGameNodeData: Function = gameDataStore((state: any) => state.setGameNodeData)

  useEffect(() => {
    if(gameNodeData.length === 0) {
      setGameNodeData(steamPurchaseHistoryPiped.map((data: any, index: number) => {
        return {...data, title: data.Game, id: `${index}-${data.Game}`}
      }))
    }
  }, [])

  if (gameNodeData.length === 0) {
    return <div>Loading game data</div>
  }

  

  return (
    <div>
      <DataSelectionController />
      <div style={{width: '100vw', height: '80vh'}}>
        <GameForceWebController  data={steamPurchaseHistoryPiped}/>
      </div>
    </div>

  )
}

export default SteamGameExplorerController