// Define the type for a boid
export interface Boid {
  x: number;
  y: number;
  dx: number;
  dy: number;
}
export interface Params {
  alignment: number;
  cohesion: number;
  separation: number;
  boundingBox: { width: number; height: number };
  mousePosition: { x: number; y: number };
  mouseBehavior: "follow" | "runaway" | "off";
}

export const createInitialBoids = (totalBoids: number) => {
  const initialBoids = [];
  // Define the clusters with their respective positions and number of boids
  const clusters = [
    { x: 100, y: 100, dx: 0.5, dy: 0.2, count: totalBoids * 0.1 },
    { x: 300, y: 200, dx: -0.3, dy: 0.4, count: totalBoids * 0.3 },
    { x: 200, y: 300, dx: 0.2, dy: -0.5, count: totalBoids * 0.6 },
  ];

  for (const cluster of clusters) {
    for (let i = 0; i < cluster.count; i++) {
      initialBoids.push({
        x: cluster.x + Math.random() * 50 - 25, // Randomize position within the cluster range
        y: cluster.y + Math.random() * 50 - 25, // Randomize position within the cluster range
        dx: Math.random() - cluster.dx,
        dy: Math.random() - cluster.dy,
      });
    }
  }

  return initialBoids;
};

const followMouse = (
  boid: Boid,
  mousePosition: Params["mousePosition"],
  delta: number,
) => {
  const followStrength = 10; // Adjust as needed
  const followRadius = 200; // Adjust as needed
  const distanceToMouse = Math.hypot(
    boid.x - mousePosition.x,
    boid.y - mousePosition.y,
  );

  if (distanceToMouse < followRadius) {
    const directionX = mousePosition.x - boid.x;
    const directionY = mousePosition.y - boid.y;

    const normalizedDirectionX = directionX / distanceToMouse;
    const normalizedDirectionY = directionY / distanceToMouse;

    const forceX = normalizedDirectionX * followStrength;
    const forceY = normalizedDirectionY * followStrength;

    boid.dx += forceX * delta;
    boid.dy += forceY * delta;
  }
};

const runAwayMouse = (
  boid: Boid,
  mousePosition: Params["mousePosition"],
  delta: number,
) => {
  const runAwayStrength = 10; // Adjust as needed
  const runAwayRadius = 200; // Adjust as needed
  const distanceToMouse = Math.hypot(
    boid.x - mousePosition.x,
    boid.y - mousePosition.y,
  );

  if (distanceToMouse < runAwayRadius) {
    const directionX = boid.x - mousePosition.x;
    const directionY = boid.y - mousePosition.y;

    const normalizedDirectionX = directionX / distanceToMouse;
    const normalizedDirectionY = directionY / distanceToMouse;

    const forceX = normalizedDirectionX * runAwayStrength;
    const forceY = normalizedDirectionY * runAwayStrength;

    boid.dx += forceX * delta;
    boid.dy += forceY * delta;
  }
};

export const updateBoids = (
  delta: number,
  {
    alignment,
    cohesion,
    separation,
    boundingBox,
    mousePosition,
    mouseBehavior,
  }: Params,
  boids: Boid[],
): Boid[] => {
  const { width, height } = boundingBox;

  return boids.map((boid, index, boidsArray) => {
    let alignmentForce = { x: 0, y: 0 };
    let cohesionForce = { x: 0, y: 0 };
    let separationForce = { x: 0, y: 0 };

    boidsArray.forEach((otherBoid, otherIndex) => {
      if (index !== otherIndex) {
        // Alignment: Steer towards the average heading of local flockmates
        alignmentForce.x += otherBoid.dx;
        alignmentForce.y += otherBoid.dy;

        // Cohesion: Steer to move toward the average position of local flockmates
        cohesionForce.x += otherBoid.x - boid.x;
        cohesionForce.y += otherBoid.y - boid.y;

        // Separation: Steer to avoid crowding local flockmates
        let distance = Math.hypot(otherBoid.x - boid.x, otherBoid.y - boid.y);
        if (distance < 20) {
          separationForce.x -= otherBoid.x - boid.x;
          separationForce.y -= otherBoid.y - boid.y;
        }
      }
    });

    // Normalize forces
    let alignmentMagnitude = Math.hypot(alignmentForce.x, alignmentForce.y);
    let cohesionMagnitude = Math.hypot(cohesionForce.x, cohesionForce.y);
    let separationMagnitude = Math.hypot(separationForce.x, separationForce.y);

    if (alignmentMagnitude > 0) {
      alignmentForce.x /= alignmentMagnitude;
      alignmentForce.y /= alignmentMagnitude;
    }
    if (cohesionMagnitude > 0) {
      cohesionForce.x /= cohesionMagnitude;
      cohesionForce.y /= cohesionMagnitude;
    }
    if (separationMagnitude > 0) {
      separationForce.x /= separationMagnitude;
      separationForce.y /= separationMagnitude;
    }

    if (mouseBehavior !== "off") {
      const isMouseInsideStage =
        mousePosition.x >= 0 &&
        mousePosition.x <= width &&
        mousePosition.y >= 0 &&
        mousePosition.y <= height;

      if (isMouseInsideStage) {
        if (mouseBehavior === "follow") {
          followMouse(boid, mousePosition, delta);
        } else if (mouseBehavior === "runaway") {
          runAwayMouse(boid, mousePosition, delta);
        }
      }
    }

    // Update velocity
    let dx =
      boid.dx +
      (alignmentForce.x * alignment +
        cohesionForce.x * cohesion +
        separationForce.x * separation) *
        delta;
    let dy =
      boid.dy +
      (alignmentForce.y * alignment +
        cohesionForce.y * cohesion +
        separationForce.y * separation) *
        delta;

    // Limit maximum velocity
    let speed = Math.hypot(dx, dy);
    let maxSpeed = 10; // Adjust as needed
    if (speed > maxSpeed) {
      dx = (dx / speed) * maxSpeed;
      dy = (dy / speed) * maxSpeed;
    }

    // Update position
    let x = boid.x + dx * delta;
    let y = boid.y + dy * delta;

    // Check if the boid has hit the edge
    if (x < 0 || x > width) {
      dx *= -1; // invert x velocity
      x = x < 0 ? 0 : width; // clamp x position to within the boundary
    }
    if (y < 0 || y > height) {
      dy *= -1; // invert y velocity
      y = y < 0 ? 0 : height; // clamp y position to within the boundary
    }

    return {
      ...boid,
      dx: dx,
      dy: dy,
      x: x,
      y: y,
    };
  });
};
