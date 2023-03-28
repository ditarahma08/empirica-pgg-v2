import React from "react";
import { ArrowNumber } from "../components/Arrow";

export function ArrowWithNumber({}) {
  const directions = ["N", "S", "NW", "NE", "W", "E"];
  const colors = ["yellow", "red", "green", "pink"];

  return (
    <div className="grid grid-flow-row grid-cols-6 gap-y-16 justify-center items-center px-40">
      {colors.map((color) =>
        directions.map((direction) => (
          <div key={direction} className="h-44">
            <ArrowNumber direction={direction} color={color} />
          </div>
        ))
      )}
      {colors.map((color) =>
        Array.from(Array(4).keys()).map((_, i) =>
          directions.map((direction) => (
            <div key={direction} className={color === "pink" ? "h-32" : "h-44"}>
              <ArrowNumber
                direction={direction}
                showNumber
                number={i * i * i * 20}
                text={direction === "NE" ? "each" : ""}
                color={color}
                full={color === "pink"}
                small={color === "pink"}
                dim={direction === "NW" || direction === "NE"}
                double={direction === "NE"}
              />
            </div>
          ))
        )
      )}
    </div>
  );
}
