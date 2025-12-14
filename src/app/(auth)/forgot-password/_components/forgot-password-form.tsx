"use client";
import React from "react";
import ForgotPasswordHeading from "./forgot-password-heading";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import AuthFormFooter from "../../_components/auth-form-footer";
import { SubmitHandler, useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSubmissionError } from "@/hooks/use-submission-error";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import ErrorFormField from "@/components/shared/error-form-field";
import useForgotPassword from "../_hooks/use-forgot-password";
import { ForgotPasswordFields } from "@/lib/types/auth.types";
interface ForgotPasswordFormProps {
  onSubmit: (email: string) => void;
  otpEmail?: string;
}
export default function ForgotPasswordForm({
  onSubmit,
  otpEmail,
}: ForgotPasswordFormProps) {
  const { displayedErrorMessage, clearError, setErrorMessage } =
    useSubmissionError();
  const { forgotPassword, isPending } = useForgotPassword();
  const schema = zod.object({
    email: zod.email("please enter a valid email"),
  });

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: otpEmail || "",
    },
  });
  const isFieldError = form.formState.errors;
  const formState = form.formState;
  const onHandleSubmit: SubmitHandler<ForgotPasswordFields> = async (
    values
  ) => {
    clearError();
    forgotPassword(values, {
      onError: (error) => {
        if (error.message.includes("email")) {
          form.setError("email", {
            message: error.message,
          });
        } else {
          setErrorMessage(error.message);
        }
      },
      onSuccess: (response) => {
        toast.success(response.info || "OTP sent to your email");

        clearError();
        onSubmit(values.email);
      },
    });
  };

  return (
    <div className="md:w-login mx-auto flex flex-col justify-center ">
      <ForgotPasswordHeading
        title="Forgot Password"
        subtitle="Don’t worry, we will help you recover your account."
      />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onHandleSubmit)}
          className="font-mono mt-10">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="User@example.com"
                    isError={!!isFieldError.email}
                  />
                </FormControl>
                <ErrorFormField error={isFieldError.email} />
              </FormItem>
            )}
          />
          {displayedErrorMessage()}
          <Button
            disabled={isPending || !formState.isValid || formState.isSubmitting}
            className="w-full mt-10">
            Continue <ArrowRightIcon />
          </Button>
        </form>
      </Form>

      <AuthFormFooter
        linkHref="/register"
        linkText="Create yours"
        text="Don’t have an account?"
      />
    </div>
  );
}
