import React from "react";

interface TagBadgeProps {
  children: React.ReactNode;
}

const TagBadge: React.FC<TagBadgeProps> = ({ children }) => {
  return (
    <span className="inline-block bg-[#FCA16F] text-[#6D3617] text-xs font-semibold px-3 py-1 rounded-[4px]">
      {children}
    </span>
  );
};

export default TagBadge;
