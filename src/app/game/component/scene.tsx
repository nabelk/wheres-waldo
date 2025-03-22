"use client";

import { useRef, MouseEvent } from "react";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { setClickPosition } from "@/lib/features/game/gameSlice";
import { RootState } from "@/lib/store";
import CharactersOption from "./characters-option";

export default function Scene() {
  const imgRef = useRef<HTMLImageElement>(null);
  const clickPosition = useSelector(
    (state: RootState) => state.game.clickPosition
  );
  const dispatch = useDispatch();

  const handleClickPosition = async (event: MouseEvent<HTMLImageElement>) => {
    const img = imgRef.current;
    if (!img) return;
    const rect = img.getBoundingClientRect();

    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    const imgWidth = rect.width;
    const imgHeight = rect.height;

    const normalizedX = clickX / imgWidth;
    const normalizedY = clickY / imgHeight;

    dispatch(setClickPosition({ x: normalizedX, y: normalizedY }));
  };

  return (
    <div className="relative w-[100dvw] h-[100dvh] overflow-hidden">
      <div className="w-full h-full overflow-x-auto overflow-y-hidden md:overflow-hidden">
        <div className="relative min-w-[1200px] md:min-w-full h-full">
          <Image
            ref={imgRef}
            src="/whereswaldo.jpg"
            alt="Where's Waldo"
            layout="fill"
            priority
            onClick={handleClickPosition}
            className="cursor-crosshair"
          />
          {clickPosition.x !== 0 && clickPosition.y !== 0 && (
            <div
              style={{
                top: `${clickPosition.y * 100}%`,
                left: `${clickPosition.x * 100}%`,
              }}
              className="absolute translate-x-[-50%] translate-y-[-50%]  w-14 h-14 border-2 md:border-4 border-dashed border-[#440829] font-extrabold pointer-events-none"
            />
          )}

          {clickPosition.x !== 0 && clickPosition.y !== 0 && (
            <CharactersOption />
          )}
        </div>
      </div>
    </div>
  );
}
