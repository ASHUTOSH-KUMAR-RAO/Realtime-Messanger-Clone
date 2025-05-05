
import prisma from "@/app/libs/prismaDb";

import getSession from "./getSession";

const getCurrentUser = async () => {
    try {
        const session = await getSession();

        if (!session?.user?.email) {
            return null
        }

        const currentUSer = await prisma.user.findUnique({
            where: {
                email: session.user.email as string
            }

        })

        if (!currentUSer) {
            return null
        }

        return currentUSer

    } catch (error: any) {
        return null
    }
}

export default getCurrentUser;