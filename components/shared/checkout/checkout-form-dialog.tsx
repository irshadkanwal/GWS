import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import Checkout, { type StripeProductDetailType } from "./stripe-checkout";

type Props = {
  open: boolean;
  closeDialog: () => void;
  productDetails: StripeProductDetailType;
  userId: number;
};

function CheckoutFormDialog({
  open,
  closeDialog,
  productDetails,
  userId,
}: Props) {
  const handleSuccess = () => {
    closeDialog();
  };
  return (
    <Dialog open={open} onOpenChange={closeDialog}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Complete Your Purchase</DialogTitle>
        </DialogHeader>
        <div id="checkout">
          <Checkout productDetails={productDetails} onSuccess={handleSuccess} />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CheckoutFormDialog;
