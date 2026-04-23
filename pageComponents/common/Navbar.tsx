import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import LoginModal from "../Login";
import { useDialog } from "@/hooks/useDialog";
import { cn } from "@/lib/utils";
import { useRouter } from "next/router";
import { useVerifyToken } from "@/hooks/useVerifyToken";
import { toast } from "sonner";
import useRequestPasswordReset from "@/hooks/useRequestPasswordReset";
import { useVerifyResetToken } from "@/hooks/useVerifyResetToken";
import Image from "next/image";
import { useFindCareRegistryModal } from "@/context/FindCareRegistryModalContext";

type NavbarProps = {
  navButtonStyles?: string;
  logoIconColor?: string;
  openStepForm?: () => void;
  menuIconColor?: string;
};

function Navbar({
  navButtonStyles,
  logoIconColor,
  openStepForm,
  menuIconColor,
}: NavbarProps) {
  const router = useRouter();
  const {
    open: isLoginDialogOpen,
    openDialog: openLoginDialog,
    closeDialog: closeLoginDialog,
  } = useDialog(false);
  const { openModal } = useFindCareRegistryModal();

  const { error, status, data: verifyTokenData } = useVerifyToken();
  const {
    error: resetError,
    status: resetStatus,
    data: resetPasswordData,
  } = useVerifyResetToken();

  const { mutateAsync: requestPasswordReset, isPending } =
    useRequestPasswordReset();

  if (status === "success" && router.pathname === "/verify") {
    const { message } = verifyTokenData || {};
    toast.success(message);
  }
  if (error || resetError) {
    toast.error(error?.message || resetError?.message);
    router.replace("/");
  }

  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const handlePasswordRecovery = async (values: { email: string }) => {
    const { email } = values;
    await requestPasswordReset(email);
    closeLoginDialog();
  };

  const toggleMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMobileMenuOpen(false);

  const NavLinks = () => (
    <ul className="flex flex-col gap-4 text-sm font-medium tracking-wide text-gray-700">
      <li>
        <Link href="/shop" onClick={closeMenu}>
          Shop
        </Link>
      </li>

      <li>
        <Link href="/support-and-resources" onClick={closeMenu}>
          Support & Resources
        </Link>
      </li>
      <li>
        <Link href="/contact-us" onClick={closeMenu}>
          Contact Us
        </Link>
      </li>
    </ul>
  );

  return (
    <>
      {/* Navbar Container */}
      <div className="flex justify-center">
        <nav className="relative flex items-end w-full py-4">
          {/* Left Side: Hamburger + Logo */}
          <div className="flex items-end gap-4">
            {/* Hamburger Menu (Mobile Only) */}
            <button
              className="mr-2 xl:hidden"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <Menu size={24} color={menuIconColor} />
            </button>

            {/* Logo */}
            <div className="text-lg font-bold w-28 h-12 md:w-32 md:h-14">
              <Link href="/">
                <Image
                  src={
                    router.pathname === "/"
                      ? "/GWS-logo-light.svg"
                      : "/GWS-logo-dark.svg"
                  }
                  width={120}
                  height={50}
                  alt="logo"
                  className="w-full h-full object-contain"
                />
              </Link>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <div className="flex-1 hidden pl-40 xl:block">
            <ul
              className={cn(
                "flex gap-6 text-sm font-medium tracking-wide text-[#F3F3F3]",
                navButtonStyles
              )}
            >
              <li>
                <Link href="/shop" onClick={closeMenu}>
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/support-and-resources" onClick={closeMenu}>
                  Support & Resources
                </Link>
              </li>
              <li>
                <Link href="/contact-us" onClick={closeMenu}>
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Desktop Action Buttons */}
          <div className="hidden gap-3 xl:flex">
            <Button variant="secondary" onClick={openStepForm}>
              Start a Care Registry
            </Button>
            <Button variant="secondary" onClick={openModal}>
              Find a Care Registry
            </Button>
            <Button
              className="bg-inherit text-[#FFFFFF]"
              onClick={openLoginDialog}
            >
              Sign In
            </Button>
          </div>
        </nav>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-primary shadow-lg z-50 transform transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <span className="text-lg font-semibold">Menu</span>
          <button onClick={closeMenu} aria-label="Close menu">
            <X size={24} />
          </button>
        </div>
        <div className="p-4">
          <NavLinks />
          <div className="flex flex-col gap-3 mt-6">
            <Button
              onClick={() => {
                closeMenu();
                openLoginDialog();
              }}
            >
              Sign In
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                closeMenu();
                openModal();
              }}
            >
              Find a Care Registry
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                setIsMobileMenuOpen(false);
                openStepForm && openStepForm();
              }}
            >
              Start a Care Registry
            </Button>
          </div>
        </div>
      </div>

      <LoginModal
        open={
          isLoginDialogOpen || status === "success" || resetStatus === "success"
        }
        closeDialog={closeLoginDialog}
        handlePasswordRecovery={handlePasswordRecovery}
        isSendingResetLink={isPending}
        resetPasswordUserData={resetPasswordData}
      />
    </>
  );
}

export default Navbar;
