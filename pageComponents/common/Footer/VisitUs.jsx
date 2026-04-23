import Typography from "@/components/ui/typography";
import { ADDRESS_INFORMATION } from "@/constants/addressInformation";
function VisitUs() {
  return (
    <div className="space-y-3">
        <Typography size="lg" className="text-[#050708]">Visit us</Typography>
     <div className="flex flex-col gap-3">
        <Typography size="sm" className="text-[#050708]">{ADDRESS_INFORMATION.OFFICE}</Typography>
        <Typography size="sm" className="text-[#050708]">{ADDRESS_INFORMATION.STREET}</Typography>
        <Typography size="sm" className="text-[#050708]">Springfield, NY 10001</Typography>
        <Typography size="sm" className="text-[#050708]">United States</Typography>
      </div>
    </div>
  );
}

export default VisitUs;
