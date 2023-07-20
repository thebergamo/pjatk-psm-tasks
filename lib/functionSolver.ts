import * as math from "mathjs";

export function fnSolverFactory(equation: string) {
  return (x: number) => math.evaluate(equation, { x });
}
