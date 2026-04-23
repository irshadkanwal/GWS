import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type EllipsisTypographyProps = {
  children?: React.ReactNode;
  title?: string;
  className?: string;
  dangerouslySetInnerHTML?: { __html: string };
};

const EllipsisTypography: React.FC<EllipsisTypographyProps> = ({
  children,
  title,
  className = "",
  dangerouslySetInnerHTML,
}) => {
  const textRef = React.useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = React.useState(false);

  React.useEffect(() => {
    const el = textRef.current;
    if (el) {
      setIsOverflowing(
        el.scrollHeight > el.clientHeight || el.scrollWidth > el.clientWidth
      );
    }
  }, [children, dangerouslySetInnerHTML]);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            ref={textRef}
            dangerouslySetInnerHTML={dangerouslySetInnerHTML}
            className={`overflow-hidden text-ellipsis break-words ${className}`}
          >
            {children}
          </div>
        </TooltipTrigger>
        {isOverflowing && (
          <TooltipContent className="max-w-sm bg-slate-200 text-xs">
            {title ||
              (dangerouslySetInnerHTML ? (
                <div
                  className=" max-w-none line-clamp-6"
                  dangerouslySetInnerHTML={dangerouslySetInnerHTML}
                />
              ) : (
                children
              ))}
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
};

export default EllipsisTypography;
