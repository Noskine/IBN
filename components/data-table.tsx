"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
  flexRender,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown } from "lucide-react";

import { BookActions } from "./book-actions";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";


import { TypeBooks } from "@/types/books";
import { TypeComboBoxReaders } from "@/types/combobox";
import { TypeCategories } from "@/types/categories";




export function DataTableDemo({
  data,
  readers,
  categories,
}: {
  data: TypeBooks[];
  readers: TypeComboBoxReaders[];
  categories: TypeCategories[];
}) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  // Filtros controlados (inputs visíveis)
  const [filterTitle, setFilterTitle] = React.useState("");
  const [filterAuthor, setFilterAuthor] = React.useState("");


  const columns: ColumnDef<TypeBooks>[] = [
    {
      accessorKey: "title",
      header: () => <span className="font-bold text-emerald-700 dark:text-emerald-500">Título</span>,
      cell: ({ row }) => (
        <HoverCard>
          <HoverCardTrigger className="cursor-default capitalize font-medium">
            {truncate(row.original.title, 40)}
          </HoverCardTrigger>
          <HoverCardContent className="text-xs p-1 text-center w-fit">
            {row.original.title}
          </HoverCardContent>
        </HoverCard>
      ),
    },
    {
      accessorKey: "author",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="text-background bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 hover:bg-emerald-800 hover:text-backgorund cursor-pointer "
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Autor <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => (
        <HoverCard>
          <HoverCardTrigger className="cursor-default text-center capitalize">
            {truncate(row.getValue("author"), 15)}
          </HoverCardTrigger>
          <HoverCardContent className="text-xs p-1 text-center w-fit">
            {row.getValue("author")}
          </HoverCardContent>
        </HoverCard>
      ),
    },
    {
      accessorKey: "publisher",
      header: () => <span className="font-bold text-emerald-700 dark:text-emerald-500">Editora</span>,
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("publisher")}</div>
      ),
    },
    {
      accessorKey: "category.name",
      header: () => <span className="font-bold text-emerald-700 dark:text-emerald-500">Categoria</span>,
      cell: ({ row }) => (
        <div className="capitalize">{row.original.category.name}</div>
      ),
    },
    {
      accessorKey: "totalCopies",
      header: () => <span className="font-bold text-emerald-700 dark:text-emerald-500">Totais</span>,
      cell: ({ row }) => (
        <div className="text-center">{row.getValue("totalCopies")}</div>
      ),
    },
    {
      accessorKey: "availableCopies",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="text-background bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 hover:bg-emerald-800 hover:text-backgorund cursor-pointer "
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Disponíveis <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="text-center">{row.getValue("availableCopies")}</div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => (
        <BookActions
          book={row.original}
          readers={readers}
          categories={categories}
        />
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    state: { sorting, columnFilters, columnVisibility, rowSelection },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });



  // Sincronizar filtros da tabela com inputs controlados
  React.useEffect(() => {
    table.getColumn("title")?.setFilterValue(filterTitle);
  }, [filterTitle, table]);

  React.useEffect(() => {
    table.getColumn("author")?.setFilterValue(filterAuthor);
  }, [filterAuthor, table]);

  return (
    <div className="w-full">
      {/* Colunas */}
      <div className="flex items-center gap-2 mb-2">
        <div className="flex flex-col flex-1 max-w-sm">
          <Label htmlFor="filterTitle" className="mb-1 font-medium text-xs text-emerald-700 dark:text-emerald-500">
            Pesquisar por título
          </Label>
          <Input
            id="filterTitle"
            placeholder="Digite o título"
            className="bg-zinc-200 border-zinc-400 focus:ring-emerald-500 focus:ring-2 focus:ring-offset-0 dark:bg-zinc-800 dark:border-zinc-700 rounded-xl dark:focus:ring-emerald-400 dark:focus:ring-offset-0 shadow-black/20 shadow-md"
            value={filterTitle}
            onChange={(e) => setFilterTitle(e.target.value)}
          />
        </div>

        <div className="flex flex-col flex-1 max-w-sm">
          <Label htmlFor="filterAuthor" className="mb-1 font-medium text-xs text-emerald-700 dark:text-emerald-500">
            Pesquisar por autor
          </Label>
          <Input
            id="filterAuthor"
            placeholder="Digite o autor"
            className="bg-zinc-200 border-zinc-400 rounded-xl focus:ring-emerald-500 focus:ring-2 focus:ring-offset-0 dark:bg-zinc-800 dark:border-zinc-700 dark:focus:ring-emerald-400 dark:focus:ring-offset-0 shadow-black/20 shadow-md"
            value={filterAuthor}
            onChange={(e) => setFilterAuthor(e.target.value)}
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto whitespace-nowrap bg-zinc-200 rounded-xl border-zinc-400  dark:bg-zinc-800 dark:border-zinc-700 dark:focus:ring-emerald-400 shadow-black/20 shadow-md ">
              Colunas <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-zinc-200 border-zinc-400  focus:ring-2  dark:bg-zinc-800 dark:border-zinc-700    shadow-black/20 shadow-md">
            {table
              .getAllColumns()
              .filter((col) => col.getCanHide())
              .map((col) => (
                <DropdownMenuCheckboxItem
                  key={col.id}
                  className="capitalize hover:bg-zinc-300"
                  checked={col.getIsVisible()}
                  onCheckedChange={(val) => col.toggleVisibility(!!val)}
                >
                  {
                    col.id === "title"
                      ? "Título"
                      : col.id === "author"
                        ? "Autor"
                        : col.id === "publisher"
                          ? "Editora"
                          : col.id === "category_name"
                            ? "Categoria"
                            : col.id === "totalCopies"
                              ? "Totais"
                              : col.id === "availableCopies"
                                ? "Disponíveis"
                                : col.id === "actions"
                                  ? "Ações" : ""
                  }
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Tabela */}
      <div className="rounded-xl border bg-zinc-50 dark:bg-zinc-900 px-2 py-1 border-emerald-300 dark:border-emerald-800">
        <Table>
          <TableHeader >
            {table.getHeaderGroups().map((group) => (
              <TableRow  key={group.id}>
                {group.headers.map((header) => (
                  <TableHead key={header.id} >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
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
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Aguardando resultados...
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Paginação */}
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-sm text-muted-foreground flex-1">
          Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount()} • Mostrando{" "}
          {table.getRowModel().rows.length} de {table.getFilteredRowModel().rows.length} linhas
        </div>

        <div className="space-x-2">
          <Button
            variant="outline"
            className="border-emerald-800 dark:border-emerald-500 cursor-pointer dark:disabled:border-red-500/60 dark:disabled:text-red-500/60 disabled:border-red-500/60 disabled:text-red-500/60 bg-zinc-200 dark:bg-zinc-800 shadow-md text-emerald-700 dark:text-emerald-500 disabled:cursor-not-allowed hover:text-emerald-700 "
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-emerald-800 dark:border-emerald-500 cursor-pointer dark:disabled:border-red-500/60 dark:disabled:text-red-500/60 disabled:border-red-500/60 disabled:text-red-500/60 bg-zinc-200 dark:bg-zinc-800 shadow-md text-emerald-700 dark:text-emerald-500 disabled:cursor-not-allowed hover:text-emerald-700 "
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Próximo
          </Button>
        </div>
      </div>


    </div>
  );
}

function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}
