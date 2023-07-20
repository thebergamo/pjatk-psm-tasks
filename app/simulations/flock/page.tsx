"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import FlockSimulation from "./components/Flock";
import { Stage } from "@pixi/react";

interface FlockProps {
  alignment: number;
  cohesion: number;
  separation: number;
  boids: number;
  behavior: "follow" | "runaway" | "off";
}

type FormProps = {
  defaultValues: FlockProps;
  onSubmit: (data: FlockProps) => void;
};

interface FormFields {
  alignment: number;
  cohesion: number;
  separation: number;
  boids: number;
  behavior: "follow" | "runaway" | "off";
}

const Form = ({ onSubmit, defaultValues }: FormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({ defaultValues });
  const submitForm = (data: FormFields) => {
    onSubmit({
      alignment: Number(data.alignment),
      cohesion: Number(data.cohesion),
      separation: Number(data.separation),
      boids: Number(data.boids),
      behavior: data.behavior,
    });
  };

  return (
    <form onSubmit={handleSubmit(submitForm)} className="space-y-4">
      <div>
        <label htmlFor="a" className="block text-sm font-medium text-gray-700">
          Alignment
        </label>
        <input
          id="alignment"
          type="number"
          step="0.1"
          {...register("alignment", { required: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        {errors.alignment && (
          <span className="text-xs text-red-500">This field is required</span>
        )}
      </div>

      <div>
        <label
          htmlFor="cohesion"
          className="block text-sm font-medium text-gray-700"
        >
          Cohesion
        </label>
        <input
          id="cohesion"
          type="number"
          step="0.1"
          {...register("cohesion", { required: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        {errors.cohesion && (
          <span className="text-xs text-red-500">This field is required</span>
        )}
      </div>

      <div>
        <label
          htmlFor="separation"
          className="block text-sm font-medium text-gray-700"
        >
          Separation
        </label>
        <input
          id="separation"
          type="number"
          step="0.1"
          {...register("separation", { required: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        {errors.separation && (
          <span className="text-xs text-red-500">This field is required</span>
        )}
      </div>

      <div>
        <label
          htmlFor="boids"
          className="block text-sm font-medium text-gray-700"
        >
          Number of Boids
        </label>
        <input
          id="boids"
          type="number"
          {...register("boids", { required: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        {errors.boids && (
          <span className="text-xs text-red-500">This field is required</span>
        )}
      </div>

      <div>
        <label>
          <input
            type="radio"
            value="follow"
            {...register("behavior")}
            className="mr-2"
          />
          Follow Mouse
        </label>
        <br />
        <label>
          <input
            type="radio"
            value="runaway"
            {...register("behavior")}
            className="mr-2"
          />
          Run Away Mouse
        </label>
        <br />
        <label>
          <input
            type="radio"
            value="off"
            {...register("behavior")}
            className="mr-2"
          />
          Default
        </label>
      </div>

      <button
        type="submit"
        className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm"
      >
        Submit
      </button>
    </form>
  );
};

const defaultValues: FlockProps = {
  alignment: 0.5,
  cohesion: 0.2,
  separation: 2,
  boids: 10,
  behavior: "off",
};
export default function Page() {
  const [data, setData] = useState<FlockProps>(defaultValues);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleFormSubmit = (formData: FlockProps) => {
    setData({ ...formData });
  };

  const handleMouseMove = (event: MouseEvent) => {
    const rect = (
      event.currentTarget as HTMLDivElement
    ).getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    // Check if the mouse is inside the Stage
    if (
      mouseX >= 0 &&
      mouseX <= rect.width &&
      mouseY >= 0 &&
      mouseY <= rect.height
    ) {
      setMousePosition({ x: mouseX, y: mouseY });
    } else {
      // Reset the mouse position to (-1, -1)
      setMousePosition({ x: -1, y: -1 });
    }
  };

  useEffect(() => {
    const stageElement = document.getElementById("stage-container");
    stageElement?.addEventListener("mousemove", handleMouseMove);
    return () => {
      stageElement?.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="flex justify-center gap-4 space-x-4">
      <div className="w-1/4">
        <div className="w-full max-w-md">
          <h2 className="pb-4 text-center text-2xl">Simulation Parameters</h2>
          <Form onSubmit={handleFormSubmit} defaultValues={defaultValues} />
        </div>
      </div>
      <div
        id="stage-container"
        className="relative rounded-lg bg-white p-4 shadow"
      >
        <Stage
          options={{
            width: 500,
            height: 500,
            antialias: true,
            backgroundAlpha: 0,
          }}
        >
          <FlockSimulation {...data} mousePosition={mousePosition} />
        </Stage>
      </div>
    </div>
  );
}
