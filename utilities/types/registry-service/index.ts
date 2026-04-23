import type { GiftWellType } from "../giftWell";
import type { ProductType } from "../product";

export type RegistryServiceType = {
  id: number;
  giftwell_id: number;
  service_id: number;
  giftWell?: GiftWellType;
  status: RegistryServiceStatusType;
  registry_service?: ProductType;
  notes?: string | null;
  is_claimed?: boolean;
  order_index?: number;
  created_at?: string;
  updated_at?: string;
};

export type RegistryServiceStatusType = "listed" | "availed";
