export interface BlogsStatusType {
  status: "draft" | "published";
}

export type BlogsType = {
  id: number;
  user_id: number;
  title: string;
  description: string;
  status: string;
  category: number[];
  attachments: string[];
  featured_image?: string;
  created_at?: string;
  updated_at?: string;
};
