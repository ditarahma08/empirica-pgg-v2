import React from "react";
import { Arrow } from "../assets/Assets";
import { Label } from "./Label";

export function ArrowNumber({
  direction,
  showNumber = false,
  number = 0,
  text = "",
  color,
  full = false,
  small = false,
  dim = false,
  double = false,
  multiply = false,
}) {
  let className = "";
  switch (direction) {
    case "S":
      className = "rotate-180";
      break;
    case "E":
      className = "rotate-[90deg]";
      break;
    case "W":
      className = "rotate-[-90deg]";
      break;
    case "NW":
      className = "rotate-[-45deg]";
      break;
    case "NE":
      className = "rotate-[45deg]";
      break;
    default:
      className = "";
  }

  if (full) {
    className = `${className} opacity-20`;
  }

  if (dim) {
    className = `${className} opacity-30`;
  }

  return (
    <div className="relative h-full w-full">
      <div className={`relative h-full w-full ${className}`}>
        {double ? (
          <div className="relative h-full w-full">
            <div className="absolute h-full w-full top-0 -left-3">
              <Arrow color={color} full={full} />
            </div>
            <div className="absolute h-full w-full top-0 left-3">
              <Arrow color={color} full={full} />
            </div>
          </div>
        ) : (
          <Arrow color={color} full={full} />
        )}
      </div>
      {showNumber && (
        <div className="absolute top-0 left-0 h-full w-full flex justify-center items-center">
          <div className="flex flex-col items-center">
            <Label
              tight
              color={color}
              size={small ? "2xl" : "3xl"}
              stroke={!full}
              shadow
            >
              {number}
              {multiply && "×"}
            </Label>
            {text && (
              <Label
                tight
                color={color}
                size={small ? "sm" : "md"}
                stroke={!full}
                shadow
              >
                {text}
              </Label>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
