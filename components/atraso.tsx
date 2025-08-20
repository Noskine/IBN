"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

type Loan = {
  id: string;
  people: { name: string };
  book: { title: string };
  dueDate: string;
};

export default function Atrasados() {
  const [loans, setLoans] = useState<Loan[]>([]);

  useEffect(() => {
    const fetchLoans = async () => {
      const res = await fetch("/api/loan/late");
      const data = await res.json();
      setLoans(data);
    };
    fetchLoans();
  }, []);

  const handleExportPDF = () => {
    window.open("/api/loan/late/pdf", "_blank");
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Empréstimos Atrasados</h1>
      {loans.length === 0 ? (
        <p>Nenhum empréstimo atrasado encontrado.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border p-2">Aluno</th>
              <th className="border p-2">Livro</th>
              <th className="border p-2">Data de Devolução</th>
            </tr>
          </thead>
          <tbody>
            {loans.map((loan) => (
              <tr key={loan.id}>
                <td className="border p-2">{loan.people.name}</td>
                <td className="border p-2">{loan.book?.title}</td>
                <td className="border p-2">
                  {new Date(loan.dueDate).toLocaleDateString("pt-BR")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <Button onClick={handleExportPDF} className="mt-4">
        Exportar para PDF
      </Button>
    </div>
  );
}
