
import { useParams } from "next/navigation";

import { useMemo } from "react";

const useConversation = () => {
    const params = useParams();

    const conversationId = useMemo(() => {
        if (!params?.conversationId) {
            return '';
        }
        return params.conversationId as string;
    }, [params?.conversationId]);

    const isOpen = useMemo(() => !!conversationId, [conversationId]); //! aur pta hai hamne yeha per Double Exclamation mark likha hai n iska mtlb hai ki jo isOpen hai n wo boolean mein convert mein ho jayega kyuki pta hai double !! ki prop hoti hi hai kisi bhi chij ko boolean mei convet mein kaar dena jo string mein hota hai unko

    // todo=> Meainig OF useMemo :-
    /*
    useMemo basically ek "memoization" technique hai - matlab ek calculation ko remember karna so that bar bar repeat na karna pade. Imagine karo aap ek expensive calculation kar rahe ho component mein, jo har render pe repeat ho raha hai even though inputs same hain. That's wasteful, right?

        Jab bhi component re-render hota hai, React checks karta hai ki kya dependency array mein koi value change hui hai. Agar nahi hui, to previous calculated value ko hi return kar deta hai without running the function again. Agar hui hai, to function ko re-run karta hai.
    Kab use karein:

    Jab performance issue ho
    Complex calculations mein
    Objects create karne mein jo child components ko props ke through pass hote hain

    */
    return useMemo(() => ({
        isOpen,
        conversationId
    }), [isOpen, conversationId])
}

export default useConversation

