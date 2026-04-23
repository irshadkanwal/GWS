import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Typography from "@/components/ui/typography";
import { useRouter } from "next/router";

type Props = {
  isLongMessage: boolean;
  accordionTrigger: React.JSX.Element;
  accordionContent: React.JSX.Element;
  donationMessage: string;
  donationID: number;
};

function DonationMessageAccordion({
  isLongMessage,
  accordionTrigger,
  accordionContent,
  donationMessage,
  donationID,
}: Props) {
  const router = useRouter();
  const isPreviewAndPublishPage = router.pathname.includes(
    "/preview-and-publish"
  );
  return (
    <>
      {isLongMessage ? (
        <Accordion type="multiple" className="w-11/12">
          <AccordionItem value={`reason-${donationID}`}>
            <AccordionTrigger className="text-sm text-[#050708] font-medium p-0 no-underline">
              {accordionTrigger}
            </AccordionTrigger>
            <AccordionContent
              className={
                "text-sm text-[#A3A3A3] border-none pt-2 pb-2 whitespace-pre-line text-justify"
              }
            >
              {accordionContent}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ) : (
        <div className="flex items-center gap-2 ml-4">
          <Typography size="xs" className="text-[#A3A3A3]">
            {donationMessage || "—"}
          </Typography>
        </div>
      )}
    </>
  );
}

export default DonationMessageAccordion;
