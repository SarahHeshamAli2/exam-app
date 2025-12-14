import { LayoutProps } from "@/lib/types/layout.types";
import AccountSideBar from "./_components/account-side-bar";

export default function layout({ children }: LayoutProps) {
  return (
    <div className="md:flex">
      <div className="md:w-1/3">
        <AccountSideBar />
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
}
