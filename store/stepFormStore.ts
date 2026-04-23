import { create } from "zustand";

interface StepFormState {
  isFormEnabled: boolean;
  scrollTrigger: number;
  enableForm: () => void;
  disableForm: () => void;
  triggerScroll: () => void;
}

export const useStepFormStore = create<StepFormState>((set) => ({
  isFormEnabled: false,
  scrollTrigger: 0,
  enableForm: () => set({ isFormEnabled: true }),
  disableForm: () => set({ isFormEnabled: false }),
  triggerScroll: () => set({ scrollTrigger: Date.now() }),
}));
