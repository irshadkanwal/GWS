import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { GridItem } from "@/components/ui/Grid";
import Typography from "@/components/ui/typography";
import { ChevronRight } from "lucide-react";
import CheckMarkIcon from "@/components/svg/CheckMarkIcon";
import { useWindowSize } from "@/hooks/useWindowSize";

export type CardData = {
  id: number;
  title: string;
  isCompleted?: boolean;
};

type RegistrySetupCardsProps = {
  cardData: CardData;
  renderIcons?: boolean;
  onCardClick?: (cardData?: CardData) => void;
};

function RegistrySetupCards({
  cardData,
  renderIcons = true,
  onCardClick,
}: RegistrySetupCardsProps) {
  const handleCardClick = (cardData: CardData) => {
    if (onCardClick) {
      onCardClick(cardData);
    }
  };
  const { width } = useWindowSize();

  const isMobile = width <= 768;
  const isDesktop = width > 768 && width <= 1024;

  return (
    <GridItem
      key={cardData.id}
      className="py-5 "
      size={isMobile ? 12 : isDesktop ? 6 : 3}
    >
      <Card
        onClick={() => handleCardClick(cardData)}
        className="hover:bg-gray-100 bg-gray-50 transition-colors min-h-40 border-0 shadow-sm flex w-full p-6 cursor-pointer"
      >
        <CardContent className="flex items-center justify-between gap-4 p-0 w-full">
          <div
            className={
              renderIcons
                ? "flex flex-col items-start gap-4"
                : "flex items-center justify-center w-full"
            }
          >
            {renderIcons && (
              <CheckMarkIcon
                variant={cardData.isCompleted ? "filled" : "outlined"}
              />
            )}
            <Typography className="text-gray-800 font-medium">
              {cardData.title}
            </Typography>
          </div>
          {renderIcons && <ChevronRight className="text-gray-500" />}
        </CardContent>
      </Card>
    </GridItem>
  );
}

export default RegistrySetupCards;
