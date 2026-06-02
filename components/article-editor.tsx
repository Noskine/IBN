"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { Button } from "@/components/ui/button";

interface Props {
  value: string;
  onChange: (html: string) => void;
}

export default function ArticleEditor({ value, onChange }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        linkOnPaste: true,
        autolink: true,
        HTMLAttributes: {
          rel: "noopener noreferrer",
          class: "text-emerald-700 hover:underline",
        },
      }),
      Image,
    ],
    content: value || "<p></p>",
    editorProps: {
      attributes: {
        class: "min-h-[340px] focus:outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  const insertLink = () => {
    if (!editor) return;
    const previousUrl = editor.getAttributes("link").href || "";
    const url = window.prompt("Insira o endereço do link", previousUrl);
    if (url === null) return;
    if (!url.trim()) {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url, target: "_blank" }).run();
  };

  const insertImage = () => {
    if (!editor) return;
    const url = window.prompt("Insira a URL da imagem");
    if (!url) return;
    editor.chain().focus().setImage({ src: url, alt: "Imagem do artigo" }).run();
  };

  return (
    <div>
      <div className="mb-3 flex flex-wrap gap-2">
        <Button type="button" variant="outline" disabled={!editor} onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}>
          H1
        </Button>
        <Button type="button" variant="outline" disabled={!editor} onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}>
          H2
        </Button>
        <Button type="button" variant="outline" disabled={!editor} onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}>
          H3
        </Button>
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
        <Button type="button" variant="outline" disabled={!editor} onClick={insertLink}>
          Link
        </Button>
        <Button type="button" variant="outline" disabled={!editor} onClick={insertImage}>
          Imagem
        </Button>
      </div>

      <div className="rounded-2xl border border-zinc-200 bg-white p-4 text-sm dark:border-zinc-800 dark:bg-zinc-950">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
