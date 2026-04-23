import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type Props = {
  profileImageURL: string;
  userFirstName?: string;
  userLastName?: string;
  avatarStyles?: string;
  imageWidth?: number;
  imageHeight?: number;
};

function ProfileImage({
  profileImageURL,
  userFirstName,
  userLastName,
  avatarStyles,
  imageWidth = 100,
  imageHeight = 100,
}: Props) {
  const userAvatar = `${userFirstName?.[0] || ""}${
    userLastName?.[0] || ""
  }`.toUpperCase();
  return (
    <>
      {profileImageURL ? (
        <Image
          src={profileImageURL}
          alt="Profile"
          width={imageWidth}
          height={imageHeight}
          className="object-cover w-full h-full"
        />
      ) : (
        <div
          className={cn(
            "w-full h-full flex items-center justify-center bg-gray-200 text-gray-700 text-base font-semibold",
            avatarStyles
          )}
        >
          {userAvatar}
        </div>
      )}
    </>
  );
}

export default ProfileImage;
