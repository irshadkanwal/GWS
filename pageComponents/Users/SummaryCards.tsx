import { GridItem } from "@/components/ui/Grid";
import Typography from "@/components/ui/typography";
import { cn } from "@/lib/utils";

type SummaryCardProps = {
  label: string;
  count: number;
  colorClass?: string;
  className?: string;
};

export function SummaryCard({
  label,
  count,
  colorClass = "",
  className,
}: SummaryCardProps) {
  return (
    <GridItem
      className={cn("bg-card rounded-md border p-4 sm:col-span-4", className)}
    >
      <Typography size="2xl" className={cn("font-bold", colorClass)}>
        {count}
      </Typography>
      <Typography size="sm">{label}</Typography>
    </GridItem>
  );
}
