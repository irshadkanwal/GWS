import React from "react";
import Form from "@/components/form/Form";
import FormTextField from "@/components/form/Fields/FormTextField";
import { z } from "zod";
import FormFooter from "@/components/form/FormFooter";
import PasswordField from "@/components/form/Fields/Password";
import { signIn } from "next-auth/react";
import { ROUTES } from "@/constants/routes";
import { toast } from "sonner";
import { GridItem } from "@/components/ui/Grid";
import { Button } from "@/components/ui/button";

type LoginFormProps = {
  closeDialog: () => void;
  handlePasswordRecovery: (values: { email: string }) => void;
  isSendingResetLink?: boolean;
};

function LoginForm({ closeDialog, handlePasswordRecovery }: LoginFormProps) {
  const [isForgotPassword, setIsForgotPassword] = React.useState(false);
  const initialValues = {
    email: "",
    ...(!isForgotPassword && { password: "" }),
  };

  const validationSchema = z.object({
    email: z.string().email().min(1, "Email is required"),
    ...(!isForgotPassword && {
      password: z.string().min(1, "Password is Required"),
    }),
  });

  type FormValues = z.infer<typeof validationSchema>;

  const handleLogin = async (values: FormValues) => {
    const { email, password } = values;
    const response = await signIn("credentials", {
      redirect: false,
      callbackUrl: ROUTES.DASHBOARD.pathName,
      email,
      password,
    });
    if (response?.error) {
      toast.error(response.error);
    } else if (response?.ok) {
      closeDialog();
    }
  };

  const handleForgotPassword = () => {
    setIsForgotPassword(true);
  };
  return (
    <Form
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={isForgotPassword ? handlePasswordRecovery : handleLogin}
      className="mt-2"
    >
      <FormTextField name="email" label="Email" />
      {!isForgotPassword && (
        <>
          <PasswordField name="password" label="Password" />
          <GridItem className="py-0">
            <Button
              variant={"destructive"}
              onClick={handleForgotPassword}
              className="p-0 hover:underline rounded-none bg-inherit text-[#385c80]"
            >
              Forgot Password
            </Button>
          </GridItem>
        </>
      )}

      <FormFooter
        submitButtonText={isForgotPassword ? "Get Recovery Link" : "Login"}
        className="!w-full"
        nextButtonType="submit"
        renderBackButton={isForgotPassword}
        onBackButtonClick={() => setIsForgotPassword(false)}
      />
    </Form>
  );
}

export default LoginForm;
