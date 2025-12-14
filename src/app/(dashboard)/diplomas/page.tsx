import { Metadata } from "next";
import DiplomaCard from "./_components/diploma-card";
export const metadata: Metadata = {
  title: "Elevate Diplomas",
  description: "View and download your diploma certificate",
};
export default function page() {
  return (
    <div>
      <DiplomaCard />
    </div>
  );
}
