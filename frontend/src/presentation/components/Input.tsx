import React, { HTMLProps } from "react";

const Input: React.FC<HTMLProps<HTMLInputElement>> = ({ label, ...rest }) => (
  <label className="block ">
    <span className="text-gray-700">{label}</span>
    <input
      {...rest}
      className="mt-0 mb-4 block w-full px-0.5 py-2 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black outline-none"
    />
  </label>
);

export default Input;
