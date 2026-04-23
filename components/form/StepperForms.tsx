"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export type StepContent = {
  isLastStep: boolean;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
};

export type StepperFormType = {
  stepID: number;
  stepTitle: string;
  subtitle?: string;
  stepContent: (props: StepContent) => React.JSX.Element;
  PrevStepID?: number;
};

type FormStepperProps = {
  steps: StepperFormType[];
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  className?: string;
  subtitle?: string;
  showScrollArea?: boolean;
  renderScrollbar?: boolean;
  showStepCounter?: boolean;
};

const FormStepper: React.FC<FormStepperProps> = ({
  steps,
  currentStep,
  setCurrentStep,
  className,
  subtitle,
  showScrollArea = true,
  renderScrollbar = false,
  showStepCounter = false,
}) => {
  const scrollAreaRef = React.useRef<HTMLDivElement | null>(null);

  const scrollToCurrentStep = (stepIndex: number) => {
    const scrollArea = scrollAreaRef.current;
    if (scrollArea && scrollArea.children.length) {
      const stepElement = scrollArea.children[stepIndex] as HTMLElement;
      if (stepElement) {
        stepElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center",
        });
      }
    }
  };

  React.useEffect(() => {
    scrollToCurrentStep(currentStep - 1);
  }, [currentStep]);

  const handleStepClick = (stepID: number) => {
    if (
      stepID <=
      Math.max(
        currentStep,
        steps.find((s) => s.stepID === currentStep)?.PrevStepID || 0
      ) +
        1
    ) {
      setCurrentStep(stepID);
    }
  };

  const step = steps.find((step) => step.stepID === currentStep);
  const isLastStep = currentStep === steps[steps.length - 1].stepID;

  return (
    <div className={cn("w-full", className)}>
      {showScrollArea && (
        <ScrollArea className="w-full">
          <div className="flex border-b" ref={scrollAreaRef}>
            {steps.map((step) => (
              <button
                key={step.stepID}
                onClick={() => handleStepClick(step.stepID)}
                className={cn(
                  "px-6 py-4 text-sm font-medium transition-colors relative whitespace-nowrap",
                  step.stepID === currentStep
                    ? "text-[#385C80] border-b-2 border-[#9EB7D1]"
                    : "text-[#6B7280] hover:text-[#111827]"
                )}
                disabled={step.stepID > currentStep + 1}
              >
                <span>
                  {step.stepID}. {step.stepTitle}
                </span>
              </button>
            ))}
          </div>
          {renderScrollbar && <ScrollBar orientation="horizontal" />}
        </ScrollArea>
      )}
      {showStepCounter && (
        <div className="flex flex-col items-center">
          <span className="font-[700] text-[22px] ">
            {steps[currentStep - 1].stepTitle}
          </span>
          <span className="text-center text-[14px] my-2">{step?.subtitle}</span>
          <span className="text-[#505152]  ">
            {currentStep}/{steps.length}
          </span>
        </div>
      )}

      <div className="mt-6">
        {step?.stepContent({ setCurrentStep, isLastStep })}
      </div>
    </div>
  );
};

export default FormStepper;
