import { Editor } from "@tiptap/react";

interface MenubarProps {
  editor: Editor | null;
}

const Menubar = ({ editor }: MenubarProps) => {
  if (!editor) {
    return null;
  }

  return <div>Menubar Hello</div>;
};

export default Menubar;
