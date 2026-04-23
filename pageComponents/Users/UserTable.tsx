import React from "react";
import ConfirmationDialog from "@/components/shared/confirmation-dialog";
import ProfileImage from "@/components/shared/profile-image";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/ui/datatable";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Typography from "@/components/ui/typography";
import { useDialog } from "@/hooks/useDialog";
import type { UserType } from "@/utilities/types/user";
import type { ColumnDef } from "@tanstack/react-table";
import { MoreVertical, Trash2, Undo2 } from "lucide-react";
import useUpdateUserByID from "@/hooks/user/useUpdateUserByID";
import { toast } from "sonner";

type Props = {
  usersData: UserType[];
  rolesMap: Record<number, string>;
  isLoading?: boolean;
};

function UserTable({ usersData, rolesMap, isLoading = false }: Props) {
  const [selectedUser, setSelectedUser] = React.useState<UserType | null>(null);
  const { mutateAsync: updateUser } = useUpdateUserByID();

  const {
    open: isDeleteDialogOpen,
    openDialog: openDeleteDialog,
    closeDialog: closeDeleteDialog,
  } = useDialog(false);

  const handleDeleteUser = async (userID: number, shouldDelete: boolean) => {
    try {
      const userToDelete = usersData.find((user) => user.id === userID);
      if (!userToDelete) {
        return;
      }

      const { password, ...restUser } = userToDelete;
      await updateUser({
        userID,
        userData: { ...restUser, is_deleted: shouldDelete },
      });
      closeDeleteDialog();
      setSelectedUser(null);
      toast.success("User status updated successfully.");
    } catch (error) {
      toast.error(`Failed: ${error}`);
    }
  };

  const columns: ColumnDef<UserType>[] = [
    {
      accessorKey: "userName",
      header: "Name",
      cell: ({ row }) => {
        const user = row.original;
        const userProfileImage = user.profile_image_url;

        return (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 overflow-hidden rounded-full border border-gray-300">
              <ProfileImage
                profileImageURL={userProfileImage || ""}
                userFirstName={user.first_name}
                userLastName={user.last_name}
              />
            </div>

            <div className="flex flex-col">
              <Typography
                size="sm"
                className={
                  user.is_deleted
                    ? "text-gray-400 line-through"
                    : "text-[#828383]"
                }
              >
                {`${user.first_name} ${user.last_name}`}
              </Typography>
              {user.is_deleted && (
                <span className="text-xs text-red-500 font-medium">
                  Deleted
                </span>
              )}
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => (
        <Typography size="sm" className="text-[#828383]">
          {row.original.email}
        </Typography>
      ),
    },
    {
      accessorKey: "role_id",
      header: "Role",
      cell: ({ row }) => {
        const roleName = rolesMap[row.original.role_id];
        return (
          <Typography size="sm" className="text-[#828383]">
            {roleName}
          </Typography>
        );
      },
    },
    {
      accessorKey: "action",
      header: "",
      cell: ({ row }) => {
        const user = row.original;
        const isDeleted = user.is_deleted;
        return (
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="default" className="h-8 w-8 p-0">
                <MoreVertical size={22} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white">
              <DropdownMenuItem
                onClick={() => {
                  setSelectedUser(user);
                  openDeleteDialog();
                }}
                className={`${
                  isDeleted
                    ? "text-green-600 focus:text-green-600"
                    : "text-red-600 focus:text-red-600"
                }`}
              >
                {isDeleted ? (
                  <>
                    <Undo2 className="w-4 h-4 mr-1" />
                    Reactivate
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4 mr-1" />
                    Deactivate
                  </>
                )}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
  return (
    <>
      <DataTable
        columns={columns}
        data={usersData}
        tableHeaderClassname="bg-[#385c80] text-white"
        isLoading={isLoading}
        emptyDataText="No user found"
      />

      <ConfirmationDialog
        open={isDeleteDialogOpen}
        openDialog={openDeleteDialog}
        closeDialog={closeDeleteDialog}
        title={selectedUser?.is_deleted ? "Reactivate User" : "Deactivate User"}
        description={`Are you sure you want to ${
          selectedUser?.is_deleted ? "reactivate" : "deactivate"
        } "${selectedUser?.first_name} ${selectedUser?.last_name}" ?`}
        confirmText={`Yes, ${
          selectedUser?.is_deleted ? "Reactivate" : "Deactivate"
        }`}
        cancelText={`Don't ${
          selectedUser?.is_deleted ? "Reactivate" : "Deactivate"
        }`}
        onConfirm={() =>
          handleDeleteUser?.(selectedUser?.id || 0, !selectedUser?.is_deleted)
        }
      />
    </>
  );
}

export default UserTable;
