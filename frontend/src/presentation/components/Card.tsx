import clsx from "clsx";
import React, { HTMLProps } from "react";

const Card: React.FC<HTMLProps<HTMLDivElement>> = ({ className, ...rest }) => (
  <div
    className={clsx("bg-white p-6 -mx-4 rounded-xl shadow-xl", className)}
    {...rest}
  />
);

export default Card;
