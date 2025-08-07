import { prisma } from "@/lib/prisma";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LogIn, LogOut } from "lucide-react";

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
      people: true,
    },
    orderBy: [
      { people: { name: "asc" } },
      { entryAt: "asc" },
    ],
  });

  const dataByStudent: Record<string, Record<string, { entry?: string; exit?: string }>> = {};

  attendances.forEach((a) => {
    const date = new Date(a.entryAt);
    if (!isAllowedWeekday(date)) return;

    const name = a.people.name;
    const key = format(date, "dd/MM", { locale: ptBR });

    if (!dataByStudent[name]) dataByStudent[name] = {};
    if (!dataByStudent[name][key]) dataByStudent[name][key] = {};

    dataByStudent[name][key].entry = format(date, "HH:mm");

    if (a.exitAt) {
      dataByStudent[name][key].exit = format(new Date(a.exitAt), "HH:mm");
    }
  });

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
  ).sort((a, b) => {
    const [da, ma] = a.split("/").map(Number);
    const [db, mb] = b.split("/").map(Number);
    return ma !== mb ? ma - mb : da - db;
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Relatório de Presença (Última Semana)</h1>

      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="border-r font-bold">Nome</TableHead>
              {allDates.map((date) => (
                <TableHead key={date} className="text-center border-x font-bold">
                  {date}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {Object.entries(dataByStudent).map(([name, dates]) => (
              <TableRow key={name} className="border-t">
                <TableCell className="font-bold border-r">{name}</TableCell>
                {allDates.map((date) => {
                  const value = dates[date];
                  return (
                    <TableCell key={date} className="text-center border-x">
                      {value ? (
                        <div className="flex justify-around items-center gap-1 text-sm">
                          <span className="flex items-center gap-1 text-green-600">
                            <LogIn className="w-4 h-4" />
                            {value.entry}
                          </span>
                          {value.exit && (
                            <span className="flex items-center gap-1 text-red-600">
                              <LogOut className="w-4 h-4" />
                              {value.exit}
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
