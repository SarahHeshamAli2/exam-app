import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";
import Image from "next/image";
import React from "react";
import userIcon from "/public/assets/images/icon-7797704_1280.png";
import ShowUserMenu from "./show-user-menu";

export default async function UserInfo() {
  const session = await getServerSession(authOptions);
  const userFirstName = session?.user.firstName;
  const userEmail = session?.user.email;
  return (
    <div className="font-mono flex gap-2 items-start">
      <Image
        src={userIcon}
        alt="user profile photo"
        width={54}
        height={54}
        className="border border-blue-600 flex-shrink-0"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-1">
          <div className="min-w-0 flex-1">
            <p className="text-blue-600 truncate">{userFirstName}</p>
            <p className="text-sm text-gray-500 truncate">{userEmail}</p>
          </div>
          <ShowUserMenu />
        </div>
      </div>
    </div>
  );
}
