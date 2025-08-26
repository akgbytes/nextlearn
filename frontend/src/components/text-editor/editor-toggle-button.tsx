import { type Editor } from "@tiptap/react";
import type { ReactNode } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Toggle } from "../ui/toggle";

import { cn } from "@/lib/utils";

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
