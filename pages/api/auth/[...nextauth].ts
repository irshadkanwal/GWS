import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { ApplicationUserType } from "@/store/userStore";
import { sendEmail } from "@/utilities/helpers/emailService";
import jwt from "jsonwebtoken";
import { EmailRequestTemplate } from "@/utilities/helpers/emailRequestsTemplate";
import bcrypt from "bcrypt";

declare module "next-auth" {
  interface Session {
    user: ApplicationUserType;
  }

  interface JWT {
    user: ApplicationUserType;
    id: string;
    iat: number;
    exp: number;
    jti: string;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password) {
          throw new Error("Email and password are required");
        }

        const BASE_URL = process.env.NEXT_PUBLIC_URL;

        const res = await fetch(`${BASE_URL}/api/auth/signin`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials.email.toLowerCase(),
            password: credentials.password,
          }),
        });

        if (res.status === 500) {
          throw new Error(JSON.stringify(await res.json()));
        }

        const user = await res.json();

        if (user) {
          return user;
        }
        return false;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user as ApplicationUserType;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
