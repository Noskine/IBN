// components/ScannerListener.tsx
"use client";

import { useEffect, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle, AlertCircle } from "lucide-react";

export default function ScannerListener() {
  const [buffer, setBuffer] = useState("");
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (timeout) clearTimeout(timeout);

      if (e.key === "Enter") {
        if (buffer.trim()) {
          processScan(buffer.trim());
          setBuffer("");
        }
      } else {
        setBuffer((prev) => prev + e.key);
        timeout = setTimeout(() => setBuffer(""), 500);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [buffer]);

  const processScan = async (rawInput: string) => {
    let peopleId = rawInput.startsWith("F2") ? rawInput.slice(2) : rawInput;

    try {
      const res = await fetch("/api/attendance/toggle", {
        method: "POST",
        body: JSON.stringify({ peopleId }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (res.ok) {
        const actionText = data.action === "entry" ? "Entrada registrada" : "Saída registrada";
        setMessage({ type: "success", text: `${actionText} para ${data.name}` });
      } else {
        setMessage({ type: "error", text: data.error || "Erro no servidor" });
      }
    } catch {
      setMessage({ type: "error", text: "Falha ao comunicar com o servidor" });
    }

    setTimeout(() => setMessage(null), 4000);
  };

  return (
    <>
      {message && (
        <Alert
          variant={message.type === "success" ? "default" : "destructive"}
          className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 max-w-md"
        >
          {message.type === "success" ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
          <AlertTitle>{message.type === "success" ? "Sucesso" : "Erro"}</AlertTitle>
          <AlertDescription>{message.text}</AlertDescription>
        </Alert>
      )}
    </>
  );
}
