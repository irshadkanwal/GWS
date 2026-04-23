import { Button } from "@/components/ui/button";
import GetInTouch from "./GetInTouch";
import GiftWellSoon from "./GiftWellSoon";
import SocialLinks from "./SocialLinks";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Typography from "@/components/ui/typography";
import { useRouter } from "next/router";
import Image from "next/image";
import { useFindCareRegistryModal } from "@/context/FindCareRegistryModalContext";

type FooterProps = {
  className?: string;
  openStepForm?: () => void;
};

function Footer({ className, openStepForm }: FooterProps) {
  const router = useRouter();
  const { openModal } = useFindCareRegistryModal();
  return (
    <div
      className={cn(
        "bg-[--footer-primary] min-h-[550px] z-50 relative",
        className
      )}
    >
      <div className="flex flex-col items-center w-4/5 mx-auto py-20 gap-4">
        <Typography size="3xl" className="font-bold text-[#050708]">
          The Care Registry for Life's Toughest Moments
        </Typography>
        <Typography size="md" className="text-[#1E2021]">
          Because friends want to help, they just need to know how.
        </Typography>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            variant="secondary"
            className="text-black rounded-sm"
            onClick={openStepForm}
          >
            Start a Care Registry
          </Button>
          <Button
            variant="outline"
            className="border bg-inherit border-[#373939] rounded-sm"
            onClick={openModal}
          >
            Find a Care Registry
          </Button>
        </div>
      </div>
      <hr className="w-full h-1 mt-5 border-[#96B9AC]" />

      <div className="flex flex-col items-start justify-between w-4/5 lg:w-10/12 xl:w-9/12 mx-auto lg:flex-row py-20 gap-8">
        {/* Logo and Socials */}
        <div className="min-w-[200px] space-y-4">
          <div className="w-[188px] h-20">
            <Link href="/">
              <Image
                src={"/GWS-logo-dark.svg"}
                width={120}
                height={50}
                alt="logo"
                className="w-full h-full object-contain"
              />
            </Link>
          </div>
          <div>
            <Typography size="sm" className="text-[#050708]">
              BECAUSE ASKING FOR HELP SHOULDN'T FEEL HARD
            </Typography>
          </div>
          <SocialLinks />
        </div>
        <GiftWellSoon />
        <GetInTouch />
        {/* <VisitUs /> */}
      </div>
      <div className="w-full border-t border-[#96B9AC] text-center py-4 flex items-center justify-center gap-1">
        <Typography size="sm" className="text-gray-700">
          GiftWellSoon may earn small affiliate commissions or transaction fees,
          which help keep our platform free for those who need it.
        </Typography>
        <Button variant="link" className="p-0 text-[#143e69]">
          <Link
            href="/docs/GiftWellSoon_Terms_of_Use.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            Terms & Conditions
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default Footer;
