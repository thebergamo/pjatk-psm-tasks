import * as math from "mathjs";
import { fnSolverFactory } from "@/lib/functionSolver";
import * as Algebrite from "algebrite";

export interface MethodProperties {
  a: number;
  b: number;
  divisions: number;
  fn: string;
}

type MethodResult = {
  area: number;
};

type Fn = (x: number) => number;

type Method = (f: Fn, a: number, b: number, divisions: number) => MethodResult;

export function perfMethod(input: MethodProperties, method: Method) {
  const fnSolver = fnSolverFactory(input.fn);
  const start = Date.now();

  const { area } = method(fnSolver, input.a, input.b, input.divisions);

  return { elapsedTime: Date.now() - start, area };
}

export function exactMethod(fn: string, a: number, b: number) {
  const integralExpr = Algebrite.integral(fn, "x");
  const simplifiedExpr = Algebrite.simplify(integralExpr).toString();
  console.log(simplifiedExpr);
  const F = math.compile(simplifiedExpr);
  const start = Date.now();
  const area = F.evaluate({ x: b }) - F.evaluate({ x: a });
  return { elapsedTime: Date.now() - start, area };
}

export function rectangleMethod(fn: Fn, a: number, b: number, n: number) {
  let h = (b - a) / n;
  let sum = 0;
  for (let i = 0; i < n; i++) {
    let xi = a + h * (i + 0.5);
    sum += fn(xi);
  }
  return { area: h * sum };
}

export function trapezoidalMethod(fn: Fn, a: number, b: number, n: number) {
  let h = (b - a) / n;
  let sum = 0.5 * (Math.pow(a, 2) + Math.pow(b, 2));
  for (let i = 1; i < n; i++) {
    let xi = a + h * i;
    sum += fn(xi);
  }
  return { area: h * sum };
}

export function parabolicMethod(fn: Fn, a: number, b: number, n: number) {
  let h = (b - a) / n;
  let sum = Math.pow(a, 2) + Math.pow(b, 2);
  for (let i = 1; i < n; i++) {
    let xi = a + h * i;
    sum += (i % 2 === 0 ? 2 : 4) * fn(xi);
  }
  return { area: (h * sum) / 3 };
}
