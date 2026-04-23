import React from "react";
import { Grid, GridItem } from "@/components/ui/Grid";
import Typography from "@/components/ui/typography";
import Image from "next/image";
import CustomSeparator from "@/components/shared/custom-separator";
import BuildRegistryFooter from "../BuildYourRegistry/BuildRegistryFooter";
import { useRouter } from "next/router";
import { useUserStore } from "@/store";
import useUpdateGiftWell from "@/hooks/gift-well/useUpdateGiftWell";
import useGetUserDetailsByID from "@/hooks/user-details/useGetUserDetailsByID";
import { Button } from "@/components/ui/button";
import CopyIcon from "@/components/svg/CopyIcon";
import useGetGiftWellByUserID from "@/hooks/gift-well/useGiftWellByUserID";
import DataTable from "@/components/ui/datatable";
import { ColumnDef } from "@tanstack/react-table";
import type { RegistryItemType } from "@/utilities/types/registryItem";
import EllipsisTypography from "@/pageComponents/common/EllipsisTypography";
import { CircleCheck } from "lucide-react";
import Link from "next/link";
import useGetRegistryItemByRegistryID from "@/hooks/registry-item/useGetRegistryItemsByRegistryID";
import ProfileImage from "@/components/shared/profile-image";
import { toast } from "sonner";
import useGetDonationByUserID from "@/hooks/donation/useGetDonationByUserID";
import DonationCard from "./DonationCard";
import useGetUserByID from "@/hooks/user/useGetUserByID";

const columns: ColumnDef<RegistryItemType>[] = [
  {
    accessorKey: "registry_product.name",
    header: "Product",
    cell: ({ row }) => {
      const registry_product = row.original.registry_product;
      return (
        <div className="flex items-center gap-3 w-64">
          <div className="max-w-10 max-h-10 overflow-hidden rounded-md">
            <Image
              src={registry_product?.image_url ?? ""}
              alt="product image"
              width={200}
              height={200}
              className="object-cover w-full h-full rounded-sm"
            />
          </div>
          <EllipsisTypography
            title={registry_product?.name ?? ""}
            className="text-sm line-clamp-1"
          >
            {registry_product?.name}
          </EllipsisTypography>
        </div>
      );
    },
  },
  {
    accessorKey: "registry_product.price",
    header: "Price",
    cell: ({ row }) => (
      <Typography size="xs" className="text-[#828383]">
        {row.original.registry_product?.price?.toString() || ""}
      </Typography>
    ),
  },
  {
    accessorKey: "registry_product.affiliate_link",
    header: "Address",
    cell: ({ row }) => (
      <div className="flex items-center gap-1">
        <CircleCheck size={24} color="#fff" fill="lightGreen" />
        <Link href={row.original.registry_product?.affiliate_link || ""}>
          <EllipsisTypography className="text-xs text-[#597FA6] max-w-48 line-clamp-1">
            {row.original.registry_product?.affiliate_link ?? ""}
          </EllipsisTypography>
        </Link>
      </div>
    ),
  },
];

function PreviewAndPublish() {
  const router = useRouter();
  const user = useUserStore(React.useCallback((state) => state, []));
  const { data: personalInfo } = useGetUserByID(user.id || 0);

  const { mutateAsync: updateGiftWell } = useUpdateGiftWell();
  const { data: userDetails } = useGetUserDetailsByID(user.id!);
  const { data: giftWell } = useGetGiftWellByUserID(user.id || 0);
  const { data: registryItems } = useGetRegistryItemByRegistryID(
    user.giftWellID!
  );
  const { data: allDonations } = useGetDonationByUserID(user.id || 0);

  const handleBackClick = () => {
    router.push("/dashboard/build-your-care-registry");
  };

  const handlePublishRegistry = async () => {
    const giftwell = {
      id: user.giftWellID!,
      user_id: user.id!,
      privacy: "public" as const,
    };

    await updateGiftWell({ giftwell, id: user.giftWellID });
    handleNextClick();
  };

  const handleNextClick = () => {
    router.push("/dashboard");
  };

  const addressParts = [
    userDetails?.street_address,
    userDetails?.address_line,
    userDetails?.city,
    userDetails?.state,
    userDetails?.zip_code,
  ];

  const userAddress = addressParts.filter(Boolean).join(", ");

  const recipientName = `${personalInfo?.first_name} ${personalInfo?.last_name}`;

  const isRegistryPublic = giftWell?.privacy === "public";

  const isSaveButtonDisabled =
    !userAddress || !recipientName || !userDetails?.journey || isRegistryPublic;

  const handleCopyUrl = async () => {
    try {
      if (window.isSecureContext && navigator.clipboard) {
        await navigator.clipboard.writeText(userAddress);
        toast.info("Address copied to Clipboard.");
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = userAddress;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "absolute";
        textarea.style.left = "-9999px";
        document.body.appendChild(textarea);
        textarea.select();
        const successful = document.execCommand("copy");
        document.body.removeChild(textarea);
        if (successful) {
          toast.info("Address copied to Clipboard.");
        } else {
          throw new Error("Fallback copy command failed");
        }
      }
    } catch (err) {
      toast.error("Failed to copy address.");
    }
  };

  const orderedRegistryItems = React.useMemo(() => {
    return registryItems
      ?.filter((item) => item.status === "listed")
      ?.sort((a, b) => a.order_index! - b.order_index!);
  }, [registryItems]);

  const expandedRegistryItems = React.useMemo(() => {
    return (
      orderedRegistryItems?.flatMap((item) =>
        Array.from({ length: item.quantity || 1 }, () => item)
      ) || []
    );
  }, [orderedRegistryItems]);

  return (
    <div className="bg-white mx-1 md:mx-6 md:p-6 rounded-sm w-[calc(100vw-6)] shadow-md md:shadow-none">
      <div className="bg-[#F3F3F3] md:p-6 rounded-sm">
        <Grid className="bg-white rounded-sm p-2 md:p-5">
          <GridItem>
            <div className=" flex items-center gap-4">
              <div className="w-14 h-14 rounded-full overflow-hidden ">
                <ProfileImage
                  profileImageURL={user?.profile_image_url || ""}
                  userFirstName={user?.first_name}
                  userLastName={user?.last_name}
                />
              </div>
              <span>
                <Typography size="xl" className="font-bold text-[#0A0D14]">
                  {`${personalInfo?.first_name} ${personalInfo?.last_name}`}
                </Typography>
                <Typography
                  variant="caption"
                  size="xs"
                  className="text-[#525866]"
                >
                  {personalInfo?.email || ""}
                </Typography>
              </span>
            </div>
          </GridItem>

          <GridItem>
            <Typography size="sm" className=" text-[#262626]">
              {`${user.first_name}'s wishlist`}
            </Typography>
            <Typography
              size="xs"
              className=" text-[#525866] whitespace-pre-line"
            >
              {userDetails?.journey || ""}
            </Typography>
          </GridItem>

          <GridItem>
            <Typography size="md" className=" text-[#262626]">
              Delivery Address
            </Typography>

            <div className="flex items-center gap-3">
              <Typography size="xs" className=" text-[#696A6B]">
                {userAddress || "Address not added"}
              </Typography>
              <Button
                variant="destructive"
                onClick={handleCopyUrl}
                className="p-0"
              >
                <CopyIcon width={20} height={20} color="#A3A3A3" />
              </Button>
            </div>
          </GridItem>

          <GridItem>
            <DataTable
              columns={columns}
              data={expandedRegistryItems || []}
              isSortingEnabled={false}
              isPaginationEnabled={false}
            />
          </GridItem>

          <CustomSeparator className="my-0" />

          <GridItem className="py-0">
            <Typography size="md" className=" text-[#262626]">
              Donations
            </Typography>
          </GridItem>
          {allDonations?.map((donation) => (
            <DonationCard
              key={donation.id}
              donation={donation}
              containerStyle="py-0"
            />
          ))}
        </Grid>
      </div>

      <CustomSeparator />

      <BuildRegistryFooter
        handleBackClick={handleBackClick}
        handleNextClick={
          isRegistryPublic ? handleNextClick : handlePublishRegistry
        }
        onSaveClick={handlePublishRegistry}
        saveButtonText={
          !isRegistryPublic ? "Publish Your Registry" : "Published"
        }
        disableSaveButton={isSaveButtonDisabled}
      />
    </div>
  );
}

export default PreviewAndPublish;
