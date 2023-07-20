import {
  MethodProperties,
  bisectionMethod,
  perfMethod,
  regulaFalsiMethod,
  secantMethod,
} from "../lib/methods";

import { Results } from "./Results";
const BisectionResults = (props: MethodProperties) => {
  const results = perfMethod({ ...props }, bisectionMethod);
  return (
    <div className="flex-1 rounded bg-white p-4 shadow">
      <h2 className="p-2 text-center text-xl font-bold">Bisect Method</h2>
      <Results {...results} tolerance={props.tolerance} />
    </div>
  );
};

const SecantResults = (props: MethodProperties) => {
  const results = perfMethod({ ...props }, secantMethod);
  return (
    <div className="flex-1 rounded bg-white p-4 shadow">
      <h2 className="p-2 text-center text-xl font-bold">Secant Method</h2>
      <Results {...results} tolerance={props.tolerance} />
    </div>
  );
};

const RegularFalsiResults = (props: MethodProperties) => {
  const results = perfMethod({ ...props }, regulaFalsiMethod);

  return (
    <div className="flex-1 rounded bg-white p-4 shadow">
      <h2 className="p-2 text-center text-xl font-bold">Regula Falsi Method</h2>
      <Results {...results} tolerance={props.tolerance} />
    </div>
  );
};

export const MethodResults = (props: MethodProperties) => {
  return (
    <div className="mt-8 w-full max-w-2xl">
      <h2 className="p-2 text-center text-2xl">Results</h2>
      <div className="flex space-x-4">
        <BisectionResults {...props} />
        <SecantResults {...props} />
        <RegularFalsiResults {...props} />
      </div>
    </div>
  );
};
