"use client";

import React from "react";
import { Button } from "../ui/button";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Dialog, DialogContent } from "../ui/dialog";
import GWSLoader from "./gws-loader";
import { FILE_UPLOAD_TYPE } from "@/constants/constants";

export type SliderItem = {
  url: string;
  alt?: string;
  type: "video" | "image";
};

type UIImageSliderProps = {
  sliderItems: SliderItem[];
  width?: number;
  height?: number;
  initialIndex?: number;
  isDialogOpen?: boolean;
  closeDialog?: () => void;
};

const UIImageSliderDialog = ({
  sliderItems,
  width = 900,
  height = 600,
  initialIndex = 0,
  isDialogOpen = false,
  closeDialog,
}: UIImageSliderProps) => {
  const [currentIndex, setCurrentIndex] = React.useState(initialIndex);
  const [isVideoLoading, setIsVideoLoading] = React.useState(
    sliderItems[initialIndex]?.type === FILE_UPLOAD_TYPE.VIDEO
  );

  const totalSlides = sliderItems.length;

  const handleNextSlide = () => {
    const nextIndex = (currentIndex + 1) % totalSlides;
    setCurrentIndex(nextIndex);
    setIsVideoLoading(sliderItems[nextIndex].type === FILE_UPLOAD_TYPE.VIDEO);
  };

  const handlePrevSlide = () => {
    const prevIndex = currentIndex === 0 ? totalSlides - 1 : currentIndex - 1;
    setCurrentIndex(prevIndex);
    setIsVideoLoading(sliderItems[prevIndex].type === FILE_UPLOAD_TYPE.VIDEO);
  };

  const handleIndicatorClick = (index: number) => {
    setCurrentIndex(index);
    setIsVideoLoading(sliderItems[index].type === FILE_UPLOAD_TYPE.VIDEO);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={closeDialog}>
      <DialogContent
        hideCloseButton
        className="p-0 overflow-hidden w-11/12 mx-auto md:max-w-[600px] lg:min-w-[900px] max-h-[90vh] border-none bg-transparent"
      >
        <div className="w-full flex justify-center items-center">
          <div
            className={`relative flex items-center`}
            style={{
              width: `${width}px`,
              height: `${height}px`,
            }}
          >
            {totalSlides > 1 && (
              <>
                <Button
                  onClick={handlePrevSlide}
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black text-white rounded-full p-2 z-10"
                >
                  <ArrowLeft />
                </Button>
                <Button
                  onClick={handleNextSlide}
                  className="absolute right-5 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black text-white rounded-full p-2 z-10"
                >
                  <ArrowRight />
                </Button>
              </>
            )}

            <div className="w-full h-full relative overflow-hidden">
              {sliderItems.map((item, idx) => {
                const isActive = idx === currentIndex;
                if (item.type === "video") {
                  return (
                    <iframe
                      key={idx}
                      src={isActive ? item.url : ""}
                      width="100%"
                      height="100%"
                      title="Video Player"
                      allow="autoplay; fullscreen"
                      className={cn(
                        "absolute inset-0 w-full h-full object-cover",
                        isActive ? "block" : "hidden"
                      )}
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                      onLoad={() => setIsVideoLoading(false)}
                    />
                  );
                }
                return (
                  <Image
                    key={idx}
                    src={item.url}
                    alt={item.alt || ""}
                    width={width}
                    height={height}
                    className={cn(
                      "absolute inset-0 w-full h-full object-cover",
                      isActive ? "block" : "hidden"
                    )}
                  />
                );
              })}
              {isVideoLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-20">
                  <GWSLoader />
                </div>
              )}
            </div>

            {totalSlides > 1 && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {sliderItems.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleIndicatorClick(idx)}
                    className={cn(
                      "w-3 h-3 rounded-full",
                      currentIndex === idx ? "bg-[#385C80]" : "bg-white"
                    )}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
        <Button
          onClick={closeDialog}
          className="absolute right-3 top-3 bg-black/50 hover:bg-black text-white rounded-full p-2 z-10"
        >
          <X size={24} />
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default UIImageSliderDialog;
