import "./globals.css";
import cx from "classnames";
import { Analytics } from "@vercel/analytics/react";
import { sfPro, inter } from "./fonts";
import NavMenu from "@/components/Nav";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cx(sfPro.variable, inter.variable)}>
        <NavMenu />
        <main className="flex min-h-screen w-full flex-col items-center justify-center px-4 py-4">
          {children}
          <Analytics />
        </main>
      </body>
    </html>
  );
}
