"use client";

import * as React from "react";
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ArrowUpDown, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import Typography from "./typography";
import SkeletonTable from "../shared/skeleton-table";

type DataTableProps<T> = {
  data: T[];
  columns: ColumnDef<T>[];
  tableHeading?: string;
  enteriesPerPage?: number;
  isSortingEnabled?: boolean;
  isFiltersEnabled?: boolean;
  isSearchbarEnabled?: boolean;
  isPaginationEnabled?: boolean;
  tableHeaderClassname?: string;
  tableWidth?: string;
  isLoading?: boolean;
  handleRowClick?: (rowData: T) => void;
  className?: string;
  isDragEnabled?: boolean;
  onReorder?: (newData: T[]) => void;
  getRowId?: (row: T) => string;
  emptyDataText?: string;
};

interface SortableRowProps {
  row: any;
  children: React.ReactNode;
  isDragEnabled: boolean;
  handleRowClick?: (rowData: any) => void;
}

function SortableRow({
  row,
  children,
  isDragEnabled,
  handleRowClick,
}: SortableRowProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: row.id,
    disabled: !isDragEnabled,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <TableRow
      ref={setNodeRef}
      style={style}
      data-state={row.getIsSelected() && "selected"}
      className={cn(
        "h-12 text-gray-700 border-b",
        handleRowClick && "cursor-pointer",
        isDragging && "bg-gray-50 shadow-lg z-10",
        isDragEnabled && "hover:bg-gray-50/50"
      )}
      onClick={() => !isDragging && handleRowClick?.(row.original)}
      {...(isDragEnabled ? attributes : {})}
    >
      {children}
    </TableRow>
  );
}

function DataTable<T>({
  data: initialData,
  columns,
  tableHeading = "",
  tableHeaderClassname,
  tableWidth = "w-full",
  enteriesPerPage = 5,
  isSortingEnabled = false,
  isFiltersEnabled = false,
  isSearchbarEnabled = false,
  isPaginationEnabled = false,
  isLoading = false,
  className,
  handleRowClick,
  isDragEnabled = false,
  emptyDataText = "Currently No Data Available",
  onReorder,
  getRowId = (row: any) => row.id || Math.random().toString(),
}: DataTableProps<T>) {
  const [data, setData] = React.useState(initialData);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  React.useEffect(() => {
    setData(initialData);
  }, [initialData]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const table = useReactTable({
    data,
    columns: columns.map((column) => ({
      ...column,
      enableSorting: column.enableSorting ?? isSortingEnabled,
    })),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    ...(isPaginationEnabled && {
      getPaginationRowModel: getPaginationRowModel(),
    }),
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getRowId: (row) => getRowId(row),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = data.findIndex((item) => getRowId(item) === active.id);
      const newIndex = data.findIndex((item) => getRowId(item) === over?.id);

      const newData = arrayMove(data, oldIndex, newIndex);
      setData(newData);
      onReorder?.(newData);
    }
  }

  const shouldRenderTableHeader =
    tableHeading || isSearchbarEnabled || isFiltersEnabled;
  const rows = table.getRowModel().rows;
  const rowIds = rows.map((row) => row.id);

  const TableContent = () => {
    if (isLoading) {
      return (
        <SkeletonTable
          columnCount={columns.length}
          tableHeaderClassname={"bg-gray-100 text-[#A3A3A3] border-b-0"}
        />
      );
    }
    return (
      <div className="relative overflow-hidden min-w-full">
        <Table className={tableWidth}>
          <TableHeader
            className={cn(
              "bg-gray-100 text-[#A3A3A3] border-b-0",
              tableHeaderClassname
            )}
          >
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header, index) => {
                  return (
                    <TableHead
                      key={header.id}
                      className={`${
                        index === 0
                          ? "rounded-tl-sm rounded-bl-sm"
                          : index === headerGroup.headers.length - 1
                          ? "rounded-tr-sm rounded-br-sm"
                          : ""
                      }`}
                    >
                      {header.isPlaceholder ? null : header.column.getCanSort() ? (
                        <Button
                          variant="ghost"
                          onClick={() =>
                            header.column.toggleSorting(
                              header.column.getIsSorted() === "asc"
                            )
                          }
                          disabled={!header.column.getCanSort()}
                          className="h-8 px-2 hover:bg-transparent"
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          <ArrowUpDown size={16} className="ml-2" />
                        </Button>
                      ) : (
                        flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isDragEnabled ? (
              <SortableContext
                items={rowIds}
                strategy={verticalListSortingStrategy}
              >
                {rows?.length ? (
                  rows.map((row) => (
                    <SortableRow
                      key={row.id}
                      row={row}
                      isDragEnabled={isDragEnabled}
                      handleRowClick={handleRowClick}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </SortableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-20 text-center border border-gray-300 rounded-sm text-gray-500"
                    >
                      {emptyDataText}
                    </TableCell>
                  </TableRow>
                )}
              </SortableContext>
            ) : (
              <>
                {rows?.length ? (
                  rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                      className={`h-12 text-gray-700 border-b ${
                        handleRowClick && "cursor-pointer"
                      }`}
                      onClick={() => handleRowClick?.(row.original)}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-20 text-center border border-gray-300 rounded-sm text-gray-500"
                    >
                      {emptyDataText}
                    </TableCell>
                  </TableRow>
                )}
              </>
            )}
          </TableBody>
        </Table>
      </div>
    );
  };

  return (
    <div className={cn("w-full bg-white overflow-hidden", className)}>
      {shouldRenderTableHeader && (
        <div className="flex items-center justify-between p-4">
          {tableHeading && (
            <Typography size="xl">{tableHeading || ""}</Typography>
          )}
          {isSearchbarEnabled && (
            <Input
              placeholder="Search Employee..."
              value={table.getState()?.globalFilter ?? ""}
              onChange={(event) => {
                table.setGlobalFilter(event.target.value);
              }}
              className="max-w-sm h-10"
            />
          )}

          {isFiltersEnabled && (
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  Filter <SlidersHorizontal size={16} className="ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      )}

      {isDragEnabled ? (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <TableContent />
        </DndContext>
      ) : (
        <TableContent />
      )}

      {isPaginationEnabled && (
        <div className="flex items-center justify-between mt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className={`${
              !table.getCanPreviousPage() ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Previous
          </Button>

          <span>
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </span>

          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className={`${
              !table.getCanNextPage() ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}

export default DataTable;
