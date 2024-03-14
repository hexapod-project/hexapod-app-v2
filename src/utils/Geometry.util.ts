export const degToRad = (angle: number) => angle * Math.PI / 180;
export const radToDeg = (angle: number) => angle * 180 / Math.PI;
export const toPositiveRad = (angle: number) => {
    if (angle < 0) {
        angle = Math.PI * 2 + angle;
    }

    return angle;
}
export const clampTo360Rad = (angle: number) => {
    if (Math.abs(angle) > 2 * Math.PI) {
        angle = Math.sign(angle) * Math.abs(angle) % (2 * Math.PI);
    }

    return angle;
}

export function polarToCartesian(centerX: number, centerY: number, radius: number, angle: number) {
    return {
        x: centerX + (radius * Math.cos(angle)),
        y: centerY + (radius * Math.sin(angle))
    };
}

export function describeArc(x: number, y: number, radius: number, startAngle: number, endAngle: number) {

    var start = polarToCartesian(x, y, radius, endAngle);
    var end = polarToCartesian(x, y, radius, startAngle);

    var arcSweep = endAngle - startAngle <= Math.PI ? "0" : "1";

    var d = [
        "M", start.x, start.y,
        "A", radius, radius, 0, arcSweep, 0, end.x, end.y
    ].join(" ");

    return d;
}