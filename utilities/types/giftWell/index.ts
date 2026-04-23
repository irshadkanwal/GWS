import type { RegistryItemType } from "../registryItem";
import type { UserType } from "../user";

export type GiftWellType = {
  id: number;
  title?: string | null;
  description?: string | null;
  user_id: number;
  privacy: "public" | "private";
  created_at?: string;
  updated_at?: string;
};

export type ExtendedGiftWellType = GiftWellType & {
  registryItems: RegistryItemType[];
  user: UserType;
};
