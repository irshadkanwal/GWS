import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type DynamicSkeletonTableProps = {
  columnCount: number;
  rowCount?: number;
  tableHeaderClassname?: string;
};

function SkeletonTable({
  columnCount,
  rowCount = 3,
  tableHeaderClassname,
}: DynamicSkeletonTableProps) {
  return (
    <div className="rounded-md w-full">
      <Table>
        <TableHeader className={tableHeaderClassname}>
          <TableRow>
            {Array.from({ length: columnCount }).map((_, idx) => (
              <TableHead key={idx}>
                <Skeleton className="h-5 w-28" />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: rowCount }).map((_, rowIndex) => (
            <TableRow key={rowIndex}>
              {Array.from({ length: columnCount }).map((_, colIndex) => (
                <TableCell key={colIndex}>
                  <Skeleton className="h-4 w-28" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default SkeletonTable;
