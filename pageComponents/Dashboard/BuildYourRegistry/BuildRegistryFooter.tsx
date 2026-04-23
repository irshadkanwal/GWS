import React from "react";
import { Button } from "@/components/ui/button";
import { GridItem } from "@/components/ui/Grid";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { GridItemProps } from "@/components/ui/Grid/GridItem";
import { cn } from "@/lib/utils";

type BuildRegistryFooterProps = {
  handleBackClick: () => void;
  handleNextClick: () => void;
  size?: GridItemProps["size"];
  saveButtonText?: string;
  onSaveClick?: () => void;
  disableSaveButton?: boolean;
  showSaveButton?: boolean;
  disableNextButton?: boolean;
  renderBackButton?: boolean;
  backButtonText?: string;
};

function BuildRegistryFooter({
  handleBackClick,
  handleNextClick,
  size = 12,
  saveButtonText = "Next",
  onSaveClick,
  disableSaveButton = false,
  showSaveButton = true,
  disableNextButton = false,
  renderBackButton = true,
  backButtonText = "Back",
}: BuildRegistryFooterProps) {
  return (
    <GridItem size={size} className="gap-8">
      <div className="flex justify-between w-full gap-6 md:gap-12">
        {renderBackButton && (
          <div className="border-t px-0 w-1/5 lg:w-2/12">
            <Button
              className="p-0"
              variant={"ghost"}
              size={"lg"}
              onClick={handleBackClick}
            >
              <ArrowLeft className="mr-2" size={20} />
              {backButtonText}
            </Button>
          </div>
        )}

        <div
          className={cn(
            "flex px-0 border-t border-[#9EB7D1] w-4/5 lg:w-10/12",
            showSaveButton ? "justify-between" : "justify-end",
            renderBackButton ? "" : "!w-full"
          )}
        >
          {showSaveButton && (
            <Button
              variant={"ghost"}
              disabled={disableSaveButton}
              className="p-0 text-[#385C80]"
              onClick={onSaveClick}
            >
              {saveButtonText}
            </Button>
          )}
          <Button
            variant="ghost"
            className="p-0"
            disabled={disableNextButton}
            onClick={handleNextClick}
          >
            <ArrowRight size={20} color="#385C80" />
          </Button>
        </div>
      </div>
    </GridItem>
  );
}

export default BuildRegistryFooter;
