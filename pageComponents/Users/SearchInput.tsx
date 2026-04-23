import { GridItem } from "@/components/ui/Grid";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

type Props = {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
};

export function SearchInput({
  value,
  onChange,
  placeholder = "Search...",
  className,
}: Props) {
  return (
    <GridItem className={cn("relative w-full lg:col-span-8 px-0", className)}>
      <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4 z-40" />
      <Input
        placeholder={placeholder}
        className="pl-10"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </GridItem>
  );
}
