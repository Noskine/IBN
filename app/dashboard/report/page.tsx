"use server";

import { prisma } from "@/lib/prisma";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LogIn, LogOut } from "lucide-react";
import { Separator } from "@/components/ui/separator";

function isAllowedWeekday(date: Date) {
  const day = date.getDay();
  return [2, 3, 4].includes(day); // terça, quarta, quinta
}

function formatLocalTime(date: Date) {
  return date.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "America/Sao_Paulo",
  });
}

function formatDateToDayMonth(date: Date) {
  const d = String(date.getDate()).padStart(2, "0");
  const m = String(date.getMonth() + 1).padStart(2, "0");
  return `${d}/${m}`;
}

export default async function RelatorioPage() {
  const end = new Date();
  const start = new Date();
  start.setDate(end.getDate() - 7);

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
    orderBy: [{ people: { name: "asc" } }, { entryAt: "asc" }],
  });

  const dataByStudent: Record<
    string,
    Record<string, { entry?: string; exit?: string }>
  > = {};

  attendances.forEach((a) => {
    const entryDate = new Date(a.entryAt);
    if (!isAllowedWeekday(entryDate)) return;

    const name = a.people.name;
    const key = formatDateToDayMonth(entryDate);

    if (!dataByStudent[name]) dataByStudent[name] = {};
    if (!dataByStudent[name][key]) dataByStudent[name][key] = {};

    dataByStudent[name][key].entry = formatLocalTime(entryDate);

    if (a.exitAt) {
      dataByStudent[name][key].exit = formatLocalTime(new Date(a.exitAt));
    }
  });

  const allDates = Array.from(
    new Set(
      attendances
        .map((a) => {
          const date = new Date(a.entryAt);
          if (!isAllowedWeekday(date)) return null;
          return formatDateToDayMonth(date);
        })
        .filter(Boolean) as string[]
    )
  ).sort((a, b) => {
    const [da, ma] = a.split("/").map(Number);
    const [db, mb] = b.split("/").map(Number);
    return ma !== mb ? ma - mb : da - db;
  });

  const weeklyObservations = await prisma.weeklyObservation.findMany({
    select: {
      id: true,
      observation: true,
      weekStart: true,
      people: {
        select: {
          name: true,
        },
      },
    },
  });

  return (
    <div className="p-10 print:p-0 print:m-0 font-serif text-black">
      <style>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 2cm;
          }
          body {
            -webkit-print-color-adjust: exact;
            color-adjust: exact;
          }
          .no-print { display: none !important; }
          table, th, td {
            border: 1px solid #000;
            border-collapse: collapse;
          }
        }
        table, th, td {
          border: 1px solid #000;
          border-collapse: collapse;
        }
      `}</style>

      <h1 className="text-2xl font-bold mb-6 text-center uppercase">
        Relatório de Presença — Última Semana
      </h1>

      {/* Tabela de Presença */}
      <div className="overflow-x-auto">
        <Table className="w-full text-sm">
          <TableHeader>
            <TableRow className="bg-gray-200">
              <TableHead className="border-r font-bold text-center w-48">
                Nome
              </TableHead>
              {allDates.map((date) => (
                <TableHead
                  key={date}
                  className="border-x font-bold text-center"
                >
                  {date}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {Object.entries(dataByStudent).map(([name, dates]) => (
              <TableRow key={name}>
                <TableCell className="border-r font-semibold">{name}</TableCell>
                {allDates.map((date) => {
                  const value = dates[date];
                  return (
                    <TableCell key={date} className="border-x text-center">
                      {value ? (
                        <div className="flex flex-col items-center gap-1">
                          <span className="flex items-center gap-1 text-green-700">
                            <LogIn className="w-3 h-3" /> {value.entry}
                          </span>
                          {value.exit && (
                            <span className="flex items-center gap-1 text-red-700">
                              <LogOut className="w-3 h-3" /> {value.exit}
                            </span>
                          )}
                        </div>
                      ) : (
                        <span>—</span>
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Separator className="my-10" />

      {/* Observações da Semana */}
      <div>
        <h2 className="text-xl font-bold mb-4 text-center uppercase">
          Observações da Semana
        </h2>
        {weeklyObservations.length > 0 ? (
          <ul className="space-y-4">
            {weeklyObservations.map((obs) => (
              <li key={obs.id} className="text-justify leading-relaxed">
                <p className="border border-black p-3 rounded-md">
                  <strong>{obs.people.name}:</strong> {obs.observation}
                </p>
                <p className="text-xs italic text-right mt-1">
                  {new Date(obs.weekStart).toLocaleDateString("pt-BR", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center italic">
            Nenhuma observação registrada nesta semana.
          </p>
        )}
      </div>
    </div>
  );
}
