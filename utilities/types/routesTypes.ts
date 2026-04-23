import { ForwardRefExoticComponent, RefAttributes } from "react";
import type { LucideProps } from "lucide-react";
import { USER_ROLES } from "@/constants/constants";

export type RouteKeys =
  | "USERS"
  | "ARTICLES"
  | "PRODUCTS"
  | "DASHBOARD"
  | "EXPLORE"
  | "PERSONAL_STORY"
  | "MESSAGES"
  | "BLOGS"
  | "REGISTRY_SETUP_STEPS"
  | "USER_PERSONAL_STORY"
  | "USERS"
  | "ARTICLES"
  | "BILLING"
  | "PAYMENT_HISTORY";

export type RoutesConfig = {
  allowedRoles: (typeof USER_ROLES)[keyof typeof USER_ROLES][];
  pathName: string;
  showInSideBar: boolean;
  title: string;
  parentRoute: string;
  hasChildRoutes: boolean;
  icon?: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
};
