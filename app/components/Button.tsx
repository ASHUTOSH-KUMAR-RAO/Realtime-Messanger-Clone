"use client";

import clsx from "clsx";

export interface ButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  fullWidth?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  loading?: boolean;
  secondary?: boolean;
  danger?: boolean;
}
const Button: React.FC<ButtonProps> = ({
  type,
  fullWidth,
  children,
  onClick,
  secondary,
  danger,
  disabled,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={clsx(
        `flex justify-center rounded-md px-3 py-2 text-sm font-semibold focus-visible:outline focus-visible:outline-offset-2 cursor-pointer`,
        disabled && "opacity-50 cursor-default",
        fullWidth && "w-full",
        secondary ? "text-gray-800" : "text-white",
        danger &&
          "bg-rose-500 hover:bg-rose-700 focus-visible:outline-rose-500",
        !secondary &&
          !danger &&
          "bg-cyan-600 hover:bg-cyan-700 focus-visible:outline-cyan-700"
      )}
    >
      {children}
    </button>
  );
};

export default Button;
