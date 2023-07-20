import { Grid } from "../lib/grid";

interface Props {
  state: {
    grid: Grid[];
    isInitial: boolean;
  };
  activeState: number | null;
}

function calculateLiveCells(grid: Grid) {
  return grid.flat().filter((cell) => cell).length;
}

function calculateDeadCells(grid: Grid) {
  return grid.flat().filter((cell) => !cell).length;
}

export const Statistics = (props: Props) => {
  console.log(props.state);
  const generations = props.state.isInitial ? "-" : props.state.grid.length;
  const currentState =
    props.state.grid[props.activeState ?? props.state.grid.length - 1];
  const liveCells = calculateLiveCells(currentState);
  const deadCells = calculateDeadCells(currentState);
  return (
    <div className="mt-4 w-full rounded bg-white p-4">
      <h2 className="p-2 text-center text-2xl">Statistics</h2>
      <div className="flex space-x-4">
        <div className="flex-1 rounded bg-gray-100 p-4 shadow">
          <h2 className="text-md p-2 text-center font-bold">Generations</h2>
          <div className="p-2 text-center text-xl font-bold">
            {props.activeState !== null && `${props.activeState + 1}/`}
            {generations}
          </div>
        </div>
        <div className="flex-1 rounded bg-gray-100 p-4 shadow">
          <h2 className="text-md p-2 text-center font-bold">Live/Dead Cells</h2>
          <div className="p-2 text-center text-xl font-bold">{`${liveCells}/${deadCells}`}</div>
        </div>
      </div>
    </div>
  );
};
