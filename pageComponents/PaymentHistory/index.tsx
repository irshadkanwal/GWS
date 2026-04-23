"use client";

import React from "react";
import { Grid, GridItem } from "@/components/ui/Grid";
import { SectionHeader } from "../Users/SectionHeader";
import { SummaryCard } from "../Users/SummaryCards";
import useGetAllPayments from "@/hooks/payment-detail/useGetAllPaymentDetails";
import SummaryCardsSkeleton from "../Users/SummaryCardsSkeleton";
import DataTable from "@/components/ui/datatable";
import { ColumnDef } from "@tanstack/react-table";
import type { AdminPaymentDetailType } from "@/utilities/types/payment-detail";
import Typography from "@/components/ui/typography";
import CheckMarkIcon from "@/components/svg/CheckMarkIcon";
import { CircleX, ClockAlert } from "lucide-react";
import { getFormattedDate } from "@/utilities/helpers/dateTime";

type Props = {};

interface PaymentDetailTypeWithSerialNo extends AdminPaymentDetailType {
  serial_no: number;
}

function PaymentHistoryPage({}: Props) {
  const { data: allPayments, isLoading } = useGetAllPayments();

  const successFullPayments = allPayments?.filter(
    (payment) => payment.status === "succeeded"
  );

  const pendingPayments = allPayments?.filter(
    (payment) => payment.status === "pending"
  );

  const failedPayments = allPayments?.filter(
    (payment) => payment.status === "failed"
  );

  const filteredPayments = allPayments?.map((payment, index) => {
    return {
      serial_no: index + 1,
      ...payment,
    };
  });

  const columns: ColumnDef<PaymentDetailTypeWithSerialNo>[] = [
    {
      accessorKey: "serial_no",
      header: "S.No",
      cell: ({ row }) => (
        <Typography size="sm" className="text-[#828383]">
          {row.original.serial_no || ""}
        </Typography>
      ),
    },
    {
      accessorKey: "cardholder_name",
      header: "Donor Name",
      cell: ({ row }) => (
        <Typography size="sm" className="text-[#828383] capitalize">
          {row.original.cardholder_name || "Anonymous"}
        </Typography>
      ),
    },
    {
      accessorKey: "",
      id: "recipient_name",
      header: "Recipient Name",
      cell: ({ row }) => {
        const recipient = row.original.recipient?.name;
        return (
          <Typography size="sm" className="text-[#828383] capitalize">
            {recipient || ""}
          </Typography>
        );
      },
    },
    {
      accessorKey: "recipient_account",
      header: "Recipient Stripe Account",
      cell: ({ row }) => (
        <Typography size="sm" className="text-[#828383]">
          {row.original.recipient_account || ""}
        </Typography>
      ),
    },
    {
      accessorKey: "amount",
      header: "Donation Amount",
      cell: ({ row }) => (
        <Typography size="sm" className="text-[#828383]">
          {`$${row.original.amount || ""}`}
        </Typography>
      ),
    },
    {
      accessorKey: "platform_fee",
      header: "Platform Fee",
      cell: ({ row }) => (
        <Typography size="sm" className="text-[#828383]">
          {`$${row.original.platform_fee || ""}`}
        </Typography>
      ),
    },
    {
      accessorKey: "stripe_fee",
      header: "Stripe Fee",
      cell: ({ row }) => (
        <Typography size="sm" className="text-[#828383]">
          {`$${row.original.stripe_fee || ""}`}
        </Typography>
      ),
    },
    {
      accessorKey: "recipient_received",
      header: "Net Amount",
      cell: ({ row }) => (
        <Typography size="sm" className="text-[#828383]">
          {`$${row.original.recipient_received || ""}`}
        </Typography>
      ),
    },
    {
      accessorKey: "payment_method",
      header: "Payment Method",
      cell: ({ row }) => (
        <Typography size="sm" className="capitalize">
          {row.original.payment_method || "- -"}
        </Typography>
      ),
    },
    {
      accessorKey: "created_at",
      header: "Transaction Date",
      cell: ({ row }) => (
        <Typography size="sm" className="text-[#828383]">
          {getFormattedDate(row.original.created_at || "")}
        </Typography>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status;
        return (
          <div className="flex items-center gap-2">
            {status === "succeeded" ? (
              <CheckMarkIcon variant="filled" width={20} height={20} />
            ) : status === "pending" ? (
              <ClockAlert size={18} color="orange" />
            ) : (
              <CircleX size={20} color="white" fill="red" />
            )}
            <Typography size="sm" className="text-[#828383] capitalize">
              {status || ""}
            </Typography>
          </div>
        );
      },
    },
  ];

  return (
    <Grid className="bg-white lg:m-6 mx-4 my-2 p-6 rounded-sm w-[calc(100vw-6)]">
      <SectionHeader title="All Payment's Information" />
      {isLoading ? (
        <SummaryCardsSkeleton />
      ) : (
        <>
          <SummaryCard
            label="Total Payments"
            count={allPayments?.length || 0}
            className="sm:col-span-3"
          />
          <SummaryCard
            label="Successful Payments"
            count={successFullPayments?.length || 0}
            colorClass="text-green-600"
            className="sm:col-span-3"
          />
          <SummaryCard
            label="Pending Payments"
            count={pendingPayments?.length || 0}
            colorClass="text-yellow-600"
            className="sm:col-span-3"
          />
          <SummaryCard
            label="Failed Payments"
            count={failedPayments?.length || 0}
            colorClass="text-red-600"
            className="sm:col-span-3"
          />
        </>
      )}
      <GridItem>
        <DataTable
          columns={columns}
          data={filteredPayments || []}
          isLoading={isLoading}
          tableHeaderClassname="bg-[#385c80] text-white"
          emptyDataText="No payments found"
          // tableWidth="w-[1600px]"
        />
      </GridItem>
    </Grid>
  );
}

export default PaymentHistoryPage;
