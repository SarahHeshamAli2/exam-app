import { forgetPasswordService } from "@/lib/services/auth.service";
import { ForgotPasswordFields } from "@/lib/types/auth.types";
import { useMutation } from "@tanstack/react-query";

export default function useForgotPassword() {
  const {
    error,
    mutate: forgotPassword,
    isPending,
  } = useMutation({
    mutationFn: async (fields: ForgotPasswordFields) => {
      const response = await forgetPasswordService(fields);

      if ("code" in response) {
        throw new Error(response.message);
      }

      return response;
    },
  });

  return {
    error,
    forgotPassword,
    isPending,
  };
}
