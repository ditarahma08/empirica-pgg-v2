import React from "react";

export const Main = () => (
  <div className="flex flex-col h-screen justify-center items-center">
    <div className="p-4 text-5xl text-fill-yellow-300 text-stroke-[3px] text-stroke-orange-600 overflow-hidden">
      Primary font is Fredoka One.
    </div>
    <div className="p-4 text-[84px] text-fill-yellow-300 text-stroke-[3px] text-stroke-orange-600 overflow-hidden">
      8× 8x
    </div>
  </div>
);

export const Secondary = () => (
  <div className="flex h-screen justify-center items-center">
    <div className="font-mono text-xl">Secondary font is Fira Code.</div>
  </div>
);
