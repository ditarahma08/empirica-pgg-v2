import React from "react";
import { Bowl } from "../components/Bowl";

export const MyBowlMultiplier = () => {
  return (
    <div className="flex justify-center items-center space-x-4">
      <div className="w-52 outline-slate-200 outline">
        <Bowl multiplier="3" money="8" />
      </div>
      <div className="w-52 outline-slate-200 outline">
        <Bowl />
      </div>
      <div className="w-52 outline-slate-200 outline">
        <Bowl money="284" />
      </div>
      <div className="w-52 outline-slate-200 outline">
        <Bowl money="8284" multiplier="478" />
      </div>
    </div>
  );
};
