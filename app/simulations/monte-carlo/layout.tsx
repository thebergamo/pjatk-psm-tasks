import Link from "next/link";

export const metadata = {
  title: "Monte Carlo Method - PSM Tasks - PJATK 2023",
};

export default function MonteCarloLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col bg-gray-100">
      <header className="p-4">
        <h1 className="text-center font-display text-4xl font-bold drop-shadow-sm md:text-7xl md:leading-[5rem]">
          Monte Carlo Method
        </h1>
        <nav className="mt-2 text-center">
          <Link
            href="simulations/monte-carlo/polygon"
            className="text-xl hover:underline"
          >
            Polygon
          </Link>
          <Link
            href="simulations/monte-carlo/function"
            className="ml-4 text-xl hover:underline"
          >
            Function
          </Link>
        </nav>
      </header>
      <main className="p-4">{children}</main>
    </div>
  );
}
