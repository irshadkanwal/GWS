import React from "react";
import FormStepper, { StepContent } from "@/components/form/StepperForms";
import Product from "./RegistrySteps/Product";
import ServicesAndSupport from "./RegistrySteps/ServicesAndSupport";
import PriorityItems from "./RegistrySteps/PriorityItems";
import GiftsAndMonetary from "./RegistrySteps/GiftsAndMonetary";
import { useUserStore } from "@/store";
import useGetRegistryItemByRegistryID from "@/hooks/registry-item/useGetRegistryItemsByRegistryID";

export type StepperFormType = {
  stepID: number;
  stepTitle: string;
  stepContent: React.ReactNode;
  NextStepID: number;
  PrevStepID: number;
};

function BuildYourRegistry() {
  const user = useUserStore(React.useCallback((state) => state, []));
  const [currentStep, setCurrentStep] = React.useState(1);
  const { data: registryItems, isLoading } = useGetRegistryItemByRegistryID(
    user.giftWellID!
  );

  const buildingRegistrySteps = [
    {
      stepID: 1,
      stepTitle: "Product",
      stepContent: (props: StepContent) => (
        <Product registryItems={registryItems || []} {...props} />
      ),
      NextStepID: 2,
      PrevStepID: 0,
    },

    {
      stepID: 2,
      stepTitle: "Prioritize Items",
      stepContent: (props: StepContent) => (
        <PriorityItems
          registryItems={registryItems || []}
          isLoading={isLoading}
          {...props}
        />
      ),
      NextStepID: 3,
      PrevStepID: 1,
    },
    {
      stepID: 3,
      stepTitle: "Services and Support",
      stepContent: (props: StepContent) => <GiftsAndMonetary {...props} />,
      NextStepID: 4,
      PrevStepID: 2,
    },
  ];

  return (
    <div className="bg-white md:mx-6 mx-2 md:p-6 p-3 rounded-sm w-[calc(100vw-6)] overflow-hidden relative">
      <FormStepper
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        steps={buildingRegistrySteps}
      />
    </div>
  );
}

export default BuildYourRegistry;
