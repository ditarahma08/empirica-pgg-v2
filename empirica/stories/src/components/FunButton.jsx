import React from "react";
import { Label } from "./Label";

export function Button({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="relative w-full px-4 py-1 border-[3px] rounded-xl bg-yellow-300 border-orange-600 shadow-none hover:-top-0.5 hover:shadow-[0_4px_0px_0px_rgba(0,0,0,.25)] active:top-0.5 active:shadow-none"
    >
      <Label color="orange" size="md">
        {children}
      </Label>
    </button>
  );
}
