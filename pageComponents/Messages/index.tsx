import React from "react";
import useGetMessagesByUserID from "@/hooks/support-message/useGetMessagesByUserID";
import { useUserStore } from "@/store";
import MessageCard from "./MessageCard";
import Typography from "@/components/ui/typography";
import { MessageCircle } from "lucide-react";
import GWSLoader from "@/components/shared/gws-loader";

function MessagesPage() {
  const user = useUserStore(React.useCallback((state) => state, []));
  const { data: messages, isLoading } = useGetMessagesByUserID(user.id || 0);

  return (
    <div
      className={
        "bg-white md:mx-6 mx-2 md:p-8 p-3 rounded-sm w-[calc(100vw-6)] max-h-[85vh] overflow-auto"
      }
    >
      <div className="space-y-4 min-h-[600px]">
        {isLoading ? (
          <GWSLoader
            loadingText="Loading Messages"
            loaderStyles="min-h-[600px]"
          />
        ) : (
          <>
            <Typography size="xl" className="font-bold text-[#050708]">
              Support Messages
            </Typography>
            {!messages?.length && (
              <div className="space-y-4 flex flex-col items-center justify-center">
                <MessageCircle size={52} color="#A3A3A3" />
                <Typography size="lg" className="text-[#A3A3A3]">
                  No Messages Found.
                </Typography>
              </div>
            )}

            {messages?.map((message) => (
              <MessageCard key={message.id} message={message} />
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default MessagesPage;
