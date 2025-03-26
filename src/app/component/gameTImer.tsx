"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store";
import { increment } from "@/lib/features/game/gameSlice";

export default function GameTimer() {
  const dispatch = useDispatch();
  const totalSeconds = useSelector((state: RootState) => state.game.timer);
  const [milliseconds, setMilliseconds] = useState<number>(0);

  useEffect(() => {
    const secondInterval = setInterval(() => {
      dispatch(increment());
    }, 1000);

    const millisecondInterval = setInterval(() => {
      setMilliseconds((prev) => {
        if (prev >= 990) return 0;
        return prev + 10;
      });
    }, 10);

    return () => {
      clearInterval(secondInterval);
      clearInterval(millisecondInterval);
    };
  }, [dispatch]);

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

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
