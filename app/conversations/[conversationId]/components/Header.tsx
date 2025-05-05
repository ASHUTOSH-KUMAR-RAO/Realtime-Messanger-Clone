"use client";

import Avatar from "@/app/components/Avatar";
import { Conversation, User } from "@/app/generated/prisma";
import useOtherUser from "@/app/hooks/useOtherUser";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import { HiChevronDoubleLeft, HiEllipsisHorizontal } from "react-icons/hi2";
import ProfileDrawer from "./ProfileDrawer";
import AvatarGroup from "@/app/components/AvatarGroup";
import useActiveList from "@/app/hooks/useActiveList";

interface HeaderProps {
  conversation: Conversation & {
    users: User[];
  };
}

const Header: React.FC<HeaderProps> = ({ conversation }) => {
  const otherUser = useOtherUser(conversation);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const { members } = useActiveList();
  const isActive = members.indexOf(otherUser?.email!) !== 1;
  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`;
    }
    return isActive ? "Active" : "offline";
  }, [conversation,isActive]);

  return (
    <>
      <ProfileDrawer
        data={conversation}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
      <div className="bg-white w-full border-b border-gray-200 px-4 py-3 sm:px-6 lg:px-8 flex justify-between items-center shadow-sm">
        <div className="flex items-center space-x-3">
          {/* Back button - mobile only */}
          <Link
            href="/conversations"
            className="lg:hidden text-sky-500 hover:text-sky-600 transition-colors duration-200"
            aria-label="Back to conversations"
          >
            <HiChevronDoubleLeft size={25} />
          </Link>

          {/* Avatar with better spacing */}
          <div className="flex-shrink-0">
            {conversation.isGroup ? (
              <AvatarGroup users={conversation.users} />
            ) : (
              <Avatar user={otherUser} />
            )}
          </div>

          {/* User info with better typography */}
          <div className="min-w-0">
            <h2 className="text-lg font-medium text-gray-900 truncate">
              {conversation.name || otherUser.name}
            </h2>
            <p className="text-sm text-gray-500 truncate">{statusText}</p>
          </div>
        </div>

        {/* Options button with better hover effect */}
        <button
          className="p-1 rounded-full text-sky-500 hover:text-sky-600 hover:bg-sky-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
          onClick={() => setDrawerOpen(true)}
          aria-label="More options"
        >
          <HiEllipsisHorizontal size={30} />
        </button>
      </div>
    </>
  );
};

export default Header;
