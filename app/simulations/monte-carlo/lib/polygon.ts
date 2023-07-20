import uniform from "@stdlib/random-base-uniform";

export type Point = [number, number];
export type Coordinate = {
  x: number;
  y: number;
};
export type Vertices = Point[];
export type BoundingBox = { width: number; height: number };
export type SamplePoint = Coordinate & {
  inside: boolean;
};

export function generateRandomPointsFactory(
  minX: number,
  maxX: number,
  minY: number,
  maxY: number,
) {
  const getX = uniform.factory(minX, maxX);
  const getY = uniform.factory(minY, maxY);

  return () => [getX(), getY()];
}

export function generateSamplePoints(
  box: BoundingBox,
  samples: number,
  polygon: Coordinate[],
): SamplePoint[] {
  let points = [];
  const getRandomPoint = generateRandomPointsFactory(
    0,
    box.width,
    0,
    box.height,
  );
  for (let i = 0; i < samples; i++) {
    const [x, y] = getRandomPoint();
    points.push({ x: x, y: y, inside: isInside(polygon, x, y) });
  }

  return points;
}

export function isInside(polygon: Coordinate[], x: number, y: number): boolean {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    let xi = polygon[i].x,
      yi = polygon[i].y;
    let xj = polygon[j].x,
      yj = polygon[j].y;

    let intersect =
      yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}
