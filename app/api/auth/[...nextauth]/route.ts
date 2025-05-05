
import bcrypt from 'bcrypt'

import NextAuth, { AuthOptions } from 'next-auth'

import CredentialsProvider from 'next-auth/providers/credentials' //! Aur iske through hum custom email and password se bhi login kaar sekte hai aur sabse complex isko hi hota hai banana

import GithubProvider from 'next-auth/providers/github' //? iske through hum Github se logine krte hai 
import GoogleProvider from 'next-auth/providers/google' //todo aur Similary iske Google se login karte hai 


import { PrismaAdapter } from "@next-auth/prisma-adapter"

import prisma from "@/app/libs/prismaDb"

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,

        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'email', type: 'text' },
                password: { label: 'password', type: 'password' }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Invalid Credentials")
                }

                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }

                });

                if (!user || !user?.hashedPassword) {
                    throw new Error("Invalid Credentials")
                }

                const isCorrectPassword = await bcrypt.compare(
                    credentials.password,
                    user.hashedPassword
                );

                if (!isCorrectPassword) {
                    throw new Error("Invalid Credentials")
                }
                return user;
            }

        })
    ],
    debug: process.env.NODE_ENV === 'development', //! kabhi bhi hum auhtentication ya authorization ke case mein debug ko on krna chaiye, because isese bahut help milta hai ,aur bahut achi aur important information dekhne ko mill jata hai terminal mein 

    session: {
        strategy: 'jwt'
    },
    secret: process.env.NEXTAUTH_SECRET,

};


const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
