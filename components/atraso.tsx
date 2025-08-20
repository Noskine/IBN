"use client";

import { useEffect, useState } from "react";

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

  return (
    <div className='p-4'>
      <h1 className='text-xl font-bold mb-4'>Empréstimos Atrasados</h1>
      {loans.length === 0 ? (
        <p>Nenhum empréstimo atrasado encontrado.</p>
      ) : (
        <table className='w-full border-collapse border border-gray-300'>
          <thead>
            <tr>
              <th className='border p-2'>Aluno</th>
              <th className='border p-2'>Livro</th>
              <th className='border p-2'>Data de Devolução</th>
            </tr>
          </thead>
          <tbody>
            {loans.map((loan) => (
              <tr key={loan.id}>
                <td className='border p-2'>{loan.people.name}</td>
                <td className='border p-2'>{loan.book?.title}</td>
                <td className='border p-2'>
                  {new Date(loan.dueDate).toLocaleDateString("pt-BR")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <DownloadLoanReportButton loans={loans} />
    </div>
  );
}

import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";

// estilos do PDF
const styles = StyleSheet.create({
  page: { padding: 30 },
  title: { fontSize: 18, textAlign: "center", marginBottom: 20 },
  row: { marginBottom: 10, fontSize: 12 },
});

// componente que representa o PDF
const LoanReportPDF = ({ loans }: { loans: any[] }) => (
  <Document>
    <Page size='A4' style={styles.page}>
      <Text style={styles.title}>Relatório de Empréstimos Atrasados</Text>
      {loans.map((loan) => (
        <View key={loan.id} style={styles.row}>
          <Text>
            Pessoa: {loan.people.name} | Livro: {loan.book.title} | Vencimento:{" "}
            {new Date(loan.dueDate).toLocaleDateString()}
          </Text>
        </View>
      ))}
    </Page>
  </Document>
);

// botão de download
function DownloadLoanReportButton({ loans }: { loans: any[] }) {
  return (
    <PDFDownloadLink
      document={<LoanReportPDF loans={loans} />}
      fileName='relatorio-emprestimos.pdf'
    >
      {({ loading }) =>
        loading ? "Gerando PDF..." : "📄 Baixar Relatório de Empréstimos"
      }
    </PDFDownloadLink>
  );
}
