"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ArrowUpDown, Clock, LogOut } from "lucide-react";

type Attendance = {
  id: string;
  entryAt: string;
  exitAt: string | null;
  people: {
    name: string;
    course: {
      name: string;
    };
  };
};

const columns: ColumnDef<Attendance>[] = [
  {
    accessorKey: "people.name",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting()}>
        Nome <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <span className="font-medium capitalize">{row.original.people.name}</span>,
  },
  {
    accessorKey: "entryAt",
    header: "Entrada",
    cell: ({ row }) =>
      new Date(row.original.entryAt).toLocaleString("pt-BR", {
        dateStyle: "short",
        timeStyle: "short",
      }),
  },
  {
    accessorKey: "exitAt",
    header: "Saída",
    cell: ({ row }) =>
      row.original.exitAt
        ? new Date(row.original.exitAt).toLocaleString("pt-BR", {
            dateStyle: "short",
            timeStyle: "short",
          })
        : "—",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const exited = !!row.original.exitAt;
      return (
        <Badge variant={exited ? "default" : "outline"} className="flex items-center gap-1">
          {exited ? <LogOut className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
          {exited ? "Saiu" : "Na Biblioteca"}
        </Badge>
      );
    },
  },
];

export function AttendanceTable({ data }: { data: Attendance[] }) {
  const [sorting, setSorting] = useState([{ id: "entryAt", desc: true }]);
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: (row, columnId, filterValue) => {
      const value = row.getValue(columnId);
      return String(value).toLowerCase().includes(filterValue.toLowerCase());
    },
  });

  return (
    <div className="w-full space-y-4">
      <Input
        placeholder="Filtrar por nome..."
        value={globalFilter}
        onChange={(e) => setGlobalFilter(e.target.value)}
        className="max-w-sm"
      />

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
                  Nenhuma presença registrada.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

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
