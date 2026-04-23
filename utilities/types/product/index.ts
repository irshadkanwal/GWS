export type ProductType = {
  id: number;
  name: string;
  description?: string | null;
  price?: number | null;
  affiliate_link?: string | null;
  is_affiliated?: boolean;
  category?: number | null;
  image_url?: string | null;
  is_service?: boolean;
  created_at?: string;
  updated_at?: string;
};
