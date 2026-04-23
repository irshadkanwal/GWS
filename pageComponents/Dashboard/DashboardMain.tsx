import React from "react";
import { Grid, GridItem } from "@/components/ui/Grid";
import Typography from "@/components/ui/typography";
import RegistrySetupCards, { CardData } from "./RegistrySetupCards";
import { useDialog } from "@/hooks/useDialog";
import { useRouter } from "next/router";
import ShareSupportDialog from "./RegistrySetupDialogs/ShareSupportDialog";
import CheckMarkIcon from "@/components/svg/CheckMarkIcon";
import useGetUserByID from "@/hooks/user/useGetUserByID";
import useGetAllServices from "@/hooks/services/useGetAllServices";
import { REGISTRY_STEPS } from "@/constants/registrySteps";
import { useUserStore } from "@/store";
import GWSLoader from "@/components/shared/gws-loader";

const titleToUrlMap: Record<string, string> = {
  "Personal Story / Photo Page /Recipient Details": "personal-details",
  "Build Your Care Registry": "build-your-care-registry",
  "Preview & Publish": "preview-and-publish",
  "Share & Receive Meaningful Support!": "share-and-receive",
};

function DashboardMain() {
  const {
    open: isShareSupportDialogOpen,
    openDialog: openShareSupportDialog,
    closeDialog: closeShareSupportDialog,
  } = useDialog();
  const storedUser = useUserStore(React.useCallback((state) => state, []));

  const userID = storedUser.id!;
  const { data: user, isLoading: isLoadingUser } = useGetUserByID(userID);
  const { data: allServices, isLoading } = useGetAllServices();

  const categoryOptions = allServices?.map((service) => ({
    id: service.id,
    title: service.name,
  }));

  const router = useRouter();
  const handleCardClick = (cardData?: CardData) => {
    const title = cardData?.title;
    const urlPath =
      titleToUrlMap[title!] ||
      title
        ?.toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    if (urlPath === "share-and-receive") {
      openShareSupportDialog();
      return;
    }

    router.push(`/dashboard/${urlPath}`);
  };

  const isRegistrySetupCompleted =
    user?.isRegistrySetupCompleted &&
    user?.isPersonalDetailsCompleted &&
    user.isRegistryPublished;

  const updatedRegistrySteps = REGISTRY_STEPS.map((step) => {
    if (step.title === "Personal Story / Photo Page /Recipient Details") {
      return {
        ...step,
        isCompleted: user?.isPersonalDetailsCompleted,
      };
    }
    if (step.title === "Build Your Care Registry") {
      return {
        ...step,
        isCompleted: user?.isRegistrySetupCompleted,
      };
    }
    if (step.title === "Preview & Publish") {
      return {
        ...step,
        isCompleted: user?.isRegistryPublished,
      };
    }
    if (step.title === "Share & Receive Meaningful Support!") {
      return {
        ...step,
        isCompleted: isRegistrySetupCompleted,
      };
    }
    return step;
  });

  const stepsCount = updatedRegistrySteps.filter(
    (step) => step.isCompleted
  ).length;

  return (
    <>
      {isLoading || isLoadingUser ? (
        <div className="w-[calc(100vw-6)] mx-4 my-2 h-[calc(100vh-9rem)] rounded-sm flex items-center justify-center bg-white ">
          <GWSLoader loadingText="Loading Dashboard Details" />
        </div>
      ) : (
        <Grid className="bg-white lg:m-6 mx-4 my-2 p-6 rounded-sm w-[calc(100vw-6)]">
          <GridItem className="py-0 space-y-2">
            <Typography size="xl" className="font-bold">
              {user?.isRegistryPublished
                ? "Your Registry is Now Live!"
                : " Finish your registry setup"}
            </Typography>
            <div className="flex items-center gap-2">
              <CheckMarkIcon variant="filled" />
              <Typography variant="caption">
                {user?.isRegistryPublished
                  ? "You’re all set! Share your registry with friends and family to start receiving support."
                  : `You’ve finished ${stepsCount} of 4`}
              </Typography>
            </div>
          </GridItem>
          {updatedRegistrySteps.map((step) => (
            <RegistrySetupCards
              key={step.id}
              cardData={step}
              onCardClick={handleCardClick}
            />
          ))}
        </Grid>
      )}

      <ShareSupportDialog
        open={isShareSupportDialogOpen}
        closeDialog={closeShareSupportDialog}
      />
    </>
  );
}

export default DashboardMain;
