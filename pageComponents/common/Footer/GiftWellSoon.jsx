import Typography from "@/components/ui/typography";
import Link from "next/link";
function GiftWellSoon() {
  return (
    <div className="space-y-3">
       <Typography size="lg" className="text-[#050708]">GiftWellSoon</Typography>
      <div className="flex flex-col gap-3">
        <Link href="/shop">
          <Typography size="sm" className="text-[#050708]">Shop</Typography>
        </Link>
        <Link href="/support-and-resources">
          <Typography size="sm" className="text-[#050708]">Support & Resources</Typography>
        </Link>
        <Link href="/contact-us">
          <Typography size="sm" className="text-[#050708]">Contact Us</Typography>
        </Link>
      </div>
    </div>
  );
}

export default GiftWellSoon;
