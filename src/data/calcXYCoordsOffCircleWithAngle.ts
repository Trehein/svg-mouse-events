export const calcXYCoordsOffCircleWithAngle = (angle: number, radius: number, originX: number, originY: number) => {
    angle = (angle + 1) % 360;

    // Formula:
    var rad = angle * Math.PI / 180;
    var x = originX + radius * Math.cos(rad);
    var y = originY - radius * Math.sin(rad);
    return {cx: x, cy: y}
}
