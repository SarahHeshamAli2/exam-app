import { Metadata } from "next";
import ChangePasswordForm from "../_components/change-password-form";
import ProfileForm from "../_components/profile-form";

type Props = {
  params: Promise<{
    section: string;
  }>;
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { section } = await params;

  switch (section) {
    case "profile":
      return {
        title: "Profile Settings",
        description: "Update your profile information and preferences",
      };
    case "change-password":
      return {
        title: "Change Password",
        description: "Update your account password for security",
      };
    default:
      return {
        title: "Settings",
        description: "Manage your account settings",
      };
  }
}

export default async function SettingsPage({ params }: Props) {
  const { section } = await params;

  return (
    <div>
      {section === "profile" && <ProfileForm />}
      {section === "change-password" && <ChangePasswordForm />}
    </div>
  );
}
