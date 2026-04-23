"use client";

import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GridItem } from "@/components/ui/Grid";
import EllipsisTypography from "@/pageComponents/common/EllipsisTypography";
import Typography from "@/components/ui/typography";
import type { DonationType } from "@/utilities/types/donation";
import DonationMessageAccordion from "./DonationMessageAccordion";
import { useRouter } from "next/router";
import { NON_PROTECTED_ROUTES } from "@/constants/nonProtectedRoutes";
import { cn } from "@/lib/utils";

type DonationCardProps = {
  donation: DonationType;
  onSendSupport?: (donation: DonationType) => void;
  showDonationMessage?: boolean;
  containerStyle?: string;
  isLoading?: boolean;
  disableSupportButton?: boolean;
};

const DonationCard = ({
  donation,
  onSendSupport,
  showDonationMessage = true,
  containerStyle,
  isLoading = false,
  disableSupportButton = false,
}: DonationCardProps) => {
  const isLongMessage = donation?.message?.length! > 100;
  const router = useRouter();
  const isPublicRegistryPage = NON_PROTECTED_ROUTES.includes(router.pathname);

  const disableSendButton =
    donation.status === "completed" || isLoading || disableSupportButton;

  return (
    <GridItem className={cn("", containerStyle)}>
      <div className="w-full border-b overflow-auto last:border-b-0 ">
        <div className="space-y-2 flex flex-col md:flex-row justify-between w-full items-center">
          <div>
            <div className="flex items-center gap-2">
              <Check
                size={20}
                color={donation.status === "completed" ? "green" : "black"}
              />
              <EllipsisTypography className="text-sm text-[#050708] line-clamp-1">
                {`$${donation.amount} - ${donation?.title}`}
              </EllipsisTypography>
            </div>
            {showDonationMessage && (
              <DonationMessageAccordion
                donationID={donation.id}
                donationMessage={donation.message}
                accordionTrigger={
                  <div className="flex items-center">
                    <EllipsisTypography className="text-xs text-[#A3A3A3] text-start line-clamp-2">
                      {donation?.message}
                    </EllipsisTypography>
                  </div>
                }
                accordionContent={
                  <Typography
                    className={`text-[#A3A3A3] ${
                      isPublicRegistryPage ? "text-sm" : "text-xs"
                    }`}
                  >
                    {donation?.message}
                  </Typography>
                }
                isLongMessage={isLongMessage}
              />
            )}
          </div>

          {onSendSupport && (
            <Button
              variant="outline"
              className="bg-white border-[#385C80] text-[#385C80] hover:bg-[#385C80] hover:text-white rounded-sm w-full md:w-auto"
              onClick={() => onSendSupport(donation)}
              disabled={disableSendButton}
            >
              Send Support
            </Button>
          )}
        </div>
      </div>
    </GridItem>
  );
};

export default DonationCard;
