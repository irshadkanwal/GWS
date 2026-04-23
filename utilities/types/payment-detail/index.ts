interface DonationType {
  id: number;
  title: string;
  user: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
  };
}

export type PaymentDetailType = {
  id: number;
  donation_id: number;
  stripe_id: string;
  payment_method?: string;
  amount: number;
  cardholder_name?: string;
  last_four_digits?: string;
  status: "pending" | "succeeded" | "failed" | "processing";
  donation?: DonationType;
  currency: string;
  recipient_amount: number;
  platform_fee: number;
  created_at?: string;
  updated_at?: string;
};

export type CreatePaymentDetailType = Omit<
  PaymentDetailType,
  "id" | "created_at" | "updated_at"
>;

export type UpdatePaymentDetailType = Partial<
  Omit<PaymentDetailType, "id" | "created_at" | "updated_at">
>;

export interface RecipientType {
  id: number;
  name: string;
  email: string;
}

export type AdminPaymentDetailType = {
  id: number;
  donation_id: number;
  stripe_id: string;
  payment_method: string | null;
  cardholder_name: string | null;
  last_four_digits: string | null;
  amount: number;
  currency: string;
  status: "pending" | "succeeded" | "failed" | "processing";
  created_at: string;

  platform_fee: number | null;
  stripe_fee: number | null;
  recipient_account: string | null;
  donor_email: string | null;
  recipient_received: string | null;

  campaign: string | null;
  recipient: RecipientType | null;
};
