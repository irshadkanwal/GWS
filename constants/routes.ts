import type { RouteKeys, RoutesConfig } from "@/utilities/types/routesTypes";
import {
  Globe,
  LayoutPanelLeft,
  MessageCircle,
  BookText,
  UsersRound,
  BookOpenText,
  ShoppingCart,
  Receipt,
} from "lucide-react";
import { ALL_USERS, PATIENT_USERS, USER_ROLES } from "./constants";

export const ROUTES: Record<RouteKeys, RoutesConfig> = {
  // Caregiver/Recipient Routes
  DASHBOARD: {
    allowedRoles: ALL_USERS,
    pathName: "/dashboard",
    showInSideBar: true,
    title: "Dashboard",
    parentRoute: "",
    hasChildRoutes: false,
    icon: LayoutPanelLeft,
  },
  // Administrator Routes
  USERS: {
    allowedRoles: [USER_ROLES.ADMINISTRATOR],
    pathName: "/users",
    showInSideBar: true,
    title: "Users",
    parentRoute: "",
    hasChildRoutes: false,
    icon: UsersRound,
  },
  ARTICLES: {
    allowedRoles: [USER_ROLES.ADMINISTRATOR],
    pathName: "/articles",
    showInSideBar: true,
    title: "Articles",
    parentRoute: "",
    hasChildRoutes: false,
    icon: BookOpenText,
  },
  PRODUCTS: {
    allowedRoles: [USER_ROLES.ADMINISTRATOR],
    pathName: "/products",
    showInSideBar: true,
    title: "Products",
    parentRoute: "",
    hasChildRoutes: false,
    icon: ShoppingCart,
  },

  PAYMENT_HISTORY: {
    allowedRoles: [USER_ROLES.ADMINISTRATOR],
    pathName: "/payment-history",
    showInSideBar: true,
    title: "Payment History",
    parentRoute: "",
    hasChildRoutes: false,
    icon: Receipt,
  },

  // Caregiver/Recipient Routes
  BILLING: {
    allowedRoles: PATIENT_USERS,
    pathName: "/transaction-history",
    showInSideBar: false,
    title: "Transaction History",
    parentRoute: "",
    hasChildRoutes: false,
    icon: undefined,
  },
  USER_PERSONAL_STORY: {
    allowedRoles: PATIENT_USERS,
    pathName: "/personal-story",
    showInSideBar: false,
    title: "User Personal Story",
    parentRoute: "",
    hasChildRoutes: false,
    icon: undefined,
  },
  REGISTRY_SETUP_STEPS: {
    allowedRoles: PATIENT_USERS,
    pathName: "/dashboard/[registrySetupStep]",
    showInSideBar: false,
    title: "Registry Setup Steps",
    parentRoute: "/dashboard",
    hasChildRoutes: false,
    icon: undefined,
  },
  MESSAGES: {
    allowedRoles: PATIENT_USERS,
    pathName: "/messages",
    showInSideBar: true,
    title: "Messages",
    parentRoute: "",
    hasChildRoutes: false,
    icon: MessageCircle,
  },

  BLOGS: {
    allowedRoles: PATIENT_USERS,
    pathName: "/blogs",
    showInSideBar: true,
    title: "Blogs",
    parentRoute: "",
    hasChildRoutes: false,
    icon: BookText,
  },
  EXPLORE: {
    allowedRoles: PATIENT_USERS,
    pathName: "/explore",
    showInSideBar: true,
    title: "Explore",
    parentRoute: "",
    hasChildRoutes: false,
    icon: Globe,
  },

  PERSONAL_STORY: {
    allowedRoles: PATIENT_USERS,
    pathName: "/personal-story",
    showInSideBar: false,
    title: "Personal Story",
    parentRoute: "",
    hasChildRoutes: false,
    icon: undefined,
  },
};
