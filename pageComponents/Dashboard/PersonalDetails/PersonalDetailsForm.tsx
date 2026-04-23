"use client";

import React from "react";
import { z } from "zod";
import Form from "@/components/form/Form";
import FormTextField from "@/components/form/Fields/FormTextField";
import CheckboxField from "@/components/form/Fields/CheckboxField";
import FormFooter from "@/components/form/FormFooter";
import { useRouter } from "next/router";
import CustomSeparator from "@/components/shared/custom-separator";
import { useWindowSize } from "@/hooks/useWindowSize";
import useGetUserDetailsByID from "@/hooks/user-details/useGetUserDetailsByID";
import FormSkeleton from "@/components/shared/form-skeleton";
import useUpdateUserDetails from "@/hooks/user-details/useUpdateUserDetails";
import { useUserStore } from "@/store";
import { toast } from "sonner";
import AttachmentTextareaField from "@/components/shared/attachment-textarea-field";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import useGetRoleById from "@/hooks/role/useGetRoleByID";
import { USER_ROLES } from "@/constants/constants";

// Form schema using Zod
const formSchema = z.object({
  journey: z
    .string()
    .min(15, {
      message: "Please share at least 10 characters about your journey.",
    })
    .max(2500, {
      message: "Journey description must be 240 characters or less.",
    }),
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
  privacy_settings: z.array(z.string()).optional(),
  terms_policy: z.array(z.string()).min(1, "Required!"),
});

export const privacySettingsOptions = [
  {
    label: "Limit my GiftWell access to link holders only.",
    value: "limitAccess",
  },
  {
    label: "Allow others to add gifts or services.",
    value: "allowOthers",
  },
  {
    label: "Get email alerts for new contributions.",
    value: "emailAlerts",
  },
];

type FormValues = z.infer<typeof formSchema>;

function PersonalDetailsForm() {
  const router = useRouter();
  const { width } = useWindowSize();
  const isMobile = width < 768;
  const user = useUserStore(React.useCallback((state) => state, []));
  const userID = user.id!;
  const { data: userDetails, isLoading } = useGetUserDetailsByID(userID);
  const { mutateAsync: updateUserDetails, isPending: isPendingUpdate } =
    useUpdateUserDetails();

  const { data: userRole } = useGetRoleById(user.role_id || 0);
  const isUserNotAllowed =
    userRole?.name === USER_ROLES.CAREGIVER &&
    !userDetails?.privacy_settings?.includes("allowOthers");

  const initialValues = {
    journey: userDetails?.journey || "",
    street_address: userDetails?.street_address || "",
    address_line: userDetails?.address_line || "",
    city: userDetails?.city || "",
    state: userDetails?.state || "",
    zip_code: userDetails?.zip_code || "",
    privacy_settings: userDetails?.privacy_settings || [],
    terms_policy: userDetails?.terms_policy ? ["termsOfPolicy"] : [],
  };

  const handleSubmit = async (values: FormValues) => {
    const terms_policy = values.terms_policy.includes("termsOfPolicy");

    const newUserDetails = {
      ...values,
      user_id: userID,
      attachments: [...userDetails?.attachments!],
      terms_policy: terms_policy,
    };

    const fieldsToCompare = [
      "journey",
      "street_address",
      "address_line",
      "city",
      "state",
      "zip_code",
      "privacy_settings",
      "terms_policy",
    ];

    const isChanged = fieldsToCompare.some((key) => {
      const oldValue = (userDetails as any)[key];
      const newValue = (newUserDetails as any)[key];

      if (Array.isArray(oldValue) && Array.isArray(newValue)) {
        return (
          oldValue.length !== newValue.length ||
          oldValue.some((v, i) => v !== newValue[i])
        );
      }

      return oldValue !== newValue;
    });

    if (!isChanged) {
      handleNextClick();
      return;
    }

    if (userDetails?.id) {
      try {
        await updateUserDetails({
          userDetails: newUserDetails,
          id: userDetails.id,
        });
        toast.success("User details updated.");
        handleNextClick();
      } catch (error) {
        toast.error("Failed to update user details");
      }
    }
  };

  const handleBackClick = () => {
    router.push("/dashboard");
  };

  const handleNextClick = () => {
    router.push("/dashboard/build-your-care-registry");
  };

  const handleAttachmentChange = async (urls: string[]) => {
    if (userDetails) {
      await updateUserDetails({
        id: userDetails?.id,
        userDetails: { ...userDetails, attachments: urls },
      });
    }
  };

  return (
    <div
      className={
        "bg-white md:mx-6 mx-2 md:p-6 p-3 rounded-sm w-[calc(100vw-6)]"
      }
    >
      {isLoading ? (
        <FormSkeleton />
      ) : (
        <Form
          initialValues={initialValues}
          validationSchema={formSchema}
          onSubmit={handleSubmit}
        >
          <AttachmentTextareaField
            name="journey"
            label="Share a bit about your journey"
            placeholder="What's going on, how are you feeling..."
            maxCharactersLength={2500}
            defaultUrls={[]}
            onAttachmentsChange={handleAttachmentChange}
            readonly={isPendingUpdate}
          />

          <FormTextField name="street_address" label="Address Line 1" />

          <FormTextField name="address_line" label="Address Line 2" />

          <FormTextField
            size={isMobile ? 12 : 4}
            className="col-span-12 md:col-span-4"
            name="city"
            label="City"
          />
          <FormTextField size={isMobile ? 12 : 3} name="state" label="State" />
          <FormTextField
            size={isMobile ? 12 : 5}
            name="zip_code"
            label="Zip Code"
          />

          <CheckboxField
            name="privacy_settings"
            label="Privacy Settings"
            options={privacySettingsOptions}
            disabled={isUserNotAllowed}
          />

          <CheckboxField
            name="terms_policy"
            label="Terms of Use and Privacy Policy"
            options={[
              {
                label: (
                  <>
                    By checking this option, you agree to our{" "}
                    <Button
                      variant={"link"}
                      className="p-0 h-fit text-[#385C80]"
                    >
                      <Link
                        href="/docs/terms-of-use.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Terms of Use
                      </Link>
                    </Button>{" "}
                    and{" "}
                    <Button
                      variant={"link"}
                      className="p-0 h-fit text-[#385C80]"
                    >
                      <Link
                        href="/docs/privacy-policy.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Privacy Policy
                      </Link>
                    </Button>
                    , including the processing of your data as described. For
                    more information, please refer to the links above.
                  </>
                ),
                value: "termsOfPolicy",
              },
            ]}
          />
          <CustomSeparator />

          <FormFooter
            submitButtonText="Save"
            IsResetButtonRequired={false}
            onBackButtonClick={handleBackClick}
            renderBackButton={true}
            nextButtonType="submit"
          />
        </Form>
      )}
    </div>
  );
}

export default PersonalDetailsForm;
