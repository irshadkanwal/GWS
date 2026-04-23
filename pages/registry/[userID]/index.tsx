import React from "react";
import { Grid, GridItem } from "@/components/ui/Grid";
import Typography from "@/components/ui/typography";
import useGetDonationByUserID from "@/hooks/donation/useGetDonationByUserID";
import useGetUserDetailsByID from "@/hooks/user-details/useGetUserDetailsByID";
import useGetUserByEmail from "@/hooks/user/useGetUserByEmail";
import type { RegistryItemType } from "@/utilities/types/registryItem";
import { Eye, EyeOff, FileUser, MessageSquare, Share } from "lucide-react";
import { useRouter } from "next/router";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import EmailIcon from "@/components/svg/EmailIcon";
import LinkIcon from "@/components/svg/LinkIcon";
import FacebookSquaredIcon from "@/components/svg/FacebookSquaredIcon";
import CustomTabs from "@/components/shared/custom-tabs";
import ActionMenuDropdown from "@/components/shared/action-menu-dropdown";
import useBuildRegistryTabs from "@/hooks/useBuildRegistryTabs";
import { useDialog } from "@/hooks/useDialog";
import { TooltipProvider } from "@/components/ui/tooltip";
import MessageDialog from "@/components/shared/message-dialog";
import GWSLoader from "@/components/shared/gws-loader";
import CheckoutFormDialog from "@/components/shared/checkout/checkout-form-dialog";
import type { DonationType } from "@/utilities/types/donation";
import useGetGiftWellByUserID from "@/hooks/gift-well/useGiftWellByUserID";
import Link from "next/link";
import ProfileImage from "@/components/shared/profile-image";
import { toast } from "sonner";
import DonationCard from "@/pageComponents/Dashboard/PreviewAndPublish/DonationCard";
import useStripeSession from "@/hooks/stripe/useStripeSession";
import { useSearchParams } from "next/navigation";

function UserRegistryByID() {
  const searchParams = useSearchParams();
  const paymentStatus = searchParams.get("paymentStatus");
  const router = useRouter();

  const { open, openDialog, closeDialog } = useDialog();
  React.useEffect(() => {
    if (paymentStatus) {
      openDialog();
    }
  }, [paymentStatus]);

  const userEmail = router.query.userID;
  const [showFullAddress, setShowFullAddress] = React.useState<boolean>(false);
  const { mutateAsync: createCheckoutSession, isPending } = useStripeSession();
  const registryUrl = `${process.env.NEXT_PUBLIC_URL}/registry/${userEmail}`;
  const [selectedDonation, setSelectedDonation] =
    React.useState<DonationType | null>(null);
  const {
    open: isMessageDialogOpen,
    openDialog: openMessageDialog,
    closeDialog: closeMessageDialog,
  } = useDialog(false);

  const {
    open: isCheckoutFormOpen,
    openDialog: openCheckoutForm,
    closeDialog: closeCheckoutForm,
  } = useDialog(false);

  const {
    data: userData,
    isLoading,
    error,
  } = useGetUserByEmail(userEmail as string);

  const { data: userDetails, isLoading: isLoadingDetails } =
    useGetUserDetailsByID(userData?.id ?? 0, !isLoading);
  const { data: donation, isLoading: isLoadingDonations } =
    useGetDonationByUserID(userData?.id ?? 0);
  const { data: giftWell } = useGetGiftWellByUserID(userData?.id || 0);

  const isLoadingUserDetails =
    isLoading || isLoadingDetails || isLoadingDonations;

  const tabItemActions = (item: RegistryItemType) => (
    <Link href={item.registry_product?.affiliate_link || ""} target="_blank">
      <Button
        variant="outline"
        className="bg-white border-[#385C80] text-[#385C80] hover:bg-[#385C80] hover:text-white rounded-sm"
      >
        Gift Now
      </Button>
    </Link>
  );

  const tabs = useBuildRegistryTabs({
    giftWellID: giftWell?.id ?? 0,
    actions: tabItemActions,
    renderCheckbox: true,
  });

  const handleCopyUrl = async () => {
    try {
      if (window.isSecureContext && navigator.clipboard) {
        await navigator.clipboard.writeText(registryUrl);
        toast.info("URL copied to clipboard.");
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = registryUrl;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "absolute";
        textarea.style.left = "-9999px";
        document.body.appendChild(textarea);
        textarea.select();
        const successful = document.execCommand("copy");
        document.body.removeChild(textarea);
        if (successful) {
          toast.info("URL copied to clipboard.");
        } else {
          throw new Error("Fallback copy command failed");
        }
      }
    } catch (err) {
      toast.error("Failed to copy URL.");
    }
  };

  const handleShareFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        registryUrl
      )}`
    );
  };

  const emailSubject = encodeURIComponent("Check out my support registry!");
  const emailBody = encodeURIComponent(
    `Here's the link to my support registry: ${registryUrl}`
  );

  const handleShareEmail = () => {
    window.open(`mailto:?subject=${emailSubject}&body=${emailBody}`);
  };

  if (error) {
    return (
      <div className="gap-2 w-11/12 p-3 mx-auto my-8 rounded-md lg:max-w-[900px] min-h-[70vh] overflow-hidden bg-white lg:p-8 flex items-center justify-center">
        <div className="flex flex-col justify-center items-center gap-2">
          <FileUser size={48} color="#A3A3A3" />
          <Typography>{error.message}</Typography>
        </div>
      </div>
    );
  }

  const handleSendSupport = async (donation: DonationType) => {
    const updatedDonation = {
      ...donation,
      amount: Number(donation.amount),
    };
    setSelectedDonation(updatedDonation);
    openCheckoutForm();
  };

  const handleCloseDialog = () => {
    closeDialog();
    router.push(`/registry/${userEmail}`);
  };

  return (
    <TooltipProvider>
      <Grid className="gap-2 w-11/12 p-3 mx-auto my-8 rounded-md lg:max-w-[900px] min-h-[70vh] overflow-hidden bg-white lg:p-8">
        <GridItem>
          <Typography size="xl" className="font-bold text-[#050708]">
            Recipient Details
          </Typography>
        </GridItem>
        {isLoadingUserDetails || isLoading ? (
          <GridItem>
            <GWSLoader loadingText="Loading User Details" />
          </GridItem>
        ) : (
          <>
            <GridItem size={12} className="flex items-center justify-between">
              <div className="flex flex-col md:flex-row gap-4 justify-between w-full items-center">
                <div className="flex items-center gap-4 ">
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
                <div className="flex items-center">
                  <ActionMenuDropdown
                    trigger={
                      <Button variant="ghost" className="text-base">
                        <span className="mr-2">
                          <Share />
                        </span>
                        Share
                      </Button>
                    }
                    actions={[
                      {
                        label: "Copy registration link",
                        icon: <LinkIcon />,
                        onClick: handleCopyUrl,
                      },
                      {
                        label: "Invite via Facebook",
                        icon: <FacebookSquaredIcon />,
                        onClick: handleShareFacebook,
                      },
                      {
                        label: "Invite via Email",
                        icon: <EmailIcon />,
                        onClick: handleShareEmail,
                      },
                    ]}
                  />
                  <Button
                    variant="ghost"
                    className="text-base"
                    onClick={openMessageDialog}
                  >
                    <span className="mr-2">
                      <MessageSquare />
                    </span>
                    Send Message
                  </Button>
                </div>
              </div>
            </GridItem>

            <GridItem size={12}>
              <div className="space-y-2">
                <Typography size="md" className=" text-[#262626]">
                  My journey
                </Typography>
                <Typography
                  size="sm"
                  className="text-[#A3A3A3] text-justify whitespace-pre-line"
                >
                  {userDetails?.journey || ""}
                </Typography>
                <Button
                  variant="link"
                  className="p-0 text-[#597FA6] text-start text-wrap m-0"
                  onClick={() => router.push(`/story/${userData?.public_url}`)}
                >
                  Want to know more about me? See my full Story page.
                </Button>
              </div>
            </GridItem>

            <GridItem size={12}>
              <div className="flex items-center gap-1">
                <Typography size="md" className=" text-[#262626]">
                  Delivery Address
                </Typography>
                <Button
                  variant="destructive"
                  onClick={() => setShowFullAddress((prev) => !prev)}
                >
                  {showFullAddress ? <EyeOff size={20} /> : <Eye size={20} />}
                </Button>
              </div>

              <Typography size="sm" className="text-[#A3A3A3]">
                {showFullAddress
                  ? `${userDetails?.street_address}, ${
                      userDetails?.address_line &&
                      `
                  ${userDetails?.address_line}
                ,`
                    } ${userDetails?.city}, ${userDetails?.state}, ${
                      userDetails?.zip_code
                    }`
                  : `${userDetails?.street_address}, `}
              </Typography>
            </GridItem>

            <GridItem size={12}>
              <Separator className="my-1" />
            </GridItem>

            <GridItem>
              <Typography size="xl" className="font-bold text-[#050708]">
                {`${userData?.first_name} ${userData?.last_name}'s Registry`}
              </Typography>
            </GridItem>

            <GridItem>
              <CustomTabs defaultValue="all" tabs={tabs || []} />
            </GridItem>

            {!userData?.is_stripe_linked && (
              <GridItem size={12}>
                <Typography
                  size="sm"
                  className="text-red-500 font-medium bg-red-50 border border-red-200 rounded p-2"
                >
                  This account is not ready to receive donations. You can still
                  view the registry, but sending support is disabled until the
                  recipient completes setup.
                </Typography>
              </GridItem>
            )}

            {donation?.map((donation) => {
              return (
                <DonationCard
                  donation={donation}
                  key={donation.id}
                  onSendSupport={handleSendSupport}
                  isLoading={isPending}
                  disableSupportButton={!userData?.is_stripe_linked}
                />
              );
            })}

            <GridItem>
              <Typography size="sm" className="text-[#A3A3A3] italic">
                After completing the purchase, please return to the Registry
                page and mark the item as purchased.
              </Typography>
            </GridItem>
          </>
        )}
      </Grid>

      <MessageDialog
        open={isMessageDialogOpen}
        closeDialog={closeMessageDialog}
        userID={userData?.id || 0}
      />

      <CheckoutFormDialog
        open={isCheckoutFormOpen}
        closeDialog={closeCheckoutForm}
        productDetails={{
          productName: selectedDonation?.title || "",
          price: selectedDonation?.amount || 0,
          donation_id: selectedDonation?.id || 0,
        }}
        userId={userDetails?.user_id || 0}
      />
    </TooltipProvider>
  );
}

export default UserRegistryByID;
