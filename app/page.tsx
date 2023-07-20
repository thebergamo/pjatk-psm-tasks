import Link from "next/link";

export const metadata = {
  title: "PSM Tasks - PJATK 2023",
};

export default async function Home() {
  return (
    <>
      <div className="z-10 w-full max-w-xl px-5 xl:px-0">
        <h1 className="text-center font-display text-4xl font-bold tracking-[-0.02em] drop-shadow-sm md:text-7xl md:leading-[5rem]">
          PSM
        </h1>
      </div>
      <div className="my-10 grid w-full max-w-screen-xl animate-fade-up grid-cols-1 gap-5 px-5 md:grid-cols-3 xl:px-0">
        <div className="flex flex-col items-center">
          <Link
            href="/simulations/roots"
            className="mb-2 text-center text-xl font-medium text-blue-500 underline"
          >
            Roots
          </Link>
          <p className="text-gray-600">
            Application that finds the roots of any nonlinear equation entered
            as initial data, solved by Bisect, Regula Falsi and Secant method{" "}
          </p>
        </div>
        <div className="flex flex-col items-center">
          <Link
            href="/simulations/integrals"
            className="mb-2 text-center text-xl font-medium text-blue-500 underline"
          >
            Integrals
          </Link>
          <p className="text-gray-600">
            Application that implements numerical integration using Rectangles,
            Trapezoidal and Parabol methods.
          </p>
        </div>
        <div className="flex flex-col items-center">
          <Link
            href="/simulations/monte-carlo"
            className="mb-2 text-center text-xl font-medium text-blue-500 underline"
          >
            Monte Carlo
          </Link>
          <p className="text-gray-600">
            Application that calculates the area of polygons and functions.
          </p>
        </div>
        <div className="flex flex-col items-center">
          <Link
            href="/simulations/game-of-life"
            className="mb-2 text-center text-xl font-medium text-blue-500 underline"
          >
            Game of life
          </Link>
          <p className="text-gray-600">
            Application that implements a version of Game of Life.
          </p>
        </div>
        <div className="flex flex-col items-center">
          <Link
            href="/simulations/flock"
            className="mb-2 text-center text-xl font-medium text-blue-500 underline"
          >
            Flock
          </Link>
          <p className="text-gray-600">
            Application that implements a version of Flock simulation.
          </p>
        </div>
      </div>
    </>
  );
}
