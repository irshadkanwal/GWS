import { fetchWrapper } from "@/utilities/helpers/fetchWrapper";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const requestPasswordReset = async (email: string) => {
  return await fetchWrapper({
    url: "user",
    method: "POST",
    body: { email },
  });
};

const useRequestPasswordReset = () => {
  return useMutation({
    mutationFn: requestPasswordReset,
    onSuccess: () => {
      toast.success("Password reset link sent successfully!");
    },
    onError: (error: any) => {
      toast.error(error.message || "Something went wrong.");
    },
  });
};

export default useRequestPasswordReset;
