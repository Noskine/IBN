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
  book: { title: string };
  people: { name: string };
  id: string;
  dueDate: string;
}

const styles = StyleSheet.create({
  page: { padding: 30 },
  title: { fontSize: 18, marginBottom: 10 },
  row: { flexDirection: "row", marginBottom: 5 },
  cell: { flex: 1, fontSize: 12, marginLeft: 10 },
});

function LoanReportPDF({ loans }: { loans: Loan[] }) {
  return (
    <Document>
      <Page style={styles.page}>
        <Text style={styles.title}>Relatório de Empréstimos Atrasados</Text>
        {loans.map((loan) => (
          <View key={loan.id} style={styles.row}>
            <Text style={styles.cell}>{loan.people.name}</Text>
            <Text style={styles.cell}>{loan.book?.title}</Text>
            <Text style={styles.cell}>
              {new Date(loan.dueDate).toLocaleDateString("pt-BR")}
            </Text>
          </View>
        ))}
      </Page>
    </Document>
  );
}

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

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Empréstimos Atrasados</h1>

        {loans.length > 0 && (
          <PDFDownloadLink
            document={<LoanReportPDF loans={loans} />}
            fileName="emprestimos_atrasados.pdf"
          >
            {({ loading }) => (
              <Button variant="default">
                {loading ? "Gerando PDF..." : "Exportar PDF"}
              </Button>
            )}
          </PDFDownloadLink>
        )}
      </div>

      {loans.length === 0 ? (
        <p>Nenhum empréstimo atrasado encontrado.</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Aluno</TableHead>
              <TableHead>Livro</TableHead>
              <TableHead>Data de Devolução</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loans.map((loan) => (
              <TableRow key={loan.id}>
                <TableCell className="bg-red-400">
                  {loan.people.name}
                </TableCell>
                <TableCell>{loan.book?.title}</TableCell>
                <TableCell>
                  {new Date(loan.dueDate).toLocaleDateString("pt-BR")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
