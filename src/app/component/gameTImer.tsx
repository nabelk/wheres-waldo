"use client";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store";
import { increment } from "@/lib/features/game/gameSlice";
import { useEffect, useState } from "react";

export default function GameTimer() {
  const dispatch = useDispatch();
  const totalSeconds = useSelector((state: RootState) => state.game.timer);
  const [milliseconds, setMilliseconds] = useState(0);

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  useEffect(() => {
    const interval = setInterval(() => {
      setMilliseconds((prev) => {
        if (prev >= 990) {
          dispatch(increment());
          return 0;
        }
        return prev + 10;
      });
    }, 10);

    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <div>
      <span>
        ⏳ Timer: {String(minutes).padStart(2, "0")}:
        {String(seconds).padStart(2, "0")}:
        {String(milliseconds).padStart(3, "0")}
      </span>
    </div>
  );
}
