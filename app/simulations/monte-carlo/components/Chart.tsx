import {
  CartesianGrid,
  XAxis,
  YAxis,
  Scatter,
  ComposedChart,
  Line,
} from "recharts";
import { SamplePoint } from "../lib/polygon";
import { FnChart } from "@/components/charts/FunctionChart";

// chart should receive a polygon and draw it.
// chart should plot points and check if they fall inside or outside the polygon

export interface Point {
  x: number;
  y: number;
}

export interface Props {
  polygon: Point[];
  box: { width: number; height: number };
  sampleData: SamplePoint[];
}

export interface CurveProps {
  box: { minX: number; maxX: number; minY: number; maxY: number };
  sampleData: SamplePoint[];
  fn: string;
}

export const Chart = ({ box, polygon, sampleData: data }: Props) => {
  return (
    <ComposedChart width={500} height={500}>
      <XAxis
        dataKey="x"
        type="number"
        domain={[0, box.width]}
        ticks={Array.from(
          { length: Math.floor(box.width / 50) + 1 },
          (_, i) => i * 50,
        )}
      />
      <YAxis
        dataKey="y"
        type="number"
        domain={[0, box.height]}
        ticks={Array.from(
          { length: Math.floor(box.height / 50) + 1 },
          (_, i) => i * 50,
        )}
      />
      <CartesianGrid strokeDasharray="3 3" />
      <Scatter data={data.filter((x) => x.inside)} fill={"#8884d8"} />
      <Scatter data={data.filter((x) => !x.inside)} fill={"#82ca9d"} />
      {polygon.map((_, index) => (
        <Line
          type="monotone"
          dataKey="y"
          stroke="#000000"
          data={[polygon[index], polygon[(index + 1) % polygon.length]]}
          isAnimationActive={false}
          dot={false}
          key={index}
        />
      ))}
    </ComposedChart>
  );
};

export const CurveChart = ({ box, sampleData: data, fn }: CurveProps) => {
  return (
    <FnChart lowerBound={box.minX} upperBound={box.maxX} fn={fn}>
      <Scatter data={data.filter((x) => x.inside)} fill={"#8884d8"} />
      <Scatter data={data.filter((x) => !x.inside)} fill={"#82ca9d"} />
    </FnChart>
  );
};
