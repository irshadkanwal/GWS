import type { GiftWellType } from "../giftWell";

export type DonationType = {
  id: number;
  amount: number;
  user_id: number;
  message: string;
  status: "pending" | "completed" | "failed";
  giftwell_id: number;
  donation_method?: string;
  title?: string;
  giftWell?: GiftWellType;
  createdAt?: string;
  updatedAt?: string;
};
