import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import IconCircle from "@/components/ui/IconCircles";
import Image from "next/image";
import { useRouter } from "next/router";
import LoginForm from "./LoginForm";
import ResetPasswordForm from "./ResetPasswordForm";
import type { UserType } from "@/utilities/types/user";

type LoginModalProps = {
  open: boolean;
  closeDialog: () => void;
  handlePasswordRecovery: (values: { email: string }) => void;
  isSendingResetLink?: boolean;
  resetPasswordUserData?: UserType;
  dialogTitle?: string;
  dialogDescription?: string;
};

function LoginModal({
  open,
  closeDialog,
  handlePasswordRecovery,
  isSendingResetLink = false,
  resetPasswordUserData,
  dialogTitle,
  dialogDescription,
}: LoginModalProps) {
  const router = useRouter();
  const isVerifyRoute = router.pathname === "/verify";
  const isResetPasswordRoute = router.pathname === "/reset-password";

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        closeDialog();
        if (isVerifyRoute || isResetPasswordRoute) {
          router.replace("/");
        }
      }}
    >
      <DialogContent
        hideCloseButton
        className="md:max-w-[600px] md:max-h-[432px] w-11/12 bg-white rounded-md"
      >
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogDescription>{dialogDescription}</DialogDescription>
        <div className="relative flex flex-col items-center">
          <div className="absolute flex justify-center w-full -top-24">
            <div className="flex items-center justify-center p-2 bg-white border-4 border-white border-solid rounded-full">
              <IconCircle size="w-28 h-28" className="text-5xl shadPow-none">
                <span role="img" aria-label="gift">
                  <Image
                    src="/appIcons/Gift.svg"
                    alt="appGiftIcon"
                    width={65}
                    height={65}
                    className="w-auto h-auto"
                  />
                </span>
              </IconCircle>
            </div>
          </div>
        </div>

        {isResetPasswordRoute ? (
          <ResetPasswordForm
            closeDialog={closeDialog}
            resetPasswordUserData={resetPasswordUserData}
          />
        ) : (
          <LoginForm
            closeDialog={closeDialog}
            handlePasswordRecovery={handlePasswordRecovery}
            isSendingResetLink={isSendingResetLink}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

export default LoginModal;
