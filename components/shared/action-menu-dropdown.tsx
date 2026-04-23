import React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import Typography from "../ui/typography";

type DropdownAction = {
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
};

type ActionMenuDropdownProps = {
  actions: DropdownAction[];
  trigger: React.ReactNode;
};

const ActionMenuDropdown: React.FC<ActionMenuDropdownProps> = ({
  actions,
  trigger,
}) => {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white py-3 flex flex-col gap-2">
        {actions.map((action, idx) => (
          <DropdownMenuItem
            key={idx}
            onClick={action.onClick}
            className="px-5 cursor-pointer"
          >
            {action.icon}
            <Typography size="sm" className="ml-2 text-[#505152]">
              {action.label}
            </Typography>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionMenuDropdown;
