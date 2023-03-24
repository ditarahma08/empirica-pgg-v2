import React from "react";
import {
  Arrow,
  ArrowCurved,
  Checkmark,
  Coin,
  Deduct,
  DeductCancel,
  MoneyBowl,
  Piggy,
} from "./Assets";

export const MyCheckmark = () => (
  <div className="flex h-screen justify-center items-center space-x-8">
    <div className="h-42">
      <Checkmark />
    </div>
    <div className="h-12">
      <Checkmark />
    </div>
    <div className="h-4">
      <Checkmark />
    </div>
  </div>
);

export const MyDeductions = () => (
  <div className="flex h-screen justify-center items-center">
    <div className="h-42">
      <Deduct />
    </div>
    <div className="h-42">
      <DeductCancel />
    </div>
  </div>
);

export const MyCoin = () => (
  <div className="flex h-screen justify-center items-center">
    <div className="h-42">
      <Coin />
    </div>
  </div>
);

export const MyPiggyBank = () => (
  <div className="flex h-screen justify-center items-center">
    <div className="h-42">
      <Piggy />
    </div>
  </div>
);

export const MyMoneyBowl = () => (
  <div className="flex h-screen justify-center items-center">
    <div className="h-42">
      <MoneyBowl />
    </div>
  </div>
);

export const MyArrow = () => (
  <div className="flex h-screen justify-center items-center">
    <div className="h-42">
      <Arrow />
    </div>
    <div className="w-42 rotate-180">
      <Arrow />
    </div>
    <div className="w-42 rotate-[45deg]">
      <Arrow />
    </div>
    <div className="w-42">
      <ArrowCurved />
    </div>
  </div>
);
