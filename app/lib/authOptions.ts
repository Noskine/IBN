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
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email e senha são obrigatórios");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        const student = user
          ? null
          : await prisma.student.findUnique({
              where: { email: credentials.email },
            });

        const account = user ?? student;
        if (!account) throw new Error("Usuário não encontrado");

        const senhaCorreta = await compare(credentials.password, account.pass);
        if (!senhaCorreta) throw new Error("Senha incorreta");

        return {
          id: account.id,
          email: account.email,
          name: account.name,
          role: user ? "ADMIN" : "STUDENT",
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 5 * 60 * 60,
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = user.role;
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
        session.user.role = token.role;
      }
      return session;
    },
  },
};
