const directions = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
  [1, 0],
  [1, -1],
  [0, -1],
] as const;

export type Grid = boolean[][];

// Create an empty grid
export const emptyGrid = (rows: number, columns: number): Grid => {
  const grid = [];
  for (let i = 0; i < rows; i++) {
    grid.push(Array.from(Array(columns), () => false));
  }
  return grid;
};

export function calculateNextGrid(grid: Grid, toroidal: boolean): Grid {
  const newGrid = emptyGrid(grid.length, grid[0].length);
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      const neighbors = [
        [i - 1, j - 1],
        [i - 1, j],
        [i - 1, j + 1],
        [i, j - 1],
        [i, j + 1],
        [i + 1, j - 1],
        [i + 1, j],
        [i + 1, j + 1],
      ];
      let liveNeighbors = 0;
      for (let [x, y] of neighbors) {
        if (toroidal) {
          // Wrap around if toroidal is true
          x = (x + grid.length) % grid.length;
          y = (y + grid[i].length) % grid[i].length;
        } else if (x < 0 || y < 0 || x >= grid.length || y >= grid[i].length) {
          // Skip if out of bounds and toroidal is false
          continue;
        }
        liveNeighbors += grid[x][y] ? 1 : 0;
      }
      newGrid[i][j] =
        liveNeighbors === 3 || (grid[i][j] && liveNeighbors === 2);
    }
  }
  return newGrid;
}
