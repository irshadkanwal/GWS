import React from "react";
import { Filter, Tag } from "lucide-react";
import { GridItem } from "@/components/ui/Grid";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BLOG_STATUS } from "@/constants/constants";

type BlogFilterControlsProps = {
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  categoryFilter: string;
  setCategoryFilter: (value: string) => void;
  categories: { id: string | number; name: string }[];
};

export const BlogFilterControls = ({
  statusFilter,
  setStatusFilter,
  categoryFilter,
  setCategoryFilter,
  categories,
}: BlogFilterControlsProps) => {
  return (
    <>
      <GridItem className="lg:col-span-2">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full">
            <Filter size={20} className="mr-2" />
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value={BLOG_STATUS.PUBLISHED}>Published</SelectItem>
            <SelectItem value={BLOG_STATUS.DRAFT}>Draft</SelectItem>
          </SelectContent>
        </Select>
      </GridItem>

      <GridItem className="lg:col-span-2">
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full">
            <Tag size={20} className="mr-2" />
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories?.map((category) => (
              <SelectItem key={category.id} value={category.name}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </GridItem>
    </>
  );
};
