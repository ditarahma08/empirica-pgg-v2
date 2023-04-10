import React from "react";
import { You } from "../components/You";

export function YouAvatar() {
  return (
    <div className="flex justify-center items-center">
      <You animal={"sloth"} />
    </div>
  );
}
