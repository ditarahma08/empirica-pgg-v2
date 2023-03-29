import React from "react";
import { AnimalList } from "../assets/AnimalsAvatar";
import { Avatar } from "../components/AnimalAvatar";

export const Default = () => (
  <div className="flex flex-col h-full justify-center items-center">
    <div className="h-1/2 grid grid-cols-10 grid-flow-row justify-center items-center gap-x-10 gap-y-0">
      {AnimalList.map((animal) => (
        <div key={animal} className="w-16">
          <Avatar disabled={Math.random() > 0.5} animal={animal} />
        </div>
      ))}
    </div>
    <div className="h-1/2 grid grid-cols-10 grid-flow-row justify-center items-center gap-x-10 gap-y-0">
      {AnimalList.map((animal) => (
        <div key={animal} className="w-16">
          <Avatar disabled={Math.random() > 0.5} submitted animal={animal} />
        </div>
      ))}
    </div>
  </div>
);
