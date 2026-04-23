import React from "react";
import { CircleDollarSign } from "lucide-react";
import FormSelectableButtonGroup from "@/components/form/Fields/FormSelectableButtonGroup";
import FormFooter from "@/components/form/FormFooter";
import { Grid, GridItem } from "@/components/ui/Grid";
import useGetAllServices from "@/hooks/services/useGetAllServices";
import FormTextField from "@/components/form/Fields/FormTextField";
import useGetAllProductTypes from "@/hooks/product-types/useGetAllProductTypes";
import { useFormContext } from "react-hook-form";
import GWSLoader from "@/components/shared/gws-loader";
import { useWindowSize } from "@/hooks/useWindowSize";

type TypeOfItemsProps = {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  isLastStep: boolean;
};

function TypeOfItems({ setCurrentStep, isLastStep }: TypeOfItemsProps) {
  const { data: allServices, isLoading: isLoadingServices } =
    useGetAllServices();
  const { data: allProductsTypes, isLoading: isLoadingProductTypes } =
    useGetAllProductTypes();
  const { formState } = useFormContext();
  const { width } = useWindowSize();

  const productOptions =
    allProductsTypes?.map((product) => ({
      label: product.name,
      value: product.id,
    })) || [];

  const servicesOptions =
    allServices?.map((service) => ({
      label: service.name,
      value: service.id,
    })) || [];

  const handleNextClick = () => {};

  const handleBackClick = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const isNextIconDisabled = formState.isSubmitting || !formState.isValid;

  if (isLoadingProductTypes || isLoadingServices) {
    return <GWSLoader loadingText="Loading" />;
  }

  return (
    <>
      <FormSelectableButtonGroup
        name="products"
        label="Products"
        options={productOptions}
      />
      <Grid>
        <GridItem className="col-span-12 md:col-span-8">
          <FormSelectableButtonGroup
            name="servicesHelp"
            label="Services/Help"
            options={servicesOptions}
          />
        </GridItem>
        <GridItem className="col-span-12 md:col-span-4">
          <FormTextField
            name="otherServices"
            label="Others"
            placeholder="Enter other services"
            inputFieldStyles="my-2"
          />
        </GridItem>
      </Grid>

      <GridItem size={12} className="px-0">
        <FormFooter
          size={12}
          submitButtonText="Next/Skip for Now"
          renderBackButton={true}
          onBackButtonClick={handleBackClick}
          onNextClick={handleNextClick}
          disableNextButton={isNextIconDisabled}
          nextButtonType="submit"
          backButtonText={width < 768 ? "" : "Back"}
        />
      </GridItem>
    </>
  );
}

export default TypeOfItems;
