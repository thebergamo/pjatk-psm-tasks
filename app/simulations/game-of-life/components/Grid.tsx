import { Grid as GridType } from "../lib/grid";

interface Props {
  grid: GridType;
  onCellClick: (coordinates: [number, number]) => void;
}
export const Grid = (props: Props) => {
  const gridSize = props.grid.length;
  const gridColClass =
    gridSize === 50
      ? "grid-cols-50"
      : gridSize === 30
      ? "grid-cols-30"
      : "grid-cols-20";
  return (
    <div className={`grid ${gridColClass} gap-1`}>
      {props.grid.map((rows, i) =>
        rows.map((col, k) => (
          <div
            key={`${i}-${k}`}
            onClick={() => props.onCellClick([i, k])}
            className={`relative ${
              props.grid[i][k] ? "bg-black" : "bg-gray-200"
            }`}
          >
            <div style={{ paddingBottom: "100%" }} />
          </div>
        )),
      )}
    </div>
  );
};
