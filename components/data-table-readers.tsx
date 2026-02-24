"use client";

import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
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
import {
  AlertOctagon,
  ArrowUpDown,
  Check,
  GraduationCap,
  Loader,
} from "lucide-react";
import { Input } from "./ui/input";

type Read = {
  id: string;
  name: string;
  year: string;
  status: string;
  course: {
    name: string;
    year: string;
  };
};

import { getSortedRowModel, getFilteredRowModel } from "@tanstack/react-table";
import Link from "next/link";

const columns: ColumnDef<Read>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant='ghost'
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Leitor <ArrowUpDown className='ml-2 h-4 w-4' />
      </Button>
    ),
    cell: ({ row }) => {
      return (
        <Link href={`/dashboard/readers/${row.original.id}`} className="underline cursor-pointer font-bold">{row.original.name}</Link>
      )
    },
    enableSorting: true,
    enableColumnFilter: true,
  },
  {
    accessorKey: "course",
    header: "Curso",
    cell: ({ row }) => row.original.course,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const cs = row.original.status == "Desistente" ? "dark:bg-red-500! bg-red-700" : "bg-green-700 dark:bg-green-500"

      return (
        <Badge className={cs}>
          <GraduationCap /> {row.original.status}
        </Badge>
      );
    },
  },
];

export function ReadTable({ data }: { data: Read[] }) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className='w-full space-y-4'>
      <Input
        placeholder='Pesquisar...'
        value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
        onChange={(e) =>
          table.getColumn("name")?.setFilterValue(e.target.value)
        }
        className='max-w-sm'
      />
      <div className='rounded-md border px-2'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
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
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='text-center h-24'
                >
                  Nenhum empréstimo encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className='flex justify-end space-x-2'>
        <Button
          variant='outline'
          size='sm'
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Anterior
        </Button>
        <Button
          variant='outline'
          size='sm'
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Próximo
        </Button>
      </div>
    </div>
  );
}
