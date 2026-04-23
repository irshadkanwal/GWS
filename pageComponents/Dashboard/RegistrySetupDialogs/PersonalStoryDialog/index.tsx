import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Grid, GridItem } from "@/components/ui/Grid";
import Typography from "@/components/ui/typography";
import { Separator } from "@radix-ui/react-separator";
import type { UserType } from "@/utilities/types/user";
import useGetUserDetailsByID from "@/hooks/user-details/useGetUserDetailsByID";
import { useUserStore } from "@/store";
import { toast } from "sonner";
import useUpdateUserDetails from "@/hooks/user-details/useUpdateUserDetails";
import { UserDetailsType } from "@/utilities/types/user-details";
import { useDialog } from "@/hooks/useDialog";
import EditableText from "@/components/shared/editable-text";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import DeliveryAddressForm from "./DeliveryAddressForm";
import DonationCard from "../../PreviewAndPublish/DonationCard";
import useGetDonationByUserID from "@/hooks/donation/useGetDonationByUserID";
import GWSLoader from "@/components/shared/gws-loader";
import useGetGiftWellByUserID from "@/hooks/gift-well/useGiftWellByUserID";
import useBuildRegistryTabs from "@/hooks/useBuildRegistryTabs";
import CustomTabs from "@/components/shared/custom-tabs";
import ProfileImage from "@/components/shared/profile-image";

type PersonalStoryDialogProps = {
  open: boolean;
  closeDialog: () => void;
  userData: Omit<UserType, "password"> | undefined;
  dialogTitle?: string;
  isEditable?: boolean;
};

function PersonalStoryDialog({
  open,
  closeDialog,
  userData,
  dialogTitle,
  isEditable = true,
}: PersonalStoryDialogProps) {
  const user = useUserStore(React.useCallback((state) => state, []));
  const { data: userDetails, isLoading } = useGetUserDetailsByID(
    userData?.id || 0,
    open
  );
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

  return (
    <>
      <Dialog open={open} onOpenChange={closeDialog}>
        <DialogContent className="w-11/12 mx-auto md:min-w-[600px] lg:min-w-[900px] max-h-[90vh] overflow-auto bg-white">
          <DialogHeader>
            <DialogTitle>{dialogTitle}</DialogTitle>
          </DialogHeader>
          <Grid className="gap-2">
            {isLoading ? (
              <GridItem>
                <GWSLoader loadingText="Loading User Details" />
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
                      <Typography
                        size="xl"
                        className="font-bold text-[#0A0D14]"
                      >
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
                    maxCharacterLength={240}
                    disableEditing={!isEditable}
                  />
                </GridItem>

                <GridItem size={12}>
                  <div className="flex items-center gap-1">
                    <Typography size="md" className=" text-[#262626]">
                      Delivery Address
                    </Typography>
                    {isEditable && (
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
                    )}
                  </div>
                  {isAddressDialogOpen ? (
                    <DeliveryAddressForm
                      userDetails={userDetails}
                      closeDialog={closeAddressDialog}
                    />
                  ) : (
                    <Typography size="sm" className="text-[#A3A3A3]">
                      {`${userDetails?.street_address}, ${
                        userDetails?.address_line &&
                        `
                  ${userDetails?.address_line}
                ,`
                      } ${userDetails?.city}, ${userDetails?.state}, ${
                        userDetails?.zip_code
                      }`}
                    </Typography>
                  )}
                </GridItem>

                <GridItem size={12} className="p-0">
                  <Separator className="my-3 border-t border-slate-100" />
                </GridItem>

                <GridItem>
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
                })}
              </>
            )}
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default PersonalStoryDialog;
