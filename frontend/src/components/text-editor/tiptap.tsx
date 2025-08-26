import { useEditor, EditorContent } from "@tiptap/react";
import { FloatingMenu, BubbleMenu } from "@tiptap/react/menus";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Menubar from "./menubar";

const Tiptap = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
  });

  return (
    <div>
      <Menubar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default Tiptap;
