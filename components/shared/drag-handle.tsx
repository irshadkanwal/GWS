"use client";

import { useSortable } from "@dnd-kit/sortable";
import { Button } from "@/components/ui/button";
import ReOrderIcon from "../svg/ReOrderIcon";

interface DragHandleProps {
  id: string;
}

export function DragHandle({ id }: DragHandleProps) {
  const { attributes, listeners, setNodeRef } = useSortable({ id });

  return (
    <Button
      ref={setNodeRef}
      variant="ghost"
      size="sm"
      className="h-8 w-8 p-0 cursor-grab active:cursor-grabbing hover:bg-[#EFF7FF]"
      {...attributes}
      {...listeners}
    >
      <ReOrderIcon />
    </Button>
  );
}
