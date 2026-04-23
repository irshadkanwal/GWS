import React from "react";
import { MobileViewSidebar } from "@/components/sidebar/MobileViewSidebar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Grid, GridItem } from "@/components/ui/Grid";
import { useWindowSize } from "@/hooks/useWindowSize";
import {
  Bell,
  BookPlus,
  LogOut,
  Receipt,
  Settings,
  SquareUserRound,
  UserRound,
} from "lucide-react";
import { signOut } from "next-auth/react";
import ProfileImage from "@/components/shared/profile-image";
import { useUserStore } from "@/store";
import useGetUserByID from "@/hooks/user/useGetUserByID";
import useGetRoleById from "@/hooks/role/useGetRoleByID";
import { useDialog } from "@/hooks/useDialog";
import { useRouter } from "next/router";
import PrivacySettingsFormModal from "./PrivacySettingsFormModal";
import PersonalInfoFormModal from "./PersonalInfoFormModal";
import { USER_ROLES } from "@/constants/constants";
import { ROUTES } from "@/constants/routes";

function DashboardHeader({
  HeaderTitleComponent,
}: {
  HeaderTitleComponent?: React.ReactNode;
}) {
  const storedUser = useUserStore(React.useCallback((state) => state, []));
  const { data: userRole } = useGetRoleById(storedUser?.role_id || 0);
  const isRecipient = userRole?.name === USER_ROLES.RECIPIENT;

  const isAdministrator = userRole?.name === USER_ROLES.ADMINISTRATOR;

  const userID = storedUser.id!;
  const { data: user } = useGetUserByID(userID);
  const { width } = useWindowSize();
  const isMobile = width <= 1024;
  const router = useRouter();

  const {
    open: isPrivacySettingDialogOpen,
    openDialog: openPrivacySettingsDialog,
    closeDialog: closePrivacySettingsDialog,
  } = useDialog(false);

  const {
    open: isPersonalInfoDialogOpen,
    openDialog: openPersonalInfoDialog,
    closeDialog: closePersonalInfoDialog,
  } = useDialog(false);
  return (
    <>
      <Grid className="min-h-24 px-6">
        <GridItem
          size={isMobile ? 12 : 6}
          className={`flex items-center ${isMobile ? "order-2" : "order-1"}`}
        >
          {HeaderTitleComponent}
        </GridItem>
        {isMobile && (
          <GridItem size={6} className="flex items-center">
            <MobileViewSidebar />
          </GridItem>
        )}
        <GridItem
          size={6}
          className={`flex items-center justify-end ${
            isMobile ? "order-1" : "order-2"
          }`}
        >
          <div className="flex items-center space-x-4 gap-2">
            {/* Notification Icon */}
            <Bell className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 cursor-pointer" />
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button className="rounded-full w-12 h-12 hover:bg-[#EFF7FF] border p-0 overflow-hidden">
                  <ProfileImage
                    profileImageURL={user?.profile_image_url || ""}
                    userFirstName={user?.first_name}
                    userLastName={user?.last_name}
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-56 bg-white -translate-x-9 "
                sideOffset={8}
              >
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    disabled
                  >{`${user?.first_name} ${user?.last_name}`}</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={openPersonalInfoDialog}>
                    <UserRound /> Personal info
                  </DropdownMenuItem>
                  {!isAdministrator && (
                    <>
                      <DropdownMenuItem
                        onClick={() =>
                          router.push(ROUTES.USER_PERSONAL_STORY.pathName)
                        }
                      >
                        <SquareUserRound /> Personal Story
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          router.push("/dashboard/build-your-care-registry")
                        }
                      >
                        <BookPlus /> Add / Edit Registry
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={openPrivacySettingsDialog}>
                        <Settings /> Privacy Settings
                      </DropdownMenuItem>
                      {isRecipient && (
                        <DropdownMenuItem
                          onClick={() => router.push("/transaction-history")}
                        >
                          <Receipt /> Transaction History
                        </DropdownMenuItem>
                      )}
                    </>
                  )}

                  <DropdownMenuItem
                    onClick={() =>
                      signOut({ redirect: true, callbackUrl: "/" })
                    }
                  >
                    <LogOut /> Sign out
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </GridItem>
      </Grid>

      <PrivacySettingsFormModal
        open={isPrivacySettingDialogOpen}
        closeDialog={closePrivacySettingsDialog}
        userData={user}
        dialogTitle="Update Privacy Settings"
      />

      <PersonalInfoFormModal
        open={isPersonalInfoDialogOpen}
        closeDialog={closePersonalInfoDialog}
        userData={user}
        dialogTitle="Update Personal Info"
      />
    </>
  );
}

export default DashboardHeader;
