import React from "react";
import FacebookIcon from "@/components/svg/FacebookIcon";
import InstagramIcon from "@/components/svg/InstagramIcon";
import PinterestIcon from "@/components/svg/PinterestIcon";
import TiktokIcon from "@/components/svg/TiktokIcon";
import TwitterIcon from "@/components/svg/TwitterIcon";

const defaultPlatforms = [
  {
    name: "Facebook",
    url: "https://www.facebook.com",
    component: <FacebookIcon />,
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com",
    component: <InstagramIcon />,
  },
  { name: "X", url: "https://www.x.com", component: <TwitterIcon /> },
  {
    name: "TikTok",
    url: "https://www.tiktok.com",
    component: <TiktokIcon />,
  },
  {
    name: "Pinterest",
    url: "https://www.pinterest.com",
    component: <PinterestIcon />,
  },
];

function SocialLinks({ platforms = defaultPlatforms }) {
  return (
    <div className="flex items-center">
      {platforms.map((platform, idx) => (
        <a
          key={idx}
          target="_blank"
          rel="noopener noreferrer"
          href={platform.url}
          className={idx !== platforms.length - 1 ? "mr-4" : ""}
        >
          {platform.component}
        </a>
      ))}
    </div>
  );
}

export default SocialLinks;
