"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";

type ConfirmationDialogProps = {
  dialogTrigger?: React.ReactNode;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  open: boolean;
  openDialog: () => void;
  closeDialog: () => void;
};

export default function ConfirmationDialog({
  dialogTrigger,
  title = "Are you sure?",
  description = "This action cannot be undone.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  open,
  openDialog,
  closeDialog,
}: ConfirmationDialogProps) {
  const handleConfirm = () => {
    onConfirm();
    closeDialog();
  };

  const handleCancel = () => {
    onCancel?.();
    closeDialog();
  };

  return (
    <Dialog open={open} onOpenChange={closeDialog}>
      {dialogTrigger && <DialogTrigger asChild>{dialogTrigger}</DialogTrigger>}

      <DialogContent className="w-11/12 mx-auto md:max-w-[600px] lg:min-w-[900px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleConfirm}
            className="bg-[#9EB7D1] text-white hover:bg-white hover:text-[#9EB7D1] hover:border hover:border-[#9EB7D1]"
          >
            {confirmText}
          </Button>
          <Button
            variant="outline"
            onClick={handleCancel}
            className="bg-[#9EB7D1] text-white hover:bg-white hover:text-[#9EB7D1] hover:border hover:border-[#9EB7D1]"
          >
            {cancelText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
