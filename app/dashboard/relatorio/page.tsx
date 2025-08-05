import { prisma } from "@/lib/prisma";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Utilitário para filtrar só terça, quarta e quinta
function isAllowedWeekday(date: Date) {
  const day = date.getDay(); // 0 = domingo, 1 = segunda, ..., 6 = sábado
  return [2, 3, 4].includes(day); // terça, quarta, quinta
}

export default async function RelatorioPage() {
  const start = new Date();
  start.setDate(start.getDate() - 7); // última semana
  const end = new Date();

  const attendances = await prisma.attendance.findMany({
    where: {
      entryAt: {
        gte: start,
        lte: end,
      },
    },
    include: {
      people: {
        include: {
          course: true,
        },
      },
    },
    orderBy: {
      entryAt: "asc",
    },
  });

  // Organiza os dados por aluno
  const dataByStudent: Record<string, Record<string, string>> = {};

  attendances.forEach((a) => {
    const date = new Date(a.entryAt);
    if (!isAllowedWeekday(date)) return;

    const name = a.people.name;
    const key = format(date, "dd/MM", { locale: ptBR });
    const time = format(date, "HH:mm");

    if (!dataByStudent[name]) dataByStudent[name] = {};
    dataByStudent[name][key] = time;
  });

  // Todas as datas únicas (colunas da tabela)
  const allDates = Array.from(
    new Set(
      attendances
        .map((a) => {
          const date = new Date(a.entryAt);
          if (!isAllowedWeekday(date)) return null;
          return format(date, "dd/MM", { locale: ptBR });
        })
        .filter(Boolean) as string[]
    )
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Relatório de Presença (última semana)</h1>

      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              {allDates.map((date) => (
                <TableHead key={date}>{date}</TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {Object.entries(dataByStudent).map(([name, dates]) => (
              <TableRow key={name}>
                <TableCell className="font-medium">{name}</TableCell>
                {allDates.map((date) => (
                  <TableCell key={date}>{dates[date] ?? "—"}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
  