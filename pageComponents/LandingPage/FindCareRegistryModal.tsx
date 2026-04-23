import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Typography from "@/components/ui/typography";
import useGetAllGiftWells from "@/hooks/gift-well/useGetAllGiftwells";
import { ArrowRight, Search } from "lucide-react";
import DataTable from "@/components/ui/datatable";
import type { ColumnDef } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import ProfileImage from "@/components/shared/profile-image";
import { useFindCareRegistryModal } from "@/context/FindCareRegistryModalContext";

type Props = { open: boolean; closeDialog: () => void };

type PublicGiftwellsType = {
  userName: string;
  userProfileImage: string;
  registryProducts: number;
  userRegistryURL: string;
};

function FindCareRegistryModal({ open, closeDialog }: Props) {
  const { data: allGiftWells, isLoading } = useGetAllGiftWells(open);
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const router = useRouter();
  const { closeModal } = useFindCareRegistryModal();

  const giftwellInfo: PublicGiftwellsType[] = React.useMemo(
    () =>
      allGiftWells?.map((giftwell) => ({
        userName: `${giftwell?.user?.first_name} ${giftwell?.user?.last_name}`,
        userProfileImage: giftwell?.user?.profile_image_url || "",
        registryProducts: giftwell.registryItems.length,
        userRegistryURL: giftwell.user.public_url,
      })) || [],
    [allGiftWells]
  );

  const filteredGiftwells = React.useMemo(() => {
    return giftwellInfo.filter((item) => {
      if (!searchQuery.trim()) {
        return item;
      }
      return item.userName
        .toLowerCase()
        .includes(searchQuery.trim().toLowerCase());
    });
  }, [giftwellInfo, searchQuery]);

  const columns: ColumnDef<PublicGiftwellsType>[] = [
    {
      accessorKey: "userName",
      header: "Name",
      cell: ({ row }) => {
        const userProfileImage = row.original.userProfileImage;
        return (
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 overflow-hidden rounded-full border border-gray-300">
              <ProfileImage
                profileImageURL={userProfileImage}
                userFirstName={row.original.userName.split(" ")[0]}
                userLastName={row.original.userName.split(" ")[1]}
              />
            </div>

            <Typography size="md" className="text-[#828383]">
              {row.original.userName}
            </Typography>
          </div>
        );
      },
    },
    {
      accessorKey: "registryProducts",
      header: "Products In Registry",
      cell: ({ row }) => (
        <Typography size="md" className="text-[#828383]">
          {row.original.registryProducts}
        </Typography>
      ),
    },
    {
      accessorKey: "action",
      header: "See Registry",
      cell: ({ row }) => (
        <Button
          onClick={() => {
            closeModal();
            router.push(`/registry/${row.original.userRegistryURL}`);
          }}
          variant={"ghost"}
          className="p-0"
          title="See Registry"
        >
          <ArrowRight color="#60a5fa" size={20} />
        </Button>
      ),
    },
  ];

  return (
    <Dialog open={open} onOpenChange={closeDialog}>
      <DialogContent className="w-11/12 mx-auto md:max-w-[600px] lg:min-w-[900px] bg-primary border-none max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Find a care registry</DialogTitle>
          <DialogDescription>
            Search by name of registry owner
          </DialogDescription>
        </DialogHeader>

        <div className="relative flex items-center justify-center gap-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4 z-40" />
          <Input
            placeholder="Search registry ..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <DataTable
          data={filteredGiftwells}
          columns={columns}
          className="rounded-md"
          tableHeaderClassname="bg-[#9eb7d1] text-white rounded-br-none rounded-bl-none text-xs md:text-sm"
          isLoading={isLoading}
          emptyDataText="No public registry found."
        />
      </DialogContent>
    </Dialog>
  );
}

export default FindCareRegistryModal;
