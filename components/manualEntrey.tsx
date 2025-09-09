"use client";

import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const ManualEntry = () => {
  const [manualId, setManualId] = useState("");  // Estado para armazenar o ID digitado
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);  // Mensagem de status

  const handleManualEntry = async () => {
    if (!manualId.trim()) {
      setMessage({ type: "error", text: "O ID do aluno não pode estar vazio." });
      return;
    }

    try {
      // Envia a requisição para registrar a entrada
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
    <div className="p-4 mt-6 rounded-md shadow-md">
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
      <h2 className="text-lg font-semibold mb-4">Registrar Entrada Manualmente</h2>
      <div className="flex">
        <Input
          type="text"
          value={manualId}
          onChange={(e) => setManualId(e.target.value)}
          className="p-2 border rounded-md"
          placeholder="Digite o ID do aluno"
        />
        <Button
          onClick={handleManualEntry}
          className="ml-2 p-2 "
        >
          Registrar Entrada
        </Button>
      </div>
    </div>
  );
};

export default ManualEntry;
