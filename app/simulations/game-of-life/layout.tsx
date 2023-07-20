export const metadata = {
  title: "Game of Life - PSM Tasks - PJATK 2023",
};

export default function MonteCarloLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full flex-col bg-gray-100">
      <header className="p-4">
        <h1 className="text-center font-display text-4xl font-bold drop-shadow-sm md:text-7xl md:leading-[5rem]">
          Game of Life
        </h1>
      </header>
      <main className="justify-center p-4">{children}</main>
    </div>
  );
}
