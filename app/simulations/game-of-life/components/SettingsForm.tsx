import { useForm } from "react-hook-form";

export type GameSettings = {
  toroidalArray: boolean;
  gridSize: number;
  speed: number;
};

type FormProps = {
  onSubmit: (data: GameSettings) => void;
  isRunning: boolean;
  defaultValues: GameSettings;
};
export const Form = ({ onSubmit, isRunning, defaultValues }: FormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GameSettings>({ defaultValues });
  const submitForm = (data: GameSettings) => {
    onSubmit({
      toroidalArray: data.toroidalArray,
      gridSize: Number(data.gridSize),
      speed: Number(data.speed),
    });
  };

  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className="space-y-4 rounded bg-white"
    >
      <div>
        <div className="flex space-x-4">
          <div className="flex-1">
            <label
              htmlFor="toroidalArray"
              className="block text-sm font-medium text-gray-700"
            >
              Toroidal Array
            </label>
            <input
              id="toroidalArray"
              type="checkbox"
              {...register("toroidalArray")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div className="flex-1">
            <label
              htmlFor="b"
              className="block text-sm font-medium text-gray-700"
            >
              Grid Size
            </label>
            <select
              id="gridSize"
              {...register("gridSize")}
              disabled={isRunning || undefined}
            >
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="50">50</option>
            </select>

            {errors.gridSize && (
              <span className="text-xs text-red-500">
                This field is required
              </span>
            )}
          </div>
          <div>
            <label
              htmlFor="speed"
              className="block text-sm font-medium text-gray-700"
            >
              Speed
            </label>
            <input
              id="speed"
              type="number"
              max={10}
              {...register("speed", { required: true })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            {errors.speed && (
              <span className="text-xs text-red-500">
                This field is required
              </span>
            )}
          </div>
        </div>
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
