import { useApp, useTick, Sprite } from "@pixi/react";
import { useCallback, useEffect, useState } from "react";
import { Boid, createInitialBoids, updateBoids } from "../lib/boid";

export interface Props {
  alignment: number;
  cohesion: number;
  separation: number;
  boids: number;
  mousePosition: { x: number; y: number };
  behavior: "follow" | "runaway" | "off";
}

// FlockSimulation component
const FlockSimulation = ({
  alignment,
  cohesion,
  separation,
  boids: totalBoids,
  mousePosition,
  behavior,
}: Props) => {
  const [boids, setBoids] = useState<Boid[]>([]); // State to hold the boids

  const app = useApp();
  // Function to initialize the boids
  const initializeBoids = useCallback(() => {
    setBoids(createInitialBoids(totalBoids));
  }, [totalBoids]);

  // Function to update the boids, this is where the boid logic goes
  const updateNewBoids = (delta: number) => {
    const newBoids = updateBoids(
      delta,
      {
        alignment,
        cohesion,
        separation,
        boundingBox: {
          width: app.screen.width,
          height: app.screen.height,
        },
        mousePosition: mousePosition,
        mouseBehavior: behavior,
      },
      boids,
    );
    setBoids(newBoids);
  };

  // Initialize boids when the component mounts
  useEffect(() => {
    initializeBoids();
  }, [initializeBoids, totalBoids]);

  useTick(updateNewBoids, Boolean(boids));

  return (
    <>
      {boids.map((boid, index) => (
        <Sprite
          key={index}
          image={new URL("/public/boid.png", import.meta.url).toString()}
          scale={{ x: 0.05, y: 0.05 }}
          x={boid.x}
          y={boid.y}
        />
      ))}
    </>
  );
};

export default FlockSimulation;
