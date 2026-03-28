import { create } from 'zustand'

export const gameDataStore = create((set) => ({
  gameNodeData: [],
  setGameNodeData: (newGameNodeData: any[]) => set({ gameNodeData: newGameNodeData}),
  forceGraphAnchorNodeKeyField: 'Genre',
  setForceGraphAnchorNodeKeyField: (newForceGraphAnchorNodeKeyField: string) => set({ forceGraphAnchorNodeKeyField: newForceGraphAnchorNodeKeyField})
}))