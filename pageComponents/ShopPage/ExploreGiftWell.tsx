import React from "react";
import { Button } from "@/components/ui/button";
import { useEnableStepProcessForm } from "@/hooks/useEnableStepProcessForm";
import Image from "next/image";

function ExploreGiftWell() {
  const { openStepForm } = useEnableStepProcessForm();
  return (
    <div className="pt-10 px-6 sm:px-12 lg:px-20">
      <div className="w-full mx-auto bg-[#E7E4DA] rounded-md shadow-md p-12 flex flex-col sm:flex-row items-center justify-center gap-12">
        {/* Gift Icon */}

        <div className="w-36 h-36 bg-[#E7E4DA] rounded-md flex items-center justify-center">
          <Image
            src="/appIcons/Gift2.svg"
            alt="Gift Icon"
            width={200}
            height={200}
            className="object-contain w-full h-full"
          />
        </div>

        {/* Text and Buttons */}
        <div className=" text-center sm:text-left">
          <h2 className="mb-1 text-lg font-semibold">
            Products and services that make a difference.
          </h2>
          <p className="mb-4 text-sm text-gray-600">
            Life-changing moments require real support. Getting what you need
            should feel empowering, not exhausting.
          </p>
          <p className="mb-4 text-sm text-gray-600">
            READY TO TAKE CONTROL OF YOUR SUPPORT?
          </p>
          <div className="flex justify-center gap-4 sm:justify-start">
            {/* <button className="bg-[#9EB7D1] text-[#F8F8F8] px-4 py-2 rounded-md text-sm hover:bg-blue-600">
              Explore the Items
            </button> */}
            <Button
              variant={"link"}
              className="text-sm text-[#385C80] p-0"
              onClick={openStepForm}
            >
              Start a Care Registry
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExploreGiftWell;
