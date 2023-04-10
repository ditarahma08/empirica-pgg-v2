import React from "react";

export const PlayerGrid = ({ children }) => {
  let rows = "grid-rows-1";
  let ypad = "py-8";
  if (children.length > 12) {
    rows = "grid-rows-5";
  } else if (children.length > 9) {
    rows = "grid-rows-4";
  } else if (children.length > 4) {
    rows = "grid-rows-3";
    ypad = "py-[15%]";
  } else if (children.length > 1) {
    rows = "grid-rows-2";
    ypad = "py-[15%]";
  }

  let className =
    "h-full pr-16 grid grid-flow-col bg-white items-center text-center";

  if (children.length >= 13) {
    className += " [&>*]:scale-75";
  }

  return (
    <div dir="rtl" className={`${rows} ${className} ${ypad}`}>
      {children}
    </div>
  );
};