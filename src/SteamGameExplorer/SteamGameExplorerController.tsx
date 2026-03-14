import React from 'react'
import { steamPurchaseHistory } from '../data/steamPurchaseHistory'
import GameForceWebController from './GameForceWebController'

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

  return (
    <div style={{width: '100vw', height: '100vh'}}>
      <GameForceWebController  data={steamPurchaseHistory}/>
    </div>
  )
}

export default SteamGameExplorerController