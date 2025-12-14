import Image from "next/image";
import React from "react";
import logo from "/public/assets/images/Final Logo 1.png";
import ExamAppIcon from "@/components/shared/exam-app-icon";
import { GraduationCap, User } from "lucide-react";
import SidebarNav from "./side-bar-nav";
import UserInfo from "./user-info";
import Link from "next/link";

const sidebarLinks = [
  {
    icon: <GraduationCap />,
    href: "/diplomas",
    title: "Diplomas",
  },
  {
    icon: <User />,
    href: "/account-settings/profile",
    title: "Account Settings",
  },
];

export default function SideBar() {
  return (
    <aside className="bg-blue-50 p-5 h-screen sticky top-0 z-50 flex flex-col">
      <div className="flex-1 overflow-y-auto scrollbar-none">
        <div className="w-48 mt-10 mb-10">
          <Link href={"/"}>
            {" "}
            <Image
              src={logo}
              alt="Elevate academy logo"
              quality={90}
              priority
            />
          </Link>
          <ExamAppIcon />
        </div>
        <SidebarNav links={sidebarLinks} />
      </div>
      <div className="pt-6 border-blue-100">
        <UserInfo />
      </div>
    </aside>
  );
}
