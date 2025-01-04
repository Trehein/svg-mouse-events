import { create } from 'zustand'

export const colorPaletteStore = create((set) => ({
  colors: {
    createArrowColor: 'salmon',
    mainArrowColor: 'rebeccaPurple',
    selectedArrowColor: 'darkcyan',
    hoverArrowColor: 'orange'
  }
}))