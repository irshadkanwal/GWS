import React from "react";
import FormTextField from "@/components/form/Fields/FormTextField";
import Form from "@/components/form/Form";
import FormFooter from "@/components/form/FormFooter";
import GWSLoader from "@/components/shared/gws-loader";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { GridItem } from "@/components/ui/Grid";
import useGetUserDetailsByID from "@/hooks/user-details/useGetUserDetailsByID";
import useUpdateUserDetails from "@/hooks/user-details/useUpdateUserDetails";
import useUpdateUserByID from "@/hooks/user/useUpdateUserByID";
import { NAME_REGEX } from "@/utilities/constants/regex";
import { UserType } from "@/utilities/types/user";
import { toast } from "sonner";
import { z } from "zod";
import { useWindowSize } from "@/hooks/useWindowSize";
import ProfileImage from "@/components/shared/profile-image";
import { CameraIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useS3Upload } from "@/hooks/s3-bucket/useS3Upload";
import { BUCKET_FOLDER_NAME } from "@/constants/constants";
import { useUserStore } from "@/store";

type Props = {
  open: boolean;
  closeDialog: () => void;
  userData?: UserType;
  dialogTitle?: string;
};

function PersonalInfoFormModal({
  open,
  closeDialog,
  userData,
  dialogTitle,
}: Props) {
  const storedUser = useUserStore(React.useCallback((state) => state, []));
  const { data: userDetails, isLoading } = useGetUserDetailsByID(
    userData?.id || 0,
    open
  );

  const { mutateAsync: updateUserDetails } = useUpdateUserDetails();
  const { mutateAsync: updateUser } = useUpdateUserByID();
  const { uploadFile, isPending } = useS3Upload();
  const { width } = useWindowSize();

  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleProfileImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isImage = file.type.startsWith("image/");

    if (!isImage) {
      toast.error("Only image files are allowed");
      return;
    }

    try {
      const url = await uploadFile({
        file,
        userId: userDetails?.user_id || 0,
        type: BUCKET_FOLDER_NAME.STORY,
      });

      if (userData) {
        const { password, ...rest } = userData;
        await updateUser({
          userID: userData.id,
          userData: {
            ...rest,
            profile_image_url: url,
          },
        });

        toast.success("Profile image updated!");
      }
    } catch (error) {
      toast.error("Profile image upload failed.");
    }
  };

  const initialValues = {
    first_name: userData?.first_name || "",
    last_name: userData?.last_name || "",
    email: storedUser?.email || "",
    street_address: userDetails?.street_address || "",
    address_line: userDetails?.address_line || "",
    city: userDetails?.city || "",
    state: userDetails?.state || "",
    zip_code: userDetails?.zip_code || "",
  };

  const validationSchema = z.object({
    first_name: z
      .string()
      .min(1, "First name is required")
      .refine((val) => NAME_REGEX.test(val), {
        message: "First name must contain letters only",
      }),
    last_name: z
      .string()
      .min(1, "Last name is required")
      .refine((val) => NAME_REGEX.test(val), {
        message: "Last name must contain letters only",
      }),
    email: z.string().email("should be a valid email"),
    street_address: z.string().min(1, "Street address is required"),
    address_line: z.string().optional(),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    zip_code: z.string().min(1, "Zip code is required"),
  });

  type FormValues = z.infer<typeof validationSchema>;

  const handleSubmit = async (values: FormValues) => {
    const { first_name, last_name, ...restValues } = values;

    try {
      if (userDetails && userData) {
        const { password, ...restUser } = userData;
        await Promise.all([
          updateUser({
            userID: userData.id,
            userData: {
              ...restUser,
              first_name,
              last_name,
            },
          }),
          updateUserDetails({
            id: userDetails.id,
            userDetails: {
              ...userDetails,
              ...restValues,
            },
          }),
        ]);
      }

      toast.success("Personal info updated.");
      closeDialog();
    } catch (error) {
      toast.error(`Failed: ${error}`);
    }
  };

  return (
    <Dialog open={open} onOpenChange={closeDialog}>
      <DialogContent className="w-11/12 mx-auto md:max-w-[500px] max-h-[90vh] overflow-y-auto px-5 ">
        {dialogTitle && (
          <DialogHeader>
            <DialogTitle>{dialogTitle}</DialogTitle>
          </DialogHeader>
        )}

        {isLoading ? (
          <GridItem>
            <GWSLoader loadingText="Loading User's Info" />
          </GridItem>
        ) : (
          <Form
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <GridItem className="flex justify-center p-0">
              <div className="relative group w-28 h-28 rounded-full overflow-hidden border border-gray-300 shadow-md">
                <ProfileImage
                  profileImageURL={userData?.profile_image_url || ""}
                  userFirstName={userData?.first_name}
                  userLastName={userData?.last_name}
                  avatarStyles="text-4xl"
                />
                <div
                  onClick={!isPending ? handleImageClick : undefined}
                  className={`absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity ${
                    isPending && "hidden"
                  }`}
                >
                  <CameraIcon className="text-white w-6 h-6" />
                </div>
                <Input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleProfileImageUpload}
                  disabled={isPending}
                />
                {isPending && (
                  <div className="absolute inset-0 bg-white bg-opacity-60 flex items-center justify-center z-10">
                    <div className="w-6 h-6 border-2 border-t-transparent border-blue-500 rounded-full animate-spin" />
                  </div>
                )}
              </div>
            </GridItem>

            <FormTextField
              className="p-0"
              name="email"
              label="Email Address"
              readOnly
            />
            <FormTextField
              className="p-0"
              size={6}
              name="first_name"
              label="First Name"
            />
            <FormTextField
              className="p-0"
              size={6}
              name="last_name"
              label="Last Name"
            />
            <FormTextField
              className="p-0"
              name="street_address"
              label="Street Address"
            />

            <FormTextField
              className="p-0"
              name="address_line"
              label="Address Line"
            />

            <FormTextField
              size={4}
              className="col-span-12 md:col-span-4 p-0"
              name="city"
              label="City"
            />
            <FormTextField
              className="p-0"
              size={4}
              name="state"
              label="State"
            />
            <FormTextField
              className="p-0"
              size={4}
              name="zip_code"
              label="Zip Code"
            />
            <FormFooter
              submitButtonText="Update Info"
              IsResetButtonRequired={false}
              onBackButtonClick={closeDialog}
              renderBackButton={true}
              nextButtonType="submit"
              backButtonText={width < 768 ? "" : "Cancel"}
            />
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default PersonalInfoFormModal;
