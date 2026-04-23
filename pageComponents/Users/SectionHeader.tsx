import { GridItem } from "@/components/ui/Grid";
import Typography from "@/components/ui/typography";

export function SectionHeader({ title }: { title: string }) {
  return (
    <GridItem>
      <Typography size="xl" className="font-bold px-1">
        {title}
      </Typography>
    </GridItem>
  );
}
