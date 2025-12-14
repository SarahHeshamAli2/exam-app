import { registerService } from "@/lib/services/auth.service";
import { RegisterFields } from "@/lib/types/auth.types";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function useRegister() {
  const navigate = useRouter();

  const {
    error,
    mutate: register,
    isPending,
  } = useMutation({
    mutationFn: async (fields: RegisterFields) => {
      const response = await registerService(fields);

      if ("code" in response) {
        throw new Error(response.message);
      }

      return response;
    },
    onSuccess: (data, variables) => {
      toast.success("Account Created Successfully");
      navigate.push(`/login?email=${encodeURIComponent(variables.email)}`);
    },
  });

  return {
    error,
    register,
    isPending,
  };
}
