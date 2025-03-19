"use client";

import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";

interface CharacterImg {
  name: string;
  img: string;
}

export const charactersImg: CharacterImg[] = [
  { name: "Waldo", img: "/waldo.png" },
  {
    name: "Wizard",
    img: "/wizard.gif",
  },
  { name: "Odlaw", img: "/odlaw.gif" },
];

export default function GameCharacters() {
  const chararacterFound = useSelector(
    (state: RootState) => state.game.isCharacterFound
  );

  return (
    <div>
      <ul className="flex gap-5 justify-center items-center">
        {chararacterFound.map((character, index) => (
          <li
            key={index}
            className="flex flex-col items-center justify-center gap-2"
          >
            <Image
              src={
                charactersImg.find((char) => char.name === character.name)
                  ?.img || ""
              }
              alt={
                charactersImg.find((char) => char.name === character.name)
                  ?.name || ""
              }
              width={60}
              height={50}
              className={`w-[60px] h-[50px] object-cover  object-[50%_top] ${
                character.found ? "opacity-50" : ""
              }`}
            />
            <span className={character.found ? "text-green-500 font-bold" : ""}>
              {character.name} {character.found && " ✅"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
