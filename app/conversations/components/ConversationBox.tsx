"use client";

import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import clsx from "clsx";
import { Conversation, Message, User } from "@/app/generated/prisma";
import { FullConversationType } from "@/app/types";
import useOtherUser from "@/app/hooks/useOtherUser";
import Avatar from "@/app/components/Avatar";
import AvatarGroup from "@/app/components/AvatarGroup";

interface ConversationBoxProps {
  data: FullConversationType;
  selected?: boolean;
}

const ConversationBox: React.FC<ConversationBoxProps> = ({
  data,
  selected,
}) => {
  const otherUser = useOtherUser(data);
  const session = useSession();
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = useCallback(() => {
    router.push(`/conversations/${data.id}`);
  }, [data.id, router]);

  const lastMessage = useMemo(() => {
    const messages = data.messages || [];
    return messages[messages.length - 1];
  }, [data.messages]);

  const userEmail = useMemo(() => {
    return session.data?.user?.email;
  }, [session.data?.user?.email]);

  const hasSeen = useMemo(() => {
    if (!lastMessage) {
      return false;
    }
    const seenArray = lastMessage.seen || [];

    if (!userEmail) {
      return false;
    }

    return seenArray.filter((user) => user.email === userEmail).length !== 0;
  }, [userEmail, lastMessage]);

  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) {
      return "Sent an Image";
    }
    if (lastMessage?.body) {
      return lastMessage.body;
    }

    return "Started a Conversation";
  }, [lastMessage]);

  const lastMessageTime = useMemo(() => {
    if (!lastMessage?.createdAt) {
      return null;
    }

    return format(new Date(lastMessage.createdAt), 'p');
  }, [lastMessage]);

  // Get user creation time
  const userCreationTime = useMemo(() => {
    if (!otherUser?.createdAt) {
      return null;
    }

    return format(new Date(otherUser.createdAt), 'MMM d, yyyy');
  }, [otherUser]);

  // Display either last message time or user creation time
  const displayTime = useMemo(() => {
    return lastMessageTime || (userCreationTime ? `Joined ${userCreationTime}` : null);
  }, [lastMessageTime, userCreationTime]);

  return (
    <div
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={clsx(
        `
        w-full
        flex
        items-center
        justify-between
        relative
        rounded-xl
        transition-all
        duration-200
        cursor-pointer
        p-3
        mb-2
        border
        `,
        selected 
          ? "bg-neutral-100 border-neutral-200 shadow-sm" 
          : isHovered
            ? "bg-neutral-50 border-neutral-200"
            : "bg-white border-transparent"
      )}
    >
      {/* Main content container */}
      <div className="flex items-center space-x-3 w-full">
        {/* Avatar container with proper z-index */}
        <div className="relative z-10">
          {data.isGroup?(<AvatarGroup users = {data.users}/>):(
         <Avatar 
            user={otherUser} 
            showStatus={true} 
            statusColor={selected ? "green" : "gray"}
          />  
        )}
         
        </div>
        
        {/* Text content */}
        <div className="flex flex-col overflow-hidden flex-1">
          <div className="flex items-center justify-between w-full">
            <span className={clsx(
              "font-medium truncate",
              !hasSeen && lastMessage ? "text-black" : "text-gray-900"
            )}>
              {otherUser.name || otherUser.email}
            </span>
            
            {/* Time display (either last message time or user creation time) */}
            {displayTime && (
              <span className="text-xs text-gray-500 ml-2 flex-shrink-0">
                {displayTime}
              </span>
            )}
          </div>
          
          {lastMessage ? (
            <div className="flex items-center justify-between w-full">
              <p className={clsx(
                "text-sm mt-1 truncate",
                !hasSeen ? "font-medium text-gray-800" : "text-gray-500"
              )}>
                {lastMessageText}
              </p>
              
              {!hasSeen && lastMessage && (
                <span className="bg-blue-500 rounded-full w-2 h-2 ml-2 flex-shrink-0"></span>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-between w-full">
              <p className="text-sm mt-1 text-gray-500 italic truncate">
               {lastMessageText}
              </p>
            </div>
          )}
        </div>
      </div>
      
      {selected && (
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-2/3 bg-blue-500 rounded-r-full" />
      )}
    </div>
  );
};

export default ConversationBox;