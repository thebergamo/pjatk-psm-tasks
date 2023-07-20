type ResultProps =
  | {
      elapsedTime: number;
      root: number;
      totalIterations: number;
    }
  | {
      err: string;
      elapsedTime: number;
    };

export const Results = (props: ResultProps & { tolerance: number }) => {
  if ("err" in props) {
    return (
      <div className="rounded border border-red-400 bg-red-100 p-4 text-red-700">
        <p>{props.err}</p>
      </div>
    );
  }
  return (
    <div className="rounded border border-green-400 bg-green-100 p-4 text-green-700">
      <p>
        Root:{" "}
        <span className="font-bold">{props.root.toFixed(props.tolerance)}</span>
      </p>
      <p>
        Total Time: <span className="font-bold">{props.elapsedTime} ms</span>
      </p>
      <p>
        Iterations: <span className="font-bold"> {props.totalIterations}</span>
      </p>
    </div>
  );
};
