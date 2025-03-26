"use client";
import { useSelector } from "react-redux";
import type { RootState } from "@/lib/store";
import { useState, FormEvent, useEffect } from "react";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const nameSchema = z
  .string()
  .min(1, "Name is required")
  .max(50, "Name must be 50 characters or less");

export default function SubmitScore() {
  const time = useSelector((state: RootState) => state.game.timer);
  const characterFound = useSelector(
    (state: RootState) => state.game.isCharacterFound
  );
  const [name, setName] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const seconds = time % 60;
  const minutes = Math.floor(time / 60);
  const timeString = `${minutes}:${String(seconds).padStart(2, "0")}`;

  const isGameFinished = characterFound.every((char) => char.found);

  useEffect(() => {
    if (!isGameFinished) {
      toast.error("You must finish the game to submit your score.", {
        style: {
          color: "#f7adee",
          backgroundColor: "#440829",
        },
      });
      router.push("/");
    }
  }, [isGameFinished, router]);

  async function handleSubmit(e: FormEvent) {
    setIsLoading(true);
    e.preventDefault();

    const validation = nameSchema.safeParse(name);
    if (!validation.success) {
      setError(validation.error.errors[0].message);
      setIsLoading(false);
      return;
    }

    setError(null);

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, time: timeString }),
      });

      if (!response.ok) {
        setError("Something went wrong. Please try again.");
        return;
      }

      if (response.ok) router.push("/?leaderboard=true");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  if (isGameFinished)
    return (
      <section className="flex flex-col items-center justify-center min-h-screen bg-[#3434ad] text-[#f7adee] p-4">
        <h1 className="text-3xl font-bold mb-4">
          Submit your name into the leaderboard
        </h1>
        <p className="text-lg  mb-6">
          Your Time: <span className="font-semibold">{timeString} mins</span>
        </p>
        <form
          onSubmit={handleSubmit}
          className="bg-[#440829] shadow-md rounded-lg p-6 w-full max-w-md"
        >
          <label htmlFor="name" className="block font-medium mb-2">
            Name:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border bg-[#e64fa2a6] border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8e3063a6] focus:border-transparent mb-4"
          />
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full font-semibold py-2 px-3 rounded-lg transition duration-200 ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#272783] hover:bg-[#3434ad]"
              }`}
            >
              {isLoading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </section>
    );
}
