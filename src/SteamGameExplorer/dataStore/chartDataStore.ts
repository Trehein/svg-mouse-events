import { create } from 'zustand'

export type NodeStyleData = {
  radius: number,
  color: string 
}

const defaultAnchorNode: NodeStyleData = {
  color: 'teal',
  radius: 25
}

const defaultGameNode: NodeStyleData = {
  color: 'sandybrown',
  radius: 1
}

export const chartDataStore = create((set) => ({
  anchorNodeStyle: defaultAnchorNode,
  setAnchorNodeStyle: (newAnchorNodeStyle: NodeStyleData) => set({ anchorNodeStyle: newAnchorNodeStyle}),
  gameNodeStyle: defaultGameNode,
  setGameNodeStyle: (newGameNodeStyle: NodeStyleData) => set({ gameNodeStyle: newGameNodeStyle})
}))