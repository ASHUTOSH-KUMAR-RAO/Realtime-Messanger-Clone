
import getCurrentUser from "@/app/actions/getCurrentUser";

import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismaDb";
import { pusherServer } from "@/app/libs/pusher";


export async function POST(
    request: Request
) {
    try {
        const currentUser = await getCurrentUser();

        const body = await request.json()

        const {
            userId,
            isGroup,
            members,
            name
        } = body; //! Aab jaise pta hai jitne bhi possible way ho sekte conversation ke liy ewo saab ko hum yeha per extract karenege simply baas yehi kaam karna hai yeha per ,jaise 1 to 1 chat karne ke liye,group mein chat karne ke liye,members ke sath krne ke liye ye saab bhi hamne aad kiya hai 

        if (!currentUser?.id || !currentUser?.email) {
            return new NextResponse('Unauthorized ', { status: 401 })
        }
        if (isGroup && (!members || members.length < 2 || !name)) {
            return new NextResponse("Invalid Data", { status: 400 })
        }

        if (isGroup) { // todo=> ye Group conversation ke liye hamne banaya hai thik aab hum imse ye problem nhi hai ki kya group mein exiting chat rakhna chaiye ya nhi ..iski koi tension nhi hai hame,lekin 1 to 1 chat mein humko existing chat rakhna jaruri hai  
            const newConversation = await prisma.conversation.create({
                data: {
                    name,
                    isGroup,
                    users: {
                        connect: [
                            ...members.map((member: { value: string }) => ({
                                id: member.value
                            })),
                            {
                                id: currentUser.id
                            }
                        ]
                    }
                },
                include: {
                    users: true
                }
            })

            newConversation.users.forEach((user)=>{
                if (user.email) {
                    pusherServer.trigger(user.email,'conversation:new',newConversation)
                }
            })
            return NextResponse.json(newConversation)
        }

        const existingConversations = await prisma.conversation.findMany({
            where: {
                OR: [
                    {
                        userIds: {
                            equals: [currentUser.id, userId]
                        }
                    },

                    {
                        userIds: {
                            equals: [userId, currentUser.id]
                        }
                    }

                ]
            }
        });

        const singleConversation = existingConversations[0] // Aur ye SIngle conversation ke liye hai 

        if (singleConversation) {
            return NextResponse.json(singleConversation);
        }

        const newConversation = await prisma.conversation.create({
            data: {
                users: {
                    connect: [
                        {
                            id: currentUser.id
                        },
                        {
                            id: userId
                        }
                    ]
                }
            },
            include: {
                users: true
            }
        })

        newConversation.users.map((user)=>{
            if (user.email) {
                pusherServer.trigger(user.email,'conversation:new',newConversation)
            }
        })

        return NextResponse.json(newConversation)
    } catch (error: any) {
        return new NextResponse('Internal Error', { status: 500 })
    }
}
