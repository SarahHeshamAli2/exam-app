"use client";
import React, { useState, useRef, useEffect } from "react";
import ForgotPasswordHeading from "./forgot-password-heading";
import { Button } from "@/components/ui/button";
import AuthFormFooter from "../../_components/auth-form-footer";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useSubmissionError } from "@/hooks/use-submission-error";
import { useResendTimer } from "../../_hooks/use-resend-otp";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import ErrorFormField from "@/components/shared/error-form-field";
import { toast } from "sonner";
import useForgotPassword from "../_hooks/use-forgot-password";
import { verifyOtpSchema } from "@/lib/schemes/auth.schema";
import useVerifyOtp from "../_hooks/use-verify-otp";
import { VerifyOtpField } from "@/lib/types/auth.types";

interface VerifyOtpFormProps {
  onVerified: (userEmail: string) => void;
  getPrevPage: (email: string) => void;
  email: string;
}

export default function VerifyOtp({
  email,
  onVerified,
  getPrevPage,
}: VerifyOtpFormProps) {
  const { displayedErrorMessage, setErrorMessage, clearError } =
    useSubmissionError();
  const { secondsLeft, canResend, resetTimer } = useResendTimer(60);
  const { forgotPassword } = useForgotPassword();
  const { verifyOtp, isPending } = useVerifyOtp();
  const [isResending, setIsResending] = useState<boolean>(false);

  const otpInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<VerifyOtpField>({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: {
      resetCode: "",
    },
  });
  const formState = form.formState;

  useEffect(() => {
    const timer = setTimeout(() => {
      otpInputRef.current?.focus();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const submitHandler: SubmitHandler<VerifyOtpField> = async (values) => {
    clearError();
    verifyOtp(values, {
      onError: (error) => {
        if (error.message.toLowerCase().includes("reset")) {
          form.setError("resetCode", {
            message: error.message,
          });
        } else {
          setErrorMessage(error.message);
        }
      },
      onSuccess: () => {
        onVerified(email);
      },
    });
  };

  const handleResendCode = async () => {
    if (!canResend) return;
    setIsResending(true);

    form.clearErrors("resetCode");
    form.reset();

    clearError();
    forgotPassword(
      { email },
      {
        onSuccess: (response) => {
          resetTimer();
          toast.success(response.info || "New OTP has been sent!");
          setIsResending(false);
          // Refocus after resend
          setTimeout(() => {
            otpInputRef.current?.focus();
          }, 100);
        },
        onError: () => {
          setIsResending(false);
        },
      }
    );
  };

  return (
    <div className="md:w-login mx-auto flex flex-col justify-center">
      <ForgotPasswordHeading
        title="Verify OTP"
        subtitle={`Please enter the 6-digits code we have sent to:`}
        otpEmail={email}
        handleGetPrevPage={getPrevPage}
        email={email}
      />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submitHandler)}
          className="font-mono mt-10">
          <FormField
            control={form.control}
            name="resetCode"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputOTP
                    ref={otpInputRef}
                    maxLength={6}
                    value={field.value}
                    onChange={field.onChange}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPGroup>
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <ErrorFormField error={form.formState.errors.resetCode} />
              </FormItem>
            )}
          />
          <div className="text-center text-sm mt-6">
            {canResend ? (
              <>
                <span className="text-gray-500 text-sm">
                  Didn&apos;t recieve the code ?
                </span>
                <Button
                  type="button"
                  variant={"link"}
                  disabled={isResending}
                  onClick={handleResendCode}
                  className="text-blue-600  font-medium ">
                  Resend
                </Button>
              </>
            ) : (
              <span className="text-gray-500">
                You can request another code in: {secondsLeft}s
              </span>
            )}
          </div>

          {displayedErrorMessage()}

          <Button
            disabled={isPending || !formState.isValid || formState.isSubmitting}
            className="w-full mt-10">
            Verify Code
          </Button>
        </form>
      </Form>
      <AuthFormFooter
        linkHref="/register"
        linkText="Create yours"
        text="Don't have an account?"
      />
    </div>
  );
}
