import React from "react";
import { Grid, GridItem } from "@/components/ui/Grid";
import MessagesPage from "@/pageComponents/Messages";

function Messages() {
  return (
    <Grid>
      <GridItem className="py-0">
        <MessagesPage />
      </GridItem>
    </Grid>
  );
}

export default Messages;
