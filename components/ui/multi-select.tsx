import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

const items = ["Apple", "Banana", "Cherry"];

export function MultiSelect() {
  const [selected, setSelected] = React.useState<string[]>([]);

  const toggleItem = (item: string) => {
    setSelected((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          {selected.length ? selected.join(", ") : "Select fruits"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-0">
        <Command>
          <CommandGroup>
            {items.map((item) => (
              <CommandItem key={item} onSelect={() => toggleItem(item)}>
                <Checkbox
                  checked={selected.includes(item)}
                  onCheckedChange={() => toggleItem(item)}
                  className="mr-2"
                />
                {item}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
