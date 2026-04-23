import { fetchWrapper } from "@/utilities/helpers/fetchWrapper";
import type { SupportMessageType } from "@/utilities/types/support-message";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface MutationVariables {
  newMessage: Omit<SupportMessageType, "id">;
}

async function addNewMessage({
  newMessage,
}: MutationVariables): Promise<SupportMessageType> {
  return await fetchWrapper({
    url: `support-message`,
    method: "POST",
    body: newMessage,
  });
}

export default function useSendSupportMessage() {
  const queryClient = useQueryClient();

  return useMutation<SupportMessageType, Error, MutationVariables>({
    mutationFn: (newMessage) => addNewMessage(newMessage),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
      toast.success("Message sent successfully");
    },
    onError: (error) => {
      toast.error(`Failed to send message : ${error.message}`);
    },
  });
}
