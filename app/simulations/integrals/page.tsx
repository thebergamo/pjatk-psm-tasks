"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { MethodProperties } from "./lib/methods";
import { MethodResults } from "./components/MethodResults";

type FormProps = {
  onSubmit: (data: MethodProperties) => void;
};

const Form = ({ onSubmit }: FormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MethodProperties>();
  const submitForm = (data: MethodProperties) => {
    onSubmit({
      a: Number(data.a),
      b: Number(data.b),
      divisions: Number(data.divisions),
      fn: data.fn,
    });
  };

  return (
    <form onSubmit={handleSubmit(submitForm)} className="space-y-4">
      <div>
        <div className="flex space-x-4">
          <div className="flex-1">
            <label
              htmlFor="a"
              className="block text-sm font-medium text-gray-700"
            >
              A
            </label>
            <input
              id="a"
              type="number"
              {...register("a", { required: true })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            {errors.a && (
              <span className="text-xs text-red-500">
                This field is required
              </span>
            )}
          </div>
          <div className="flex-1">
            <label
              htmlFor="b"
              className="block text-sm font-medium text-gray-700"
            >
              B
            </label>
            <input
              id="b"
              type="number"
              {...register("b", {
                required: true,
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            {errors.b && (
              <span className="text-xs text-red-500">
                This field is required
              </span>
            )}
          </div>
        </div>
      </div>

      <div>
        <label
          htmlFor="divisions"
          className="block text-sm font-medium text-gray-700"
        >
          Max Divisions
        </label>
        <input
          id="divisions"
          type="number"
          {...register("divisions", { required: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        {errors.divisions && (
          <span className="text-xs text-red-500">This field is required</span>
        )}
      </div>

      <div>
        <label htmlFor="fn" className="block text-sm font-medium text-gray-700">
          Function
        </label>
        <input
          id="fn"
          type="text"
          {...register("fn", { required: true })}
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

export default function Page() {
  const [data, setData] = useState<MethodProperties | null>(null);

  const handleFormSubmit = (formData: MethodProperties) => {
    setData({ ...formData });
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md">
        <h2 className="text-center text-2xl">Simulation Parameters</h2>
        <Form onSubmit={handleFormSubmit} />
      </div>
      {data && <MethodResults {...data} />}
    </div>
  );
}
