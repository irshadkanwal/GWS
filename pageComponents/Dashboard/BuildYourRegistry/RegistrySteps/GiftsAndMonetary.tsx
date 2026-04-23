import React from "react";
import FormSelectField from "@/components/form/Fields/FormSelectField";
import FormTextField from "@/components/form/Fields/FormTextField";
import Form from "@/components/form/Form";
import FormFooter from "@/components/form/FormFooter";
import { z } from "zod";
import FormTextareaField from "@/components/form/Fields/FormTextareaField";
import { CircleDollarSign } from "lucide-react";
import CustomSeparator from "@/components/shared/custom-separator";
import { useRouter } from "next/router";
import { useUserStore } from "@/store";
import { toast } from "sonner";
import useCreateDonation from "@/hooks/donation/useCreateDonation";
import useGetDonationByUserID from "@/hooks/donation/useGetDonationByUserID";
import { Grid, GridItem } from "@/components/ui/Grid";
import DonationDetailsCard from "../DonationDetailsCard";
import type { DonationType } from "@/utilities/types/donation";
import useUpdateDonationItem from "@/hooks/donation/useUpdateDonation";
import { Button } from "@/components/ui/button";
import GWSLoader from "@/components/shared/gws-loader";
import useGetUserDetailsByID from "@/hooks/user-details/useGetUserDetailsByID";
import useGetRoleById from "@/hooks/role/useGetRoleByID";
import { USER_ROLES } from "@/constants/constants";

type GiftsAndMonetaryProps = {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  isLastStep: boolean;
};

function GiftsAndMonetary({ setCurrentStep }: GiftsAndMonetaryProps) {
  const router = useRouter();
  const user = useUserStore(React.useCallback((state) => state, []));
  const { mutateAsync: createNewDonation, isPending } = useCreateDonation();
  const { mutateAsync: updateDonation, isPending: isUpdatePending } =
    useUpdateDonationItem();
  const { data: allDonations, isLoading: isLoadingDonations } =
    useGetDonationByUserID(user.id || 0);
  const [selectedDonation, setSelectedDonation] =
    React.useState<DonationType | null>(null);

  const { data: userDetails } = useGetUserDetailsByID(user.id || 0);
  const { data: userRole } = useGetRoleById(user?.role_id || 0);
  const isUserNotAllowed =
    userRole?.name === USER_ROLES.CAREGIVER &&
    !userDetails?.privacy_settings?.includes("allowOthers");

  const handleSelectedDonation = (donation: DonationType) => {
    setSelectedDonation(donation);
  };

  const initialValues = React.useMemo(
    () => ({
      giftCards: selectedDonation?.title || "",
      donationMethod: selectedDonation?.donation_method || "",
      cashDonation: String(selectedDonation?.amount) || "",
      donationReason: selectedDonation?.message || "",
    }),
    [selectedDonation]
  );

  const validationSchema = z.object({
    donationMethod: z.string().min(1, "Donation Method required"),
    giftCards: z.string().min(1, "Required!"),
    cashDonation: z.string().min(1, "Required!"),
    donationReason: z.string().min(1, "Required!"),
  });

  type FormValues = z.infer<typeof validationSchema>;
  const handleSubmit = async (values: FormValues) => {
    const donationItem = {
      user_id: user.id || 0,
      giftwell_id: user.giftWellID || 0,
      message: values.donationReason,
      title: values.giftCards,
      donation_method: values.donationMethod,
      amount: Number(values.cashDonation),
      status: "pending" as const,
    };
    try {
      if (selectedDonation) {
        try {
          await updateDonation({
            id: selectedDonation.id,
            donationItem: {
              id: selectedDonation.id,
              user_id: user.id || 0,
              giftwell_id: user.giftWellID || 0,
              message: values.donationReason,
              title: values.giftCards,
              donation_method: values.donationMethod,
              amount: Number(values.cashDonation),
              status: selectedDonation.status,
            },
          });
          toast.success("Donation updated successfully.");
          setSelectedDonation(null);
          return;
        } catch (error) {
          toast.error(`Update failed: ${error}`);
        }
      }

      await createNewDonation({ newDonation: donationItem });
      toast.success("Donation added successfully.");
    } catch (error) {
      toast.error("Failed to update donation details.");
    }
  };
  const handleBackClick = () => {
    setCurrentStep((prev) => prev - 1);
  };
  const handleNextClick = () => {
    router.push("/dashboard/preview-and-publish");
  };

  const handleCreateDonation = () => {
    setSelectedDonation(null);
  };

  if (isLoadingDonations) {
    return <GWSLoader loadingText="Loading Donations" />;
  }

  return (
    <>
      {!!allDonations?.length && (
        <Grid className="py-1">
          {allDonations &&
            allDonations?.length > 0 &&
            allDonations?.map((donation) => (
              <GridItem
                key={donation.id}
                className="md:col-span-4 xl:col-span-3 py-0"
              >
                <DonationDetailsCard
                  donation={donation}
                  onEdit={handleSelectedDonation}
                  selectedDonation={selectedDonation}
                  setSelectedDonation={setSelectedDonation}
                  isActionDisabled={isUserNotAllowed}
                />
              </GridItem>
            ))}
          <GridItem className="flex items-end justify-end py-0 min-h-10">
            {selectedDonation && (
              <Button
                variant="outline"
                onClick={handleCreateDonation}
                className="bg-[#385c80] text-white rounded-sm hover:bg-transparent hover:text-[#385c80]"
                disabled={isUserNotAllowed || isPending || isUpdatePending}
              >
                Create New Donation
              </Button>
            )}
          </GridItem>
        </Grid>
      )}
      <Form
        key={selectedDonation?.id || ""}
        initialValues={initialValues}
        validationSchema={validationSchema}
        resetAfterSubmit={true}
        onSubmit={handleSubmit}
        className="md:p-0 p-2"
      >
        <FormTextField
          name="giftCards"
          label="Donation Title"
          placeholder="Enter your donation title"
        />

        <FormTextField
          name="cashDonation"
          label="Cash Donations"
          type="number"
          placeholder="0.00"
          startIcon={{ icon: CircleDollarSign }}
          className="col-span-12 md:col-span-6"
        />

        <FormSelectField
          size={6}
          name="donationMethod"
          label="Donation method"
          placeholder="Select the method of receipt"
          options={[
            {
              value: "Stripe",
              label: "Stripe Card",
            },
          ]}
          className="col-span-12 md:col-span-6"
        />

        <FormTextareaField
          name="donationReason"
          label="Reason for the donation"
          placeholder='Example: ("To pay more hours for our current babysitter")'
        />

        <CustomSeparator className="my-1" />

        <FormFooter
          submitButtonText="Save"
          IsResetButtonRequired={false}
          onBackButtonClick={handleBackClick}
          renderBackButton={true}
          onNextClick={handleNextClick}
          isSubmitButtonDisabled={
            isPending || isUpdatePending || isUserNotAllowed
          }
          disableNextButton={isPending || isUpdatePending}
        />
      </Form>
    </>
  );
}

export default GiftsAndMonetary;
