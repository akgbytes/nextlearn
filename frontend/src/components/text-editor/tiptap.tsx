"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import { FloatingMenu, BubbleMenu } from "@tiptap/react/menus";
import StarterKit from "@tiptap/starter-kit";
import Menubar from "./menubar";

const Tiptap = () => {
  const editor = useEditor({
    extensions: [StarterKit],
  });

  return (
    <div>
      <Menubar editor={editor} />
    </div>
  );
};

export default Tiptap;
