"use client";
import { changePasswordService } from "@/lib/services/auth.service";
import { ChangePasswordFields } from "@/lib/types/auth.types";
import { updateSessionToken } from "@/lib/utils/manage-token";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useChangePassword() {
  const {
    error,
    mutate: changePassword,
    isPending,
  } = useMutation({
    mutationFn: async (fields: ChangePasswordFields) => {
      const response = await changePasswordService(fields);

      if ("code" in response) {
        throw new Error(response.message);
      }

      return response;
    },
    onSuccess: async (response) => {
      if (response.token) {
        await updateSessionToken(response.token);
      }
      toast.success("Your password successfully changed ");
    },
  });

  return {
    error,
    changePassword,
    isPending,
  };
}
