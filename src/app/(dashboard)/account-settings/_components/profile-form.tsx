"use client";

import { PhoneInput } from "@/components/shared/phone-input";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SubmitHandler, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { updateProfileSchema } from "@/lib/schemes/auth.schema";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import ErrorFormField from "@/components/shared/error-form-field";
import { useSubmissionError } from "@/hooks/use-submission-error";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { DeleteConfirmation } from "./delete-confirmation";
import useUpdateProfile from "../_hooks/use-update-profile";
import { UpdateProfileFields } from "@/lib/types/auth.types";

const defaultFormValues: UpdateProfileFields = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  phone: "",
};

export default function ProfileForm() {
  const { data: session, status, update } = useSession();

  const { setErrorMessage, displayedErrorMessage } = useSubmissionError();
  const { updateProfile, isPending } = useUpdateProfile();

  const form = useForm({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: defaultFormValues,
  });

  useEffect(() => {
    if (status === "loading" || !session?.user) return;

    form.reset({
      firstName: session.user.firstName || "",
      lastName: session.user.lastName || "",
      username: session.user.username || "",
      email: session.user.email || "",
      phone: session.user.phone || "",
    });
  }, [session?.user, status, form]);

  const isFieldError = form.formState.errors;

  const onSubmit: SubmitHandler<UpdateProfileFields> = async (values) => {
    updateProfile(values, {
      onError: (error) => {
        const errorFieldMap = {
          username: "username",
          email: "email",
          phone: "phone",
          firstName: "firstName",
          lastName: "lastName",
        };
        type ErrorKeyword = keyof typeof errorFieldMap;

        const matchedField = (
          Object.keys(errorFieldMap) as ErrorKeyword[]
        ).find((keyword) =>
          error.message.toLowerCase().includes(keyword.toLocaleLowerCase())
        );

        if (matchedField) {
          form.setError(errorFieldMap[matchedField], {
            type: "server",
            message: error.message,
          });
        } else {
          setErrorMessage(error.message);
        }
      },
      onSuccess: async () => {
        await update({
          user: {
            ...session?.user,
            firstName: values.firstName,
            lastName: values.lastName,
            username: values.username,
            email: values.email,
            phone: values.phone,
          },
        });
      },
    });
  };

  return (
    <div className="h-screen md:p-6 bg-white md:mx-5 p-3">
      <Form {...form}>
        <form
          id="myForm"
          className="font-mono mt-10"
          onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid md:grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input {...field} isError={!!isFieldError.firstName} />
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

          {displayedErrorMessage()}
          <div className="form-buttons flex justify-between    ">
            <DeleteConfirmation />
            <Button
              disabled={
                isPending ||
                form.formState.isSubmitting ||
                !form.formState.isValid
              }
              form="myForm"
              type="submit"
              className="w-96">
              Save Changes
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
