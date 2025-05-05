
import { useMemo } from "react";

import { usePathname } from "next/navigation";

import { HiChat } from 'react-icons/hi';

import { HiArrowLeftOnRectangle, HiUsers } from "react-icons/hi2";

import { signOut } from "next-auth/react";

import useConversation from "./useConversation";


const UseRoutes = () => {
    const pathname = usePathname();

    const { conversationId } = useConversation();

    const routes = useMemo(() => [

        //! Ye chat krne ke liye hai 
        {
            label: "Chat",
            href: "/conversations",
            icon: HiChat,
            active: pathname === "/conversations" || !!conversationId
        },

        // *Ye Users ke liye hai 
        {
            label: 'users',
            href: '/users',
            icon: HiUsers,
            active: pathname === '/users'
        },

        //? aur ye Logout karne ke liye hai 

        {

            label: "Logout",
            href: "#",
            onClick: () => signOut(),
            icon: HiArrowLeftOnRectangle

        }
    ], [pathname, conversationId])

    return routes;
}


export default UseRoutes;