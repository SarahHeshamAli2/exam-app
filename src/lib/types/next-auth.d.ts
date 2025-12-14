import { User } from "next-auth";

declare module "next-auth" {
  interface User {
    accessToken: string;
    user: {
      _id: string;
      username: string;
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      role: string;
      isVerified: boolean;
      createdAt: string;
    };
  }

  interface Session {
    user: User[user];
  }
}

declare module "next-auth/jwt" {
  interface JWT extends User {}
}
