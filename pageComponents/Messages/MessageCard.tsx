import React from "react";
import { Avatar } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import PersonIcon from "@/components/svg/PersonIcon";
import { SupportMessageType } from "@/utilities/types/support-message";
import Typography from "@/components/ui/typography";
import { getRelativeTime } from "@/utilities/helpers/getMessageTime";

type Props = {
  message: SupportMessageType;
};

function MessageCard({ message }: Props) {
  const relativeTime = getRelativeTime(message?.created_at || "");
  return (
    <Card className="w-full cursor-pointer hover:shadow-md">
      <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-3">
        <Avatar>
          <div className="w-10 h-10 rounded-full bg-[#385C80] flex items-center justify-center border border-[#385C80]">
            <PersonIcon color="#fff" />
          </div>
        </Avatar>
        <div className="flex flex-col">
          <Typography size="lg" className="font-semibold text-[#050708]">
            {message?.sender_name}
          </Typography>
          <p className="text-xs text-muted-foreground">{relativeTime}</p>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <Typography size="sm" className="leading-relaxed">
          {message?.message}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default MessageCard;
