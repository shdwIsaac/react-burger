function getPosition(element) {
    const {top, left, width, height} = element.getBoundingClientRect();
    return {
        y: top
    };
}
export function getDistanceBetweenElements(a, b) {
    const aPosition = getPosition(a);
    const bPosition = getPosition(b);

    return Math.hypot(aPosition.y - bPosition.y);
}