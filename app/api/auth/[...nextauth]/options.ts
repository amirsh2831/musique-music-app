import type { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";
import type { Adapter } from "next-auth/adapters";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const options: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "signin",
      credentials: {
        username: { label: "Username", type: "text " },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // check to see if username and password is there
        if (!credentials?.username || !credentials?.password) {
          console.log("no user or password");
          throw new Error("Please enter an username and password");
        }
        //check to see if user exists
        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.username,
          },
        });
        // if no user was found
        if (!user || !user?.password) {
          console.log("user not found..");
          throw new Error("No user found");
        }
        const passwordsMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );
        // check to see if password matches
        // if password does not match
        if (!passwordsMatch) {
          console.log("password dont match");
          throw new Error("Incorrect password");
        }

        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: "WsYn8bSa8XCEKC5fiiYUDSVFfAU246UfRtVrhBKHyck=",
    // encryption: true,
  },
  pages: {
    signIn: "/Login",
    newUser: "/Signup",
  },
  callbacks: {
    async session({ session, token }) {
      // Send properties to the client, like an access_token and user id from a provider.
      //   session.user.name = token.name;

      return session;
    },
    async jwt({ token, account, profile }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
        token.id = account.userId;
      }
      return token;
    },
  },

  // debug: process.env.NODE_ENV === "development",
};
export default NextAuth(options);
