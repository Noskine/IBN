"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

interface Loan {
  id: string;
  loanDate: string;
  book: { title: string } | null;
  people: { name: string };
  dueDate: string;
  returnDate?: string | null;
  status: string;
}

const styles = StyleSheet.create({
  page: { padding: 30 },
  title: { fontSize: 18, marginBottom: 10 },
  row: { flexDirection: "row", marginBottom: 5 },
  cell: { flex: 1, fontSize: 12, marginLeft: 10 },
});

export function ConsultasReportPDF({ loans }: { loans: Loan[] }) {
  return (
    <Document>
      <Page style={styles.page}>
        <Text style={styles.title}>Relatório de Consultas</Text>
        {loans.length === 0 && <Text>Nenhuma consulta disponível.</Text>}
        {loans.map((loan) => (
          <View key={loan.id} style={styles.row}>
            <Text style={styles.cell}>{loan.people.name}</Text>
            <Text style={styles.cell}>{loan.book?.title ?? "Sem título"}</Text>
            <Text style={styles.cell}>
              {new Date(loan.loanDate).toLocaleDateString("pt-BR")}
            </Text>
            <Text style={styles.cell}>{loan.status}</Text>
          </View>
        ))}
      </Page>
    </Document>
  );
}

export default function RelatorioConsultasButton() {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLoans = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/loan");

        // Lê o corpo como texto antes de tentar JSON
        const text = await res.text();
        if (!res.ok) {
          console.error("Erro ao buscar empréstimos:", res.status, text || "(vazio)");
          setError(`Falha ao buscar empréstimos (status ${res.status})`);
          setLoans([]);
          return;
        }

        const data: Loan[] = text ? JSON.parse(text) : [];
        const sorted = data.sort(
          (a, b) => new Date(a.loanDate).getTime() - new Date(b.loanDate).getTime()
        );
        setLoans(sorted);
        setError(null);
      } catch (err) {
        console.error("Erro inesperado ao buscar empréstimos:", err);
        setError("Erro inesperado ao buscar empréstimos");
        setLoans([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLoans();
  }, []);

  return (
    <div>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      {loans.length > 0 && (
        <PDFDownloadLink document={<ConsultasReportPDF loans={loans} />} fileName="consultas_relatorio.pdf">
          {({ loading: pdfLoading }) => (
            <Button variant="default">{loading || pdfLoading ? "Gerando PDF..." : "Exportar PDF"}</Button>
          )}
        </PDFDownloadLink>
      )}
      {!loading && !error && loans.length === 0 && (
        <div className="text-gray-500">Nenhuma consulta disponível.</div>
      )}
    </div>
  );
}