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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { toast } from "sonner";
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

  // Estado para código de barras capturado
  const [barcodeBuffer, setBarcodeBuffer] = React.useState("");
  const [timerId, setTimerId] = React.useState<NodeJS.Timeout | null>(null);

  // Livro selecionado e controle do popover aberto
  const [selectedBook, setSelectedBook] = React.useState<TypeBooks | null>(null);
  const [popoverOpen, setPopoverOpen] = React.useState(false);

  const columns: ColumnDef<TypeBooks>[] = [
    {
      accessorKey: "title",
      header: () => <span className="font-bold">Título</span>,
      cell: ({ row }) => (
        <div className="capitalize font-medium">
          {truncate(row.original.title, 40)}
        </div>
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
        <div className="capitalize text-center">
          {truncate(row.getValue("author"), 15)}
        </div>
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

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        if (barcodeBuffer.length > 0) {
          // Ao pressionar Enter, busca livro e abre popover
          const found = data.find((book) => book.barcode === barcodeBuffer);
          if (found) {
            setSelectedBook(found);
            setPopoverOpen(true);
            toast.success(`Livro encontrado: ${found.title}`);
          } else {
            toast.error("Livro não encontrado para esse código.");
            setSelectedBook(null);
            setPopoverOpen(false);
          }
          setBarcodeBuffer("");
          if (timerId) {
            clearTimeout(timerId);
            setTimerId(null);
          }
        }
      } else {
        // Acumula caracteres rápidos no buffer
        setBarcodeBuffer((prev) => prev + e.key);

        // Reseta timer para limpar buffer se parar de digitar por 500ms
        if (timerId) clearTimeout(timerId);
        const timeout = setTimeout(() => setBarcodeBuffer(""), 500);
        setTimerId(timeout);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (timerId) clearTimeout(timerId);
    };
  }, [barcodeBuffer, data, timerId]);

  return (
    <div className="w-full">
      {/* Popover que abre automaticamente para o livro detectado */}
      <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
        <PopoverTrigger asChild>
          {/* Botão invisível, só para controlar o popover */}
          <button style={{ display: "none" }}>open popover</button>
        </PopoverTrigger>
        <PopoverContent className="w-80 text-sm">
          {selectedBook ? (
            <>
              <h3 className="font-semibold text-base mb-2">
                📘 {selectedBook.title}
              </h3>
              <p>
                <strong>Autor:</strong> {selectedBook.author}
              </p>
              <p>
                <strong>Editora:</strong> {selectedBook.publisher}
              </p>
              <p>
                <strong>Categoria:</strong> {selectedBook.category?.name}
              </p>
              <p>
                <strong>Totais:</strong> {selectedBook.totalCopies}
              </p>
              <p>
                <strong>Disponíveis:</strong> {selectedBook.availableCopies}
              </p>
              <p>
                <strong>Código:</strong> {selectedBook.barcode}
              </p>
            </>
          ) : (
            <p>Livro não encontrado.</p>
          )}
        </PopoverContent>
      </Popover>

      {/* Filtros e Colunas */}
      <div className="flex items-center py-4 gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
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
          Página {table.getState().pagination.pageIndex + 1} de{" "}
          {table.getPageCount()} • Mostrando {table.getRowModel().rows.length} de{" "}
          {table.getFilteredRowModel().rows.length} linhas
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
