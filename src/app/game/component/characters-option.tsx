"use client";

import { useSelector, useDispatch } from "react-redux";
import {
  setClickPosition,
  setIsCharacterFound,
} from "@/lib/features/game/gameSlice";
import { RootState } from "@/lib/store";
import Image from "next/image";
import { charactersImg } from "@/src/app/component/gameCharacters";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function CharactersOption() {
  const clickPosition = useSelector(
    (state: RootState) => state.game.clickPosition
  );
  const characters = useSelector(
    (state: RootState) => state.game.isCharacterFound
  );
  const dispatch = useDispatch();
  const router = useRouter();

  const isGameFinished = characters.every((char) => char.found);
  if (isGameFinished) router.push("/submit");

  const threshold = 0.05;

  const handleCharacterSelection = async (characterName: string) => {
    const charac = await fetch(`/api/characters/${characterName}`).then((res) =>
      res.json()
    );

    const isClickPositionCorrect =
      Math.abs(charac!.x - clickPosition.x) < threshold &&
      Math.abs(charac!.y - clickPosition.y) < threshold;

    if (isClickPositionCorrect) {
      dispatch(
        setIsCharacterFound(
          characters.map((char) => {
            if (char.name === charac!.characterName) {
              return { ...char, found: true };
            }
            return char;
          })
        )
      );
      toast.success(`You found ${charac!.characterName}!`, {
        style: {
          backgroundColor: "#f7adee",
          color: "#3434ad",
        },
      });
    } else {
      toast.error(`Try again! ${characterName} is somewhere else`, {
        style: {
          color: "#f7adee",
          backgroundColor: "#3434ad",
        },
      });
    }
  };
  return (
    <>
      <div
        style={{
          top: clickPosition.y > 0.8 ? "auto" : `${clickPosition.y * 100 + 3}%`,
          bottom:
            clickPosition.y > 0.8
              ? `${(1 - clickPosition.y) * 100 + 3}%`
              : "auto",
          left: `${clickPosition.x * 100}%`,
          transform: `
          translateX(${
            clickPosition.x > 0.9
              ? "-100%"
              : clickPosition.x < 0.05
              ? "0"
              : "-40%"
          })
        `,
        }}
        className="absolute z-50 translate-x-[-50%] p-2 flex flex-col justify-center items-center cursor-pointer"
        onMouseLeave={() => {
          dispatch(setClickPosition({ x: 0, y: 0 }));
        }}
      >
        {charactersImg.map((character, index) => {
          const foundCharacter = characters.find(
            (c) => c.name === character.name
          )?.found;

          return (
            !foundCharacter && (
              <button
                key={index}
                onClick={() => handleCharacterSelection(character.name)}
                className="flex flex-col justify-center items-center w-[fit-content] mb-1 p-2 bg-[#3434ad] text-[#f7adee] shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105 active:scale-95 "
              >
                <Image
                  src={character.img}
                  alt={character.name}
                  width={60}
                  height={50}
                  className="w-[60px] h-[50px] object-cover object-[50%_top] transition-transform duration-300 hover:rotate-6"
                />
                {character.name}
              </button>
            )
          );
        })}
      </div>
    </>
  );
}
