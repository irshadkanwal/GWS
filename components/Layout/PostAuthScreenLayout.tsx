import React from "react";
import { SidebarProvider } from "../ui/sidebar";
import { AppSidebar } from "../sidebar/app-sidebar";
import DashboardHeader from "@/pageComponents/Dashboard/DashboardHeader";
import { useRouter } from "next/router";
import { Avatar } from "../ui/avatar";
import Typography from "../ui/typography";
import { REGISTRY_STEPS } from "@/constants/registrySteps";
import { usePathname } from "next/navigation";
import PersonIcon from "../svg/PersonIcon";
import BookIcon from "../svg/BookIcon";
import { ROUTES } from "@/constants/routes";
import { GridItem } from "../ui/Grid";

type PostAuthScreenLayoutProps = { children: React.ReactNode };

function PostAuthScreenLayout({ children }: PostAuthScreenLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const isRegistrySteps =
    router.pathname === ROUTES.REGISTRY_SETUP_STEPS.pathName;

  const isTransactionPage = router.pathname === ROUTES.BILLING.pathName;

  const route = pathname.split("/dashboard/")[1] || "";

  const routeToStepMap: Record<string, number> = {
    "personal-details": 1,
    "build-your-care-registry": 2,
    "preview-and-publish": 3,
    "share-and-receive": 4,
  };

  const currentStepId = routeToStepMap[route] || 1;
  const currentStep =
    REGISTRY_STEPS.find((step) => step.id === currentStepId) ||
    REGISTRY_STEPS[0];

  const headerTitleComponent = (
    <GridItem>
      <div className="flex gap-3 items-center">
        <Avatar>
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
            {currentStepId === 1 ? <PersonIcon /> : <BookIcon />}
          </div>
        </Avatar>

        <div>
          <Typography size="lg" className="font-bold text-[#0A0D14]">
            {`${currentStep.id}. ${currentStep.title}`}
          </Typography>
          <Typography variant="caption" size="sm" className="text-[#525866]">
            {currentStep.description}
          </Typography>
        </div>
      </div>
    </GridItem>
  );

  const transactionPageHeader = (
    <GridItem>
      <div>
        <Typography size="lg" className="font-bold text-[#0A0D14]">
          Transaction History
        </Typography>
      </div>
    </GridItem>
  );

  return (
    <div className="flex justify-center items-center min-h-screen bg-background-dark w-full">
      <SidebarProvider>
        <AppSidebar />
        <main className=" min-h-[calc(100vh-4rem)] md:min-h-[calc(100vh-7rem)] w-full overflow-hidden bg-[#F3F3F3]">
          <DashboardHeader
            HeaderTitleComponent={
              isRegistrySteps
                ? headerTitleComponent
                : isTransactionPage
                ? transactionPageHeader
                : undefined
            }
          />
          {children}
        </main>
      </SidebarProvider>
    </div>
  );
}

export default PostAuthScreenLayout;
