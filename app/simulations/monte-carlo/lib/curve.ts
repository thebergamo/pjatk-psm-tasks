import { fnSolverFactory } from "../../../../lib/functionSolver";
import { generateRandomPointsFactory } from "./polygon";

export type Fn = (x: number) => number;
type Box = { minX: number; maxX: number; minY: number; maxY: number };

export function generateCurveSampleData(box: Box, samples: number, fn: string) {
  let points = [];
  const fnSolver = fnSolverFactory(fn);
  const getRandomPoint = generateRandomPointsFactory(
    box.minX,
    box.maxX,
    box.minY,
    box.maxY,
  );
  for (let i = 0; i < samples; i++) {
    const [x, y] = getRandomPoint();
    points.push({
      x,
      y,
      inside: insideCurve(x, y, fnSolver),
    });
  }

  return points;
}

function insideCurve(x: number, y: number, fn: Fn) {
  const yValue = fn(x);

  if (yValue < 0) {
    return y < 0 && y > yValue;
  } else {
    return y > 0 && y < yValue;
  }
}
