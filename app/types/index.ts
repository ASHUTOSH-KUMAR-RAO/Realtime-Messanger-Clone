
import { Conversation, Message, User } from "../generated/prisma";


export type FullMessageType = Message & { // ? jante ho iska mtlb kya hua hai yeha per humne ek custom type define kiya hai jiske variable ka name hai (FullMessageType) aur iska type hoga [Message],aur ye typescript ka ek best features hota hai ....⚡aur iske hi help se hum existing type ko update bhi kr sekte hai (aur iss concepts ka name hai intersection types)
    sender: User,
    seen: User[],
};

export type FullConversationType = Conversation & { // ! same aise hi yah per bhi hua hai jante ho iska mtlb kya hua hai yeha per humne ek custom type define kiya hai jiske variable ka name hai (FullConversationType) aur iska type hoga [Conversation ],aur ye typescript ka ek best features hota hai ....⚡,aur iske hi help se hum existing type ko update bhi kr sekte hai (aur iss concepts ka name hai intersection types)
    users: User[],
    messages: FullMessageType[],
}