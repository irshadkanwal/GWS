import React from "react";
import { Card } from "@/components/ui/card";
import IconCircle from "../../components/ui/IconCircles";
import Typography from "@/components/ui/typography";
import { Separator } from "@/components/ui/separator";

type StepCardProps = {
  icon: any;
  title: string;
  description: string;
  link: string;
  subTitle: string;
  onStartYourGiftwell: () => void;
};

export default function StepCard({
  icon,
  title,
  subTitle,
  description,
  link,
  onStartYourGiftwell,
}: StepCardProps) {
  return (
    <div className="relative flex flex-col items-center w-full">
      {/* Overlapping Icon with White Halo */}
      <div className="absolute flex justify-center w-full -top-16">
        <div className="flex items-center justify-center p-3 bg-white border-4 border-white border-solid rounded-full">
          <IconCircle size="w-28 h-28" className="text-5xl shadPow-none">
            {icon}
          </IconCircle>
        </div>
      </div>

      <Card className="bg-white flex flex-col items-center justify-between gap-4 text-center pt-24 pb-8 px-8 lg:min-h-[430px] w-full">
        <div>
          <h3 className="text-[22px] font-bold">{title}</h3>
          {/* Description section with consistent height */}
          <div className="">
            <p className="text-gray-700">{subTitle}</p>
          </div>
        </div>

        <div className="min-h-[50px] flex-1">
          <p className="text-sm leading-relaxed text-gray-700">{description}</p>
        </div>

        <Separator className="border border-blue-100" />
        <div
          onClick={onStartYourGiftwell}
          className="flex items-center justify-between cursor-pointer w-full"
        >
          <Typography className="flex items-center gap-2 text-base font-bold text-blue-400 cursor-pointer">
            {link}
          </Typography>
          <span className="text-xl text-blue-400">→</span>
        </div>
      </Card>
    </div>
  );
}
