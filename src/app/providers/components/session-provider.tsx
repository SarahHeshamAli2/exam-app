"use client";

import { LayoutProps } from "@/lib/types/layout.types";
import { SessionProvider } from "next-auth/react";

export default function NextAuthProvider({ children }: LayoutProps) {
  return <SessionProvider>{children}</SessionProvider>;
}
