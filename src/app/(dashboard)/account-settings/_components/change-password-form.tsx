"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSubmissionError } from "@/hooks/use-submission-error";
import { changePasswordSchema } from "@/lib/schemes/auth.schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import ErrorFormField from "@/components/shared/error-form-field";
import { ResetPasswordFields } from "@/lib/types/auth.types";
import PasswordInput from "@/app/(auth)/_components/password-input";
import useChangePassword from "../_hooks/use-change-password";

export default function ChangePasswordForm() {
  const { displayedErrorMessage, setErrorMessage } = useSubmissionError();
  const { changePassword, isPending } = useChangePassword();

  const form = useForm<ResetPasswordFields>({
    mode: "onChange",
    defaultValues: {
      oldPassword: "",
      password: "",
      rePassword: "",
    },
    resolver: zodResolver(changePasswordSchema),
  });
  const isFieldError = form.formState.errors;
  const submitHandler: SubmitHandler<ResetPasswordFields> = async (data) => {
    changePassword(data, {
      onError: (error) => {
        const errorFieldMap = {
          oldPassword: "oldPassword",
          "old password": "oldPassword",
          password: "password",

          rePassword: "rePassword",
        } as const;

        type ErrorKeyword = keyof typeof errorFieldMap;
        const matchedField = (
          Object.keys(errorFieldMap) as ErrorKeyword[]
        ).find((keyword) =>
          error.message.toLowerCase().includes(keyword.toLocaleLowerCase())
        );

        if (matchedField) {
          form.setError(
            errorFieldMap[matchedField],
            {
              type: "custom",
              message: error.message,
            },
            {
              shouldFocus: true,
            }
          );
        } else {
          setErrorMessage(error.message);
        }
      },
    });
  };

  return (
    <div className="h-screen p-6 bg-white mx-5 ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submitHandler)}
          className="font-mono mt-10">
          <FormField
            control={form.control}
            name="oldPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    name={field.name}
                    isError={!!isFieldError.oldPassword}
                  />
                </FormControl>
                <ErrorFormField error={form.formState.errors.oldPassword} />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    name={field.name}
                    isError={!!isFieldError.password}
                  />
                </FormControl>
                <ErrorFormField error={form.formState.errors.password} />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="rePassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm New Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    name={field.name}
                    isError={!!isFieldError.rePassword}
                  />
                </FormControl>
                <ErrorFormField error={form.formState.errors.rePassword} />
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
            Change Password
          </Button>
        </form>
      </Form>
    </div>
  );
}
