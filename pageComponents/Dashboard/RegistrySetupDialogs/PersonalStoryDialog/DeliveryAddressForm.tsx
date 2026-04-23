import React from "react";
import FormTextField from "@/components/form/Fields/FormTextField";
import Form from "@/components/form/Form";
import FormFooter from "@/components/form/FormFooter";
import useUpdateUserDetails from "@/hooks/user-details/useUpdateUserDetails";
import { useWindowSize } from "@/hooks/useWindowSize";
import type { UserDetailsType } from "@/utilities/types/user-details";
import { toast } from "sonner";
import { z } from "zod";

type Props = {
  userDetails: UserDetailsType | undefined;
  closeDialog: () => void;
};

function DeliveryAddressForm({ userDetails, closeDialog }: Props) {
  const { width } = useWindowSize();
  const isMobile = width < 768;
  const { mutateAsync: updateUserDetails } = useUpdateUserDetails();

  const initialValues = {
    street_address: userDetails?.street_address || "",
    address_line: userDetails?.address_line || "",
    city: userDetails?.city || "",
    state: userDetails?.state || "",
    zip_code: userDetails?.zip_code || "",
  };

  const validationSchema = z.object({
    street_address: z.string().min(1, {
      message: "Street address is Required.",
    }),
    address_line: z.string().optional(),
    city: z.string().min(2, {
      message: "City must be at least 2 characters.",
    }),
    state: z.string().min(2, {
      message: "State must be at least 2 characters.",
    }),
    zip_code: z.string().regex(/^\d{5}(-\d{4})?$/, {
      message: "Please enter a valid zip code (e.g., 12345 or 12345-6789).",
    }),
  });

  type FormValues = z.infer<typeof validationSchema>;

  const handleSubmit = async (values: FormValues) => {
    try {
      if (!userDetails) {
        throw new Error("User details not found");
      }
      const updatedUserDetails: UserDetailsType = {
        ...userDetails,
        ...values,
      };
      await updateUserDetails({
        id: userDetails.id,
        userDetails: updatedUserDetails,
      });
      toast.success("Delivery address updated.");
      closeDialog();
    } catch (error) {
      toast.error("Failed to update delivery address");
    }
  };
  const handleBackClick = () => {
    closeDialog();
  };
  return (
    <Form
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <FormTextField
        name="street_address"
        label="Street Address"
        className="p-0"
      />

      <FormTextField name="address_line" label="Address Line" className="p-0" />

      <FormTextField
        size={isMobile ? 12 : 4}
        className="col-span-12 md:col-span-4 p-0"
        name="city"
        label="City"
      />
      <FormTextField
        size={isMobile ? 12 : 3}
        name="state"
        label="State"
        className="p-0"
      />
      <FormTextField
        size={isMobile ? 12 : 5}
        name="zip_code"
        label="Zip Code"
        className="p-0"
      />
      <FormFooter
        submitButtonText="Update Address"
        IsResetButtonRequired={false}
        onBackButtonClick={handleBackClick}
        renderBackButton={true}
        nextButtonType="submit"
        backButtonText="Cancel"
      />
    </Form>
  );
}

export default DeliveryAddressForm;
