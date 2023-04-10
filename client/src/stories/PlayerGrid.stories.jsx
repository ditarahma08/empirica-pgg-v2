import React from "react";
import { AnimalList } from "../assets/AnimalsAvatar";
import { Avatar } from "../components/AnimalAvatar";
import { PlayerGrid } from "../components/PlayerGrid";

export const MyPlayerGrid = () => {
  // const sizes = [1, 2, 5, 9, 14];
  // const sizes = [2, 9, 10, 15];
  const sizes = [2, 10, 15];
  // const sizes = [5, 9, 14];
  // const sizes = [5, 9, 14];

  shuffleArray(AnimalList);

  const els = [];
  for (const size of sizes) {
    els.push(
      <PlayerGrid key={size}>
        {Array.from(Array(size).keys()).map((_, i) => (
          <div key={AnimalList[i]} className="w-16 outline outline-red-500">
            <Avatar animal={AnimalList[i]} />
          </div>
        ))}
      </PlayerGrid>
    );
  }

  let cols = "grid-cols-1";
  switch (sizes.length) {
    case 2:
      cols = "grid-cols-2";
      break;
    case 3:
      cols = "grid-cols-3";
      break;
    case 4:
      cols = "grid-cols-4";
      break;
    case 5:
      cols = "grid-cols-5";
      break;
    case 6:
      cols = "grid-cols-6";
      break;
  }

  const className =
    "grid grid-rows-1 h-full overflow-hidden bg-slate-100 space-x-1 ";

  return <div className={`${className} ${cols}`}>{els}</div>;
};

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
