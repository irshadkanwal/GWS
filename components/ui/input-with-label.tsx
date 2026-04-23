import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type InputWithLabelProps = {
  label: string;
  placeholder: string;
  type?: string;
  id: string;
  className?: string;
};

export function InputWithLabel({
  label,
  placeholder,
  type = "text",
  id,
  className,
}: InputWithLabelProps) {
  return (
    <div className={cn("grid w-full items-center gap-3", className)}>
      <Label htmlFor={id}>{label}</Label>
      <Input type={type} id={id} placeholder={placeholder} />
    </div>
  );
}
