import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Toggle } from "@/components/ui/toggle";

interface EditorToggleButtonProps {
  pressed: boolean;
  onPressedChange: () => void;
  icon: ReactNode;
  tooltip: string;
}

const EditorToggleButton = ({
  pressed,
  onPressedChange,
  icon,
  tooltip,
}: EditorToggleButtonProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Toggle
          size="sm"
          pressed={pressed}
          onPressedChange={onPressedChange}
          className={cn(pressed && "bg-muted text-muted-foreground")}
        >
          {icon}
        </Toggle>
      </TooltipTrigger>
      <TooltipContent>{tooltip}</TooltipContent>
    </Tooltip>
  );
};

export default EditorToggleButton;
