export const generateAnchorNodes = (gameNodes: any, anchorField: string) => {
  console.log('gameNodes', gameNodes)
  console.log('anchorField', anchorField)


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