import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { CheckCircle2, X } from "lucide-react";

type Props = {
  open: boolean;
  closeDialog: () => void;
  paymentStatus?: string;
};

function AccountStatusDialog({ open, closeDialog }: Props) {
  return (
    <Dialog open={open} onOpenChange={closeDialog}>
      <DialogContent hideCloseButton={true} className="p-0">
        <div className=" relative">
          <Button
            variant="secondary"
            size="lg"
            className="absolute top-2 right-2 z-10 h-fit p-1 rounded-full"
            onClick={closeDialog}
          >
            <X size={20} />
          </Button>
          <div className="p-4 m-2 text-center space-y-4">
            <div className="flex justify-center mt-2">
              <CheckCircle2 className={`w-16 h-16 text-green-500`} />
            </div>
            <DialogHeader>
              <DialogTitle className="font-semibold my-1">
                Your Stripe Account is Ready!
              </DialogTitle>
              <DialogDescription>
                Congratulations — your Stripe account has been successfully
                connected. You can now start receiving donations directly to
                your linked account.
              </DialogDescription>
            </DialogHeader>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AccountStatusDialog;
