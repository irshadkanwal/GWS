import React from "react";
import Image from "next/image";

type Props = {};

function GwsLoaderLogo({}: Props) {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-transparent">
      <div className="w-56 h-24">
        <Image
          src="/GWS-logo-dark.svg"
          alt="Logo"
          height={200}
          width={200}
          className="w-full h-full object-contain animate-fadeInOut"
        />
      </div>
    </div>
  );
}

export default GwsLoaderLogo;
