import React from "react";
import { z } from "zod";
import FormStepper from "@/components/form/StepperForms";
import IconCircle from "@/components/ui/IconCircles";
import BasicInfo from "./BasicInfo";
import CreatingFor from "./CreatingFor";
import TypeOfItems from "./TypeOfItems";
import Form from "@/components/form/Form";
import { GridItem } from "@/components/ui/Grid";
import { Card } from "@/components/ui/card";
import useCreateUser from "@/hooks/user/useCreateUser";
import type { StepContent } from "@/components/form/StepperForms";
import { toast } from "sonner";
import isValidEmail from "@/utilities/helpers/emailValidation";
import { NAME_REGEX } from "@/utilities/constants/regex";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getRandomNumber } from "@/utils/getRandomNumbers";
import useGetAllRoles from "@/hooks/role/useGetAllRoles";
import { REGISTRY_FOR, USER_ROLES } from "@/constants/constants";

const formSchema = z
  .object({
    createForOption: z.enum(["myself", "someone_else"]),
    firstName: z
      .string()
      .min(1, "First name is required")
      .refine((val) => NAME_REGEX.test(val), {
        message: "First name must contain letters only",
      }),
    lastName: z
      .string()
      .min(1, "Last name is required")
      .refine((val) => NAME_REGEX.test(val), {
        message: "Last name must contain letters only",
      }),
    email: z.string().refine(isValidEmail, "should be a valid email"),
    password: z.string().min(1, "Password must be at least 8 characters long"),
    recipientEmail: z.string().email("should be a valid email").optional(),
    recipientName: z.string().optional(),
    otherServices: z.string().optional(),
    products: z.array(z.number()).optional(),
    servicesHelp: z.array(z.number()).optional(),
  })
  .superRefine((data, ctx) => {
    if (data.createForOption === REGISTRY_FOR.SOMEONE_ELSE) {
      if (!data.recipientName || data.recipientName.trim() === "") {
        ctx.addIssue({
          path: ["recipientName"],
          code: z.ZodIssueCode.custom,
          message: "Recipient name is required",
        });
      }
      if (!data.recipientEmail || data.recipientEmail.trim() === "") {
        ctx.addIssue({
          path: ["recipientEmail"],
          code: z.ZodIssueCode.custom,
          message: "Recipient email is required",
        });
      }
    }
  });

type FormValues = z.infer<typeof formSchema>;

const initialValues: Partial<FormValues> = {
  createForOption: REGISTRY_FOR.MY_SELF,
  products: [],
  servicesHelp: [],
};

function CreateStep({
  closeStepForm,
  createStepRef,
}: {
  closeStepForm?: () => void;
  createStepRef?: React.RefObject<HTMLDivElement | null>;
}) {
  const [currentStep, setCurrentStep] = React.useState(1);
  const { mutateAsync: createUser } = useCreateUser();
  const { data: allRoles } = useGetAllRoles();

  const handleSubmit = async (values: FormValues) => {
    const { createForOption } = values;
    const roleName =
      createForOption === REGISTRY_FOR.SOMEONE_ELSE
        ? USER_ROLES.CAREGIVER
        : USER_ROLES.RECIPIENT;
    const matchedRole = allRoles?.find((r) => r.name === roleName);

    const randomNumber = getRandomNumber();
    const emailName =
      createForOption === REGISTRY_FOR.SOMEONE_ELSE
        ? values.recipientEmail?.split("@")[0]
        : values.email.split("@")[0];
    const public_url = `${emailName}${randomNumber}`;

    try {
      const response = await createUser({
        newUser: {
          role_id: matchedRole?.id || 0,
          first_name: values.firstName,
          last_name: values.lastName,
          creating_for: values.createForOption,
          email: values.email,
          public_url,
          password: values.password,
          recipient_email: values.recipientEmail,
          recipient_name: values.recipientName,
          products: values.products || [],
          services: values.servicesHelp || [],
          is_deleted: false,
        },
      });

      if (response && response.id) {
        closeStepForm && closeStepForm();
        toast.success("Account created. Please verify your email to proceed.");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(
          `${error.message || "Something went wrong while creating account."}`
        );
      }
    }
  };
  const stepProcessSteps = [
    {
      stepID: 1,
      stepTitle: "Basic Info",
      stepContent: (props: StepContent) => <BasicInfo {...props} />,
      NextStepID: 2,
      PrevStepID: 0,
    },
    {
      stepID: 2,
      stepTitle: "Who are you creating this Care Registry for?",
      stepContent: (props: StepContent) => <CreatingFor {...props} />,
      NextStepID: 3,
      PrevStepID: 1,
    },
    {
      stepID: 3,
      stepTitle: "Type of Items",
      subtitle:
        "Tell us what you think you'll need and we'll help you ask with confidence. Don't worry, you can change this later!",
      stepContent: (props: StepContent) => <TypeOfItems {...props} />,
      NextStepID: 4,
      PrevStepID: 2,
    },
  ];

  return (
    <div className="xl:px-28" ref={createStepRef}>
      <div className="mb-24">
        <h2 className="mt-10 mb-2 text-4xl font-bold text-center">
          Step Process
        </h2>
        <p className="mb-10 text-center text-gray-600">
          Start Your Care Registry
        </p>
      </div>
      <div className="relative flex flex-col items-center my-5">
        <div className="absolute flex justify-center  mx-auto -top-16 z-20">
          <div className="flex items-center justify-center p-3 bg-white border-4 border-white border-solid rounded-full">
            <IconCircle size="w-28 h-28" className="text-5xl shadPow-none">
              <span role="img" aria-label="gift">
                <img src="appIcons/Gift.svg" />
              </span>
            </IconCircle>
          </div>
        </div>

        <Card className="relative bg-white flex flex-col justify-between pt-24 pb-8 px-6 w-full xl:w-[850px]">
          <div className="absolute top-0 right-0">
            <Button variant="ghost" className="px-2" onClick={closeStepForm}>
              <X />
            </Button>
          </div>
          <div>
            <Form
              initialValues={initialValues}
              validationSchema={formSchema}
              onSubmit={handleSubmit}
            >
              <GridItem size={12} className="p-0">
                <FormStepper
                  currentStep={currentStep}
                  setCurrentStep={setCurrentStep}
                  steps={stepProcessSteps}
                  showScrollArea={false}
                  showStepCounter={true}
                />
              </GridItem>
            </Form>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default CreateStep;
