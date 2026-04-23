import React from "react";
import { useStepFormStore } from "@/store/stepFormStore";
import { useRouter } from "next/router";

export function useEnableStepProcessForm() {
  const router = useRouter();
  const { isFormEnabled, enableForm, disableForm, triggerScroll } =
    useStepFormStore();

  React.useEffect(() => {
    if (router.pathname !== "/") {
      disableForm();
    }
  }, [router.pathname, disableForm]);

  const openStepForm = async () => {
    if (router.pathname === "/") {
      enableForm();
      triggerScroll();
    } else {
      await router.push("/");
      enableForm();
      triggerScroll();
    }
  };

  return {
    enableForm: isFormEnabled,
    openStepForm,
    closeStepForm: disableForm,
  };
}
