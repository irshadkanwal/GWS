import React from "react";
import { Grid } from "@/components/ui/Grid";
import StoryPage from "@/pageComponents/Dashboard/Story";
import { useRouter } from "next/router";
import { TooltipProvider } from "@/components/ui/tooltip";

function Story() {
  const router = useRouter();
  const { userID } = router.query;

  return (
    <TooltipProvider>
      <Grid className="gap-1 w-11/12 mx-auto my-8 rounded-md lg:max-w-[1000px]  overflow-hidden bg-white lg:p-8">
        <StoryPage userID={userID as string} />
      </Grid>
    </TooltipProvider>
  );
}

export default Story;
