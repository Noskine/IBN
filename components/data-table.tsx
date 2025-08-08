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
import { ArrowUpDown, Barcode, ChevronDown } from "lucide-react";

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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import { toast } from "sonner";
import { TypeBooks } from "@/types/books";
import { TypeComboBoxReaders } from "@/types/combobox";
import { TypeCategories } from "@/types/categories";
import { useUserSession } from "@/context/UserSessionContext";
import { ComboboxReaders } from "./combo-box";

function useBarcodeListener(
  data: TypeBooks[],
  onFound: (book: TypeBooks | null) => void
) {
  const [barcodeBuffer, setBarcodeBuffer] = React.useState("");
  const [barcodeTimer, setBarcodeTimer] = React.useState<NodeJS.Timeout | null>(
    null
  );

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      // Ignora se estiver digitando em input, textarea ou conteúdo editável
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }

      if (e.key === "Enter") {
        const trimmedBarcode = barcodeBuffer.replaceAll("F2", "").trim();
        if (trimmedBarcode.length > 0) {
          const foundBook = data.find(
            (book) => String(book.barcode).trim() === trimmedBarcode
          );
          onFound(foundBook || null);
        }
        setBarcodeBuffer("");
        if (barcodeTimer) {
          clearTimeout(barcodeTimer);
          setBarcodeTimer(null);
        }
      } else {
        setBarcodeBuffer((prev) => prev + e.key);
        if (barcodeTimer) clearTimeout(barcodeTimer);
        const timeout = setTimeout(() => setBarcodeBuffer(""), 500);
        setBarcodeTimer(timeout);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [barcodeBuffer, barcodeTimer, data, onFound]);
}

export function DataTableDemo({
  data,
  readers,
  categories,
}: {
  data: TypeBooks[];
  readers: TypeComboBoxReaders[];
  categories: TypeCategories[];
}) {
  const session = useUserSession();
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

  // Estado do livro encontrado pelo código de barras
  const [selectedBook, setSelectedBook] = React.useState<TypeBooks | null>(
    null
  );
  const [popoverOpen, setPopoverOpen] = React.useState(false);
  const [leitorSelecionado, setleitorSelecionado] = React.useState<string>();

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

  // Usando o hook para capturar código de barras
  useBarcodeListener(data, (book) => {
    if (book) {
      setSelectedBook(book);
      setPopoverOpen(true);
      toast.success(`Livro encontrado: ${book.title}`);
    } else {
      setSelectedBook(null);
      setPopoverOpen(false);
      toast.error("Livro não encontrado para esse código.");
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    fetch(
      `/api/loan?email=${session?.email}&book=${selectedBook?.id}&reader=${leitorSelecionado}`,
      {
        method: "POST",
      }
    ).then((res) => {
      if (res.ok) {
        toast("Consulta finalizada! ✅📅");
        setTimeout(() => window.location.reload(), 1000);
      } else {
        toast("Algo de errado aconteceu! ❌");
      }
    });

    setPopoverOpen(false);
  };

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

      {/* Dialog do código de barras */}
      <Dialog open={popoverOpen} onOpenChange={setPopoverOpen}>
        <DialogContent>
          <DialogHeader className="border-b">
            <DialogTitle className="font-bold text-2xl">Criando consulta</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="flex flex-col gap-1">
            <section className="shadow-md dark:bg-zinc-900 px-2 pb-2 pt-1 mb-2 rounded-md">
              <h2 className="text-md font-bold">{selectedBook?.title}</h2>
              <p className="text-xs italic">
                De autoria de <span className="font-medium">{selectedBook?.author}</span> pela{" "}
                {selectedBook?.publisher}
              </p>
              <p className="text-xs italic text-end space-x-1">
                <Barcode className="inline size-3" />
                {selectedBook?.barcode || "Código não cadastrado"}
              </p>
            </section>
            <ComboboxReaders data={readers} onSelect={setleitorSelecionado} />
            <DialogFooter>
              <Button type="submit" disabled={!leitorSelecionado}>
                Criar consulta
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}
