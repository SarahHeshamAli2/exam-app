import { useSubmissionError } from "@/hooks/use-submission-error";
import { resetPasswordService } from "@/lib/services/auth.service";
import { ResetPasswordFields } from "@/lib/types/auth.types";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function useResetPassword() {
  const navigate = useRouter();
  const { setErrorMessage } = useSubmissionError();
  const {
    error,
    mutate: resetPassword,
    isPending,
  } = useMutation({
    mutationFn: async (fields: ResetPasswordFields) => {
      const response = await resetPasswordService(fields);

      if ("code" in response) {
        throw new Error(response.message);
      }

      return response;
    },
    onSuccess: (data, variables) => {
      toast.success("Your password successfully reset !");

      navigate.push(`/login?email=${encodeURIComponent(variables.email)}`);
    },
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });

  return {
    error,
    resetPassword,
    isPending,
  };
}
