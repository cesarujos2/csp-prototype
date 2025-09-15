import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "../../../_config/database";
import type { Account, User, Session } from "next-auth";
import type { JWT } from "next-auth/jwt";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account }: { user: User; account: Account | null }) {
      if (account?.provider === "google" && user.email) {
        try {
          // Check if user exists
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email },
          });

          if (!existingUser) {
            // Check if this is the first user (owner)
            const userCount = await prisma.user.count();
            const role = userCount === 0 ? "OWNER" : "USER";

            // Create new user with incomplete profile
            await prisma.user.create({
              data: {
                email: user.email,
                name: user.name || "",
                image: user.image || "",
                role: role,
                profileComplete: false, // New users need to complete profile
              },
            });
          }
          return true;
        } catch (error) {
          console.error("Error during sign in:", error);
          return false;
        }
      }
      return true;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token?.email) {
        const dbUser = await prisma.user.findUnique({
          where: { email: token.email },
        });
        if (dbUser) {
          session.user.id = dbUser.id;
          session.user.role = dbUser.role;
          session.user.address = dbUser.address;
          session.user.postalCode = dbUser.postalCode;
          session.user.profileComplete = dbUser.profileComplete;
        }
      }
      return session;
    },
    async jwt({ token, user, trigger }: { token: JWT; user?: User; trigger?: string }) {
      // Always refresh user data from database on update trigger or initial login
      if (user?.email || trigger === "update") {
        const email = user?.email || token.email;
        if (email) {
          const dbUser = await prisma.user.findUnique({
            where: { email },
          });
          if (dbUser) {
            token.id = dbUser.id;
            token.role = dbUser.role;
            token.address = dbUser.address;
            token.postalCode = dbUser.postalCode;
            token.profileComplete = dbUser.profileComplete;
          }
        }
      }
      return token;
    },
  },
  pages: {
    signIn: "/auth",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };