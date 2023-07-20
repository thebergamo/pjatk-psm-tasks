import { Grid } from "./grid";

type DrawPreFab = (i: number, k: number, grid: Grid) => Grid;

function drawDot(i: number, k: number, grid: Grid) {
  const newGrid = [...grid];
  newGrid[i][k] = !grid[i][k];
  return newGrid;
}

function drawGlider(i: number, k: number, grid: Grid) {
  const newGrid = [...grid];
  newGrid[i][k + 1] = true;
  newGrid[i + 1][k + 2] = true;
  newGrid[i + 2][k] = true;
  newGrid[i + 2][k + 1] = true;
  newGrid[i + 2][k + 2] = true;
  return newGrid;
}

function drawLwss(i: number, k: number, grid: Grid) {
  const newGrid = [...grid];
  newGrid[i][k + 1] = true;
  newGrid[i][k + 3] = true;
  newGrid[i + 1][k + 4] = true;
  newGrid[i + 2][k] = true;
  newGrid[i + 2][k + 4] = true;
  newGrid[i + 3][k + 1] = true;
  newGrid[i + 3][k + 2] = true;
  newGrid[i + 3][k + 3] = true;
  newGrid[i + 3][k + 4] = true;
  return newGrid;
}

function drawBlinker(i: number, k: number, grid: Grid) {
  const newGrid = [...grid];
  newGrid[i][k] = true;
  newGrid[i][k + 1] = true;
  newGrid[i][k + 2] = true;
  return newGrid;
}

function drawToad(i: number, k: number, grid: Grid) {
  const newGrid = [...grid];
  newGrid[i][k + 1] = true;
  newGrid[i][k + 2] = true;
  newGrid[i][k + 3] = true;
  newGrid[i + 1][k] = true;
  newGrid[i + 1][k + 1] = true;
  newGrid[i + 1][k + 2] = true;
  return newGrid;
}

function drawBeacon(i: number, k: number, grid: Grid) {
  const newGrid = [...grid];
  newGrid[i][k] = true;
  newGrid[i][k + 1] = true;
  newGrid[i + 1][k] = true;
  newGrid[i + 1][k + 1] = true;
  newGrid[i + 2][k + 2] = true;
  newGrid[i + 2][k + 3] = true;
  newGrid[i + 3][k + 2] = true;
  newGrid[i + 3][k + 3] = true;
  return newGrid;
}

function drawPulsar(i: number, k: number, grid: Grid) {
  const newGrid = [...grid];
  // Top part
  newGrid[i + 2][k + 4] = true;
  newGrid[i + 2][k + 5] = true;
  newGrid[i + 2][k + 6] = true;
  newGrid[i + 2][k + 10] = true;
  newGrid[i + 2][k + 11] = true;
  newGrid[i + 2][k + 12] = true;
  // Middle part
  newGrid[i + 4][k + 2] = true;
  newGrid[i + 4][k + 7] = true;
  newGrid[i + 4][k + 9] = true;
  newGrid[i + 4][k + 14] = true;
  newGrid[i + 5][k + 2] = true;
  newGrid[i + 5][k + 7] = true;
  newGrid[i + 5][k + 9] = true;
  newGrid[i + 5][k + 14] = true;
  newGrid[i + 6][k + 2] = true;
  newGrid[i + 6][k + 7] = true;
  newGrid[i + 6][k + 9] = true;
  newGrid[i + 6][k + 14] = true;
  // Bottom part
  newGrid[i + 7][k + 4] = true;
  newGrid[i + 7][k + 5] = true;
  newGrid[i + 7][k + 6] = true;
  newGrid[i + 7][k + 10] = true;
  newGrid[i + 7][k + 11] = true;
  newGrid[i + 7][k + 12] = true;
  return newGrid;
}

function drawRPentomino(i: number, k: number, grid: Grid) {
  const newGrid = [...grid];
  newGrid[i + 1][k + 2] = true;
  newGrid[i + 1][k + 3] = true;
  newGrid[i + 2][k + 1] = true;
  newGrid[i + 2][k + 2] = true;
  newGrid[i + 3][k + 2] = true;
  return newGrid;
}

function drawDieHard(i: number, k: number, grid: Grid) {
  const newGrid = [...grid];
  newGrid[i + 1][k + 2] = true;
  newGrid[i + 2][k + 2] = true;
  newGrid[i + 2][k + 3] = true;
  newGrid[i + 3][k + 3] = true;
  newGrid[i + 3][k + 7] = true;
  newGrid[i + 3][k + 8] = true;
  newGrid[i + 3][k + 9] = true;
  return newGrid;
}

function drawAcorn(i: number, j: number, grid: Grid) {
  const newGrid = [...grid];
  newGrid[i + 1][j + 2] = true;
  newGrid[i + 2][j + 4] = true;

  newGrid[i + 3][j + 1] = true;
  newGrid[i + 3][j + 2] = true;
  newGrid[i + 3][j + 5] = true;
  newGrid[i + 3][j + 6] = true;
  newGrid[i + 3][j + 7] = true;
  return newGrid;
}

export const PreFabs: Record<string, { draw: DrawPreFab; ascii: string[] }> = {
  dot: {
    draw: drawDot,
    ascii: ["  X  ", "     ", "     ", "     "],
  },
  glider: {
    draw: drawGlider,
    ascii: [" .X. ", " ...X", " XXX.", "     "],
  },
  lwss: {
    draw: drawLwss,
    ascii: [".X..X", "....X", "X...X", ".XXXX"],
  },
  blinker: {
    draw: drawBlinker,
    ascii: [" XXX ", "     ", "     ", "     "],
  },
  toad: {
    draw: drawToad,
    ascii: [".XXX", "XXX."],
  },
  beacon: {
    draw: drawBeacon,
    ascii: ["XX..", "XX..", "..XX", "..XX"],
  },
  pulsar: {
    draw: drawPulsar,
    ascii: [
      "..XXX...XXX..",
      ".............",
      "X....X.X....X",
      "X....X.X....X",
      "X....X.X....X",
      "..XXX...XXX..",
      ".............",
      "..XXX...XXX..",
      "X....X.X....X",
      "X....X.X....X",
      "X....X.X....X",
      "..XXX...XXX..",
    ],
  },
  rPentomino: {
    draw: drawRPentomino,
    ascii: [" .XX", "XX ", " .X "],
  },
  diehard: {
    draw: drawDieHard,
    ascii: [" .XX.....", "XX.X....", "...XXX.."],
  },
  acorn: {
    draw: drawAcorn,
    ascii: [" .X.....", "...X...", "XX..XXX"],
  },
  // pentadecatlhon: [],
  // beeHive: [],
  // loaf: [],
  // boat: [],
  // tub: [],
  // rPentomino: [],
  // diehard: [],
  // acorn: [],
  // gosperGliderGun: [],
};
