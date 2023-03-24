import React from "react";
import { MoneyBowl } from "../assets/Assets";
import { Label } from "./Label";

export const Bowl = ({ money = "", multiplier = "", footer = "" }) => {
  return (
    <div className="relative">
      <MoneyBowl />
      <div className="absolute w-full mt-2 text-center top-0 left-0">
        <Label color="yellow" size="4xl" shadow stroke tight>
          {money || money === 0 ? money : ""}
        </Label>
      </div>
      <div className="absolute w-full mt-1 text-center top-1/2 left-0">
        <Label color="white" size="lg" shadow>
          {multiplier ? `${multiplier}×` : ""}
        </Label>
      </div>
      <div className="absolute w-full mt-12 text-center top-1/2 left-0">
        <Label color="orange" size="md" shadow>
          {footer ? `${footer}` : ""}
        </Label>
      </div>
    </div>
  );
};
