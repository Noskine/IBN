"use client";

import { GalleryVerticalEnd } from "lucide-react";
import { LoginForm } from "@/components/login-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { ThemeSwitch } from "@/components/theme-switch";
import Image from "next/image";
import icon from "@/assets/icon.png";

export default function HomePage() {
  const router = useRouter();
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get("email");
    const password = form.get("password");
    console.log(email, password);

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
        <div className='w-full flex justify-between gap-2'>
          <Image
            src={icon}
            alt='icon'
            className='size-5! dark:brightness-[100]'
          />
          Instítuto Bíblico do Norte
          <ThemeSwitch />
        </div>
        <div className='flex flex-1 items-center justify-center'>
          <div className='w-full max-w-xs'>
            <LoginForm onSubmit={handleSubmit} />
            {error && (
              <p className='text-red-500 text-xs text-center mt-4'>{error}</p>
            )}
          </div>
        </div>
      </div>
      <div className='bg-muted relative hidden lg:block'>
        <Image
          src='/001.jpg'
          alt='Image'
          className='absolute inset-0 h-full w-full object-cover brightness-[] dark:brightness-[0.2] dark:grayscale'
        />
      </div>
    </div>
  );
}
