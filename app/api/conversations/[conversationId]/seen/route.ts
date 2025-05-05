import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismaDb";
import { NextResponse } from "next/server";

interface IParams {
  conversationId?: string;
}

export async function POST(
  request: Request,
  { params }: { params: IParams } // ✅ correct destructuring
) {
  try {
    const { conversationId } = params;

    const currentUser = await getCurrentUser();

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!conversationId || typeof conversationId !== "string") {
      return new NextResponse("Invalid Conversation ID", { status: 400 });
    }

    const conversation = await prisma.conversation.findUnique({
      where: { id: conversationId },
      include: {
        messages: {
          include: { seen: true },
          orderBy: { createdAt: "desc" },
        },
        users: true,
      },
    });

    if (!conversation) {
      return new NextResponse("Conversation not found", { status: 404 });
    }

    if (!conversation.users.some((user) => user.id === currentUser.id)) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    const [lastMessage] = conversation.messages;

    if (!lastMessage) {
      return NextResponse.json(conversation);
    }

    if (lastMessage.seen.some((user) => user.id === currentUser.id)) {
      return NextResponse.json(lastMessage);
    }

    const updatedMessage = await prisma.message.update({
      where: { id: lastMessage.id },
      include: {
        sender: true,
        seen: true,
      },
      data: {
        seen: {
          connect: { id: currentUser.id },
        },
      },
    });

    return NextResponse.json(updatedMessage);
  } catch (error) {
    console.error("ERROR_MESSAGES_SEEN:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
