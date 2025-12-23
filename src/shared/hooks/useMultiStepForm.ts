import { useState } from "react";

export const useMultiStepForm = (
  steps: React.ReactNode[],
  initialData: Record<string, any> = {}
) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [data, setData] = useState<Record<string, any>>(initialData);

  const next = () => {
    setCurrentStepIndex((i) => Math.min(i + 1, steps.length - 1));
  };

  const back = () => {
    setCurrentStepIndex((i) => Math.max(i - 1, 0));
  };

  const goTo = (index: number) => {
    if (index >= 0 && index < steps.length) {
      setCurrentStepIndex(index);
    }
  };

  // Update form data
  function updateFields(fields: Partial<Record<string, any>>) {
    setData((prev) => ({ ...prev, ...fields }));
  }

  return {
    currentStepIndex,
    step: steps[currentStepIndex],
    steps,
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === steps.length - 1,
    next,
    back,
    goTo,
    data,
    updateFields,
  };
};
