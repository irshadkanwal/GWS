import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

type SummaryCardsSkeletonProps = {
  cardCount?: number;
};

function SummaryCardsSkeleton({ cardCount = 3 }: SummaryCardsSkeletonProps) {
  return (
    <>
      {[...Array(cardCount)].map((_, index) => (
        <Skeleton
          key={index}
          className="col-span-12 sm:col-span-4 min-h-[86px]"
        />
      ))}
      <Skeleton className="col-span-12 sm:col-span-8 min-h-10" />
      <Skeleton className="col-span-12 sm:col-span-2 min-h-10" />
      <Skeleton className="col-span-12 sm:col-span-2 min-h-10" />
    </>
  );
}

export default SummaryCardsSkeleton;
