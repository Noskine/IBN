"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { LoginForm } from "@/components/login-form";
import Link from "next/link";

export default function StudentLoginPage() {
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get("email");
    const password = form.get("password");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.ok) {
      router.push("/student");
    } else {
      setError("Credenciais inválidas");
    }
  };

  return (
    <div className='grid min-h-svh lg:grid-cols-2'>
      <div className='flex flex-col gap-4 p-6 md:p-10'>
        <div className='w-full flex justify-between items-center gap-2'>
          <div className='flex items-center gap-2'>
            <span className='text-xl font-bold'>Área dos alunos</span>
          </div>
        </div>
        <div className='flex flex-col flex-1 items-center justify-center'>
          <div className='w-full max-w-xs'>
            <LoginForm onSubmit={handleSubmit} />
            {error && (
              <p className='text-red-700 dark:text-red-400 font-bold text-xs text-center mt-4'>Senha ou email inválidos</p>
            )}
            <div className='mt-6 text-center'>
              <p className='text-sm text-zinc-500'>Use seu acesso de aluno para postar artigos e editar seus próprios conteúdos.</p>
              <Link href='/' className='inline-flex items-center justify-center rounded-full border border-zinc-300 bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-800 transition hover:bg-zinc-200'>Voltar à home</Link>
            </div>
          </div>
        </div>
      </div>
      <div className='bg-muted relative hidden lg:block'>
        <div className='absolute inset-0 h-full w-full bg-[url(https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg)] bg-cover bg-center opacity-80' />
      </div>
    </div>
  );
}
