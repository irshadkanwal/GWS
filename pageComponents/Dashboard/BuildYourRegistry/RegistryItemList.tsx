import React from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import ConfirmationDialog from "@/components/shared/confirmation-dialog";
import CheckMarkIcon from "@/components/svg/CheckMarkIcon";
import { Checkbox } from "@/components/ui/checkbox";
import Typography from "@/components/ui/typography";
import EllipsisTypography from "@/pageComponents/common/EllipsisTypography";
import type { RegistryItemType } from "@/utilities/types/registryItem";
import { useDialog } from "@/hooks/useDialog";
import Image from "next/image";
import Link from "next/link";
import ReOrderIcon from "@/components/svg/ReOrderIcon";

type Props = {
  registryItem: RegistryItemType[];
  handleUpdateItem?: (item: RegistryItemType) => void;
  handleReorder?: (newData: RegistryItemType[]) => void;
  actions?: (item: RegistryItemType) => React.ReactNode;
  renderCheckbox?: boolean;
};

function SortableItem({
  item,
  handleUpdateItem,
  showDragHandle,
  actions,
  renderCheckbox,
}: {
  item: RegistryItemType;
  handleUpdateItem?: (item: RegistryItemType) => void;
  showDragHandle?: boolean;
  actions?: (item: RegistryItemType) => React.ReactNode;
  renderCheckbox?: boolean;
}) {
  const { open, openDialog, closeDialog } = useDialog(false);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const product = item.registry_product;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="w-full flex items-center justify-between border-b py-2"
    >
      <div className="flex items-center gap-4 w-2/5">
        {renderCheckbox && (
          <ConfirmationDialog
            dialogTrigger={
              <Checkbox
                onClick={(e) => {
                  e.preventDefault();
                  openDialog();
                }}
              />
            }
            open={open}
            openDialog={openDialog}
            closeDialog={closeDialog}
            title="Mark as Purchased?"
            description="This will update item status to purchased."
            confirmText="Yes, Update"
            cancelText="Don't Update"
            onConfirm={() => handleUpdateItem?.(item)}
          />
        )}
        <Image
          src={product?.image_url || ""}
          alt={product?.name || ""}
          width={25}
          height={25}
          className="rounded-sm"
        />
        <EllipsisTypography className="text-sm text-[#050708] line-clamp-1">
          {product?.name}
        </EllipsisTypography>
      </div>

      <div className="w-1/12">
        <Typography size="md">{`$${product?.price}`}</Typography>
      </div>

      <div className="w-1/5">
        <Link
          href={product?.affiliate_link || ""}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1"
        >
          <CheckMarkIcon variant="filled" width={14} height={14} />
          <EllipsisTypography className="text-[10px] text-[#597FA6] line-clamp-1">
            {product?.affiliate_link || ""}
          </EllipsisTypography>
        </Link>
      </div>

      <div className="flex items-center gap-2 cursor-grab">
        {actions?.(item)}
        {showDragHandle && (
          <div {...listeners}>
            <ReOrderIcon />
          </div>
        )}
      </div>
    </div>
  );
}

function RegistryItemList({
  registryItem,
  handleUpdateItem,
  handleReorder = undefined,
  actions,
  renderCheckbox = false,
}: Props) {
  const [items, setItems] = React.useState<RegistryItemType[]>(registryItem);

  React.useEffect(() => {
    setItems(registryItem);
  }, [registryItem]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = items.findIndex((i) => i.id === active.id);
      const newIndex = items.findIndex((i) => i.id === over.id);
      const reordered = arrayMove(items, oldIndex, newIndex);
      setItems(reordered);
      handleReorder?.(reordered);
    }
  };

  if (!registryItem || registryItem.length === 0) {
    return (
      <Typography size="sm" className="text-gray-500">
        No items Added from this category
      </Typography>
    );
  }

  const content = (
    <SortableContext
      items={items.map((i) => i.id)}
      strategy={verticalListSortingStrategy}
    >
      {items.map((item, idx) => (
        <SortableItem
          key={`${item.id}-${idx}`}
          item={item}
          handleUpdateItem={handleUpdateItem}
          showDragHandle={!!handleReorder}
          actions={actions}
          renderCheckbox={renderCheckbox}
        />
      ))}
    </SortableContext>
  );

  return (
    <div className="min-w-[700px] px-3">
      {handleReorder ? (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          {content}
        </DndContext>
      ) : (
        registryItem.map((item, idx) => (
          <SortableItem
            key={`${item.id}-${idx}`}
            item={item}
            handleUpdateItem={handleUpdateItem}
            showDragHandle={false}
            actions={actions}
            renderCheckbox={renderCheckbox}
          />
        ))
      )}
    </div>
  );
}

export default RegistryItemList;
