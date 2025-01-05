import { create } from 'zustand'
import { Arrow } from '../DraggableArrow'

export const arrowsStore = create((set) => ({
  savedArrowsStore: [],
  setSavedArrowsStore: (newArrows: Arrow[]) => set({ savedArrowsStore: newArrows})

}))