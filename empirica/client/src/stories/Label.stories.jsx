import React from "react";
import { Label } from "../components/Label";

const sizes = ["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl"];
const colors = [
  "yellow",
  "green",
  "red",
  "orange",
  "sky",
  "indigo",
  "pink",
  "gray",
];

export const Large = () => {
  const els = [];
  for (const stroke of [false, true]) {
    for (const size of sizes) {
      for (const color of colors) {
        els.push(
          <Label
            key={size + color + stroke}
            size={size}
            color={color}
            stroke={stroke}
          >
            Labels looks like this.
          </Label>
        );
      }
    }
  }

  return <div className="py-8 px-32">{els}</div>;
};
