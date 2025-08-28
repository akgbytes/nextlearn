import { useEditor, EditorContent } from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";

import Menubar from "@/components/text-editor/menubar";

interface TiptapProps {
  field: {
    value: string;
    onChange: (value: string) => void;
  };
}

const Tiptap = ({ field }: TiptapProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],

    editorProps: {
      attributes: {
        class:
          "min-h-[300px] p-4 focus:outline-none prose prose-sm sm:prose dark:prose-invert !w-full !max-w-none !leading-1",
      },
    },

    immediatelyRender: false,

    onUpdate: ({ editor }) => {
      field.onChange(JSON.stringify(editor.getJSON()));
    },

    content: field.value ? JSON.parse(field.value) : "<p>Start writing...</p>",
  });

  return (
    <div className="w-full border border-input rounded overflow-hidden dark:bg-input/30">
      <Menubar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default Tiptap;
