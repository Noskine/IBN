"use client";

import { useEffect, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle, AlertCircle } from "lucide-react";

export default function ScannerListener() {
  const [buffer, setBuffer] = useState("");
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [manualId, setManualId] = useState("");  // Novo estado para o ID manual
  const [isManualEntry, setIsManualEntry] = useState(false);  // Flag para ativar/desativar a entrada manual

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

  const handleManualEntry = async () => {
    if (!manualId.trim()) {
      setMessage({ type: "error", text: "O ID do aluno não pode estar vazio." });
      return;
    }

    try {
      const res = await fetch("/api/attendance/toggle", {
        method: "POST",
        body: JSON.stringify({ peopleId: manualId }),
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

    setManualId(""); // Limpa o campo após o envio
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

      {/* Entrada manual do aluno */}
      <div className="p-4 mt-6 bg-gray-100 rounded-md shadow-md">
        <h2 className="text-lg font-semibold mb-4">Registrar Entrada Manualmente</h2>
        <div className="flex">
          <input
            type="text"
            value={manualId}
            onChange={(e) => setManualId(e.target.value)}
            className="p-2 border border-gray-300 rounded-md"
            placeholder="Digite o ID do aluno"
          />
          <button
            onClick={handleManualEntry}
            className="ml-2 p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Registrar Entrada
          </button>
        </div>
      </div>

      {/* Alternar entre scanner e entrada manual */}
      <div className="mt-4">
        <button
          onClick={() => setIsManualEntry(!isManualEntry)}
          className="p-2 bg-gray-200 text-black rounded-md hover:bg-gray-300"
        >
          {isManualEntry ? "Usar Scanner" : "Usar Entrada Manual"}
        </button>
      </div>
    </>
  );
}
