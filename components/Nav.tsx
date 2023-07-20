"use client";
import Link from "next/link";

import { usePathname } from "next/navigation";

const NavMenu = () => {
  const pathname = usePathname();
  if (pathname === "/") {
    return null;
  }
  return (
    <nav className="top-0 flex w-full items-center justify-between bg-gray-900 px-5 py-4 text-white">
      <div>
        <Link href="/">
          <p className="text-2xl font-bold">PSM</p>
        </Link>
      </div>
      <ul className="flex space-x-4">
        <li>
          <Link href="/simulations/roots">Roots</Link>
        </li>
        <li>
          <Link href="/simulations/integrals">Integrals</Link>
        </li>
        <li>
          <Link href="/simulations/monte-carlo/polygon">Monte Carlo</Link>
        </li>
        <li>
          <Link href="/simulations/game-of-life">Game of Life</Link>
        </li>
        <li>
          <Link href="/simulations/flock">Flock</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavMenu;
