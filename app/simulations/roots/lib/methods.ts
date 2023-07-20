import { fnSolverFactory } from "@/lib/functionSolver";

export interface MethodProperties {
  a: number;
  b: number;
  tolerance: number;
  maxIterations: number;
  fn: string;
}

type MethodResult = {
  root: number;
  totalIterations: number;
};

type Method = (
  f: (x: number) => number,
  a: number,
  b: number,
  tolerance: number,
  maxIterations: number,
) => MethodResult;

export function perfMethod(input: MethodProperties, method: Method) {
  const fnSolver = fnSolverFactory(input.fn);
  const start = Date.now();

  try {
    const { root, totalIterations } = method(
      fnSolver,
      input.a,
      input.b,
      Math.pow(10, -input.tolerance),
      input.maxIterations,
    );

    return { elapsedTime: Date.now() - start, root, totalIterations };
  } catch (err) {
    return { err: (err as Error).message, elapsedTime: start - Date.now() };
  }
}

export function bisectionMethod(
  f: (x: number) => number,
  a: number,
  b: number,
  tolerance: number = 1e-7,
  maxIterations: number = 100,
): MethodResult {
  if (f(a) * f(b) > 0) {
    throw new Error("f(a) and f(b) must have different signs.");
  }

  let mid: number;

  for (let i = 0; i < maxIterations; i++) {
    mid = (a + b) / 2;
    const fMid = f(mid);

    if (Math.abs(fMid) <= tolerance) {
      return { root: mid, totalIterations: i };
    }

    if (f(a) * fMid < 0) {
      b = mid;
    } else {
      a = mid;
    }
  }

  throw new Error("Exceeded maximum iterations. No solution found.");
}

export function bisectionMethod2(
  f: (x: number) => number,
  a: number,
  b: number,
  tolerance: number = 1e-7,
  maxIterations: number = 100,
): MethodResult {
  console.log(a, b, f(a), f(b));
  if (f(a) === 0) {
    return { root: a, totalIterations: 0 };
  }

  if (f(b) === 0) {
    return { root: b, totalIterations: 0 };
  }

  for (let i = 0; i < maxIterations; ++i) {
    const mid = (a + b) / 2;
    const fMid = f(mid);
    if (fMid === 0 || Math.abs((b - a) / 2) < tolerance) {
      return { root: mid, totalIterations: i };
    }

    if (fMid * f(a) > 0) {
      a = mid;
    } else {
      b = mid;
    }
  }

  const midPoint = (a + b) / 2;

  if (isNaN(midPoint)) {
    throw new Error("Exceeded maximum iterations. No solution found.");
  }

  return { root: midPoint, totalIterations: maxIterations };
}

export function secantMethod(
  f: (x: number) => number,
  a: number,
  b: number,
  tolerance: number = 1e-7,
  maxIterations: number = 100,
): MethodResult {
  for (let i = 0; i < maxIterations; ++i) {
    let c = b - f(b) * ((b - a) / (f(b) - f(a)));

    if (Math.abs(c - b) < tolerance) {
      return { root: c, totalIterations: i };
    }

    a = b;
    b = c;
  }

  throw new Error("Exceeded maximum iterations. No solution found.");
}

export function regulaFalsiMethod(
  f: (x: number) => number,
  a: number,
  b: number,
  tolerance: number = 1e-7,
  maxIterations: number = 100,
): MethodResult {
  if (f(a) * f(b) > 0) {
    throw new Error("f(a) and f(b) must have different signs.");
  }

  let c = a;

  for (let i = 0; i < maxIterations; i++) {
    let fA = f(a);
    let fB = f(b);

    c = (a * fB - b * fA) / (fB - fA);

    let fC = f(c);

    if (Math.abs(fC) < tolerance) {
      return { root: c, totalIterations: i };
    }

    if (fC * fA < 0) {
      b = c;
    } else {
      a = c;
    }
  }

  throw new Error("Exceeded maximum iterations. No solution found.");
}
