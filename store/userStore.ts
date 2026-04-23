import type { UserDetailsType } from "@/utilities/types/user-details";
import { create } from "zustand";
import type { StateCreator } from "zustand";

type RoutePermissionsType = {
  [key: string]: boolean;
};

export type ApplicationUserType = {
  email: string;
  id: number | undefined;
  role_id: number;
  first_name: string | undefined;
  last_name: string | undefined;
  giftWellID: number | undefined;
  is_verified: boolean;
  public_url?: string;
  profile_image_url?: string;
  isPersonalDetailsCompleted: boolean;
  isRegistrySetupCompleted: boolean;
  isRegistryPublished: boolean;
  meta: {
    userDetails: UserDetailsType | null;
    permissions: {
      routePermissions: RoutePermissionsType | null;
    };
  };
};

type UserStoreSlice = {
  setUser: (user: ApplicationUserType) => void;
  resetUser: () => void;
} & ApplicationUserType;

const INITIAL_STORE_VALUES: ApplicationUserType | null = {
  id: undefined,
  email: "",
  role_id: 0,
  first_name: "",
  last_name: "",
  giftWellID: undefined,
  public_url: undefined,
  profile_image_url: undefined,
  is_verified: false,
  isPersonalDetailsCompleted: false,
  isRegistrySetupCompleted: false,
  isRegistryPublished: false,
  meta: {
    userDetails: null,
    permissions: {
      routePermissions: null,
    },
  },
};

const userSlice: StateCreator<UserStoreSlice> = (set) => ({
  ...INITIAL_STORE_VALUES,
  setUser: (user: ApplicationUserType) =>
    set((state: UserStoreSlice) => ({
      ...state,
      ...user,
    })),
  resetUser: () => set(INITIAL_STORE_VALUES),
});

export const useUserStore = create<UserStoreSlice>(userSlice);
