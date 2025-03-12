"use client";

import { useState, useRef, MouseEvent } from "react";
import Image from "next/image";

export default function Scene() {
  const imgRef = useRef<HTMLImageElement>(null);
  const [clickPosition, setClickPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [foundCharacter, setFoundCharacter] = useState<string | null>(null);

  const characters = [{ name: "Waldo", x: 0.6165, y: 0.3769 }];

  const threshold = 0.05;

  const handleClick = (event: MouseEvent<HTMLImageElement>) => {
    const img = imgRef.current;
    if (!img) return;
    const rect = img.getBoundingClientRect();

    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    const imgWidth = rect.width;
    const imgHeight = rect.height;

    const normalizedX = clickX / imgWidth;
    const normalizedY = clickY / imgHeight;

    setClickPosition({ x: normalizedX, y: normalizedY });

    const found = characters.find(
      (char) =>
        Math.abs(char.x - normalizedX) < threshold &&
        Math.abs(char.y - normalizedY) < threshold
    );

    if (found) {
      setFoundCharacter(found.name);
    } else {
      setFoundCharacter(null);
    }
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
            onClick={handleClick}
            className="cursor-crosshair"
          />
          <div
            style={{
              top: `${clickPosition.y * 100}%`,
              left: `${clickPosition.x * 100}%`,
            }}
            className="absolute translate-x-[-50%] translate-y-[-50%]  w-14 h-14 border-2 md:border-4 border-dashed border-gray-900 font-extrabold pointer-events-none"
          />
          {foundCharacter && (
            <>
              <p className="fixed top-0 right-[50%] p-4 text-black text-lg bg-white bg-opacity-50">
                You found {foundCharacter}!
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
