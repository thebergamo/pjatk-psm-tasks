import { fnSolverFactory } from "@/lib/functionSolver";
import { PropsWithChildren } from "react";
import {
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Scatter,
  ReferenceLine,
  Line,
} from "recharts";

type Props = {
  lowerBound: number;
  upperBound: number;
  fn: string;
};

export function getFunctionPoints(
  xMin: number,
  xMax: number,
  stepSize: number,
  fn: string,
) {
  const fnSolver = fnSolverFactory(fn);
  let data: { x: number; y: number }[] = [];
  // Add the function points to the plot
  for (let x = xMin; x <= xMax; x += stepSize) {
    console.log({ x });
    data = [...data, { x, y: fnSolver(x) }];
  }

  return data;
}

export const FnChart = ({
  lowerBound,
  upperBound,
  fn,
  children,
}: PropsWithChildren<Props>) => {
  const fnData = getFunctionPoints(lowerBound, upperBound, 1, fn);
  return (
    <ComposedChart width={500} height={500}>
      <XAxis
        dataKey="x"
        type="number"
        domain={[lowerBound / 2, upperBound / 2]}
      />
      <YAxis
        dataKey="y"
        type="number"
        domain={[lowerBound / 2, upperBound / 2]}
      />
      <CartesianGrid strokeDasharray="3 3" />
      {children && children}
      <ReferenceLine x={0} stroke="black" />
      <ReferenceLine y={0} stroke="black" />
      <Line
        type="natural"
        dataKey="y"
        stroke="#8884d8"
        dot={false}
        data={fnData}
      />
    </ComposedChart>
  );
};
