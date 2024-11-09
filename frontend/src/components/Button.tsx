import React from "react";
import { twMerge } from "tailwind-merge";

export interface ButtonProps {
  children: React.ReactNode;
  type?: "submit" | "button";
  onClick?: () => void;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  type = "button",
  onClick,
}) => {
  const classes = twMerge(
    `w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:bg-gray-500 dark:hover:bg-gray-600 transition-colors`,
    className
  );

  return (
    <button onClick={onClick} type={type} className={classes}>
      {children}
    </button>
  );
};
