"use client";

import { useState } from "react";
import ForgotPasswordForm from "./_components/forgot-password-form";
import VerifyOtp from "./_components/verify-otp-form";
import ResetPasswordForm from "./_components/reset-password-form";

type Step = "email" | "otp" | "reset-password";

export default function ForgetPasswordPage() {
  const [currentStep, setCurrentStep] = useState<Step>("email");
  const [email, setEmail] = useState("");

  const handleEmailSubmit = (submittedEmail: string) => {
    setEmail(submittedEmail);
    setCurrentStep("otp");
  };

  const handleOTPVerified = (userEmail: string) => {
    setCurrentStep("reset-password");
    setEmail(userEmail);
  };


  const handleGetPrevPage = (email: string) => {
    console.log(email);
    setEmail(email);
    setCurrentStep("email");
  };

  return (
    <>
      {currentStep === "email" && (
        <ForgotPasswordForm otpEmail={email} onSubmit={handleEmailSubmit} />
      )}

      {currentStep === "otp" && (
        <VerifyOtp
          getPrevPage={handleGetPrevPage}
          email={email}
          onVerified={handleOTPVerified}
        />
      )}

      {currentStep === "reset-password" && <ResetPasswordForm email={email} />}
    </>
  );
}
