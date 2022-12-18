interface IPosition {
  y: number
}

function getPosition (element: HTMLElement): IPosition {
  const { top } = element.getBoundingClientRect()
  return {
    y: top
  }
}

export function getDistanceBetweenElements (a: HTMLElement, b: HTMLElement): number {
  const aPosition: IPosition = getPosition(a)
  const bPosition: IPosition = getPosition(b)

  return Math.hypot(aPosition.y - bPosition.y)
}
