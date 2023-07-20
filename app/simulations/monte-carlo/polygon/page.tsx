"use client";
import { calculateArea } from "@/app/simulations/monte-carlo/lib/area";
import {
  SamplePoint,
  Vertices,
  generateSamplePoints,
} from "@/app/simulations/monte-carlo/lib/polygon";
import React, { useEffect, useState } from "react";
import { Chart } from "@/app/simulations/monte-carlo/components/Chart";
import type { Point } from "@/app/simulations/monte-carlo/components/Chart";
import { useForm } from "react-hook-form";

const square: Vertices = [
  [100, 100],
  [400, 100],
  [400, 400],
  [100, 400],
];

const triangle: Vertices = [
  [250, 250],
  [400, 400],
  [400, 100],
];

const newTriangle = [
  { x: 250, y: 250 },
  { x: 400, y: 400 },
  { x: 400, y: 100 },
];

type ChartProps = {
  polygon: Point[];
  box: { width: number; height: number };
  samples: number;
};

interface FormValues {
  boxWidth: number;
  boxHeight: number;
  samples: number;
  polygon: string;
}

type FormProps = {
  onSubmit: (data: ChartProps) => void;
};

const Form = ({ onSubmit }: FormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const submitForm = (data: FormValues) => {
    const polygon = data.polygon.split(";").map((point) => {
      const [x, y] = point.split(",").map(Number);

      return { x, y };
    });

    onSubmit({
      box: { width: Number(data.boxWidth), height: Number(data.boxHeight) },
      samples: Number(data.samples),
      polygon,
    });
  };

  return (
    <form onSubmit={handleSubmit(submitForm)} className="space-y-4">
      <div>
        <label
          htmlFor="boxWidth"
          className="block text-sm font-medium text-gray-700"
        >
          Box Width
        </label>
        <input
          id="boxWidth"
          type="number"
          {...register("boxWidth", { required: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        {errors.boxWidth && (
          <span className="text-xs text-red-500">This field is required</span>
        )}
      </div>

      <div>
        <label
          htmlFor="boxHeight"
          className="block text-sm font-medium text-gray-700"
        >
          Box Height
        </label>
        <input
          id="boxHeight"
          type="number"
          {...register("boxHeight", { required: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        {errors.boxHeight && (
          <span className="text-xs text-red-500">This field is required</span>
        )}
      </div>

      <div>
        <label
          htmlFor="samples"
          className="block text-sm font-medium text-gray-700"
        >
          Samples
        </label>
        <input
          id="samples"
          type="number"
          {...register("samples", { required: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        {errors.samples && (
          <span className="text-xs text-red-500">This field is required</span>
        )}
      </div>

      <div>
        <label
          htmlFor="polygon"
          className="block text-sm font-medium text-gray-700"
        >
          Polygon (format: x1,y1;x2,y2;x3,y3)
        </label>
        <input
          id="polygon"
          type="text"
          {...register("polygon", { required: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        {errors.polygon && (
          <span className="text-xs text-red-500">This field is required</span>
        )}
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

type ResultsProps = {
  box: ChartProps["box"];
  sampleData: SamplePoint[];
};

const Results = ({ box, sampleData }: ResultsProps) => {
  return (
    <div className="w-full text-center">
      <h3 className="text-xl">
        Area:{" "}
        <p className="font-bold">
          {new Intl.NumberFormat().format(
            calculateArea(
              sampleData.filter(({ inside }) => inside).length,
              sampleData.length,
              box.width * box.height,
            ),
          )}
        </p>
      </h3>
      <p>Points inside: {sampleData.filter(({ inside }) => inside).length}</p>
      <p>Points outside: {sampleData.filter(({ inside }) => !inside).length}</p>
    </div>
  );
};

export default function Page() {
  const [data, setData] = useState<ChartProps | null>(null);
  const [sampleData, setSampleData] = useState<SamplePoint[] | null>(null);
  const handleFormSubmit = (formData: ChartProps) => {
    setData(formData);
  };

  useEffect(() => {
    if (data) {
      setSampleData(generateSamplePoints(data.box, data.samples, data.polygon));
    }
  }, [data]);

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md">
        <h2 className="text-center text-2xl">Simulation Parameters</h2>
        <Form onSubmit={handleFormSubmit} />
      </div>
      {data && sampleData && (
        <div className="mt-8 w-full max-w-2xl">
          <h2 className="p-2 text-center text-2xl">Results</h2>
          <Results box={data.box} sampleData={sampleData} />
          <h2 className="p-2 text-center text-2xl">Chart Preview</h2>
          <Chart
            polygon={data.polygon}
            box={data.box}
            sampleData={sampleData}
          />
        </div>
      )}
    </div>
  );
}
