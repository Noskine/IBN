"use client";

import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle, AlertCircle } from "lucide-react";
import { useRef, useEffect, useState } from "react";

export default function RegisterEntryPage() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleSubmit = async (peopleId: string) => {
    try {
      const res = await fetch("/api/attendance", {
        method: "POST",
        body: JSON.stringify({ peopleId }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        setMessage({
          type: "success",
          text: "Entrada registrada com sucesso!",
        });
      } else {
        setMessage({ type: "error", text: "Erro ao registrar entrada." });
      }
    } catch (err) {
      setMessage({ type: "error", text: "Erro na requisição." });
    }

    setTimeout(() => setMessage(null), 4000);
  };

  useEffect(() => {
    // Foca automaticamente no input quando a página carregar
    const focusInput = () => inputRef.current?.focus();
    focusInput();

    // Garante que o input continue focado mesmo após cliques fora
    window.addEventListener("click", focusInput);
    return () => window.removeEventListener("click", focusInput);
  }, []);

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const value = inputRef.current?.value.trim();
      if (value) {
        await handleSubmit(value);
        if (inputRef.current) inputRef.current.value = "";
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <h1 className="text-2xl font-bold mb-6">Registro de Entrada</h1>

      <Input
        ref={inputRef}
        placeholder="Escaneie o código de barras"
        className="text-center text-lg max-w-sm"
        onKeyDown={handleKeyDown}
      />

      {message && (
        <Alert
          variant={message.type === "success" ? "default" : "destructive"}
          className="mt-6 max-w-sm"
        >
          {message.type === "success" ? (
            <CheckCircle className="h-5 w-5 text-green-500" />
          ) : (
            <AlertCircle className="h-5 w-5 text-red-500" />
          )}
          <AlertTitle>
            {message.type === "success" ? "Sucesso" : "Erro"}
          </AlertTitle>
          <AlertDescription>{message.text}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}
