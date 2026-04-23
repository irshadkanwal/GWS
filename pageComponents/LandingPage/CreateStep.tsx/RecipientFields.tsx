import React from "react";
import FormTextField from "@/components/form/Fields/FormTextField";
import { useFormContext } from "react-hook-form";
import { REGISTRY_FOR } from "@/constants/constants";

type RecipientFieldsProps = {};

function RecipientFields({}: RecipientFieldsProps) {
  const { watch } = useFormContext();
  const selectedOption = watch("createForOption");

  return (
    <div>
      {selectedOption === REGISTRY_FOR.SOMEONE_ELSE ? (
        <div>
          <FormTextField
            label="Recipient's Name"
            name="recipientName"
            placeholder="Enter recipient's name"
          />
          <FormTextField
            label="Recipient's Email"
            name="recipientEmail"
            placeholder="Enter recipient's email"
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default RecipientFields;
