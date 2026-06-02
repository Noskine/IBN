"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Upload, FileText, Loader2, Edit3, Trash2 } from "lucide-react";
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

export default function StudentArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("<p></p>");
  const [tags, setTags] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const res = await fetch("/api/student/articles");
      if (!res.ok) throw new Error("Falha ao buscar artigos");
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
    setTitle("");
    setDescription("");
    setContent("<p></p>");
    setTags("");
    setFile(null);
    setImage(null);
    setEditingId(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (imageInputRef.current) imageInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast("Informe o título do artigo.");
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("content", content);
      formData.append("tags", tags);
      if (file) formData.append("file", file);
      if (image) formData.append("image", image);

      const url = editingId ? `/api/student/articles/${editingId}` : "/api/student/articles";
      const method = editingId ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Erro ao salvar o artigo.");
      }

      toast(editingId ? "Artigo atualizado com sucesso!" : "Artigo enviado com sucesso!");
      clearForm();
      fetchArticles();
    } catch (error) {
      console.error(error);
      toast("Erro ao enviar o artigo. Verifique o PDF e tente novamente.");
    } finally {
      setUploading(false);
    }
  };

  const startEdit = (article: Article) => {
    setEditingId(article.id);
    setTitle(article.title);
    setDescription(article.description || "");
    setContent(article.content || "<p></p>");
    setTags(article.tags.join(", "));
  };

  const cancelEdit = () => {
    clearForm();
  };

  return (
    <div className="mx-auto flex min-h-svh max-w-6xl flex-col gap-8 px-4 py-10 lg:px-8">
      <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-green-700 font-medium">Painel do aluno</p>
            <h1 className="text-3xl font-bold text-zinc-950 dark:text-zinc-100">Meus artigos</h1>
          </div>
          <div className="rounded-3xl border border-zinc-200 bg-zinc-100 px-4 py-3 text-sm dark:border-zinc-800 dark:bg-zinc-900">
            Aqui você pode criar ou atualizar artigos com Markdown.
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.3fr_0.9fr]">
        <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Título do artigo</Label>
                <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Título" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Resumo do artigo" rows={3} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tags">Tags (separadas por vírgula)</Label>
                <Input id="tags" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="Bíblia, Teologia, História" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Conteúdo</Label>
                <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-900">
                  <ArticleEditor value={content} onChange={(html) => setContent(html)} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="pdf">Arquivo PDF (opcional)</Label>
                <input
                  ref={fileInputRef}
                  id="pdf"
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                  className="file:border-0 file:bg-emerald-500 file:text-white file:px-3 file:py-2 file:rounded-md"
                />
                {file && <p className="text-sm text-zinc-500">Selecionado: <strong>{file.name}</strong></p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">Imagem de capa (opcional)</Label>
                <input
                  ref={imageInputRef}
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files?.[0] ?? null)}
                  className="file:border-0 file:bg-zinc-200 file:px-3 file:py-2 file:rounded-md"
                />
                {image && <p className="text-sm text-zinc-500">Selecionada: <strong>{image.name}</strong></p>}
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button type="submit" disabled={uploading} className="w-full md:w-auto">
                {uploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Salvando...
                  </>
                ) : editingId ? (
                  <><Edit3 className="mr-2 h-4 w-4" /> Atualizar artigo</>
                ) : (
                  <><Upload className="mr-2 h-4 w-4" /> Enviar artigo</>
                )}
              </Button>
              {editingId && (
                <Button type="button" variant="outline" onClick={cancelEdit} className="w-full md:w-auto">
                  Cancelar edição
                </Button>
              )}
            </div>
          </form>
        </div>

        <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          <h2 className="text-xl font-semibold text-zinc-950 dark:text-zinc-100">Pré-visualização</h2>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">Pré-visualização do conteúdo do artigo (renderizado como HTML).</p>
          <div className="mt-4 rounded-3xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="rounded-2xl border border-zinc-200 bg-white p-4 text-sm dark:border-zinc-800 dark:bg-zinc-950">
              <div dangerouslySetInnerHTML={{ __html: content }} />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-zinc-950 dark:text-zinc-100">Seus artigos</h2>
        {loading ? (
          <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            Carregando artigos...
          </div>
        ) : articles.length === 0 ? (
          <div className="rounded-3xl border border-zinc-200 bg-white p-6 text-zinc-600 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400">
            Você ainda não publicou nenhum artigo.
          </div>
        ) : (
          <div className="grid gap-4">
            {articles.map((article) => (
              <article key={article.id} className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-zinc-950 dark:text-zinc-100">{article.title}</h3>
                    <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">{article.description || "Sem descrição"}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {article.tags.map((tag) => (
                        <span key={tag} className="rounded-full bg-zinc-100 px-2 py-1 text-xs font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-3 sm:items-end">
                    <a
                      href={article.pdfUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full border border-emerald-500 px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50 dark:border-emerald-500 dark:text-emerald-300 dark:hover:bg-emerald-600/10"
                    >
                      Abrir PDF
                    </a>
                    <div className="flex gap-2">
                      <Button type="button" onClick={() => startEdit(article)}>
                        <Edit3 className="mr-2 h-4 w-4" /> Editar
                      </Button>
                    </div>
                  </div>
                </div>
                <p className="mt-3 text-xs text-zinc-400 dark:text-zinc-500">Publicado em {new Date(article.createdAt).toLocaleDateString("pt-BR", { year: "numeric", month: "short", day: "numeric" })}</p>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
