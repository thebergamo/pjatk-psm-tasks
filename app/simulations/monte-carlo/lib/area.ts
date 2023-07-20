export function calculateArea(
  pointsInside: number,
  trials: number,
  rectArea: number,
) {
  return rectArea * (pointsInside / trials);
}

export function calculateCurveArea(
  pointsInside: number,
  trials: number,
  totalArea: number,
) {
  //const totalArea = (xMax - xMin) * fn(xMax);
  const ratio = pointsInside / trials;
  console.log("calculate", ratio, totalArea, totalArea * ratio);
  return totalArea * ratio;
}
