import { verifyOtpService } from "@/lib/services/auth.service";
import { VerifyOtpField } from "@/lib/types/auth.types";
import { useMutation } from "@tanstack/react-query";

export default function useVerifyOtp() {
  const {
    error,
    mutate: verifyOtp,
    isPending,
  } = useMutation({
    mutationFn: async (fields: VerifyOtpField) => {
      const response = await verifyOtpService(fields);

      if ("code" in response) {
        throw new Error(response.message);
      }

      return response;
    },
  });

  return {
    error,
    verifyOtp,
    isPending,
  };
}
