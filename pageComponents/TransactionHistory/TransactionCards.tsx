import React from "react";
import Typography from "@/components/ui/typography";
import Link from "next/link";
import EllipsisTypography from "../common/EllipsisTypography";

type DonationProps = {
  type: "donation";
  title: string;
  donorName?: string;
  amount: string;
  date: string;
  status: string;
  transactionId: string;
  platformFee: string;
  netAmount: string;
};

type PurchaseProps = {
  type: "purchase";
  productName: string;
  date: string;
  productLink?: string;
};

type TransactionCardProps = DonationProps | PurchaseProps;

export const TransactionCard: React.FC<TransactionCardProps> = (props) => {
  return (
    <div className="border-t border-b p-4">
      {/* Top row: Title + Date */}
      <div className="flex justify-between items-center mb-3">
        <Typography className="text-[#0A0D14]">
          {props.type === "donation" ? props.title : props.productName}
        </Typography>
        <Typography className="text-[#0A0D14]">{props.date}</Typography>
      </div>

      {props.type === "donation" ? (
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <Typography className="text-[#0A0D14]">
              Net amount received
            </Typography>
            <Typography className="text-[#0A0D14]">
              {props.netAmount}
            </Typography>
          </div>

          <div className="flex justify-between items-center">
            <Typography size="xs" className="text-gray-400">
              Platform fee deducted
            </Typography>
            <Typography size="xs" className="text-gray-400">
              {props.platformFee}
            </Typography>
          </div>

          <div className="flex justify-between items-center">
            <Typography size="xs" className="text-gray-400">
              Stripe transaction status
            </Typography>
            <Typography size="xs" className="text-gray-400">
              {props.status}
            </Typography>
          </div>
        </div>
      ) : (
        <>
          {props.productLink && (
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-1">
                <Link href={props.productLink || ""}>
                  <EllipsisTypography className="text-xs text-[#597FA6] max-w-48 line-clamp-2">
                    {props.productLink ?? ""}
                  </EllipsisTypography>
                </Link>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
