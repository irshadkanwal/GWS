import React from "react";
import StepCard from "./StepCard";
import CreateStep from "./CreateStep.tsx";
import { useStepFormStore } from "@/store/stepFormStore";

type StepProcessProps = {
  stepProcessForm: boolean;
  closeStepForm?: () => void;
  openStepForm?: () => void;
};

export default function StepProcess({
  stepProcessForm,
  closeStepForm,
  openStepForm,
}: StepProcessProps) {
  const createStepRef = React.useRef<HTMLDivElement>(null);
  const scrollTrigger = useStepFormStore((state) => state.scrollTrigger);

  React.useEffect(() => {
    if (stepProcessForm && createStepRef.current) {
      const rect = createStepRef.current.getBoundingClientRect();
      const isInView =
        rect.top >= 0 &&
        rect.bottom <=
          (window.innerHeight || document.documentElement.clientHeight);

      if (!isInView) {
        createStepRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  }, [scrollTrigger]);

  return (
    <div className="px-6 sm:px-12 lg:px-20">
      {stepProcessForm ? (
        <div>
          <CreateStep
            closeStepForm={closeStepForm}
            createStepRef={createStepRef}
          />
        </div>
      ) : (
        <section className="w-full bg-primary ">
          <div className="w-full">
            <h2 className="mb-4 text-5xl font-bold text-center">
              How it Works
            </h2>
            <p className="mb-12 text-center text-gray-600">
              MAKING SUPPORT SIMPLER, FOR EVERYONE INVOLVED
            </p>
            <div className="grid grid-cols-1 gap-20 lg:gap-4 pt-10 mt-20 lg:grid-cols-3">
              <StepCard
                icon={
                  <span role="img" aria-label="gift">
                    <img src="appIcons/Gift.svg" />
                  </span>
                }
                title="Create Your Care Registry"
                subTitle=" Ask for what you actually need"
                description="Tell us what's happening — and we'll help you ask with confidence"
                link="Start Your Care Registry Now"
                onStartYourGiftwell={openStepForm!}
              />
              <StepCard
                icon={
                  <span role="img" aria-label="share">
                    <img src="appIcons/Mail.svg" />
                  </span>
                }
                title="Share with Loved Ones"
                subTitle="Give them clear direction"
                description="Your supporters want to help but don't know how. Your registry show them exactly what would make a difference and when."
                link="Start Your Care Registry Now"
                onStartYourGiftwell={openStepForm!}
              />
              <StepCard
                icon={
                  <span role="img" aria-label="support">
                    <img src="appIcons/Notebook.svg" />
                  </span>
                }
                title="Receive Real Support"
                subTitle="Get help that actually helps"
                description="No more coordination fatigue. No more casseroles or scented candles. Just meaningful support that fits your life."
                link="Start Your Care Registry Now"
                onStartYourGiftwell={openStepForm!}
              />
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
