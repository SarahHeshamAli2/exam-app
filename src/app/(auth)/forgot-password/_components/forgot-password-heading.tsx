import { Button } from "@/components/ui/button";
import { MoveLeft } from "lucide-react";
import React from "react";

type forgotPasswordHeadingProps = {
  title: string;
  subtitle: string;
  otpEmail?: string;
  handleGetPrevPage?: (email: string) => void;
  email?: string;
};

export default function ForgotPasswordHeading({
  title,
  subtitle,
  otpEmail,
  handleGetPrevPage,
  email,
}: forgotPasswordHeadingProps) {
  const getPrev = otpEmail && handleGetPrevPage && email;
  return (
    <div className="md:my-0 my-5">
      {getPrev && (
        <Button
          onClick={() => handleGetPrevPage(email)}
          variant={"link"}
          className="border w-10 h-10 mb-10">
          <MoveLeft />
        </Button>
      )}
      <h2 className="font-bold text-2xl">{title}</h2>
      <p className="font-mono text-gray-500 mt-3">{subtitle}</p>
      {getPrev && (
        <div className="flex gap-2">
          <span>{otpEmail}.</span>
          <button
            onClick={() => handleGetPrevPage(email)}
            className="text-blue-600 underline">
            Edit
          </button>
        </div>
      )}
    </div>
  );
}
