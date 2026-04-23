"use client";

import { usePathname } from "next/navigation";
import { Grid, GridItem } from "@/components/ui/Grid";
import BuildYourRegistry from "@/pageComponents/Dashboard/BuildYourRegistry";
import PersonalStoryForm from "@/pageComponents/Dashboard/PersonalDetails";
import PreviewAndPublish from "@/pageComponents/Dashboard/PreviewAndPublish";

function UserProfile() {
  const pathname = usePathname();
  const route = pathname.split("/dashboard/")[1] || "";

  const renderContent = () => {
    switch (route) {
      case "personal-details":
        return <PersonalStoryForm />;
      case "build-your-care-registry":
        return <BuildYourRegistry />;
      case "preview-and-publish":
        return <PreviewAndPublish />;
      default:
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Page Not Found</h1>
            <p>The route "{route}" is not recognized.</p>
            <p className="text-muted-foreground mt-2">
              Current pathname: {pathname}
            </p>
          </div>
        );
    }
  };

  return (
    <Grid>
      <GridItem className="py-0">{renderContent()}</GridItem>
    </Grid>
  );
}

export default UserProfile;
