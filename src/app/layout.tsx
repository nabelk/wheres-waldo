"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/lib/StoreProvider";
import GameTimer from "./component/gameTImer";
import { usePathname } from "next/navigation";
import GameCharacters from "./component/gameCharacters";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isGamePage = pathname === "/game";
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StoreProvider>
          {isGamePage && (
            <header className="sticky top-0 left-0 z-50 py-4 px-6 w-[100dvw] bg-[#3434ad] text-[#f7adee] flex flex-col justify-between sm:flex-row md:justify-around items-center">
              <GameCharacters />
              <GameTimer />
            </header>
          )}

          {children}
          <Toaster />
        </StoreProvider>
      </body>
    </html>
  );
}
