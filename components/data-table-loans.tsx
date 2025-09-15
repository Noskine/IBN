"use client";

import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowUpDown, AlertOctagon, Check, Loader, ChevronDown } from "lucide-react";
import { RowActions } from "./row-actions";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export type Loan = {
  id: string;
  people: {
    id: string;
    name: string;
  } | null;
  book: {
    title: string;
    author: string;
    category: {
      name: string;
    } | null;
  } | null;
  loanDate: string;
  returnDate: string | null;
  dueDate: string;
  status: "ACTIVE" | "RETURNED" | "LATE" | "LOST";
};

const columns: ColumnDef<Loan>[] = [
  {
    accessorKey: "people.name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Leitor <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <Link
        href={`/dashboard/readers/${row.original.people?.id ?? "#"}`}
        className="underline cursor-pointer"
      >
        {row.original.people?.name ?? "—"}
      </Link>
    ),
  },
  {
    accessorKey: "book.title",
    header: "Livro",
    cell: ({ row }) => (
      <HoverCard>
        <HoverCardTrigger className="cursor-default capitalize font-medium">
          {truncate(row.original.book?.title ?? "—", 25)}
        </HoverCardTrigger>
        <HoverCardContent className="text-xs! p-1! text-center w-fit">
          {row.original.book?.title ?? "—"}
        </HoverCardContent>
      </HoverCard>
    ),
  },
  {
    accessorKey: "book.author",
    header: "Autor",
    cell: ({ row }) => row.original.book?.author ?? "—",
  },
  {
    accessorKey: "book.category.name",
    header: "Categoria",
    cell: ({ row }) => truncate(row.original.book?.category?.name ?? "—", 20),
  },
  {
    accessorKey: "loanDate",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Empréstimo <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <span className="text-center">
        {new Date(row.original.loanDate).toLocaleDateString()}
      </span>
    ),
  },
  {
    accessorKey: "dueDate",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Renovar/Entregar <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <span className="text-center">
        {new Date(row.original.dueDate).toLocaleDateString()}
      </span>
    ),
  },
  {
    accessorKey: "returnDate",
    header: "Entrega",
    cell: ({ row }) => (
      <span className="text-center">
        {row.original.returnDate
          ? new Date(row.original.returnDate).toLocaleDateString()
          : "—"}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Status <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const status = row.original.status;
      const color =
        status === "ACTIVE"
          ? "bg-sky-500 text-zinc-950 dark:bg-sky-600 dark:text-white"
          : status === "RETURNED"
          ? "bg-green-500 text-zinc-950 dark:bg-green-600 dark:text-white"
          : status === "LATE"
          ? "bg-yellow-500 text-zinc-950 dark:bg-yellow-600 dark:text-white"
          : "bg-red-500 text-zinc-950 dark:bg-red-600 dark:text-white";

      return (
        <Badge className={`${color} font-medium`}>
          {status === "ACTIVE" ? (
            <Emprestado />
          ) : status === "RETURNED" ? (
            <Retornado />
          ) : status === "LATE" ? (
            <Atrasado />
          ) : (
            <Perdido />
          )}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => <RowActions loan={row.original} />,
  },
];

export function LoanTable({ data }: { data: Loan[] }) {
  const [sorting, setSorting] = React.useState([{ id: "loanDate", desc: true }]);
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [categoryFilter, setCategoryFilter] = React.useState("");
  const [dateFilter, setDateFilter] = React.useState<Date | undefined>(undefined);
  const [calendarOpen, setCalendarOpen] = React.useState(false);

  const filteredData = React.useMemo(() => {
    let filtered = data;

    if (globalFilter) {
      filtered = filtered.filter((loan) =>
        loan.people?.name?.toLowerCase().includes(globalFilter.toLowerCase())
      );
    }

    if (categoryFilter) {
      filtered = filtered.filter((loan) =>
        loan.book?.title?.toLowerCase().includes(categoryFilter.toLowerCase())
      );
    }

    if (dateFilter) {
      filtered = filtered.filter(
        (loan) =>
          new Date(loan.loanDate).toDateString() === dateFilter.toDateString()
      );
    }

    return filtered;
  }, [data, globalFilter, categoryFilter, dateFilter]);

  const table = useReactTable({
    data: filteredData,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  React.useEffect(() => {
    table.setPageIndex(0);
  }, [globalFilter, categoryFilter, dateFilter, table]);

  return (
    <div className="w-full space-y-4">
      {/* Filtros */}
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between mb-2">
        <div className="flex flex-col w-full sm:w-1/2 max-w-sm">
          <Label htmlFor="filterName" className="mb-1 font-medium text-xs">
            Filtrar por Leitor
          </Label>
          <Input
            id="filterName"
            placeholder="Digite o nome do leitor"
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="w-full"
          />
        </div>

        <div className="flex flex-col w-full sm:w-1/2 max-w-sm">
          <Label htmlFor="filterCategory" className="mb-1 font-medium text-xs">
            Filtrar por livro
          </Label>
          <Input
            id="filterCategory"
            placeholder="Digite o nome do livro"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full"
          />
        </div>

        <div className="flex flex-col w-full sm:w-1/2 max-w-xs mt-5">
          <Label htmlFor="filterDate" className="mb-1 font-medium text-xs">
            Filtrar por Data de Empréstimo
          </Label>
          <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                id="filterDate"
                className="w-full justify-between font-normal"
              >
                {dateFilter ? dateFilter.toLocaleDateString() : "Selecione a data"}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={dateFilter}
                onSelect={(date) => {
                  setDateFilter(date);
                  setCalendarOpen(false);
                }}
                captionLayout="dropdown"
              />
              {dateFilter && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="m-2"
                  onClick={() => setDateFilter(undefined)}
                >
                  Limpar data
                </Button>
              )}
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Tabela */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center h-24">
                  Nenhum empréstimo encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Paginação */}
      <div className="flex justify-end space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Anterior
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Próximo
        </Button>
      </div>
    </div>
  );
}

function Emprestado() {
  return (
    <span className="flex gap-1 items-center">
      <Loader className="size-3" /> Empréstado
    </span>
  );
}

function Retornado() {
  return (
    <span className="flex gap-1 items-center">
      <Check className="size-3" /> Retornado
    </span>
  );
}

function Perdido() {
  return (
    <span className="flex gap-1 items-center">
      <AlertOctagon className="size-3" /> Perdido
    </span>
  );
}

function Atrasado() {
  return (
    <span className="flex gap-1 items-center">
      <AlertOctagon className="size-3" /> Atrasado
    </span>
  );
}

function truncate(text: string, maxLength: number): string {
  if (!text) return "—";
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}
