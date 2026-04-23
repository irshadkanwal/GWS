"use client";

import type {
  RegistryItemsStatusType,
  RegistryItemType,
} from "@/utilities/types/registryItem";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { Pencil } from "lucide-react";
import useUpdateRegistryItems from "@/hooks/registry-item/useUpdateRegistryItems";

function EditStatusDropdown({ item }: { item: RegistryItemType }) {
  const { mutateAsync: updateRegistryItem } = useUpdateRegistryItems();

  const handleUpdateStatus = async (status: RegistryItemsStatusType) => {
    const capitalize = (str: string) =>
      str.charAt(0).toUpperCase() + str.slice(1);

    try {
      await updateRegistryItem({
        id: item.id,
        registryItem: { ...item, status },
      });
      toast.success(`Item marked as ${capitalize(status)}.`);
    } catch {
      toast.error("Failed to update item status.");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="sm"
          variant="ghost"
          className="h-8 w-8 p-0 cursor-grab active:cursor-grabbing hover:bg-[#EFF7FF]"
        >
          <Pencil size={16} color="#597FA6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="left" className="bg-white">
        <DropdownMenuItem
          onClick={() => handleUpdateStatus("listed")}
          className="px-5 py-3 cursor-pointer"
          disabled={item.status === "listed"}
        >
          Re-List Item
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default EditStatusDropdown;
