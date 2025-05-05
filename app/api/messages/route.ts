import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismaDb";

import { pusherServer } from "@/app/libs/pusher";

export async function POST(request: Request) {
    try {
        // Get current user
        const currentUser = await getCurrentUser();
        const body = await request.json();

        // Extract data from request body
        const { message, image, conversationId } = body;

        // Check authentication
        if (!currentUser?.email || !currentUser?.id) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // Validate that either message or image is provided
        if (!message && !image) {
            return new NextResponse("Message or image is required", { status: 400 });
        }

        // Create new message with proper handling for both text and image
        const newMessage = await prisma.message.create({
            data: {
                // Use empty string for body if only image is provided
                body: message || "",
                // Save image URL from Cloudinary
                image: image || null,
                conversation: {
                    connect: {
                        id: conversationId
                    }
                },
                sender: {
                    connect: {
                        id: currentUser.id
                    }
                },
                seen: {
                    connect: {
                        id: currentUser.id
                    }
                }
            },
            include: {
                sender: true,
                seen: true,
            }
        });



        // Update the conversation with the new message
        const updatedConversation = await prisma.conversation.update({
            where: {
                id: conversationId,
            },
            data: {
                lastMessageAt: new Date(),
                messages: {
                    connect: {
                        id: newMessage.id,
                    },
                },
            },
            include: {
                users: true,
                messages: {
                    include: {
                        seen: true,
                        sender: true
                    }
                }
            }
        });

        await pusherServer.trigger(conversationId, 'message:new', newMessage)

        const lastMessage = updatedConversation.messages[updatedConversation.messages.length - 1]

        updatedConversation.users.map((user) => {
            pusherServer.trigger(user.email!, 'conversation:update', {
                id: conversationId,
                message: [lastMessage]
            })
        });

        // Return the new message as JSON response
        return NextResponse.json(newMessage);
    } catch (error: any) {
        console.error("Error in POST request in Messages:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}