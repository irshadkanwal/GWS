import React from "react";
import ConfirmationDialog from "@/components/shared/confirmation-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Typography from "@/components/ui/typography";
import useDeleteDonation from "@/hooks/donation/useDeleteDonation";
import { useDialog } from "@/hooks/useDialog";
import EllipsisTypography from "@/pageComponents/common/EllipsisTypography";
import type { DonationType } from "@/utilities/types/donation";
import { DollarSign, Pencil, Trash2 } from "lucide-react";

type Props = {
  donation: DonationType;
  onEdit?: (donation: DonationType) => void;
  selectedDonation?: DonationType | null;
  setSelectedDonation?: React.Dispatch<
    React.SetStateAction<DonationType | null>
  >;
  isActionDisabled?: boolean;
};

function DonationDetailsCard({
  donation,
  onEdit,
  selectedDonation,
  setSelectedDonation,
  isActionDisabled = false,
}: Props) {
  const [isHovered, setIsHovered] = React.useState(false);
  const {
    open: isConfirmationDialogOpen,
    openDialog: openConfirmationDialog,
    closeDialog: closeConfirmationDialog,
  } = useDialog(false);
  const { mutateAsync: deleteDonation } = useDeleteDonation();

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-500";
      case "pending":
        return "bg-yellow-500";
      case "failed":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const handleDeleteDonation = async (donationID: number) => {
    await deleteDonation(donationID);
    if (selectedDonation?.id === donationID) {
      setSelectedDonation?.(null);
    }
  };

  return (
    <Card
      className="w-full p-0 overflow-hidden cursor-pointer shadow-none hover:shadow-sm relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        closeConfirmationDialog();
      }}
    >
      <CardContent className="p-3 h-full flex items-center justify-between">
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          <div className="flex items-center justify-center w-10 h-10 bg-[#d8e9fa] rounded-full flex-shrink-0">
            <DollarSign size={18} className="text-[#385c80]" />
          </div>
          <div className="flex-1 min-w-0">
            <Typography size="lg" className="font-semibold text-[#385c80]">
              {`$${donation.amount}`}
            </Typography>
            <EllipsisTypography className="text-sm truncate">
              {donation.title}
            </EllipsisTypography>
            <Typography size="xs">
              {`via ${donation.donation_method}`}
            </Typography>
          </div>
        </div>
        <div className="flex flex-col items-end space-y-1 flex-shrink-0">
          <div
            className={`w-3 h-3 rounded-full ${getStatusColor(
              donation.status
            )}`}
          />
        </div>
      </CardContent>
      {isHovered && (
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center space-x-4 transition-all duration-200">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              onEdit?.(donation);
            }}
            type="button"
            className="rounded-full w-10 h-10 p-0 bg-gray-50 hover:bg-[#597FA6] text-[#597FA6] hover:text-white"
            title="Edit donation"
            disabled={isActionDisabled}
          >
            <Pencil size={20} />
          </Button>

          <ConfirmationDialog
            dialogTrigger={
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  openConfirmationDialog();
                }}
                className="rounded-full w-10 h-10 p-0 bg-red-50 hover:bg-red-600 text-red-600 hover:text-white flex items-center justify-center"
                title="Delete donation"
                disabled={isActionDisabled}
              >
                <Trash2 size={20} />
              </Button>
            }
            open={isConfirmationDialogOpen}
            openDialog={openConfirmationDialog}
            closeDialog={() => {
              closeConfirmationDialog();
              setIsHovered(false);
            }}
            title="Delete Donation?"
            description={`Are you sure you want to delete ''${donation.title}'' donation?`}
            confirmText="Yes, Delete"
            cancelText="Don't Delete"
            onConfirm={() => handleDeleteDonation?.(donation.id)}
          />
        </div>
      )}
    </Card>
  );
}

export default DonationDetailsCard;
