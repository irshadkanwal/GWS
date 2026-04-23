import React from "react";
import { ADDRESS_INFORMATION } from "@/constants/addressInformation";
import FormTextField from "@/components/form/Fields/FormTextField";
import Form from "@/components/form/Form";
import { z } from "zod";
import FormTextareaField from "@/components/form/Fields/FormTextareaField";
import FormButton from "@/components/form/Fields/FormButton";
import { NAME_REGEX } from "@/utilities/constants/regex";
import { GridItem } from "@/components/ui/Grid";
import useContactUs from "@/hooks/contact-us/useContactUs";
import { toast } from "sonner";

const formSchema = z.object({
  name: z
    .string()
    .min(2, "Name is required")
    .max(20, { message: "name can be of max length of 20 characters" })
    .refine((val) => NAME_REGEX.test(val), {
      message: "Name must contain letters only",
    }),
  email: z.string().email("email address should be valid"),
  phone: z
    .string()
    .regex(/^\d{1,11}$/, "phone number must contain only digits (max 11)"),
  message: z.string().min(10, "message would be require"),
});

const initialValues = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

type FormValues = z.infer<typeof formSchema>;

function ContactUsPage() {
  const { mutateAsync: sendEmail } = useContactUs();
  const onFormSubmit = async (values: FormValues) => {
    try {
      const result = await sendEmail(values);

      if (!result.success) {
        throw new Error(result.error || "Something went wrong");
      }

      toast.success("Message sent successfully!");
    } catch (error) {
      toast.error(`Failed: ${error}`);
    }
  };

  return (
    <div className="flex flex-col gap-10 p-6 sm:p-12 lg:px-20 bg-primary lg:flex-row justify-between">
      {/* Address Information */}
      <div>
        {/* contact - us */}
        <div>
          <h3 className="text-3xl sm:text-4xl lg:text-[48px] font-bold">
            Contact Us
          </h3>
          <span className="text-base sm:text-lg text-input-secondary">
            We're here for you — always ready to listen and help.
          </span>
        </div>
        {/* contact information */}
        <div className="flex flex-col gap-8 mt-10">
          <div>
            <div className="flex items-center">
              <img src="appIcons/Email.svg" alt="email icon" />
              <span className="ml-2 font-medium">Email</span>
            </div>
            <span className="text-sm text-input-secondary">
              info@giftwellsoon.com
            </span>
          </div>
          <div>
            <div className="flex items-center">
              <img src="appIcons/Email.svg" alt="email icon" />
              <span className="ml-2 font-medium">Partnership inquiries</span>
            </div>
            <span className="text-sm text-input-secondary">
              marketing@giftwellsoon.com
            </span>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="w-full max-w-xl p-6 bg-white rounded-md sm:p-8">
        <div className="mb-6">
          <span className="text-xl font-bold sm:text-2xl">
            Let Us Know What You Need. Seriously.
          </span>
        </div>
        <div className="flex flex-col">
          <Form<FormValues>
            initialValues={initialValues}
            validationSchema={formSchema}
            onSubmit={onFormSubmit}
            resetAfterSubmit={true}
          >
            <FormTextField
              label="Name"
              placeholder="Your Name"
              name="name"
              maxLength={20}
            />
            <FormTextField
              name="email"
              label="Email"
              placeholder="Your Email"
            />
            <FormTextField
              name="phone"
              label="Telephone"
              placeholder="Your Number"
            />
            <FormTextareaField
              showCharacterCount={false}
              placeholder="Any message"
              name="message"
              label="Message"
            />
            <GridItem className="py-0">
              <FormButton className="w-full md:w-fit bg-[#9EB7D1] text-[#F8F8F8] ">
                Send Message
              </FormButton>
            </GridItem>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default ContactUsPage;
