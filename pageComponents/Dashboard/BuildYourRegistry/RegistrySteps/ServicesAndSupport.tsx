import React from "react";
import FormMultiSelectField from "@/components/form/Fields/FormMultiSelectField";
import Form from "@/components/form/Form";
import FormFooter from "@/components/form/FormFooter";
import CustomSeparator from "@/components/shared/custom-separator";
import { z } from "zod";
import useGetAllServices from "@/hooks/services/useGetAllServices";
import { useUserStore } from "@/store";
import useGetUserDetailsByID from "@/hooks/user-details/useGetUserDetailsByID";
import ServiceBasedProductList from "./ServiceBasedProductList";
import useUpdateUserDetails from "@/hooks/user-details/useUpdateUserDetails";
import { toast } from "sonner";
import GWSLoader from "@/components/shared/gws-loader";

type ServicesAndSupportProps = {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  isLastStep: boolean;
};

function ServicesAndSupport({ setCurrentStep }: ServicesAndSupportProps) {
  const user = useUserStore(React.useCallback((state) => state, []));
  const { data: userDetails, isLoading: isLoadingUserDetails } =
    useGetUserDetailsByID(user.id || 0);
  const { mutateAsync: updateUserDetails } = useUpdateUserDetails();
  const { data: allServices, isLoading: isLoadingServices } =
    useGetAllServices();

  const userServices = userDetails?.services?.map((service) => String(service));

  const initialValues = {
    availableServices: userServices || [],
  };

  const validationSchema = z.object({
    availableServices: z.array(z.string().min(1, "Services are required")),
  });

  type FormValues = z.infer<typeof validationSchema>;
  const handleSubmit = async (values: FormValues) => {
    const savedServices = userDetails?.services || [];

    const selectedServices = values.availableServices.map(Number);

    const isChanged =
      savedServices.length === selectedServices.length &&
      savedServices.every((service) => selectedServices.includes(service));

    if (isChanged) {
      handleNextClick();
      return;
    }

    if (userDetails) {
      try {
        await updateUserDetails({
          id: userDetails.id,
          userDetails: { ...userDetails, services: selectedServices },
        });
        toast.success("Services updated.");
        handleNextClick();
      } catch (error) {
        toast.error(`Update Failed: ${error}`);
      }
    }
  };

  const handleBackClick = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleNextClick = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const availableServicesOptions = allServices?.map((service) => ({
    label: service.name,
    value: service.id,
  }));

  if (isLoadingUserDetails || isLoadingServices) {
    return <GWSLoader loadingText="Loading Services and Support" />;
  }

  return (
    <Form
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <FormMultiSelectField
        name="availableServices"
        label="Available Services"
        placeholder="Choose the services and help you need"
        options={availableServicesOptions || []}
        className="p-0 sm:p-2"
      />

      <CustomSeparator className="my-0" />
      <ServiceBasedProductList />

      <FormFooter
        submitButtonText="Next"
        IsResetButtonRequired={false}
        onBackButtonClick={handleBackClick}
        renderBackButton={true}
        nextButtonType="submit"
      />
    </Form>
  );
}

export default ServicesAndSupport;
