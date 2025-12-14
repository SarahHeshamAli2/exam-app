"use client";
import React from "react";
import ForgotPasswordHeading from "./forgot-password-heading";
import { Button } from "@/components/ui/button";
import AuthFormFooter from "../../_components/auth-form-footer";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSubmissionError } from "@/hooks/use-submission-error";
import PasswordInput from "../../_components/password-input";
import { resetPasswordSchema } from "@/lib/schemes/auth.schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import ErrorFormField from "@/components/shared/error-form-field";
import useResetPassword from "../_hooks/use-reset-password";
import { ResetPasswordFields } from "@/lib/types/auth.types";
interface ForgotPasswordFormProps {
  email: string;
}
export default function ResetPasswordForm({ email }: ForgotPasswordFormProps) {
  const { displayedErrorMessage, clearError } = useSubmissionError();
  const { resetPassword, isPending } = useResetPassword();

  const form = useForm<ResetPasswordFields>({
    mode: "onChange",
    defaultValues: {
      newPassword: "",
      confirmNewPassword: "",
    },
    resolver: zodResolver(resetPasswordSchema),
  });
  const isFieldError = form.formState.errors;
  const submitHandler: SubmitHandler<ResetPasswordFields> = async (data) => {
    clearError();
    const dataWithEmail = { ...data, email: email };
    resetPassword(dataWithEmail);
  };

  return (
    <div className="md:w-login mx-auto flex flex-col justify-center ">
      <ForgotPasswordHeading
        title="Create a New Password"
        subtitle="Create a new strong password for your account."
      />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submitHandler)}
          className="font-mono mt-10">
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    name={field.name}
                    isError={!!isFieldError.newPassword}
                  />
                </FormControl>
                <ErrorFormField error={form.formState.errors.newPassword} />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmNewPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm New Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    name={field.name}
                    isError={!!isFieldError.confirmNewPassword}
                  />
                </FormControl>
                <ErrorFormField
                  error={form.formState.errors.confirmNewPassword}
                />
              </FormItem>
            )}
          />

          {displayedErrorMessage()}
          <Button
            disabled={
              isPending ||
              form.formState.isSubmitting ||
              !form.formState.isValid
            }
            className="w-full mt-10">
            Reset Password
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
