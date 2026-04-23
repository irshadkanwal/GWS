import React from "react";
import HeroSection from "./HeroSection";
import StepProcess from "./StepProcess";
import WhyGiftWellSoon from "./WhyGiftWellSoon";
import { useEnableStepProcessForm } from "@/hooks/useEnableStepProcessForm";
import Image from "next/image";

export default function LandingPageComponent() {
  const { enableForm, openStepForm, closeStepForm } =
    useEnableStepProcessForm();

  return (
    <>
      <HeroSection openStepForm={openStepForm} />
      <div className="relative overflow-hidden my-20">
        <Image
          src="/Vector1.png"
          alt="vector"
          width={550}
          height={550}
          className="hidden lg:block absolute top-0 left-0 w-auto h-auto"
        />
        <StepProcess
          stepProcessForm={enableForm}
          openStepForm={openStepForm}
          closeStepForm={closeStepForm}
        />
      </div>
      <WhyGiftWellSoon />
    </>
  );
}
