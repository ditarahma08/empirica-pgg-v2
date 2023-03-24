import React from "react";
import { Avatar } from "./Avatar";
import { Label } from "./Label";

export function You({ animal, submitted = false }) {
  return (
    <div className="w-42 flex flex-col items-center space-y-4">
      <div className="w-16">
        <Avatar animal={animal} submitted={submitted} />
      </div>
      <Label color="gray" size="md" stroke>
        <div className="capitalize">{animal} (You)</div>
      </Label>
    </div>
  );
}
