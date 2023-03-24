import React from "react";

const sizes = {
  xs: "text-[14px] 2xl:text-[16px]",
  sm: "text-[18px] 2xl:text-[20px]",
  md: "text-[22px] 2xl:text-[24px]",
  lg: "text-[30px] 2xl:text-[32px]",
  xl: "text-[40px] 2xl:text-[42px]",
  "2xl": "text-[52px] 2xl:text-[54px]",
  "3xl": "text-[62px] 2xl:text-[64px]",
  "4xl": "text-[82px] 2xl:text-[84px]",
};

const sizesStroke = {
  xs: "text-stroke-[1px]",
  sm: "text-stroke-[1px]",
  md: "text-stroke-[2px]",
  lg: "text-stroke-[3px]",
  xl: "text-stroke-[3px]",
  "2xl": "text-stroke-[3px]",
  "3xl": "text-stroke-[3px]",
  "4xl": "text-stroke-[3px]",
};

const colors = {
  yellow: "text-yellow-400",
  gold: "text-yellow-500",
  green: "text-green-600",
  red: "text-red-600",
  orange: "text-orange-600",
  sky: "text-sky-500",
  indigo: "text-indigo-600",
  purple: "text-purple-600",
  pink: "text-pink-600",
  gray: "text-gray-500",
  rose: "text-rose-500",
  white: "text-white",
};

const colorsStroke = {
  yellow: "text-fill-yellow-300 text-stroke-orange-600",
  gold: "text-fill-yellow-300 text-stroke-yellow-500",
  green: "text-fill-green-300 text-stroke-green-600",
  red: "text-fill-red-300 text-stroke-red-600",
  orange: "text-fill-orange-300 text-stroke-orange-600",
  sky: "text-fill-sky-300 text-stroke-sky-600",
  indigo: "text-fill-indigo-300 text-stroke-indigo-600",
  purple: "text-fill-purple-300 text-stroke-purple-600",
  pink: "text-fill-pink-300 text-stroke-pink-600",
  gray: "text-fill-gray-300 text-stroke-gray-600",
  rose: "text-fill-rose-300 text-stroke-rose-600",
  white: "text-fill-white text-stroke-gray-400",
};

export const Label = ({
  children,
  size = "md",
  color = "yellow",
  stroke = false,
  shadow = false,
  tight = false,
  snug = false,
}) => {
  let className = sizes[size];

  if (stroke) {
    className = `${className} ${colorsStroke[color]} ${sizesStroke[size]}`;
  } else {
    className = `${className} ${colors[color]}`;
  }

  if (shadow) {
    className = `${className} text-shadow-md4`;
  }

  if (tight) {
    className = `${className} leading-none`;
  }

  if (snug) {
    className = `${className} leading-tight`;
  }

  return <div className={className}>{children}</div>;
};
