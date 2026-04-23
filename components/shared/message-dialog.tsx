import React from "react";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import Form from "../form/Form";
import { z } from "zod";
import FormTextField from "../form/Fields/FormTextField";
import FormFooter from "../form/FormFooter";
import FormTextareaField from "../form/Fields/FormTextareaField";
import useSendSupportMessage from "@/hooks/support-message/useCreateSupportMessage";
import { NAME_REGEX } from "@/utilities/constants/regex";

type Props = {
  open: boolean;
  closeDialog: () => void;
  userID: number;
};

function MessageDialog({ open, closeDialog, userID }: Props) {
  const { mutateAsync: sendMessage } = useSendSupportMessage();
  const initialValues = {
    sender_name: "",
    message: "",
  };

  const validationSchema = z.object({
    sender_name: z
      .string()
      .min(1, "Name must be at least 20 characters long")
      .refine((val) => NAME_REGEX.test(val), {
        message: "First name must contain letters only",
      }),
    message: z.string().min(25, "Message must be at least 25 characters long"),
  });

  type FormValues = z.infer<typeof validationSchema>;

  const handleSubmit = async (values: FormValues) => {
    const newMessage = {
      user_id: userID,
      sender_name: values.sender_name,
      message: values.message,
    };
    await sendMessage({ newMessage });
    closeDialog();
  };

  return (
    <Dialog open={open} onOpenChange={closeDialog}>
      <DialogContent className="w-11/12 mx-auto md:max-w-[600px]">
        <DialogHeader>Send Message</DialogHeader>
        <Form
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <FormTextField
            name="sender_name"
            label="Name"
            placeholder="Enter your name"
          />
          <FormTextareaField
            name="message"
            label="Message"
            placeholder="Enter your message"
            maxCharactersLength={300}
            showCharacterCount
          />
          <FormFooter submitButtonText="Send Message" nextButtonType="submit" />
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default MessageDialog;
