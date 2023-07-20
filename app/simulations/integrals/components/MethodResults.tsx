import {
  MethodProperties,
  exactMethod,
  parabolicMethod,
  perfMethod,
  rectangleMethod,
  trapezoidalMethod,
} from "../lib/methods";

type ResultProps = {
  elapsedTime: number;
  area: number;
};

export const Results = (props: ResultProps) => {
  return (
    <div className="rounded border border-green-400 bg-green-100 p-4 text-center text-green-700">
      <p>
        Area: <span className="font-bold">{props.area}</span>
      </p>
      <p>
        Total Time: <span className="font-bold">{props.elapsedTime} ms</span>
      </p>
    </div>
  );
};

const RectangleResults = (props: MethodProperties) => {
  const results = perfMethod({ ...props }, rectangleMethod);
  return (
    <div className="flex-1 rounded bg-white p-4 shadow">
      <h2 className="p-2 text-center text-xl font-bold">Rectangle Method</h2>
      <Results {...results} />
    </div>
  );
};

const TrapezoidalResults = (props: MethodProperties) => {
  const results = perfMethod({ ...props }, trapezoidalMethod);
  return (
    <div className="flex-1 rounded bg-white p-4 shadow">
      <h2 className="p-2 text-center text-xl font-bold">Trapezoidal Method</h2>
      <Results {...results} />
    </div>
  );
};

const ParabolicResults = (props: MethodProperties) => {
  const results = perfMethod({ ...props }, parabolicMethod);

  return (
    <div className="flex-1 rounded bg-white p-4 shadow">
      <h2 className="p-2 text-center text-xl font-bold">Parabolic Method</h2>
      <Results {...results} />
    </div>
  );
};

const ExactResults = (props: MethodProperties) => {
  const results = exactMethod(props.fn, props.a, props.b);

  return (
    <div className="mb-4 flex-1 rounded bg-white p-4 shadow">
      <h2 className="p-2 text-center text-xl font-bold">Exact Results</h2>
      <Results {...results} />
    </div>
  );
};

export const MethodResults = (props: MethodProperties) => {
  return (
    <div className="mt-8 w-full">
      <h2 className="p-2 text-center text-2xl">Results</h2>
      <ExactResults {...props} />
      <div className="flex space-x-4 text-center">
        <RectangleResults {...props} />
        <TrapezoidalResults {...props} />
        <ParabolicResults {...props} />
      </div>
    </div>
  );
};
