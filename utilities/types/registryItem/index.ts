import type { GiftWellType } from "../giftWell";
import type { ProductType } from "../product";

export type RegistryItemType = {
  id: number;
  giftwell_id: number;
  product_id: number;
  quantity: number;
  product?: ProductType;
  giftWell?: GiftWellType;
  priority?: "low" | "medium" | "high";
  status: RegistryItemsStatusType;
  registry_product?: ProductType;
  notes?: string | null;
  is_claimed?: boolean;
  order_index?: number;
  created_at?: string;
  updated_at?: string;
};

export type RegistryItemsStatusType = "listed" | "purchased";
