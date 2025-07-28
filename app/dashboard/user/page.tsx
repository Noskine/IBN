"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusCircle } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

export default function NewUserPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [url, setUrl] = useState("");
  const [isAdm, setIsAdm] = useState("");

  const searchParams = useSearchParams(); 
  const router = useRouter();             

  useEffect(() => {
    const query = searchParams.get("email");

    fetch(`/api/user/adm?id=${query}`).then((res) => {
      if (!res.ok) {
        router.push("/dashboard");
      }
    });
  }, []); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          url,
          isAdm,
        }),
      });

      if (!res.ok) {
        console.error("Erro ao criar usuário", res);
      } else {
        toast("Usuário criado com sucesso! ✅")
        router.push("/dashboard")
      }
    } catch (err) {
      console.error("Erro na requisição:", err);
    }
  };

  return (
    <main className='flex items-center justify-center w-full min-h-screen'>
      <section className='w-full md:w-1/2 lg:w-1/3  md:shadow-xl md:dark:bg-zinc-900 px-4 lg:px-6 py-6 rounded-2xl'>
        <div className='flex border-b mb-3 py-1 items-center justify-between'>
          <h1 className='font-bold text-xl flex items-center gap-1'>
            Cadastro de Usuário
            <PlusCircle className='size-4' />
          </h1>
        </div>
        <form onSubmit={handleSubmit} className='space-y-2'>
          <div className='flex gap-2'>
            <div className='w-1/2 space-y-2'>
              <Label htmlFor='name' className='text-xs'>
                Nome/Sobrenome
              </Label>
              <Input
                id='name'
                name='name'
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder='João Maria'
              />
            </div>
            <div className='w-1/2 space-y-2'>
              <Label htmlFor='email' className='text-xs'>
                Email
              </Label>
              <Input
                name='email'
                id='email'
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='exemplo@ibn.org'
              />
            </div>
          </div>
          <Label htmlFor='password' className='text-xs'>
            Senha
          </Label>
          <Input
            name='password'
            id='password'
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='...'
          />
          <Label htmlFor='url' className='text-xs'>
            URL de uma Foto
          </Label>
          <Input
            name='url'
            id='url'
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder='https://foto.com'
          />
          <Label className='text-xs'>Administrador?</Label>
          <Select onValueChange={setIsAdm}>
            <SelectTrigger className='w-full'>
              <SelectValue placeholder='IsAdm' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Sim ou não</SelectLabel>
                <SelectItem value='Yes'>Sim</SelectItem>
                <SelectItem value='No'>Não</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Button type='submit' className='w-full mt-3 cursor-pointer'>
            Criar
          </Button>
        </form>
      </section>
    </main>
  );
}
