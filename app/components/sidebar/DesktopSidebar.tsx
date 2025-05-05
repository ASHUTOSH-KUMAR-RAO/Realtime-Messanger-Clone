"use client";

import UseRoutes from "@/app/hooks/useRoutes";
import { useState } from "react";
import DesktopItem from "./DesktopItem";
import { User } from "@/app/generated/prisma";
import Avatar from "../Avatar";
import SettingsModal from "./SettingsModal";

interface DesktopSidebarProps {
  currentUser: User;
}

const DesktopSidebar: React.FC<DesktopSidebarProps> = ({ currentUser }) => {
  const routes = UseRoutes();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
    <SettingsModal
    currentUser= {currentUser}
    isOpen={isOpen}
    onClose={() => setIsOpen(false)}
    
    />
    <div className="
      hidden
      lg:fixed
      lg:inset-y-0
      lg:left-0
      lg:z-40
      lg:w-20
      lg:overflow-y-auto
      lg:bg-white
      lg:border-r
      lg:border-gray-100
      lg:pb-4
      lg:flex
      lg:flex-col
      justify-between
      shadow-sm
      transition-all
      duration-200
    ">
      {/* Navigation Items */}
      <nav className="mt-6 flex flex-col items-center">
        <ul 
          role="list"
          className="
            flex
            flex-col
            items-center
            space-y-6
            w-full
            px-2
          "
        >
          {routes.map((item) => (
            <DesktopItem
              key={item.label}
              href={item.href}
              label={item.label}
              icon={item.icon}
              onClick={item.onClick}
              active={item.active}
            />
          ))}
        </ul>
      </nav>

      {/* User Avatar */}
      <nav className="
        mb-4
        flex
        flex-col
        items-center
        w-full
        px-2
      ">
        <div 
          onClick={() => setIsOpen(!isOpen)}
          className="
            cursor-pointer
            transition-all
            duration-200
            hover:opacity-80
            active:scale-95
            focus:outline-none
            focus:ring-2
            focus:ring-blue-400
            focus:ring-offset-2
            rounded-full
          "
        >
          <Avatar user={currentUser} size="md" />
        </div>
      </nav>
    </div>
      </>
  );
};

export default DesktopSidebar;