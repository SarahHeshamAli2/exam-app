"use client";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React from "react";
import PasswordInput from "../../_components/password-input";
import { Button } from "@/components/ui/button";
import AuthFormFooter from "../../_components/auth-form-footer";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Form,
} from "@/components/ui/form";
import ErrorFormField from "@/components/shared/error-form-field";
import { SubmitHandler, useForm } from "react-hook-form";
import { loginSchema } from "@/lib/schemes/auth.schema";
import useLogin from "../_hooks/use-login";
import { useSubmissionError } from "@/hooks/use-submission-error";

import { LoginFields } from "@/lib/types/auth.types";
type LoginFormProps = {
  defaultEmail?: string;
};

export default function LoginForm({ defaultEmail = "" }: LoginFormProps) {
  const { login, isPending, error } = useLogin();
  const { displayedErrorMessage, setErrorMessage } = useSubmissionError();

  const form = useForm({
    mode: "onChange",
    defaultValues: {
      email: defaultEmail,
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const isFieldError = form.formState.errors;
  const formState = form.formState;
  const handleSubmit: SubmitHandler<LoginFields> = async (values) => {
    login(values, {
      onError: (error) => {
        const errorFieldMap = {
          email: "email",
          password: "password",
        } as const;
        type ErrorKeyword = keyof typeof errorFieldMap;

        const matchedField = (
          Object.keys(errorFieldMap) as ErrorKeyword[]
        ).find((keyword) =>
          error.message.toLowerCase().includes(keyword.toLowerCase())
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
    <section className="md:w-login flex flex-col mx-auto justify-center ">
      <h2 className="mb-4 font-bold text-2xl">Login</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="font-mono">
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
                <ErrorFormField error={formState.errors.email} />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    name={field.name}
                    isError={!!isFieldError.password}
                  />
                </FormControl>
                <ErrorFormField error={formState.errors.password} />
              </FormItem>
            )}
          />

          <Link
            className="text-end block mt-2 text-blue-600  font-medium"
            href="/forgot-password">
            Forget your password
          </Link>

          <Button
            disabled={isPending || formState.isSubmitting || !formState.isValid}
            className="w-full mt-10">
            Login
          </Button>
          {error && displayedErrorMessage()}
        </form>
      </Form>
      <AuthFormFooter
        linkText="Create yours"
        linkHref="/register"
        text="Don’t have an account?"
      />
    </section>
  );
}
