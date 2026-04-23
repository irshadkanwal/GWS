import React from "react";
import { Grid, GridItem } from "@/components/ui/Grid";
import GWSLoader from "@/components/shared/gws-loader";
import ProfileImage from "@/components/shared/profile-image";
import Typography from "@/components/ui/typography";
import EditableText from "@/components/shared/editable-text";
import { Separator } from "@radix-ui/react-dropdown-menu";
import CustomTabs from "@/components/shared/custom-tabs";
import DonationCard from "@/pageComponents/Dashboard/PreviewAndPublish/DonationCard";
import type { UserDetailsType } from "@/utilities/types/user-details";
import { useDialog } from "@/hooks/useDialog";
import { useUserStore } from "@/store";
import useGetUserDetailsByID from "@/hooks/user-details/useGetUserDetailsByID";
import useGetDonationByUserID from "@/hooks/donation/useGetDonationByUserID";
import useGetGiftWellByUserID from "@/hooks/gift-well/useGiftWellByUserID";
import useGetUserByID from "@/hooks/user/useGetUserByID";
import useUpdateUserDetails from "@/hooks/user-details/useUpdateUserDetails";
import useBuildRegistryTabs from "@/hooks/useBuildRegistryTabs";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import DeliveryAddressForm from "@/pageComponents/Dashboard/RegistrySetupDialogs/PersonalStoryDialog/DeliveryAddressForm";
import PersonalBlogs from "./PersonalBlogs";

function PersonalStoryPage() {
  const user = useUserStore(React.useCallback((state) => state, []));
  const { data: userData, isLoading: isLoadingUserData } = useGetUserByID(
    user?.id || 0
  );
  const { data: userDetails, isLoading } = useGetUserDetailsByID(user?.id || 0);
  const { data: donation, isLoading: isLoadingDonations } =
    useGetDonationByUserID(userData?.id ?? 0);

  const { data: giftWell } = useGetGiftWellByUserID(userDetails?.user_id || 0);
  const { mutateAsync: updateUserDetails } = useUpdateUserDetails();

  const tabs = useBuildRegistryTabs({ giftWellID: giftWell?.id || 0 });

  const {
    open: isAddressDialogOpen,
    openDialog: openAddressDialog,
    closeDialog: closeAddressDialog,
  } = useDialog(false);

  const handleSaveJourney = async (journeyText: string) => {
    try {
      if (!userDetails) {
        throw new Error("User details not found");
      }
      const updatedUserDetails: UserDetailsType = {
        ...userDetails,
        journey: journeyText,
      };
      await updateUserDetails({
        id: userDetails.id,
        userDetails: updatedUserDetails,
      });
      toast.success("Journey updated.");
    } catch (error) {
      toast.error("Failed to update journey");
    }
  };

  const isPageDataLoading =
    isLoadingUserData || isLoading || isLoadingDonations;

  return (
    <div
      className={
        "bg-white md:mx-6 mx-2 md:py-6 md:px-8 p-3 rounded-sm w-[calc(100vw-6)]"
      }
    >
      <Grid className="gap-2">
        {isPageDataLoading ? (
          <GridItem>
            <GWSLoader loadingText="Loading Personal Story" />
          </GridItem>
        ) : (
          <>
            <GridItem size={12}>
              <div className=" flex items-center gap-4">
                <div className="w-14 h-14 rounded-full overflow-hidden ">
                  <ProfileImage
                    profileImageURL={userData?.profile_image_url || ""}
                    userFirstName={userData?.first_name}
                    userLastName={userData?.last_name}
                  />
                </div>
                <span>
                  <Typography size="xl" className="font-bold text-[#0A0D14]">
                    {`${userData?.first_name} ${userData?.last_name}`}
                  </Typography>
                  <Typography
                    variant="caption"
                    size="sm"
                    className="text-[#525866]"
                  >
                    {userData?.email || ""}
                  </Typography>
                </span>
              </div>
            </GridItem>
            <GridItem>
              <EditableText
                key={user?.id}
                title={"My journey"}
                description={userDetails?.journey || ""}
                onSave={handleSaveJourney}
                maxCharacterLength={2500}
              />
            </GridItem>

            <GridItem size={12}>
              <div className="flex items-center gap-1">
                <Typography size="md" className=" text-[#262626]">
                  Delivery Address
                </Typography>

                <Button
                  variant="destructive"
                  onClick={(e) => {
                    if (isAddressDialogOpen) {
                      closeAddressDialog();
                      return;
                    }
                    openAddressDialog();
                  }}
                >
                  <Pencil size={16} color="#597FA6" />
                </Button>
              </div>
              {isAddressDialogOpen ? (
                <DeliveryAddressForm
                  userDetails={userDetails}
                  closeDialog={closeAddressDialog}
                />
              ) : (
                <Typography size="sm" className="text-[#A3A3A3]">
                  {[
                    userDetails?.street_address,
                    userDetails?.address_line,
                    userDetails?.city,
                    userDetails?.state,
                    userDetails?.zip_code,
                  ]
                    .filter(Boolean)
                    .join(", ")}
                </Typography>
              )}
            </GridItem>

            {/* <GridItem size={12} className="p-0">
              <Separator className="my-3 border-t border-slate-100" />
            </GridItem> */}

            {/* <GridItem>
              <Typography size="xl" className="font-bold text-[#050708]">
                {`${userData?.first_name} ${userData?.last_name}'s Registry`}
              </Typography>
              <Typography size="sm" className="text-[#A3A3A3]">
                Support where it’s needed most—gifts are listed by priority.
              </Typography>
            </GridItem>

            <GridItem>
              <CustomTabs defaultValue="all" tabs={tabs || []} />
            </GridItem>

            {donation?.map((donation) => {
              return (
                <DonationCard
                  donation={donation}
                  key={donation.id}
                  showDonationMessage={false}
                />
              );
            })} */}

            <GridItem size={12} className="p-0">
              <Separator className="my-3 border-t border-slate-100" />
            </GridItem>

            <PersonalBlogs />
          </>
        )}
      </Grid>
    </div>
  );
}

export default PersonalStoryPage;
