import React from "react";
import Form from "@/components/form/Form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CheckboxField from "@/components/form/Fields/CheckboxField";
import { privacySettingsOptions } from "./PersonalDetails/PersonalDetailsForm";
import { z } from "zod";
import useGetUserDetailsByID from "@/hooks/user-details/useGetUserDetailsByID";
import { GridItem } from "@/components/ui/Grid";
import FormFooter from "@/components/form/FormFooter";
import type { UserType } from "@/utilities/types/user";
import type { UserDetailsType } from "@/utilities/types/user-details";
import useUpdateUserDetails from "@/hooks/user-details/useUpdateUserDetails";
import { toast } from "sonner";
import GWSLoader from "@/components/shared/gws-loader";
import { useWindowSize } from "@/hooks/useWindowSize";
import { USER_ROLES } from "@/constants/constants";
import Typography from "@/components/ui/typography";
import { useUserStore } from "@/store";
import useGetRoleById from "@/hooks/role/useGetRoleByID";

type Props = {
  open: boolean;
  closeDialog: () => void;
  userData?: UserType;
  dialogTitle?: string;
};

function PrivacySettingsFormModal({
  open,
  closeDialog,
  userData,
  dialogTitle,
}: Props) {
  const user = useUserStore(React.useCallback((state) => state, []));
  const { data: userDetails, isLoading } = useGetUserDetailsByID(
    userData?.id || 0,
    open
  );
  const { mutateAsync: updateUserDetails } = useUpdateUserDetails();
  const { data: userRole } = useGetRoleById(user?.role_id || 0);
  const isUserNotAllowed =
    userRole?.name === USER_ROLES.CAREGIVER &&
    !userDetails?.privacy_settings?.includes("allowOthers");
  const { width } = useWindowSize();

  const validationSchema = z.object({
    modal_privacy_settings: z.array(z.string()).optional(),
  });
  const initialValues = {
    modal_privacy_settings: userDetails?.privacy_settings || [],
  };

  type FormValues = z.infer<typeof validationSchema>;

  const handleSubmit = async (values: FormValues) => {
    try {
      if (!userDetails) {
        throw new Error("User details not found");
      }
      const updatedUserDetails: UserDetailsType = {
        ...userDetails,
        privacy_settings: values.modal_privacy_settings,
      };
      await updateUserDetails({
        id: userDetails.id,
        userDetails: updatedUserDetails,
      });
      toast.success("Privacy settings updated.");
      closeDialog();
    } catch (error) {
      toast.error("Failed to update privacy settings");
    }
  };
  const handleBackClick = () => {
    closeDialog();
  };
  return (
    <Dialog open={open} onOpenChange={closeDialog}>
      <DialogContent
        hideCloseButton={true}
        className="w-11/12 mx-auto md:max-w-[500px] max-h-[90vh]"
      >
        {dialogTitle && (
          <DialogHeader>
            <DialogTitle>{dialogTitle}</DialogTitle>
          </DialogHeader>
        )}

        {isLoading ? (
          <GridItem>
            <GWSLoader loadingText="Loading User's Privacy Settings" />
          </GridItem>
        ) : (
          <Form
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <CheckboxField
              name="modal_privacy_settings"
              label="Privacy Settings"
              options={privacySettingsOptions}
              disabled={isUserNotAllowed}
            />

            <GridItem className="py-0">
              <Typography size="sm" className="text-red-400">
                {isUserNotAllowed
                  ? "You are not allowed to update privacy settings"
                  : ""}
              </Typography>
            </GridItem>

            <FormFooter
              submitButtonText="Update Settings"
              IsResetButtonRequired={false}
              onBackButtonClick={handleBackClick}
              renderBackButton={true}
              nextButtonType="submit"
              backButtonText={width < 768 ? "" : "Cancel"}
              isSubmitButtonDisabled={isUserNotAllowed}
            />
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default PrivacySettingsFormModal;
