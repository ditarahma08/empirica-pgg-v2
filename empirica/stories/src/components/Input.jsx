import React from "react";

export function Input({
  name,
  value,
  handleUpdate,
  required = false,
  placeholder = "",
  error = false,
}) {
  return (
    <div className="mt-1">
      <input
        dir="auto"
        type="text"
        name={name}
        id={name}
        value={value}
        onChange={handleUpdate}
        required={required}
        autoComplete="off"
        className={`block w-full rounded-md ${
          error
            ? "border-red-500 focus:border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:border-orange-500 focus:ring-orange-500"
        } shadow-sm  sm:text-sm`}
        placeholder={placeholder}
      />
    </div>
  );
}
