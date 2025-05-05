"use client";

import clsx from "clsx";
import Link from "next/link";
import React from "react";

interface DesktopItemProps {
  label: string;
  icon: any;
  href: string;
  onClick?: () => void;
  active?: boolean;
}

const DesktopItem: React.FC<DesktopItemProps> = ({
  label,
  icon: Icon,
  href,
  onClick,
  active,
}) => {
  const handleClick = () => {
    if (onClick) return onClick();
  };

  return (
    <li onClick={handleClick}>
      <Link
        href={href}
        className={clsx(
          `
            group
            flex
            items-center
            gap-x-4
            rounded-xl
            p-3
            text-base
            font-medium
            transition-colors
            duration-200
            text-gray-700
            hover:bg-gray-100
            hover:text-gray-900
            dark:text-gray-300
            dark:hover:bg-gray-800
            dark:hover:text-white
            cursor-pointer
          `,
          active &&
            "bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white"
        )}
      >
        <Icon className="h-6 w-6 shrink-0" />
        <span className="truncate">{label}</span>
      </Link>
    </li>
  );
};

export default DesktopItem;
