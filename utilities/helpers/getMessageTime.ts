export function getRelativeTime(createdAt: string): string {
  const now = new Date();
  const messageTime = new Date(createdAt);
  const diffInMs = now.getTime() - (messageTime.getTime() + 5 * 60 * 60 * 1000);

  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  const diffInWeeks = Math.floor(diffInDays / 7);
  const diffInMonths = Math.floor(diffInDays / 30);
  const diffInYears = Math.floor(diffInDays / 365);

  if (diffInMinutes < 1) {
    return "Just now";
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes === 1 ? "" : "s"} ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours === 1 ? "" : "s"} ago`;
  } else if (diffInDays < 7) {
    return `${diffInDays} day${diffInDays === 1 ? "" : "s"} ago`;
  } else if (diffInWeeks < 4) {
    return `${diffInWeeks} week${diffInWeeks === 1 ? "" : "s"} ago`;
  } else if (diffInMonths < 12) {
    return `${diffInMonths} month${diffInMonths === 1 ? "" : "s"} ago`;
  } else {
    return `${diffInYears} year${diffInYears === 1 ? "" : "s"} ago`;
  }
}
