declare module "algebrite" {
  export interface AlgebriteFunction {
    (expression: string): AlgebriteResult;
    version: string;
    core: {
      eval: (expression: string) => AlgebriteResult;
      run: (expression: string) => void;
    };
    integral: (expression: string, variable: string) => AlgebriteResult;
    simplify: (
      expression: AlgebriteResult | string,
      options?: { vars?: string },
    ) => AlgebriteResult;
    extensions: Record<string, (algebrite: AlgebriteFunction) => void>;
  }

  export interface AlgebriteResult {
    toString: () => string;
    latex: () => string;
    html: () => string;
    text: () => string;
    matrix: () => string[][];
    vars: () => string[];
    toJSNumber: () => number;
    s: AlgebriteFunction;
    add: (expression: string) => AlgebriteResult;
    subtract: (expression: string) => AlgebriteResult;
    multiply: (expression: string) => AlgebriteResult;
    divide: (expression: string) => AlgebriteResult;
    pow: (expression: string) => AlgebriteResult;
    exp: () => AlgebriteResult;
    log: () => AlgebriteResult;
    simplify: () => AlgebriteResult;
    expand: () => AlgebriteResult;
    real: () => AlgebriteResult;
    imag: () => AlgebriteResult;
    abs: () => AlgebriteResult;
    conj: () => AlgebriteResult;
    sin: () => AlgebriteResult;
    cos: () => AlgebriteResult;
    tan: () => AlgebriteResult;
    cot: () => AlgebriteResult;
    sec: () => AlgebriteResult;
    csc: () => AlgebriteResult;
  }

  const algebrite: AlgebriteFunction;
  export = algebrite;
}
