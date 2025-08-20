"use client";

interface Loan {
  book: any;
  people: any;
  id: string;
  bookTitle: string;
  readerName: string;
  dueDate: string;
}

import { useEffect, useState } from "react";

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
      <GeneratePDFButton lateLoans={loans} />
    </div>
  );
}

import React from "react";
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

import { Button } from "@/components/ui/button";

const styles = StyleSheet.create({
  page: { padding: 30 },
  title: { fontSize: 18, marginBottom: 10 },
  row: { flexDirection: "row", marginBottom: 5 },
  cell: { flex: 1, fontSize: 12 },
});

export function GeneratePDFButton({ lateLoans }: { lateLoans: Loan[] }) {
  const doc = (
    <Document>
      <Page size='A4' style={styles.page}>
        <Text style={styles.title}>Relatório de Empréstimos Atrasados</Text>
        {lateLoans.map((loan) => (
          <View key={loan.id} style={styles.row}>
            <Text style={styles.cell}>{loan.bookTitle}</Text>
            <Text style={styles.cell}>{loan.readerName}</Text>
            <Text style={styles.cell}>{loan.dueDate}</Text>
          </View>
        ))}
      </Page>
    </Document>
  );

  return (
    <PDFDownloadLink document={doc} fileName='relatorio.pdf'>
      {({ loading }) => (
        <Button variant='default'>
          {loading ? "Gerando PDF..." : "Baixar PDF"}
        </Button>
      )}
    </PDFDownloadLink>
  );
}
