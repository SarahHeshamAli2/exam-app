"use client";
import { updateUserProfileService } from "@/lib/services/auth.service";
import { ChangePasswordFields } from "@/lib/types/auth.types";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useUpdateProfile() {
  const {
    error,
    mutate: updateProfile,
    isPending,
  } = useMutation({
    mutationFn: async (fields: ChangePasswordFields) => {
      const response = await updateUserProfileService(fields);

      if ("code" in response) {
        throw new Error(response.message);
      }

      return response;
    },
    onSuccess: () => {
      toast.success("Your account successfully updated !");
    },
  });

  return {
    error,
    updateProfile,
    isPending,
  };
}
