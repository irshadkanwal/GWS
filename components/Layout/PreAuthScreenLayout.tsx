import React from "react";
import Footer from "@/pageComponents/common/Footer";
import { usePathname } from "next/navigation";
import Navbar from "@/pageComponents/common/Navbar";
import { useEnableStepProcessForm } from "@/hooks/useEnableStepProcessForm";
import FindCareRegistryModal from "@/pageComponents/LandingPage/FindCareRegistryModal";
import { useFindCareRegistryModal } from "@/context/FindCareRegistryModalContext";

type PreAuthScreenLayoutProps = {
  children: React.ReactNode;
};

function PreAuthScreenLayout({ children }: PreAuthScreenLayoutProps) {
  const pathName = usePathname();
  const { openStepForm } = useEnableStepProcessForm();
  const { isOpen, closeModal } = useFindCareRegistryModal();

  const isNotLandingPage =
    pathName !== "/" &&
    pathName !== "/verify" &&
    pathName !== "/reset-password";

  return (
    <>
      <div className="w-full min-h-screen bg-primary">
        <div className="w-full">
          {isNotLandingPage && (
            <div className="px-6 sm:px-12 lg:px-20">
              <Navbar
                openStepForm={openStepForm}
                navButtonStyles="text-[#050708]"
              />
            </div>
          )}
          {children}
        </div>
        <Footer openStepForm={openStepForm} />
      </div>
      <FindCareRegistryModal open={isOpen} closeDialog={closeModal} />
    </>
  );
}

export default PreAuthScreenLayout;
