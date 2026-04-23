import React from "react";
import { Button } from "@/components/ui/button";
import Navbar from "../common/Navbar";
import { useRouter } from "next/router";
import { useFindCareRegistryModal } from "@/context/FindCareRegistryModalContext";

type HeroSectionProps = {
  openStepForm?: () => void;
};

export default function HeroSection({ openStepForm }: HeroSectionProps) {
  const router = useRouter();
  const { openModal } = useFindCareRegistryModal();
  return (
    <div className="flex justify-center">
      <section className="relative flex flex-col justify-between bg-primary min-h-[800px] w-full z-20 bg-[url('/HeroImage.jpg')] bg-cover bg-[position:50%_30%] bg-black/40">
        <div className="absolute inset-0 z-0 bg-black/40 px-6 sm:px-12 lg:px-20">
          <Navbar
            logoIconColor="#ffffff"
            menuIconColor="#ffffff"
            openStepForm={openStepForm}
          />

          <div className="flex-1 max-w-2xl mt-32">
            <h1 className="mb-6 text-4xl font-bold leading-tight text-[#F3F3F3] lg:text-6xl">
              The care registry for life's toughest moments
            </h1>
            <p className="mb-8 text-lg leading-relaxed text-[#F3F3F3]">
              Because friends want to help, they just need to know how.
            </p>
            <div className="flex flex-col gap-4 mb-8 sm:flex-row">
              <Button
                variant="secondary"
                size="lg"
                className="px-8 py-3 text-base"
                onClick={openStepForm}
              >
                Start a Care Registry
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-3 text-base border bg-inherit border-[--border-primary] text-[#B2C9E0] hover:text-white"
                onClick={openModal}
              >
                Find a Care Registry
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
