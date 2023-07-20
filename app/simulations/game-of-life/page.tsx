"use client";
import { useEffect, useState } from "react";

import { Grid as GridType, calculateNextGrid, emptyGrid } from "./lib/grid";
import { PreFabs } from "./lib/preFabs";
import { Grid } from "./components/Grid";
import { Form, GameSettings } from "./components/SettingsForm";
import { Statistics } from "./components/Statistics";

const intialSettings: GameSettings = {
  gridSize: 20,
  speed: 1,
  toroidalArray: false,
};

// 1 <- slower 2000
// 10 <- faster 5000 / 10
const SPEED = 2000;

type GameState = {
  grid: GridType[];
  isInitial: boolean;
};

type Patterns = keyof typeof PreFabs;

export default function Page() {
  const [data, setData] = useState<GameSettings>(intialSettings);
  const [state, setState] = useState<GameState>({
    grid: [emptyGrid(20, 20)],
    isInitial: true,
  });
  const [activeState, setActiveState] = useState<number | null>(null);
  const [running, setRunning] = useState(false);
  const [selectedPattern, setSelectedPattern] = useState<Patterns>("dot");
  const [isPreFabsCollapsed, setIsPreFabsCollapsed] = useState(false);

  const grid = state.grid[activeState ?? state.grid.length - 1];

  const handleNewGrid = (newGrid?: GridType, initial?: boolean) => {
    setState((prevState) => ({
      ...prevState,
      ...(initial !== undefined ? { isInitial: initial } : {}),
      grid: [
        ...prevState.grid,
        newGrid
          ? newGrid
          : calculateNextGrid(
              prevState.grid[prevState.grid.length - 1],
              data.toroidalArray,
            ),
      ],
    }));
  };

  const resetGrid = (newGrid: GridType) => {
    setState(() => ({ isInitial: true, grid: [newGrid] }));
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (running) {
      timer = setInterval(() => {
        setActiveState(null);
        setState((prevState) => ({
          ...prevState,
          isInitial: false,
          grid: [
            ...(prevState.isInitial ? [] : prevState.grid),

            calculateNextGrid(
              prevState.grid[prevState.grid.length - 1],
              data.toroidalArray,
            ),
          ],
        }));
      }, SPEED / data.speed);
    }
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [running]);

  const handleFormSubmit = (formData: GameSettings) => {
    if (data.gridSize !== formData.gridSize) {
      const newGrid = emptyGrid(formData.gridSize, formData.gridSize);
      // reset state
      resetGrid(newGrid);
    }
    setData({ ...formData });
  };

  const handleCellClick = ([i, k]: [number, number]) => {
    const newGrid = PreFabs[selectedPattern].draw(i, k, grid);
    handleNewGrid(newGrid);
  };

  return (
    <div className="flex justify-center gap-4 space-x-4">
      <div className="w-1/3">
        <div className="mb-4 flex w-full flex-col rounded bg-white p-4">
          <h2 className="mb-2 text-center text-2xl">Game Controls</h2>
          <div className="mb-4 flex w-full justify-center gap-4">
            <button
              onClick={() => {
                console.log("click");
                setRunning(true);
              }}
              disabled={running || undefined}
              className="rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm disabled:bg-gray-400"
            >
              Start
            </button>
            <button
              onClick={() => setRunning(false)}
              disabled={!running}
              className="justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm disabled:bg-gray-400"
            >
              Stop
            </button>
          </div>
          <h2 className="mb-2 text-center text-xl">Time travel</h2>
          <div className="flex w-full justify-center gap-4">
            <button
              onClick={() => {
                setRunning(false);
                setActiveState(0);
              }}
              disabled={activeState === 0}
              className="rounded-md border border-transparent bg-violet-600 px-4 py-2 text-sm font-medium text-white shadow-sm disabled:bg-violet-200"
            >
              First
            </button>
            <button
              onClick={() => {
                setRunning(false);
                setActiveState((prevActiveState) => {
                  console.log("PREV", prevActiveState);
                  return prevActiveState
                    ? --prevActiveState
                    : state.grid.length - 2;
                });
              }}
              disabled={activeState === 0}
              className="rounded-md border border-transparent bg-violet-600 px-4 py-2 text-sm font-medium text-white shadow-sm disabled:bg-violet-200"
            >
              Previous
            </button>
            <button
              onClick={() => {
                setRunning(false);
                setActiveState((prevActiveState) => {
                  console.log("NEXT", prevActiveState);
                  return prevActiveState !== null ? ++prevActiveState : 0;
                });
              }}
              disabled={
                activeState === null || activeState === state.grid.length - 1
              }
              className="rounded-md border border-transparent bg-violet-600 px-4 py-2 text-sm font-medium text-white shadow-sm disabled:bg-violet-200"
            >
              Next
            </button>
            <button
              onClick={() => {
                setRunning(false);
                setActiveState(state.grid.length - 1);
              }}
              disabled={
                activeState === null || activeState === state.grid.length - 1
              }
              className="rounded-md border border-transparent bg-violet-600 px-4 py-2 text-sm font-medium text-white shadow-sm disabled:bg-violet-200"
            >
              Last
            </button>
          </div>
        </div>

        <div className="mb-4 flex w-full flex-col rounded bg-white p-4">
          <h2 className="mb-2 text-center text-xl">
            PreFabs
            <button
              onClick={() => setIsPreFabsCollapsed(!isPreFabsCollapsed)}
              className="ml-2"
            >
              {isPreFabsCollapsed ? "+" : "-"}
            </button>
          </h2>
          {!isPreFabsCollapsed && (
            <div className="flex flex-wrap justify-center gap-4">
              {Object.entries(PreFabs).map(([key, { ascii }]) => (
                <label
                  key={key}
                  className="m-2 flex w-1/4 flex-col items-center rounded border p-2"
                >
                  <div>
                    {ascii.map((line, i) => (
                      <pre key={i}>{line}</pre>
                    ))}
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="pattern"
                      className="mr-2"
                      value={key}
                      checked={selectedPattern === key}
                      onChange={() => setSelectedPattern(key as Patterns)}
                    />
                    {key}
                  </div>
                </label>
              ))}
            </div>
          )}
        </div>

        <div className="w-full rounded bg-white p-4">
          <h2 className="text-center text-2xl">Simulation Parameters</h2>
          <Form
            onSubmit={handleFormSubmit}
            isRunning={running}
            defaultValues={intialSettings}
          />
        </div>

        <Statistics state={state} activeState={activeState} />
      </div>
      <div className="w-1/3 rounded-lg bg-white p-4 shadow">
        <Grid grid={grid} onCellClick={handleCellClick} />
      </div>
    </div>
  );
}
