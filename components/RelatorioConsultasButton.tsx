"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

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

export default function RelatorioConsultas() {
  const [loans, setLoans] = useState<Loan[]>([]);

  useEffect(() => {
    const fetchLoans = async () => {
      const res = await fetch("/api/loan");
      const data = await res.json();

      // ordenar pela data da consulta (loanDate) da mais antiga para a mais nova
      const sorted = data.sort(
        (a: Loan, b: Loan) => new Date(a.loanDate).getTime() - new Date(b.loanDate).getTime()
      );

      setLoans(sorted);
    };
    fetchLoans();
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Consultas Realizadas</h1>

        {loans.length > 0 && (
          <PDFDownloadLink
            document={<ConsultasReportPDF loans={loans} />}
            fileName="consultas_relatorio.pdf"
          >
            {({ loading }) => (
              <Button variant="default">
                {loading ? "Gerando PDF..." : "Exportar PDF"}
              </Button>
            )}
          </PDFDownloadLink>
        )}
      </div>
    </div>
  );
}
