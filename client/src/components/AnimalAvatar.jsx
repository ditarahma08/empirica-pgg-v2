import React from "react";
import { AnimalAvatar } from "../assets/AnimalsAvatar";
import { Checkmark } from "../assets/Assets";

export const Avatar = ({ animal, submitted = false, disabled = false }) => {
  return (
    <div className="relative h-full w-full">
      <div className={`${disabled ? "grayscale opacity-30" : ""}`}>
        <AnimalAvatar animal={animal} />
      </div>
      {submitted && (
        <div className="absolute -bottom-2 -right-1 h-[40%] w-[40%] shadow-md rounded-full bg-green-100 ring-green-500 ring-2 p-[8%]">
          <Checkmark />
        </div>
      )}
    </div>
  );
};
