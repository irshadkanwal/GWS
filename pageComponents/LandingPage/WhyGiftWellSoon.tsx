import WhyGwsVector from "@/components/svg/WhyGwsVector";

function WhyGiftWellSoon() {
  return (
    <div className="relative flex flex-col gap-7 lg:flex-row justify-center items-center min-h-[600px] p-4 bg-primary overflow-hidden px-6 sm:px-12 lg:px-20">
      {/* Background SVG */}
      <WhyGwsVector className="absolute  left-1/3 pointer-events-none z-0" />

      <div className="z-10">
        <img src="close-up-woman-having-breakfast.png" alt="why us" />
      </div>
      <div className="flex flex-col mt-5 md:mt-0 md:ml-5  z-10">
        <h3 className="mb-4 text-5xl font-bold">Why GWS?</h3>
        <div className="max-w-xl space-y-3 text-base px-3 sm:px-0">
          <p className="text-justify text-[#505152]">
            BECAUSE ASKING FOR HELP SHOULDN'T FEEL HARD. Someone has a life
            changing moment. Friends say "let me know if you need anything."
            Hours later, that person is exhausted from coordinating everyone's
            good intentions and managing their emotional reactions—all while
            facing their own crisis.
          </p>
          <p className="text-[#505152]">
            The current way of asking for help is broken.
          </p>
          <p className="text-justify text-[#505152]">
            Our founder Amy lived this twice: First, when caring for her mother
            with stage 4 breast cancer, then facing her own aggressive cancer
            diagnosis while raising foster children.
          </p>
          <p className="text-justify text-[#505152]">
            Amy's breaking point: Sitting on the couch after chemo, dreading
            having to ask for childcare because asking felt almost as exhausting
            as going without. Neither giving nor receiving should require a PhD
            in coordination.
          </p>
        </div>
      </div>
    </div>
  );
}

export default WhyGiftWellSoon;
