import { IMAGE_REGEX, VIDEO_REGEX } from "../constants/regex";

export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const isImage = (url: string) => IMAGE_REGEX.test(url);
export const isVideo = (url: string) => VIDEO_REGEX.test(url);
