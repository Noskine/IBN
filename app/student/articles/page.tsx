"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
Upload,
Loader2,
Edit3,
Menu,
X,
User,
FileText,
} from "lucide-react";
import ArticleEditor from "@/components/article-editor";

interface Article {
id: string;
title: string;
description: string | null;
content?: string | null;
tags: string[];
pdfUrl: string;
imageUrl?: string | null;
createdAt: string;
}

const parseArticleMeta = (html: string) => {
const parser = new DOMParser();
const doc = parser.parseFromString(html, "text/html");

const heading = doc.querySelector("h1, h2, h3, h4, h5, h6");
const firstParagraph = doc.querySelector("p");

const title =
heading?.textContent?.trim() ||
firstParagraph?.textContent?.trim().split("\n")[0] ||
"";

let description = "";

if (heading && firstParagraph) {
description = firstParagraph.textContent?.trim() || "";
} else if (firstParagraph) {
description = firstParagraph.textContent?.trim() || "";
}

if (!description) {
const text = doc.body.textContent?.trim() || "";
description = text.slice(0, 240);
}

return {
title,
description,
};
};

export default function StudentArticlesPage() {
const [articles, setArticles] = useState<Article[]>([]);
const [content, setContent] = useState("<p></p>");
const [tags, setTags] = useState("");
const [file, setFile] = useState<File | null>(null);
const [editingId, setEditingId] = useState<string | null>(null);
const [uploading, setUploading] = useState(false);
const [loading, setLoading] = useState(true);
const [sidebarOpen, setSidebarOpen] = useState(false);

const fileInputRef = useRef<HTMLInputElement>(null);

useEffect(() => {
fetchArticles();
}, []);

const fetchArticles = async () => {
try {
const res = await fetch("/api/student/articles");


  if (!res.ok) {
    throw new Error("Falha ao buscar artigos");
  }

  const data = await res.json();
  setArticles(data);
} catch (err) {
  console.error(err);
  toast("Não foi possível carregar seus artigos.");
} finally {
  setLoading(false);
}

};

const clearForm = () => {
setContent("<p></p>");
setTags("");
setFile(null);
setEditingId(null);


if (fileInputRef.current) {
  fileInputRef.current.value = "";
}


};

const handleSubmit = async (e: React.FormEvent) => {
e.preventDefault();


const { title, description } = parseArticleMeta(content);

if (!title.trim()) {
  toast(
    "Inclua um título no editor usando um heading (H1 ou H2)."
  );
  return;
}

setUploading(true);

try {
  const formData = new FormData();

  formData.append("title", title);
  formData.append("description", description);
  formData.append("content", content);
  formData.append("tags", tags);

  if (file) {
    formData.append("file", file);
  }

  const url = editingId
    ? `/api/student/articles/${editingId}`
    : "/api/student/articles";

  const method = editingId ? "PATCH" : "POST";

  const res = await fetch(url, {
    method,
    body: formData,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error);
  }

  toast(
    editingId
      ? "Artigo atualizado com sucesso!"
      : "Artigo enviado com sucesso!"
  );

  clearForm();
  fetchArticles();
} catch (error) {
  console.error(error);

  toast(
    "Erro ao enviar o artigo. Verifique o PDF e tente novamente."
  );
} finally {
  setUploading(false);
}


};

const startEdit = (article: Article) => {
setEditingId(article.id);
setContent(article.content || "<p></p>");
setTags(article.tags.join(", "));
};

const cancelEdit = () => {
clearForm();
};

return ( <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
{sidebarOpen && (
<div
className="fixed inset-0 z-40 bg-black/40"
onClick={() => setSidebarOpen(false)}
/>
)}

  <aside
    className={`fixed top-0 left-0 z-50 h-screen w-72 border-r bg-white dark:bg-zinc-950 dark:border-zinc-800 transition-transform duration-300 ${
      sidebarOpen
        ? "translate-x-0"
        : "-translate-x-full"
    }`}
  >
    <div className="flex items-center justify-between border-b p-5">
      <h2 className="font-bold text-lg">
        Painel do Aluno
      </h2>

      <button
        onClick={() => setSidebarOpen(false)}
      >
        <X className="h-5 w-5" />
      </button>
    </div>

    <nav className="p-4 space-y-2">
      <Link
        href="/student/profile"
        className="flex items-center gap-3 rounded-xl p-3 hover:bg-zinc-100 dark:hover:bg-zinc-900"
      >
        <User className="h-5 w-5" />
        Meu Perfil
      </Link>

      <Link
        href="/student/articles"
        className="flex items-center gap-3 rounded-xl p-3 hover:bg-zinc-100 dark:hover:bg-zinc-900"
      >
        <FileText className="h-5 w-5" />
        Editor de Artigos
      </Link>
    </nav>
  </aside>

  <div className="mx-auto max-w-7xl px-6 py-8">
    <div className="mb-6 flex items-center gap-4">
      <button
        onClick={() => setSidebarOpen(true)}
        className="rounded-xl border bg-white p-3 shadow-sm"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-green-700">
          Painel do aluno
        </p>

        <h1 className="text-3xl font-bold">
          Editor de Artigos
        </h1>
      </div>
    </div>

    <div className="rounded-3xl border bg-white p-8 shadow-sm dark:bg-zinc-950">
      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <div className="space-y-2">
          <Label>Conteúdo do artigo</Label>

          <div className="rounded-2xl border p-4">
            <ArticleEditor
              value={content}
              onChange={(html) =>
                setContent(html)
              }
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Tags</Label>

          <Input
            value={tags}
            onChange={(e) =>
              setTags(e.target.value)
            }
            placeholder="Bíblia, Teologia, História"
          />
        </div>

        <div className="space-y-2">
          <Label>PDF (Opcional)</Label>

          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf"
            onChange={(e) =>
              setFile(
                e.target.files?.[0] ?? null
              )
            }
          />
        </div>

        <div className="flex gap-3">
          <Button
            type="submit"
            disabled={uploading}
          >
            {uploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Salvando...
              </>
            ) : editingId ? (
              <>
                <Edit3 className="mr-2 h-4 w-4" />
                Atualizar
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Publicar
              </>
            )}
          </Button>

          {editingId && (
            <Button
              type="button"
              variant="outline"
              onClick={cancelEdit}
            >
              Cancelar
            </Button>
          )}
        </div>
      </form>
    </div>

    <div className="mt-10">
      <h2 className="mb-4 text-2xl font-bold">
        Seus Artigos
      </h2>

      {loading ? (
        <div className="rounded-2xl border bg-white p-6">
          Carregando...
        </div>
      ) : articles.length === 0 ? (
        <div className="rounded-2xl border bg-white p-6">
          Nenhum artigo publicado.
        </div>
      ) : (
        <div className="space-y-4">
          {articles.map((article) => (
            <article
              key={article.id}
              className="rounded-2xl border bg-white p-6 shadow-sm"
            >
              <h3 className="font-semibold text-lg">
                {article.title}
              </h3>

              <p className="mt-2 text-sm text-zinc-500">
                {article.description}
              </p>

              <div className="mt-4 flex gap-2">
                <Button
                  type="button"
                  onClick={() =>
                    startEdit(article)
                  }
                >
                  Editar
                </Button>

                <a
                  href={article.pdfUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button variant="outline">
                    PDF
                  </Button>
                </a>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  </div>
</div>


);
}
