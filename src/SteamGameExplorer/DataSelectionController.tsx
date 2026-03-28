import React from 'react'
import { gameDataStore } from './dataStore/gameDataStore'

const DataSelectionController: React.FC = () => {
  const gameData: any[] = gameDataStore((state: any) => state.gameData)
  const forceGraphAnchorNodeKeyField: string = gameDataStore((state: any) => state.forceGraphAnchorNodeKeyField)
  const setForceGraphAnchorNodeKeyField: Function = gameDataStore((state: any) => state.setForceGraphAnchorNodeKeyField)

  return (
    <div style={{width: '100%', height:'20vh'}}>
      <label>Connection:</label>

      <select 
        name="anchorNodeSelect" 
        id="anchor-node-select"
          value={forceGraphAnchorNodeKeyField} // ...force the select's value to match the state variable...
          onChange={e => setForceGraphAnchorNodeKeyField(e.target.value)} // ... and update the state variable on any change!
      >
        <option value="Genre">Genre</option>
        <option value="Developer">Developer</option>
        <option value="Publisher">Publisher</option>
      </select>
    </div>
  )
}

export default DataSelectionController