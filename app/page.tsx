import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { format } from "date-fns";
import HeaderHome from "@/components/home/HeaderHome";

export const metadata = {
  title: "Biblioteca Pública - Instituto Bíblico do Norte",
};

type Article = {
  id: string;
  title: string;
  description: string | null;
  content?: string | null;
  tags: string[];
  pdfUrl: string;
  imageUrl?: string | null;
  createdAt: string;
  author?: {
    name: string;
    className?: string | null;
    year?: string | null;
  } | null;
};

export default async function HomePage() {
  const articles = await prisma.article.findMany({
    orderBy: { createdAt: "desc" },
    include: { author: true },
  });

  return (
    <>
      <HeaderHome top={true} />
      <main className="mx-auto flex min-h-svh max-w-7xl flex-col gap-8 px-4 py-10 lg:px-8">
        <section className="grid gap-10 lg:grid-cols-[1.3fr_0.9fr]">
          <div className="space-y-6 rounded-3xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900 shadow-lg shadow-black/40 ">
            <div className="space-y-3 ">
              <p className="text-sm uppercase tracking-[0.3em] text-emerald-700">Biblioteca pública</p>
              <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-100">Artigos acadêmicos e trabalhos dos alunos</h1>
              <p className="max-w-2xl text-sm leading-7 text-zinc-600 dark:text-zinc-400">
                Navegue pelos artigos disponíveis no acervo. Apenas o bibliotecário pode publicar novos documentos dentro do sistema após login.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Link
                href="/login"
                className="rounded-2xl border border-emerald-500 bg-emerald-50 px-5 py-4 text-center text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100"
              >
                Login do bibliotecário
              </Link>
              <Link
                href="/student/login"
                className="rounded-2xl border border-blue-500 bg-blue-50 px-5 py-4 text-center text-sm font-semibold text-blue-700 transition hover:bg-blue-100"
              >
                Login do aluno
              </Link>
              <Link
                href="#articles"
                className="rounded-2xl border border-zinc-200 bg-zinc-100 px-5 py-4 text-center text-sm font-semibold text-zinc-800 transition hover:bg-zinc-200 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
              >
                Ver artigos publicados
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">Como funciona</h2>
            <ul className="mt-5 space-y-4 text-sm text-zinc-600 dark:text-zinc-400">
              <li>• Acesso público para consulta de artigos disponíveis no acervo.</li>
              <li>• Apenas bibliotecário logado pode cadastrar novos artigos.</li>
              <li>• Os arquivos em PDF são armazenados no Supabase e ligados ao registro do artigo.</li>
              <li>• O leitor pode abrir cada PDF diretamente pela lista.</li>
            </ul>
          </div>
        </section>

        <section id="articles" className="space-y-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-zinc-950 dark:text-zinc-100">Artigos disponíveis</h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">Veja os últimos documentos publicados pela biblioteca.</p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {articles.length === 0 ? (
              <div className="rounded-3xl border border-zinc-200 bg-white p-6 text-zinc-600 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400">
                Nenhum artigo foi publicado ainda.
              </div>
            ) : (
              articles.map((article) => (
                <article key={article.id} className="overflow-hidden rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:border-emerald-400 dark:border-zinc-800 dark:bg-zinc-950">
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.25em] text-emerald-700">Artigo</p>
                      <h3 className="mt-2 text-lg font-semibold text-zinc-900 dark:text-zinc-100">{article.title}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                      {article.author ? (
                        <span className="rounded-full bg-emerald-100 px-2 py-1 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
                          {article.author.name}
                          {article.author.className ? ` • ${article.author.className}` : ""}
                          {article.author.year ? ` • ${article.author.year}` : ""}
                        </span>
                      ) : (
                        <span className="rounded-full bg-zinc-100 px-2 py-1 dark:bg-zinc-800">
                          Biblioteca
                        </span>
                      )}
                    </div>
                    <div className="mt-3">
                      {article.imageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={article.imageUrl} alt={article.title} className="h-40 w-full object-cover rounded-lg" />
                      ) : (
                        <div className="flex h-40 items-center justify-center rounded-lg bg-zinc-100 text-zinc-400">Sem imagem</div>
                      )}
                    </div>
                    <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                      {article.description || "Sem descrição disponível."}
                    </p>
                    {article.tags.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {article.tags.map((tag) => (
                          <span key={tag} className="rounded-full bg-zinc-100 px-2 py-1 text-xs font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-xs text-zinc-400 dark:text-zinc-500">
                        Publicado em {format(new Date(article.createdAt), "dd/MM/yyyy")}
                      </p>
                      <Link
                        href={article.pdfUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full border border-emerald-500 px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50 dark:border-emerald-500 dark:text-emerald-300 dark:hover:bg-emerald-600/10"
                      >
                        Abrir PDF
                      </Link>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>
        </section>
      </main>
    </>
  );
}