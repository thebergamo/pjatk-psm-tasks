"use client";
import React, { useEffect, useState } from "react";
import { CurveChart } from "@/app/simulations/monte-carlo/components/Chart";
import { SamplePoint } from "../lib/polygon";
import { generateCurveSampleData } from "../lib/curve";
import { useForm } from "react-hook-form";
import * as math from "mathjs";
import { calculateCurveArea } from "../lib/area";

type CurveProps = {
  fn: string;
  box: { minX: number; maxX: number; minY: number; maxY: number };
  samples: number;
};

interface FormValues {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
  samples: number;
  fn: string;
}

type FormProps = {
  onSubmit: (data: CurveProps) => void;
};

const isValidFunction = (fnString: string) => {
  try {
    const result = math.evaluate(fnString, { x: 0 });
    return typeof result === "number";
  } catch {
    return false;
  }
};

const Form = ({ onSubmit }: FormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const submitForm = (data: FormValues) => {
    console.log("data", data);
    //const fn = math.compile(data.fn).evaluate;
    onSubmit({
      box: {
        minX: Number(data.minX),
        maxX: Number(data.maxX),
        minY: Number(data.minY),
        maxY: Number(data.maxY),
      },
      samples: Number(data.samples),
      fn: data.fn, //(x: number) => math.evaluate(data.fn, { x }),
    });
  };

  return (
    <form onSubmit={handleSubmit(submitForm)} className="space-y-4">
      <div>
        <div className="flex space-x-4">
          <div className="flex-1">
            <label
              htmlFor="minX"
              className="block text-sm font-medium text-gray-700"
            >
              Minimum X
            </label>
            <input
              id="minX"
              type="number"
              {...register("minX", { required: true })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            {errors.minX && (
              <span className="text-xs text-red-500">
                This field is required
              </span>
            )}
          </div>
          <div className="flex-1">
            <label
              htmlFor="maxX"
              className="block text-sm font-medium text-gray-700"
            >
              Maximum X
            </label>
            <input
              id="maxX"
              type="number"
              {...register("maxX", {
                required: true,
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            {errors.maxX && (
              <span className="text-xs text-red-500">
                This field is required
              </span>
            )}
          </div>
        </div>

        <div className="flex space-x-4">
          <div className="flex-1">
            <label
              htmlFor="minY"
              className="block text-sm font-medium text-gray-700"
            >
              Minimum Y
            </label>
            <input
              id="minY"
              type="number"
              {...register("minY", { required: true })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            {errors.minY && (
              <span className="text-xs text-red-500">
                This field is required
              </span>
            )}
          </div>
          <div className="flex-1">
            <label
              htmlFor="maxY"
              className="block text-sm font-medium text-gray-700"
            >
              Maximum Y
            </label>
            <input
              id="maxY"
              type="number"
              {...register("maxY", { required: true })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            {errors.maxY && (
              <span className="text-xs text-red-500">
                This field is required
              </span>
            )}
          </div>
        </div>
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
        <label htmlFor="fn" className="block text-sm font-medium text-gray-700">
          Function (format: )
        </label>
        <input
          id="fn"
          type="text"
          {...register("fn", { required: true, validate: isValidFunction })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        {errors.fn && (
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
  box: CurveProps["box"];
  sampleData: SamplePoint[];
};

const Results = ({ box, sampleData }: ResultsProps) => {
  const area = calculateCurveArea(
    sampleData.filter(({ inside }) => inside).length,
    sampleData.length,
    (box.maxX - box.minX) * (box.maxY - box.minY),
  );
  return (
    <div className="w-full text-center">
      <h3 className="text-xl">
        Area:{" "}
        <p className="font-bold">{new Intl.NumberFormat().format(area)}</p>
      </h3>
      <p>Points inside: {sampleData.filter(({ inside }) => inside).length}</p>
      <p>Points outside: {sampleData.filter(({ inside }) => !inside).length}</p>
    </div>
  );
};

export default function Page() {
  const [data, setData] = useState<CurveProps | null>(null);
  const [sampleData, setSampleData] = useState<SamplePoint[] | null>(null);
  const handleFormSubmit = (formData: CurveProps) => {
    setData(formData);
  };

  useEffect(() => {
    if (data) {
      setSampleData(generateCurveSampleData(data.box, data.samples, data.fn));
    }
  }, [data]);

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md">
        <h2 className="pb-4 text-center text-2xl">Simulation Parameters</h2>
        <Form onSubmit={handleFormSubmit} />
      </div>
      {data && sampleData && (
        <div className="mt-8 w-full max-w-2xl">
          <h2 className="p-2 text-center text-2xl">Results</h2>
          <Results box={data.box} sampleData={sampleData} />
          <h2 className="p-2 text-center text-2xl">Chart Preview</h2>
          <CurveChart box={data.box} sampleData={sampleData} fn={data.fn} />
        </div>
      )}
    </div>
  );
}
