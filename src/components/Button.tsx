import React, { MouseEventHandler } from "react";

type Props = {
  onClick: any;
  className?: string;
  children?: React.ReactNode;
  color: string;
  mode?: string;
};

const Button = (props: Props) => {
  let colorClassName = "";
  let mode = "";

  if (props.mode === undefined) {
    mode = "normal";
  } else if (props.mode === "outline") {
    mode = "outline";
  }

  if (props.color === "red" && mode === "normal") {
    colorClassName =
      "hover:shadow-lg active:shadow-lg focus:shadow-lg text-white bg-red-500  hover:bg-red-600 focus:bg-red-600 active:bg-red-700";
  } else if (props.color === "amber" && mode === "normal") {
    colorClassName =
      "hover:shadow-lg active:shadow-lg focus:shadow-lg text-white bg-amber-500  hover:bg-amber-600 focus:bg-amber-600 active:bg-amber-700";
  } else if (props.color === "amber" && mode === "outline") {
    colorClassName =
      "text-amber-500 hover:text-amber-600 border border-amber-500 hover:border-amber-600 focus:border-amber-700 active:border-amber-700";
  }

  return (
    <button
      className={`${props.className} ${colorClassName} py-2 px-4 font-medium leading-tight uppercase rounded  focus:outline-none focus:ring-0  transition duration-150 ease-in-out `}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
