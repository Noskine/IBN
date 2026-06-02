import { auth } from "@/app/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function StudentPage() {
  const session = await auth();

  if (!session?.user) {
    return null;
  }

  const student = await prisma.user.findUnique({
    where: { email: session.user.email! },
    select: {
      name: true,
      className: true,
      year: true,
      urlImage: true,
    },
  });

  return (
    <div className="mx-auto flex min-h-svh max-w-6xl flex-col gap-8 px-4 py-10 lg:px-8">
      <div className="rounded-3xl border p-8 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <p className="text-sm uppercase tracking-[0.3em] text-blue-700">Área exclusiva do aluno</p>
            <h1 className="text-4xl font-bold text-zinc-950 dark:text-zinc-100">Bem-vindo{student?.name ? `, ${student.name}` : ""}</h1>
            <p className="max-w-2xl text-sm leading-7 text-zinc-600 dark:text-zinc-400">
              Aqui você pode criar, editar e publicar seus próprios artigos em um espaço reservado, com tags e conteúdo em Markdown.
            </p>
          </div>
          <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-4 text-sm dark:border-zinc-800 dark:bg-zinc-900">
            <p className="font-semibold text-zinc-900 dark:text-zinc-100">Turma</p>
            <p>{student?.className || "Não informado"}</p>
            <p className="mt-3 font-semibold text-zinc-900 dark:text-zinc-100">Ano</p>
            <p>{student?.year || "Não informado"}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_0.9fr]">
        <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          <h2 className="text-2xl font-semibold text-zinc-950 dark:text-zinc-100">Publicar ou editar artigos</h2>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">Acesse seu painel para ver seus artigos, editar conteúdos em Markdown e contribuir com a biblioteca.</p>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row">
            <Link href="/student/articles" className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700">
              Ir para meus artigos
            </Link>
            <Link href="/" className="rounded-2xl border border-zinc-200 bg-zinc-100 px-5 py-3 text-sm font-semibold text-zinc-800 transition hover:bg-zinc-200 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100">
              Voltar à home
            </Link>
          </div>
        </div>

        <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          <h2 className="text-2xl font-semibold text-zinc-950 dark:text-zinc-100">Contribua com o projeto</h2>
          <ul className="mt-5 space-y-4 text-sm text-zinc-600 dark:text-zinc-400">
            <li>• Escreva artigos sobre temas bíblicos, estudos e trabalhos.</li>
            <li>• Use tags para organizar o assunto do conteúdo.</li>
            <li>• Faça upload do PDF e adicione uma imagem de capa.</li>
            <li>• Edite em Markdown e veja o conteúdo renderizado.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
