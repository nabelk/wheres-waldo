"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  reset,
  setIsCharacterFound,
  setClickPosition,
} from "@/lib/features/game/gameSlice";
import Link from "next/link";
import Leaderboard from "./component/leaderboard";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

export default function WaldoHome() {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const leaderboard = searchParams.get("leaderboard");
  const error = searchParams.get("error");

  useEffect(() => {
    dispatch(reset());
    dispatch(
      setIsCharacterFound([
        { name: "Waldo", found: false },
        { name: "Wizard", found: false },
        { name: "Odlaw", found: false },
      ])
    );
    dispatch(setClickPosition({ x: 0, y: 0 }));
  }, [dispatch, searchParams]);

  useEffect(() => {
    if (error) {
      toast.error("Please don't cheat", {
        style: {
          color: "#f7adee",
          backgroundColor: "#440829",
        },
      });
      const url = new URL(window.location.href);
      if (url.searchParams.has("error")) {
        url.searchParams.delete("error");
        window.history.replaceState(null, "", url.toString());
      }
    }
  }, [searchParams]);

  return (
    <div className="flex text-[#f7adee] flex-col items-center justify-center min-h-screen bg-[#3434ad] p-4">
      <h1 className="text-4xl md:text-6xl font-bold  mb-6 text-center">
        Where&apos;s Waldo?
      </h1>
      <p className="text-lg md:text-xl mb-8 text-center">
        Find the characters as fast as you can!
      </p>
      <div className="flex gap-2 flex-wrap justify-center">
        <Link
          href="/game"
          className="px-6 py-3 bg-[#440829] text-lg md:text-xl font-semibold rounded-lg shadow-md hover:bg-[#440829dc] transition"
        >
          Start Game
        </Link>
        <Leaderboard modalOpen={leaderboard ? true : false} />
      </div>
    </div>
  );
}
