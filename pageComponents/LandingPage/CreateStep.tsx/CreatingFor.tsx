import React from "react";
import RadioButtonFormField from "@/components/form/Fields/RadioButtonFormField";
import { GridItem } from "@/components/ui/Grid";
import RecipientFields from "./RecipientFields";
import { useFormContext } from "react-hook-form";
import BuildRegistryFooter from "@/pageComponents/Dashboard/BuildYourRegistry/BuildRegistryFooter";
import { useWindowSize } from "@/hooks/useWindowSize";
import { REGISTRY_FOR } from "@/constants/constants";

type CreatingForProps = {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  isLastStep: boolean;
};

const options = [
  {
    label: "Myself",
    value: "myself",
  },
  {
    label: "Someone else",
    value: "someone_else",
  },
];

function CreatingFor({ setCurrentStep, isLastStep }: CreatingForProps) {
  const { width } = useWindowSize();
  const isMobile = width <= 425;

  const { watch, formState } = useFormContext();

  const creatingFor = watch("createForOption");
  const recipientEmail = watch("recipientEmail");
  const isEmailValid = !formState.errors.recipientEmail && !!recipientEmail;

  const isCreatingForInfoCompleted =
    creatingFor === REGISTRY_FOR.MY_SELF
      ? true
      : watch("recipientName") && isEmailValid;

  const handleNextClick = () => {
    setCurrentStep((prev) => prev + 1);
  };
  const handleBackClick = () => {
    setCurrentStep((prev) => prev - 1);
  };

  return (
    <>
      <RadioButtonFormField
        name="createForOption"
        label="Choose an option"
        options={options}
        orientation={isMobile ? "vertical" : "horizontal"}
      />
      <GridItem size={12} className="">
        <RecipientFields />
      </GridItem>
      <GridItem size={12} className="px-0">
        <BuildRegistryFooter
          handleBackClick={handleBackClick}
          handleNextClick={handleNextClick}
          onSaveClick={handleNextClick}
          renderBackButton={true}
          disableSaveButton={!isCreatingForInfoCompleted}
          disableNextButton={isLastStep || !isCreatingForInfoCompleted}
          backButtonText={isMobile ? "" : "Back"}
        />
      </GridItem>
    </>
  );
}

export default CreatingFor;
