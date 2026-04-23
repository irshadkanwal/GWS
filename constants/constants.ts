export const USER_ROLES = {
  ADMINISTRATOR: "Administrator",
  CAREGIVER: "Caregiver",
  RECIPIENT: "Recipient",
} as const;

export const BUCKET_FOLDER_NAME = {
  STORY: "story",
  REGISTRY: "registry",
  BLOG: "blog",
  ARTICLE: "article",
  PRODUCTS: "products",
} as const;

export type BucketDirectoryFolderType = {
  bucketFolderName?: "story" | "registry" | "blog" | "article";
};

export const BLOG_STATUS = {
  DRAFT: "draft",
  PUBLISHED: "published",
} as const;

export const REGISTRY_FOR = {
  MY_SELF: "myself",
  SOMEONE_ELSE: "someone_else",
} as const;

export const FILE_UPLOAD_TYPE = {
  IMAGE: "image",
  VIDEO: "video",
} as const;

export const ALL_USERS = Object.values(USER_ROLES);
export const PATIENT_USERS = [USER_ROLES.CAREGIVER, USER_ROLES.RECIPIENT];

export const MAX_VIDEO_SIZE_MB = 50;
export const MAX_VIDEO_SIZE_BYTES = MAX_VIDEO_SIZE_MB * 1024 * 1024;
