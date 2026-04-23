import React from "react";

export default function ImageGrid() {
  return (
    <div className="grid grid-cols-2 grid-rows-3 gap-4 w-[450px] h-[550px]">
      <img
        src="landingPageImageGrid/1.png"
        alt="img1"
        className="object-cover w-full h-full rounded-sm"
      />
      <img
        src="landingPageImageGrid/4.png"
        alt="img4"
        className="object-cover w-full h-full row-span-2 rounded-sm"
      />
      <img
        src="landingPageImageGrid/2.png"
        alt="img2"
        className="object-cover w-full h-full rounded-sm"
      />
      <img
        src="landingPageImageGrid/3.png"
        alt="img3"
        className="object-cover w-full h-full rounded-sm"
      />
      <img
        src="landingPageImageGrid/5.png"
        alt="img4"
        className="object-cover w-full h-full rounded-sm"
      />
    </div>
  );
}
