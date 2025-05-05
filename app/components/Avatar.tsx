"use client";

import Image from "next/image";
import { User } from "../generated/prisma";
import { useState } from "react";

interface AvatarProps {
  user?: User;
  showStatus?: boolean;
  statusColor?: "green" | "red" | "gray" | "yellow";
  size?: "sm" | "md" | "lg";
  fallbackInitial?: string;
}

const Avatar: React.FC<AvatarProps> = ({
  user,
  showStatus = true,
  statusColor = "green",
  size = "md",
  fallbackInitial
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  // Size mappings for different size options
  const sizeMap = {
    sm: {
      container: "h-8 w-8",
      mdContainer: "md:h-9 md:w-9",
      status: "h-2 w-2",
      mdStatus: "md:h-[10px] md:w-[10px]",
      fontSize: "text-xs",
      mdFontSize: "md:text-sm"
    },
    md: {
      container: "h-9 w-9",
      mdContainer: "md:h-11 md:w-11",
      status: "h-2 w-2",
      mdStatus: "md:h-[13px] md:w-[13px]",
      fontSize: "text-sm",
      mdFontSize: "md:text-base"
    },
    lg: {
      container: "h-12 w-12",
      mdContainer: "md:h-14 md:w-14",
      status: "h-3 w-3",
      mdStatus: "md:h-4 md:w-4",
      fontSize: "text-base",
      mdFontSize: "md:text-lg"
    }
  };

  // Status color mapping
  const statusColorMap = {
    green: "bg-green-500",
    red: "bg-red-500",
    gray: "bg-gray-400",
    yellow: "bg-yellow-400"
  };

  // Get user initial for fallback avatar
  const getInitial = () => {
    if (fallbackInitial) return fallbackInitial;
    if (user?.name) return user.name.charAt(0).toUpperCase();
    return "U";
  };
  
  // Generate a consistent color based on user ID or name
  const getAvatarBgColor = () => {
    const colors = [
      "bg-blue-500", "bg-green-500", "bg-yellow-500", 
      "bg-purple-500", "bg-pink-500", "bg-indigo-500", 
      "bg-red-500", "bg-teal-500"
    ];
    
    let seed = 0;
    if (user?.id) {
      // Use user ID to generate consistent color
      for (let i = 0; i < user.id.length; i++) {
        seed += user.id.charCodeAt(i);
      }
    } else if (user?.name) {
      // Use name if ID isn't available
      for (let i = 0; i < user.name.length; i++) {
        seed += user.name.charCodeAt(i);
      }
    }
    
    return colors[seed % colors.length];
  };
  
  return (
    <div 
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className={`
          relative inline-block rounded-full overflow-hidden 
          ${sizeMap[size].container} ${sizeMap[size].mdContainer}
          ${isHovered ? 'ring-2 ring-blue-300 transform scale-105' : ''}
          transition-all duration-200
        `}
      >
        {(imageError || !user?.image) ? (
          // Fallback avatar with initial
          <div className={`
            flex items-center justify-center w-full h-full
            ${getAvatarBgColor()} text-white font-medium
            ${sizeMap[size].fontSize} ${sizeMap[size].mdFontSize}
          `}>
            {getInitial()}
          </div>
        ) : (
          // User image
          <Image
            alt="Avatar"
            src={user.image}
            fill
            onError={() => setImageError(true)}
          />
        )}
      </div>
      
      {showStatus && (
        <span
          className={`
            absolute
            block
            rounded-full
            ${statusColorMap[statusColor]}
            ring-2
            ring-white
            top-0
            right-0
            ${sizeMap[size].status}
            ${sizeMap[size].mdStatus}
          `}
        />
      )}
      
      {isHovered && user?.name && (
        <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded-md opacity-90 whitespace-nowrap">
          {user.name}
        </div>
      )}
    </div>
  );
};

export default Avatar;