import React from "react";

export function Button({
  type = "button",
  fullWidth = false,
  children,
  onClick = () => {},
  disabled = false,
}) {
  return (
    <button
      className={`${
        fullWidth ? "flex w-full" : "inline-flex"
      } items-center justify-center rounded-md border border-transparent bg-orange-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:bg-gray-300 disabled:hover:bg-gray-300 disabled:ring-0`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
