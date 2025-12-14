"use client";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarLink {
  icon: React.ReactNode;
  href: string;
  title: string;
}

interface SidebarNavProps {
  links: SidebarLink[];
  isAccountSettings?: boolean;
}

export default function SidebarNav({
  links,
  isAccountSettings,
}: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <nav className="mt-6 space-y-2 font-mono flex flex-col md:h-screen">
      {links.map((link, index) => {
        const isActive =
          pathname === link.href || pathname.startsWith(link.href + "/");

        return (
          <Link href={link.href} key={index}>
            <div
              className={`flex items-center gap-3 px-4 py-3  transition-all ${
                isActive && isAccountSettings
                  ? " text-blue-600 bg-blue-50 "
                  : isActive
                  ? "text-blue-600 bg-blue-100"
                  : "text-gray-500 "
              }`}>
              <span className={isActive ? "text-blue-600" : "text-gray-500"}>
                {link.icon}
              </span>
              {link.title}
            </div>
          </Link>
        );
      })}
      {isAccountSettings && (
        <>
          <div className="flex-grow" />
          <Button
            onClick={() => signOut()}
            className="w-full bg-red-50 hover:bg-red-100">
            <LogOut className="text-red-600" />
            <span className="text-red-600">Logout</span>
            <span className="sr-only">log out</span>
          </Button>
        </>
      )}
    </nav>
  );
}
