import React, { useState } from 'react'
import { Drag, raise } from '@visx/drag';
import { Group } from '@visx/group';

const DragToSlotController: React.FC = () => {
    const height: number = 400
    const width: number = 400
    const [mousePosition, setMousePosition] = useState({x: 0, y: 0})


    const draggableRect = {
        x: width * .5, 
        y: height * .33, 
        id: 1
    }

    const [isOverDropSpace, setIsOverDropSpace] = useState<boolean>(false)
    const [draggingItems, setDraggingItems] = useState([draggableRect])

    return (
        <svg height={height} width={width}>
            <rect 
                height={height} 
                width={width} 
                fill={'orange'} 
                onMouseMove={(e) => {
                    console.log(e)
                    setMousePosition({x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY})
                }}
            />

            {draggingItems.map((d, i) => (
                <Drag
                    key={`drag-${d.id}`}
                    width={width}
                    height={height}
                    x={d.x}
                    y={d.y}
                    onDragStart={() => {
                        setDraggingItems(raise(draggingItems, i));
                    }}
                >
                    {({ dragStart, dragEnd, dragMove, isDragging, x, y, dx, dy }) => (
                            <>
                                <rect                
                                    onMouseMove={(e) => {
                                        console.log(e)
                                        setMousePosition({x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY})
                                    }}
                                    onMouseEnter={() => setIsOverDropSpace(true)} 
                                    onMouseLeave={() => setIsOverDropSpace(false)}
                                    x={width * .25} 
                                    y={height * .66} 
                                    width={width * .5} 
                                    height={height * .25} 
                                    fill={isOverDropSpace ? 'red' : 'white'}
                                />
                                <Group>
                                    <rect
                                        key={`dot-${d.id}`}
                                        x={x}
                                        y={y}
                                        width={width * .25}
                                        height={height * .2}
                                        fill={isDragging ? 'green' : 'blue'}
                                        transform={`translate(${dx - 20}, ${dy - 20})`}
                                        fillOpacity={0.9}
                                        stroke={isDragging ? 'white' : 'transparent'}
                                        strokeWidth={2}
                                        onMouseMove={(e) => {
                                            console.log(e)
                                            dragMove(e)
                                            setMousePosition({x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY})
                                        }}
                                        onMouseUp={dragEnd}
                                        onMouseDown={dragStart}
                                        onTouchStart={dragStart}
                                        onTouchMove={dragMove}
                                        onTouchEnd={dragEnd}
                                    />
                                    {/* <text 
                                        x={x} 
                                        y={y + 1}
                                        dominantBaseline={'middle'}
                                        textAnchor={'middle'}
                                        transform={`translate(${dx}, ${dy})`}
                                        onMouseMove={dragMove}
                                        onMouseUp={dragEnd}
                                        onMouseDown={dragStart}
                                        onTouchStart={dragStart}
                                        onTouchMove={dragMove}
                                        onTouchEnd={dragEnd}
                                        cursor={'pointer'}
                                        fill={'white'}
                                    >
                                        {d.id}
                                    </text> */}
                                </Group>
                            </>

                        )}
                </Drag>
            ))}
        </svg>
    )
}

export default DragToSlotController