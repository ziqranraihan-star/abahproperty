import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Admin Login",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "admin" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Hardcoded admin for simplicity in this project phase
        // In a real app, query the User model from Prisma
        if (credentials?.username === "admin" && credentials?.password === "abahproperty2026") {
          return { id: "1", name: "Admin Abah", email: "admin@abahproperty.com" };
        }
        return null;
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: '/admin/login',
  },
  secret: process.env.NEXTAUTH_SECRET || "abhproperty_super_secret_key_2026_secure",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
