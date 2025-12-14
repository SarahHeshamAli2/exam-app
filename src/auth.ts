import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { loginService } from "./lib/services/auth.service";
export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
    error: "/login",
    signOut: "/login",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const payload = await loginService({
          email: credentials!.email,
          password: credentials!.password,
        });
        if ("code" in payload) {
          throw new Error(payload.message);
        }
        return {
          accessToken: payload.token,
          user: payload.user,
          id: payload.user._id,
        };
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user, trigger, session }) => {
      if (user) {
        token.accessToken = user.accessToken;
        token.user = user.user;
      }
      if (trigger === "update" && session) {
        token.user = {
          ...token.user,
          ...session.user,
        };
      }

      return token;
    },
    session: ({ session, token }) => {
      session.user = token.user;
      return session;
    },
  },
};
