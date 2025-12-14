import { LoginFields } from "@/lib/types/auth.types";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";

export default function useLogin() {
  const { isPending, mutate, error } = useMutation({
    mutationFn: async (fields: LoginFields) => {
      const response = await signIn("credentials", {
        email: fields.email,
        password: fields.password,
        redirect: false,
      });

      if (!response?.ok) {
        throw new Error(response?.error || "Invalid email or password");
      }

      return response;
    },
    onSuccess: () => {
      const callbackURL =
        new URLSearchParams(location.search).get("callbackUrl") || "/diplomas";
      window.location.href = callbackURL;
    },
  });

  return {
    isPending,
    error,
    login: mutate,
  };
}
