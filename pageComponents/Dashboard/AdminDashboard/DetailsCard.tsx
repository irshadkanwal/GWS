import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Typography from "@/components/ui/typography";
import Link from "next/link";

type Props = {
  title: string;
  counts: number;
  description: string;
  visitLink: string;
  Icon: React.ElementType;
};

function DetailsCard({ title, counts, description, visitLink, Icon }: Props) {
  return (
    <Card className="hover:bg-gray-100 bg-gray-50 transition-colors min-h-40 border-0 shadow-sm  w-full p-6 cursor-pointer">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-medium text-gray-800">
          {title}
        </CardTitle>
        <Icon className="text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="min-h-12">
          <Typography size="2xl" className="font-bold text-gray-800">
            {counts}
          </Typography>
          <Typography size="xs" className="text-muted-foreground">
            {description}
          </Typography>
        </div>

        <Button asChild variant="link" className="px-0 pt-4 text-[#385C80]">
          <Link href={visitLink}>See details</Link>
        </Button>
      </CardContent>
    </Card>
  );
}

export default DetailsCard;
