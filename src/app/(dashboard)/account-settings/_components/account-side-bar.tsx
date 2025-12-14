import { CircleUserRound, Lock } from "lucide-react";
import SidebarNav from "../../_components/side-bar-nav";

export default function AccountSideBar() {
  const sidebarLinks = [
    {
      icon: <CircleUserRound />,
      href: "/account-settings/profile",
      title: "Profile",
    },
    {
      icon: <Lock />,
      href: "/account-settings/change-password",
      title: "Change Password",
    },
  ];
  return (
    <div className="bg-white p-6">
      <SidebarNav links={sidebarLinks} isAccountSettings />
    </div>
  );
}
