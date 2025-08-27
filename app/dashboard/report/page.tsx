'use server'

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
import Atrasados from "@/components/atraso";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { deleteAllAttendances } from "./actions/deleteAttendances";

// Dias permitidos: terça (2), quarta (3), quinta (4)
function isAllowedWeekday(date: Date) {
  const day = date.getDay();
  return [2, 3, 4].includes(day);
}

// ✅ Corrigido: converte horário para fuso de São Paulo
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

function getStartOfWeek(date: Date) {
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  const start = new Date(date);
  start.setDate(diff);
  start.setHours(0, 0, 0, 0);
  return start;
}

function getEndOfWeek(date: Date) {
  const start = getStartOfWeek(date);
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  end.setHours(23, 59, 59, 999);
  return end;
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

  const weeklyObservations = await prisma.attendance.findMany({
    where: {
      entryAt: {
        gte: getStartOfWeek(start),
        lte: getEndOfWeek(end),
      },
      observation: {
        not: null,
      },
    },
    select: {
      id: true,
      observation: true,
      people: {
        select: {
          name: true,
        },
      },
    },
  });

  return (
    <div className="p-6 space-y-10">
      <div>
        <h1 className="text-2xl font-bold mb-6">
          Relatório de Presença (Última Semana)
        </h1>

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

        {/* ✅ Botão deletar usando form */}
        <form action={deleteAllAttendances} className="mt-4">
          <Button type="submit" className="text-red-500 bg-red-700">
            Deletar
          </Button>
        </form>
      </div>

      {/* Observações */}
      <div className="px-[10%]">
        <h2 className="text-xl font-semibold mb-4">Observações da Semana</h2>
        {weeklyObservations.length > 0 ? (
          <ul className="space-y-2">
            {weeklyObservations.map((obs) => (
              <li key={obs.id} className="p-4 border rounded-md bg-muted/30">
                <strong>{obs.people.name}:</strong> {obs.observation}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground">
            Nenhuma observação registrada nesta semana.
          </p>
        )}
      </div>

      <Separator />
      <h1>Consultas que não foram devolvidas</h1>
      <Atrasados />
    </div>
  );
}
