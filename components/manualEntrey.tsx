"use client";

import { useState } from "react";
import { toast } from "sonner";  // Importando o toast
import "react-toastify/dist/ReactToastify.css";  // Estilos do react-toastify
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const ManualEntry = () => {
  const [manualId, setManualId] = useState("");  // Estado para armazenar o ID digitado

  const handleManualEntry = async () => {
    if (!manualId.trim()) {
      toast.error("O ID do aluno não pode estar vazio.");  // Toast de erro
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
        toast.success(`${actionText} para ${data.name}`);  // Toast de sucesso
      } else {
        toast.error(data.error || "Erro no servidor");  // Toast de erro
      }
    } catch {
      toast.error("Falha ao comunicar com o servidor");  // Toast de erro
    }

    setManualId(""); // Limpa o campo após o envio
  };

  return (
    <div className="p-4 mt-6 bg-gray-100 rounded-md shadow-md">
      <h2 className="text-lg font-semibold mb-4">Registrar Entrada Manualmente</h2>
      <div className="flex">
        <Input
          type="text"
          value={manualId}
          onChange={(e) => setManualId(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
          placeholder="Digite o ID do aluno"
        />
        <Button
          onClick={handleManualEntry}
          className="ml-2 p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Registrar Entrada
        </Button>
      </div>
    </div>
  );
};

export default ManualEntry;
