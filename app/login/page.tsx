"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { LoginForm } from "@/components/login-form";
import Link from "next/link";
import { Separator } from "@radix-ui/react-dropdown-menu";

import icon from "@/assets/icon.png";
import Image from "next/image";

export default function LoginPage() {
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
      router.push("/dashboard");
    } else {
      setError("Credenciais inválidas");
    }
  };

  return (
    <div className='grid min-h-svh lg:grid-cols-2'>
      <div className='flex flex-col gap-4 p-6 md:p-10'>
        <div className='w-full flex justify-between items-center gap-2'>
          <div className='flex items-center gap-2'>
            <Image
              src={icon}
              alt='icon'
              className='size-7! dark:brightness-0 dark:invert'
            />
            <span className='font-bold'>Instituto Bíblico do Norte</span>
          </div>
        </div>
        <div className='flex flex-col flex-1 items-center justify-center'>
          <div className='w-full max-w-xs'>
            <LoginForm onSubmit={handleSubmit} />
            {error && (
              <p className='text-red-700 dark:text-red-400 font-bold text-xs text-center mt-4'>Senha ou email inválidos</p>
            )}
            <div className='mt-6 text-center'>
              <p className='text-sm text-zinc-500'>Apenas o bibliotecário pode publicar novos artigos.</p>
              <Link href='/' className='inline-flex items-center justify-center rounded-full border border-zinc-300 bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-800 transition hover:bg-zinc-200'>Voltar à home</Link>
            </div>
          </div>
        </div>
        <Separator className='my-1 border-zinc-300 dark:border-zinc-700' />
        <footer>
          <p className="text-[11px] text-center font-medium">
             &copy; {new Date().getFullYear()} - Todos os direitos reservados ao Instituto Bíblico do Norte.
          </p>
        </footer>
      </div>
      <div className='bg-muted relative hidden lg:block'>
        <Image
          src='https://images.pexels.com/photos/34601164/pexels-photo-34601164.jpeg'
          alt='Image'
          width={0}
          height={0}
          className='absolute inset-0 h-full! w-full! object-cover brightness-[] dark:brightness-[0.2] dark:grayscale'
        />
      </div>
    </div>
  );
}