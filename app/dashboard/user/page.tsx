"use client";

import { useEffect, useState, useRef } from "react";
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
import { PlusCircle, Upload, User, Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

export default function NewUserPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [url, setUrl] = useState("");
  const [isAdm, setIsAdm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const query = searchParams.get("email");

    fetch(`/api/user/adm?id=${query}`).then((res) => {
      if (!res.ok) {
        router.push("/dashboard");
      }
    });
  }, [router, searchParams]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Erro ao fazer upload");
      }

      const data = await res.json();
      setUrl(data.url);
      toast("Foto carregada com sucesso! 📸");
    } catch (err) {
      console.error("Erro no upload:", err);
      toast("Erro ao carregar foto. Tente novamente.", {
        description: "Configure o Supabase Storage primeiro",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
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
        toast("Erro ao criar usuário");
      } else {
        toast("Usuário criado com sucesso! ✅");
        router.push("/dashboard");
      }
    } catch (err) {
      console.error("Erro na requisição:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex items-center justify-center w-full min-h-screen p-4 bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-950 dark:to-zinc-900">
      <section className="w-full max-w-md bg-white dark:bg-zinc-900 shadow-xl rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800">


        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <section className="flex items-start justify-start">
            {/* Header com gradiente */}
            <div className=" text-white">
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-2xl">Novo Usuário</h1>
              </div>
              <p className="text-emerald-100 text-sm mt-1">
                Preencha os dados para cadastrar
              </p>
            </div>

            {/* Foto de perfil */}
            <div className="flex flex-col items-center px-2">
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-zinc-100 dark:bg-zinc-800 border-4 flex items-center justify-center overflow-hidden">
                  {url ? (
                    <img
                      src={url}
                      alt="Foto de perfil"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="size-8 text-zinc-400" />
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="absolute bottom-[-5px] right-[-15px] bg-emerald-500 hover:bg-emerald-600 text-white p-2 rounded-full shadow-lg transition-colors disabled:opacity-50"
                >
                  {isUploading ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <Upload className="size-4" />
                  )}
                </button>
              </div>
              <p className="text-xs text-zinc-500 mt-2">
                Clique no ícone para adicionar foto
              </p>
            </div>
          </section>


          {/* Nome e Email na mesma linha */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-xs font-medium">
                Nome Completo
              </Label>
              <Input
                id="name"
                name="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="João Maria"
                className="h-10"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs font-medium">
                Email
              </Label>
              <Input
                name="email"
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="exemplo@ibn.org"
                className="h-10"
              />
            </div>
          </div>

          {/* Senha */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-xs font-medium">
              Senha
            </Label>
            <Input
              name="password"
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="h-10"
            />
          </div>

          {/* URL (oculto se tiver foto) */}
          {url && (
            <div className="space-y-2">
              <Label htmlFor="url" className="text-xs font-medium">
                URL da Foto
              </Label>
              <Input
                name="url"
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="h-10 text-xs bg-zinc-50 dark:bg-zinc-800"
                readOnly
              />
            </div>
          )}

          {/* Administrador */}
          <div className="space-y-2">
            <Label className="text-xs font-medium">Nível de Acesso</Label>
            <Select onValueChange={setIsAdm} required>
              <SelectTrigger className="h-10 w-full">
                <SelectValue placeholder="Selecione o nível" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Permissão</SelectLabel>
                  <SelectItem value="No">Usuário Comum</SelectItem>
                  <SelectItem value="Yes">Administrador</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Botão submit */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-11 bg-emerald-500 cursor-pointer hover:bg-emerald-700 transition-colors"
          >
            {isLoading ? (
              <>
                <Loader2 className="size-4 animate-spin mr-2" />
                Criando...
              </>
            ) : (
              <>
                <PlusCircle className="size-4 mr-2" />
                Criar Usuário
              </>
            )}
          </Button>
        </form>
      </section>
    </main>
  );
}
