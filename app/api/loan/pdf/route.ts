import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { pdf, Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

// estilos básicos do PDF
const styles = StyleSheet.create({
  page: { padding: 30 },
  section: { marginBottom: 10 },
  title: { fontSize: 18, marginBottom: 10 },
  row: { flexDirection: "row", marginBottom: 5 },
  cell: { flex: 1, fontSize: 12 },
});

export async function GET() {
  const lateLoans = await prisma.loan.findMany({
    where: { status: "LATE" },
    include: {
      people: true,
      book: true,
    },
  });

  const doc = (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Relatório de Empréstimos Atrasados</Text>
        {lateLoans.map((loan) => (
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

  const pdfBuffer = await pdf(doc).toBuffer();

  return new NextResponse(pdfBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "inline; filename=atrasados.pdf",
    },
  });
}
