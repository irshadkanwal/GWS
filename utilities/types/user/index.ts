export type UserType = {
  id: number;
  role_id: number;
  first_name: string;
  last_name: string;
  email: string;
  password?: string;
  isPersonalDetailsCompleted?: boolean;
  public_url: string;
  profile_image_url?: string;
  isRegistrySetupCompleted?: boolean;
  isRegistryPublished?: boolean;
  is_stripe_linked?: boolean;
  stripe_account_id?: string;
  is_deleted?: boolean;
  created_at?: string;
  updated_at?: string;
};

export type ExtendedUserType = UserType & {
  creating_for?: "myself" | "someone_else";
  recipient_email?: string;
  recipient_name?: string;
  services?: number[];
  products?: number[];
  cash_donation?: string | number | null;
};
