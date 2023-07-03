export const pathFinder = (pathArr: any[]) => {
    let starterString = `${pathArr[0].cx ? pathArr[0].cx : pathArr[0].x} ${pathArr[0].cy ? pathArr[0].cy : pathArr[0].y}`
    console.log(pathArr)
    pathArr.forEach((point: {x?: number, y?: number, cx?: number, cy?: number}) => {
        starterString = `${starterString}
            , ${point.cx ? point.cx : point.x} ${point.cy ? point.cy : point.y}`
    })

    return starterString
}