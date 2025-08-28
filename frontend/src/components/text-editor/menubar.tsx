import { type Editor } from "@tiptap/react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import EditorToggleButton from "@/components/text-editor/editor-toggle-button";

import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Redo,
  Undo,
} from "lucide-react";

import {
  AiOutlineStrikethrough,
  AiOutlineBold,
  AiOutlineItalic,
} from "react-icons/ai";

interface MenubarProps {
  editor: Editor | null;
}

const Menubar = ({ editor }: MenubarProps) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="border border-input border-x-0 border-t-0 rounded p-2 bg-card flex flex-wrap gap-1 items-center">
      <TooltipProvider>
        <div className="flex flex-wrap gap-1">
          <EditorToggleButton
            pressed={editor.isActive("bold")}
            onPressedChange={() => editor.chain().focus().toggleBold().run()}
            icon={<AiOutlineBold />}
            tooltip="Bold"
          />
          <EditorToggleButton
            pressed={editor.isActive("italic")}
            onPressedChange={() => editor.chain().focus().toggleItalic().run()}
            icon={<AiOutlineItalic />}
            tooltip="Italic"
          />
          <EditorToggleButton
            pressed={editor.isActive("strike")}
            onPressedChange={() => editor.chain().focus().toggleStrike().run()}
            icon={<AiOutlineStrikethrough />}
            tooltip="Strike"
          />
          <EditorToggleButton
            pressed={editor.isActive("heading", { level: 1 })}
            onPressedChange={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            icon={<Heading1 />}
            tooltip="Heading 1"
          />

          <EditorToggleButton
            pressed={editor.isActive("heading", { level: 2 })}
            onPressedChange={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            icon={<Heading2 />}
            tooltip="Heading 2"
          />

          <EditorToggleButton
            pressed={editor.isActive("heading", { level: 3 })}
            onPressedChange={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            icon={<Heading3 />}
            tooltip="Heading 3"
          />

          <EditorToggleButton
            pressed={editor.isActive("bulletList")}
            onPressedChange={() =>
              editor.chain().focus().toggleBulletList().run()
            }
            icon={<List />}
            tooltip="Bullet List"
          />

          <EditorToggleButton
            pressed={editor.isActive("orderedList")}
            onPressedChange={() =>
              editor.chain().focus().toggleOrderedList().run()
            }
            icon={<ListOrdered />}
            tooltip="Ordered List"
          />
        </div>
        <div className="w-px h-6 bg-border mx-2" />
        <div className="flex flex-wrap gap-1">
          <EditorToggleButton
            pressed={editor.isActive({ textAlign: "left" })}
            onPressedChange={() =>
              editor.chain().focus().setTextAlign("left").run()
            }
            icon={<AlignLeft />}
            tooltip="Align Left"
          />
          <EditorToggleButton
            pressed={editor.isActive({ textAlign: "center" })}
            onPressedChange={() =>
              editor.chain().focus().setTextAlign("center").run()
            }
            icon={<AlignCenter />}
            tooltip="Align Center"
          />
          <EditorToggleButton
            pressed={editor.isActive({ textAlign: "right" })}
            onPressedChange={() =>
              editor.chain().focus().setTextAlign("right").run()
            }
            icon={<AlignRight />}
            tooltip="Align Right"
          />
        </div>
        <div className="w-px h-6 bg-border mx-2" />

        <div className="flex flex-wrap gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                type="button"
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().undo()}
              >
                <Undo />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Undo</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                type="button"
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().redo()}
              >
                <Redo />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Redo</TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </div>
  );
};

export default Menubar;
