"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Upload, FileText, Loader2 } from "lucide-react";

interface Article {
  id: string;
  title: string;
  description: string | null;
  tags: string[];
  pdfUrl: string;
  imageUrl?: string | null;
  createdAt: string;
}

export default function DashboardArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const res = await fetch("/api/articles");
      if (!res.ok) throw new Error("Falha ao buscar artigos");
      const data = await res.json();
      setArticles(data);
    } catch (err) {
      console.error(err);
      toast("Não foi possível carregar os artigos.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] ?? null;
    setFile(selected);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] ?? null;
    setImage(selected);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast("Informe o título do artigo.");
      return;
    }
    if (!file) {
      toast("Selecione um arquivo PDF.");
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("file", file);
      if (image) formData.append("image", image);

      const res = await fetch("/api/articles", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Erro ao enviar artigo.");
      }

      toast("Artigo enviado com sucesso!");
      setTitle("");
      setDescription("");
      setFile(null);
      setImage(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      if (imageInputRef.current) imageInputRef.current.value = "";
      fetchArticles();
    } catch (error) {
      console.error(error);
      toast("Erro ao enviar o artigo. Verifique o PDF e tente novamente.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-1 flex-col px-4 mt-6 lg:px-6">
      <div className="space-y-6 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <FileText className="size-6 text-emerald-600" />
            <div>
              <h1 className="text-2xl font-semibold">Publicar artigo</h1>
              <p className="text-sm text-zinc-500">
                Envie um PDF para o acervo da biblioteca.
              </p>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Título do artigo</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Informe o título"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Descrição (opcional)</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Resumo ou nota sobre o artigo"
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pdf">Arquivo PDF</Label>
              <input
                ref={fileInputRef}
                id="pdf"
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className="file:border-0 file:bg-emerald-500 file:text-white file:px-3 file:py-2 file:rounded-md"
              />
              {file && (
                <p className="text-sm text-zinc-500">
                  Selecionado: <strong>{file.name}</strong>
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="image">Imagem (opcional)</Label>
              <input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="file:border-0 file:bg-zinc-200 file:px-3 file:py-2 file:rounded-md"
              />
              {image && (
                <p className="text-sm text-zinc-500">
                  Selecionada: <strong>{image.name}</strong>
                </p>
              )}
            </div>
          </div>
          <Button type="submit" disabled={uploading} className="w-full md:w-auto">
            {uploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Enviando...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" /> Enviar artigo
              </>
            )}
          </Button>
        </form>
      </div>

      <section className="mt-6">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">Últimos artigos</h2>
        <div className="mt-4 space-y-4">
          {loading ? (
            <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
              Carregando artigos...
            </div>
          ) : articles.length === 0 ? (
            <div className="rounded-3xl border border-zinc-200 bg-white p-6 text-zinc-600 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400">
              Nenhum artigo cadastrado ainda.
            </div>
          ) : (
            articles.map((article) => (
              <article key={article.id} className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">{article.title}</h3>
                    <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">{article.description || "Sem descrição."}</p>
                    {article.tags?.length ? (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {article.tags.map((tag) => (
                          <span key={tag} className="rounded-full bg-zinc-100 px-2 py-1 text-xs font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                            {tag}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </div>
                  <a
                    href={article.pdfUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="self-start rounded-full border border-emerald-500 px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50 dark:border-emerald-500 dark:text-emerald-300 dark:hover:bg-emerald-600/10"
                  >
                    Abrir PDF
                  </a>
                </div>
                <p className="mt-3 text-xs text-zinc-400 dark:text-zinc-500">
                  Publicado em {new Date(article.createdAt).toLocaleDateString("pt-BR", { year: "numeric", month: "short", day: "numeric" })}
                </p>
              </article>
            ))
          )}
        </div>
      </section>
    </div>
  );
}