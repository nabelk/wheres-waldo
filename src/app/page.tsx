"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { reset, setIsCharacterFound } from "@/lib/features/game/gameSlice";
import Link from "next/link";

export default function WaldoHome() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(reset());
    dispatch(
      setIsCharacterFound([
        { name: "Waldo", found: false },
        { name: "Wizard", found: false },
        { name: "Odlaw", found: false },
      ])
    );
  }, [dispatch]);

  return (
    <div className="flex text-[#f7adee] flex-col items-center justify-center min-h-screen bg-[#3434ad] p-4">
      <h1 className="text-4xl md:text-6xl font-bold  mb-6 text-center">
        Where's Waldo?
      </h1>
      <p className="text-lg md:text-xl mb-8 text-center">
        Find the characters as fast as you can!
      </p>
      <Link
        href="/game"
        className="px-6 py-3 bg-[#440829] text-lg md:text-xl font-semibold rounded-lg shadow-md hover:bg-[#440829dc] transition"
      >
        Start Game
      </Link>
    </div>
  );
}
