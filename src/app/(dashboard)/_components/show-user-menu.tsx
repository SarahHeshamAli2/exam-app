"use client";
import { Button } from "@/components/ui/button";
import { EllipsisVertical, LogOut, UserRound } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";
import Link from "next/link";

export default function ShowUserMenu() {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="p-0" variant="ghost" aria-label="Open menu">
            <EllipsisVertical size={18} color="gray" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-60 rounded-none font-mono ">
          <DropdownMenuItem asChild>
            <Link
              href="/account-settings/profile"
              className="gap-2 font-normal text-gray-800">
              <UserRound color="gray" />
              Account
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => signOut()}
            className="text-red-600 focus:text-red-700">
            <LogOut className="text-red-400" />
            Logout
            <span className="sr-only">log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
