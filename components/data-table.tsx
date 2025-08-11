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
      header: () => <span className="font-bold">Título</span>,
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
      header: "Editora",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("publisher")}</div>
      ),
    },
    {
      accessorKey: "category.name",
      header: "Categoria",
      cell: ({ row }) => (
        <div className="capitalize">{row.original.category.name}</div>
      ),
    },
    {
      accessorKey: "totalCopies",
      header: "Totais",
      cell: ({ row }) => (
        <div className="text-center">{row.getValue("totalCopies")}</div>
      ),
    },
    {
      accessorKey: "availableCopies",
      header: ({ column }) => (
        <Button
          variant="ghost"
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
          <Label htmlFor="filterTitle" className="mb-1 font-medium text-xs">
            Pesquisar por título
          </Label>
          <Input
            id="filterTitle"
            placeholder="Digite o título"
            value={filterTitle}
            onChange={(e) => setFilterTitle(e.target.value)}
          />
        </div>

        <div className="flex flex-col flex-1 max-w-sm">
          <Label htmlFor="filterAuthor" className="mb-1 font-medium text-xs">
            Pesquisar por autor
          </Label>
          <Input
            id="filterAuthor"
            placeholder="Digite o autor"
            value={filterAuthor}
            onChange={(e) => setFilterAuthor(e.target.value)}
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto whitespace-nowrap">
              Colunas <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((col) => col.getCanHide())
              .map((col) => (
                <DropdownMenuCheckboxItem
                  key={col.id}
                  className="capitalize"
                  checked={col.getIsVisible()}
                  onCheckedChange={(val) => col.toggleVisibility(!!val)}
                >
                  {col.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Tabela */}
      <div className="rounded-md border px-2">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((group) => (
              <TableRow key={group.id}>
                {group.headers.map((header) => (
                  <TableHead key={header.id}>
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

     
    </div>
  );
}

function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}
