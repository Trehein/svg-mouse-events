export const generateLineCoordsWithXYCoords = (coords: any[]) => {
    return coords.map((coord: any, i: number) => {
        return {
            x1: coord.cx,
            y1: coord.cy,
            x2: i + 1 <= coords.length - 1 ? coords[i + 1].cx : coords[0].cx,
            y2: i + 1 <= coords.length - 1 ? coords[i + 1].cy : coords[0].cy
        }
    })
}