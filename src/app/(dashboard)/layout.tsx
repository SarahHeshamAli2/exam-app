import { LayoutProps } from "@/lib/types/layout.types";
import React from "react";
import SideBar from "./_components/side-bar";
import { BreadCrumbs } from "./_components/bread-crumbs";
import DashboardHeader from "./_components/dashboard-header";

export default function layout({ children }: LayoutProps) {
  return (
    <div className="flex  min-h-screen">
      <div className="w-1/4">
        <SideBar />
      </div>
      <div className="w-full">
        <BreadCrumbs />
        <div className=" bg-gray-50 p-4">
          <DashboardHeader />
          {children}
        </div>
      </div>
    </div>
  );
}
