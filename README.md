# PSM Project - Simulations

===

This is a project that aims to create 5 simulations projects based on the list requirements from PSM subject during the course of Computer Science from [PJATK](https://pja.edu.pl/).

## Technologies

It is implemented using the following technologies:

- [React.js](https://react.dev/)
- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwindcss](https://tailwindcss.com/)
- [mathjs](https://mathjs.org/std)
- [stdlib/random-base-uniform](https://github.com/stdlib-js/random-base-uniform)
- [Recharts](https://recharts.org/en-US/)
- [Pixi](https://pixijs.com/)

## Projects

The presented simulation projects are implemented inside the [app/simulations](app/simulations) directory and are split into their own directory with the components and utilities colocated in it.

1. [Roots](app/simulations/roots/) - Application that finds the roots of any nonlinear equation entered as initial data, solved by Bisect, Regula Falsi and Secant method.
2. [Integrals](app/simulations/integrals/) - Application that implements numerical integration suing Rectangles, Trapezoidal and Parabol methods.
3. [Monte Carlo](app/simulations//monte-carlo/) - Application that calculates the area of polygons and functions.
4. [Game of Life](app/simulations/game-of-life/) - Application that implements a version of Conway's Game of life.
5. [Flock](app/simulations/flock/) - Application that implements a version of Flock Simulation.

## Get Started

This project uses `pnpm` as dependency manager cli due to it's more efficient usage of disk.

To install the dependencies:

```bash
pnpm install
```

Run dev mode to visualize locally your project:

```bash
pnpm dev
```

It also uses Eslint and Prettier to keep standardization across the source code:

```bash
pnpm run lint
```

```bash
pnpm run format
```

## Deployment

The deployment is done using [Vercel]() due to it's easy integration with Github and Next.js and more specially it's free tier <3
