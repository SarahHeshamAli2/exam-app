"use client";

import { PhoneInput } from "@/components/shared/phone-input";
import { Input } from "@/components/ui/input";
import PasswordInput from "../../_components/password-input";
import { Button } from "@/components/ui/button";
import AuthFormFooter from "../../_components/auth-form-footer";
import { SubmitHandler, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/lib/schemes/auth.schema";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import ErrorFormField from "@/components/shared/error-form-field";
import { useSubmissionError } from "@/hooks/use-submission-error";
import { RegisterFields } from "@/lib/types/auth.types";
import useRegister from "../_hooks/use-register";

export default function RegisterForm() {
  const { setErrorMessage, displayedErrorMessage } = useSubmissionError();
  const { register, isPending } = useRegister();

  const form = useForm({
    mode: "onChange",
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      phone: "",
      password: "",
      rePassword: "",
    },
  });
  const isFieldError = form.formState.errors;
  const formState = form.formState;
  const onSubmit: SubmitHandler<RegisterFields> = async (values) => {
    register(values, {
      onError: (error) => {
        const errorFieldMap = {
          username: "username",
          email: "email",
          phone: "phone",
          firstName: "firstName",
          lastName: "lastName",
          password: "password",
        } as const;

        type ErrorKeyword = keyof typeof errorFieldMap;
        const matchedField = (
          Object.keys(errorFieldMap) as ErrorKeyword[]
        ).find((keyword) => error.message.toLowerCase().includes(keyword));

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
    <div className="w-login mx-auto justify-center flex flex-col my-8">
      <h2 className="text-2xl font-bold">Create Account</h2>
      <Form {...form}>
        <form
          className="font-mono mt-10"
          onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Sarah"
                      isError={!!isFieldError.firstName}
                    />
                  </FormControl>

                  <ErrorFormField error={form.formState.errors.firstName} />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Hesham"
                      isError={!!isFieldError.lastName}
                    />
                  </FormControl>
                  <ErrorFormField error={form.formState.errors.lastName} />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>User Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="User123"
                    isError={!!isFieldError.username}
                  />
                </FormControl>
                <ErrorFormField error={form.formState.errors.username} />
              </FormItem>
            )}
          />
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
                <ErrorFormField error={form.formState.errors.email} />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <PhoneInput
                    {...field}
                    placeholder="12345789"
                    defaultCountry="EG"
                    value={field.value}
                    onChange={field.onChange}
                    isError={!!isFieldError.phone}
                  />
                </FormControl>
                <ErrorFormField error={form.formState.errors.phone} />
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
                <ErrorFormField error={form.formState.errors.password} />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="rePassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
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
            className="w-full mt-10"
            disabled={
              isPending || !formState.isValid || formState.isSubmitting
            }>
            Create Account
          </Button>
        </form>
      </Form>

      <AuthFormFooter
        linkText="Login"
        linkHref="/login"
        text="Already have an account ?"
      />
    </div>
  );
}
