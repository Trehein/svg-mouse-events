import { create } from 'zustand'

export const gameDataStore = create((set) => ({
  gameData: [],

  setSavedArrowsStore: (newGameData: any[]) => set({ gameData: newGameData})

}))