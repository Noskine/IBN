"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Button } from "@/components/ui/button";

interface Props {
  value: string;
  onChange: (html: string) => void;
}

export default function ArticleEditor({ value, onChange }: Props) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value || "<p></p>",
    editorProps: {
      attributes: {
        class: "min-h-[260px] focus:outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  return (
    <div>
      <div className="mb-3 flex flex-wrap gap-2">
        <Button type="button" variant="outline" disabled={!editor} onClick={() => editor?.chain().focus().toggleBold().run()}>
          <strong>B</strong>
        </Button>
        <Button type="button" variant="outline" disabled={!editor} onClick={() => editor?.chain().focus().toggleItalic().run()}>
          <em>I</em>
        </Button>
        <Button type="button" variant="outline" disabled={!editor} onClick={() => editor?.chain().focus().toggleStrike().run()}>
          S
        </Button>
        <Button type="button" variant="outline" disabled={!editor} onClick={() => editor?.chain().focus().toggleBulletList().run()}>
          Lista
        </Button>
        <Button type="button" variant="outline" disabled={!editor} onClick={() => editor?.chain().focus().toggleOrderedList().run()}>
          Num.
        </Button>
        <Button type="button" variant="outline" disabled={!editor} onClick={() => editor?.chain().focus().toggleBlockquote().run()}>
          Citação
        </Button>
      </div>
      <div className="rounded-2xl border border-zinc-200 bg-white p-4 text-sm dark:border-zinc-800 dark:bg-zinc-950">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
