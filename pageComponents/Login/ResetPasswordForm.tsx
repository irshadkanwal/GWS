import React from "react";
import Form from "@/components/form/Form";
import { z } from "zod";
import FormFooter from "@/components/form/FormFooter";
import PasswordField from "@/components/form/Fields/Password";
import { useRouter } from "next/router";
import type { UserType } from "@/utilities/types/user";
import useUpdateUserByID from "@/hooks/user/useUpdateUserByID";
import { toast } from "sonner";

type Props = {
  resetPasswordUserData?: UserType;
  closeDialog: () => void;
};

function ResetPasswordForm({ resetPasswordUserData, closeDialog }: Props) {
  const router = useRouter();
  const { mutateAsync: updateUserByID, isPending } = useUpdateUserByID();
  const initialValues = {
    password: "",
    confirmPassword: "",
  };

  const validationSchema = z
    .object({
      password: z.string().min(1, "Password is required"),
      confirmPassword: z.string().min(1, "Confirm password is required"),
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ["confirmPassword"],
      message: "Passwords do not match",
    });

  type FormValues = z.infer<typeof validationSchema>;

  const handleResetPassword = async (values: FormValues) => {
    const { password } = values;

    try {
      await updateUserByID({
        userID: resetPasswordUserData?.id!,
        userData: {
          password,
          email: resetPasswordUserData?.email || "",
          id: resetPasswordUserData?.id!,
          role_id: resetPasswordUserData?.role_id!,
          first_name: resetPasswordUserData?.first_name || "",
          last_name: resetPasswordUserData?.last_name || "",
          public_url: resetPasswordUserData?.public_url || "",
        },
      });

      router.replace("/");
      toast.success("Password reset successfully!");
    } catch (error) {
      toast.error("Something went wrong while resetting password.");
    }
  };

  return (
    <Form
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleResetPassword}
      className="mt-2"
    >
      <PasswordField
        name="password"
        label="New Password"
        placeholder="Enter new Password"
      />
      <PasswordField
        name="confirmPassword"
        label="Confirm Password"
        placeholder="Re-Enter Password"
      />

      <FormFooter
        submitButtonText="Reset Password"
        className="!w-full"
        nextButtonType="submit"
        isSubmitButtonDisabled={isPending}
      />
    </Form>
  );
}

export default ResetPasswordForm;
