"use client";

import React from "react";
import { Check, Pencil, X } from "lucide-react";
import Typography from "@/components/ui/typography";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface EditableTextProps {
  title: string;
  description: string;
  onSave?: (description: string) => void;
  maxCharacterLength?: number;
  className?: string;
  disableEditing?: boolean;
}

export default function EditableText({
  title,
  description,
  onSave,
  maxCharacterLength = 500,
  className,
  disableEditing = false,
}: EditableTextProps) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [editedDescription, setEditedDescription] = React.useState(description);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setEditedDescription(description);
    setIsEditing(false);
  };

  const handleSave = () => {
    if (onSave) {
      onSave(editedDescription);
    }
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Typography size="md" className=" text-[#262626]">
            {title}
          </Typography>
        </div>

        <Textarea
          value={editedDescription}
          onChange={(e) => setEditedDescription(e.target.value)}
          className={cn(" text-sm min-h-32", className)}
          placeholder="Description"
          showAttachmentButton={false}
          maxLength={maxCharacterLength}
          showCharacterCount={true}
        />

        <div className="flex justify-end gap-2">
          <Button variant="ghost" size="sm" onClick={handleCancel}>
            <X size={20} className="mr-1" color="red" /> Cancel
          </Button>
          <Button size="sm" variant="ghost" onClick={handleSave}>
            <Check size={20} className="mr-1" color="green" /> Save
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <span className="flex items-center gap-1">
        <Typography size="md" className=" text-[#262626]">
          {title}
        </Typography>
        {!disableEditing && (
          <Button variant="destructive" onClick={handleEdit}>
            <Pencil size={16} color="#597FA6" />
          </Button>
        )}
      </span>

      <Typography size="sm" className="text-[#A3A3A3] whitespace-pre-line">
        {editedDescription}
      </Typography>
    </>
  );
}
