import React from "react";
import FormTextField from "@/components/form/Fields/FormTextField";
import { GridItem } from "@/components/ui/Grid";
import PasswordField from "@/components/form/Fields/Password";
import { useFormContext } from "react-hook-form";
import BuildRegistryFooter from "@/pageComponents/Dashboard/BuildYourRegistry/BuildRegistryFooter";

type BasicInfoProps = {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  isLastStep: boolean;
};

function BasicInfo({ setCurrentStep, isLastStep }: BasicInfoProps) {
  const { watch, formState } = useFormContext();
  const { errors } = formState;

  const email = watch("email");
  const isEmailValid = !errors.email && !!email;

  const isStepOneCompleted =
    watch("firstName") &&
    watch("lastName") &&
    isEmailValid &&
    watch("password");

  const handleBackClick = () => {};
  const handleNextClick = () => {
    setCurrentStep((prev) => prev + 1);
  };

  return (
    <div>
      <FormTextField
        name="firstName"
        label="First Name"
        placeholder="Enter your first name"
      />
      <FormTextField
        name="lastName"
        label="Last Name"
        placeholder="Enter your last name"
      />
      <FormTextField
        name="email"
        label="Email Address"
        placeholder="Enter your email address"
      />

      <PasswordField
        name="password"
        label="Password"
        placeholder="Enter your password"
      />

      <GridItem size={12} className="px-0">
        <BuildRegistryFooter
          handleBackClick={handleBackClick}
          handleNextClick={handleNextClick}
          onSaveClick={handleNextClick}
          renderBackButton={false}
          disableSaveButton={!isStepOneCompleted}
          disableNextButton={isLastStep || !isStepOneCompleted}
        />
      </GridItem>
    </div>
  );
}

export default BasicInfo;
