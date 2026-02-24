// lib/auth.ts
import type { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { prisma } from "@/lib/prisma";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: { email: credentials?.email },
        });

        if (!user) throw new Error("Usuário não encontrado");

        const senhaCorreta = await compare(
          credentials?.password!,
          user.pass
        );
        if (!senhaCorreta) throw new Error("Senha incorreta");

        return {
          id: user.id!,
          email: user.email!,
          name: user.name!,
          image: user.urlImage || null,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 5 * 60 * 60,
  },
  pages: {
    signIn: "/",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.image = user.image;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        // @ts-expect-error
        session.user.id = token.id;
        // @ts-expect-error
        session.user.email = token.email;
        // @ts-expect-error
        session.user.name = token.name;
        // @ts-expect-error
        session.user.image = token.image;
      }
      return session;
    },
  },
};
