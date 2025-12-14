"use client";
import { useMutation } from "@tanstack/react-query";
import { DeleteAccountService } from "../_services/delete-account.service";
import { useSubmissionError } from "@/hooks/use-submission-error";
import { signOut } from "next-auth/react";
import { toast } from "sonner";

export default function useDeleteAccount() {
  const { setErrorMessage, displayedErrorMessage } = useSubmissionError();

  const { mutate, error, isPending } = useMutation({
    mutationFn: async () => {
      const response = await DeleteAccountService();
      if (!response.ok) {
        setErrorMessage(response.status);
        throw new Error(`Error: ${response.status}`);
      }
      return signOut();
    },
    onSuccess: () => {
      toast.success("Account deleted successfully");
    },
    onError: (err) => {
      const errorMsg =
        err instanceof Error ? err.message : "Failed to delete account";
      setErrorMessage(errorMsg);
    },
  });

  return {
    deleteAccount: mutate,
    displayedErrorMessage,
    error,
    isPending,
    setErrorMessage,
  };
}
