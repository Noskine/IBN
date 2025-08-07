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
import { ArrowUpDown, ChevronDown, Barcode, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  DropdownMenuLabel,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { toast } from "sonner";
import { TypeBooks } from "@/types/books";
import { TypeComboBoxReaders } from "@/types/combobox";
import { TypeCategories } from "@/types/categories";
import { Label } from "./ui/label";
import { CategoryCombobox } from "./category-combox";
import { useUserSession } from "@/context/UserSessionContext";
import { ComboboxReaders } from "./combo-box";
import { Separator } from "./ui/separator";

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
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  // Estados para filtros de título e autor
  const [titleFilter, setTitleFilter] = React.useState("");
  const [authorFilter, setAuthorFilter] = React.useState("");

  // Código de barras buffer e timer para debounce
  const [barcodeBuffer, setBarcodeBuffer] = React.useState("");
  const [timerId, setTimerId] = React.useState<NodeJS.Timeout | null>(null);

  // Estado para livro selecionado e popover aberto
  const [selectedBook, setSelectedBook] = React.useState<TypeBooks | null>(null);
  const [popoverOpen, setPopoverOpen] = React.useState(false);

  // Configura as colunas da tabela
  const columns: ColumnDef<TypeBooks>[] = [
    {
      accessorKey: "title",
      header: () => <span className="font-bold">Título</span>,
      cell: ({ row }) => <div className="capitalize font-medium">{truncate(row.original.title, 40)}</div>,
    },
    {
      accessorKey: "author",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Autor <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => <div className="capitalize text-center">{truncate(row.getValue("author"), 15)}</div>,
    },
    {
      accessorKey: "publisher",
      header: "Editora",
      cell: ({ row }) => <div className="capitalize">{row.getValue("publisher")}</div>,
    },
    {
      accessorKey: "category.name",
      header: "Categoria",
      cell: ({ row }) => <div className="capitalize">{row.original.category.name}</div>,
    },
    {
      accessorKey: "totalCopies",
      header: "Totais",
      cell: ({ row }) => <div className="text-center">{row.getValue("totalCopies")}</div>,
    },
    {
      accessorKey: "availableCopies",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Disponíveis <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => <div className="text-center">{row.getValue("availableCopies")}</div>,
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => (
        <BookActions book={row.original} readers={readers} categories={categories} />
      ),
    },
  ];

  // Cria a tabela
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

  // Atualiza filtro título quando mudar input
  React.useEffect(() => {
    table.getColumn("title")?.setFilterValue(titleFilter);
  }, [titleFilter]);

  // Atualiza filtro autor quando mudar input
  React.useEffect(() => {
    table.getColumn("author")?.setFilterValue(authorFilter);
  }, [authorFilter]);

  // Captura teclado para detectar código de barras
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignorar se foco estiver em input para evitar conflito
      const activeTag = document.activeElement?.tagName.toLowerCase();
      if (activeTag === "input" || activeTag === "textarea" || e.ctrlKey || e.altKey || e.metaKey) {
        return;
      }

      if (e.key === "Enter") {
        if (barcodeBuffer.length > 0) {
          const found = data.find((book) => book.barcode === barcodeBuffer);
          if (found) {
            setSelectedBook(found);
            setPopoverOpen(true);
            toast.success(`Livro encontrado: ${found.title}`);
          } else {
            setSelectedBook(null);
            setPopoverOpen(false);
            toast.error("Livro não encontrado para esse código.");
          }
          setBarcodeBuffer("");
          if (timerId) {
            clearTimeout(timerId);
            setTimerId(null);
          }
        }
      } else if (e.key.length === 1) {
        // Só acumula caracteres normais
        setBarcodeBuffer((prev) => prev + e.key);
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
      {/* Popover automático para livro encontrado */}
      <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
        <PopoverTrigger asChild>
          {/* Botão oculto para controlar o popover */}
          <button style={{ display: "none" }}>open popover</button>
        </PopoverTrigger>
        <PopoverContent className="w-80 text-sm">
          {selectedBook ? (
            <>
              <h3 className="font-semibold text-base mb-2">📘 {selectedBook.title}</h3>
              <p><strong>Autor:</strong> {selectedBook.author}</p>
              <p><strong>Editora:</strong> {selectedBook.publisher}</p>
              <p><strong>Categoria:</strong> {selectedBook.category?.name}</p>
              <p><strong>Totais:</strong> {selectedBook.totalCopies}</p>
              <p><strong>Disponíveis:</strong> {selectedBook.availableCopies}</p>
              <p><strong>Código:</strong> {selectedBook.barcode}</p>
            </>
          ) : (
            <p>Livro não encontrado.</p>
          )}
        </PopoverContent>
      </Popover>

      {/* Filtros: título e autor */}
      <div className="flex items-center py-4 gap-2">
         <Label htmlFor="filter-title">Filtrar por título</Label>
        <Input
          placeholder="Pesquisar por título"
          id="filter-title"
          value={titleFilter}
          onChange={(e) => setTitleFilter(e.target.value)}
          className="max-w-sm"
        />
        <Label htmlFor="filter-author">Filtrar por autor</Label>
        <Input
          placeholder="Pesquisar por autor"
          id="filter-author"
          value={authorFilter}
          onChange={(e) => setAuthorFilter(e.target.value)}
          className="max-w-sm"
        />

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
                      : flexRender(header.column.columnDef.header, header.getContext())}
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

// Componente BookActions dentro da mesma página
function BookActions({
  book,
  readers,
  categories,
}: {
  book: TypeBooks;
  readers: TypeComboBoxReaders[];
  categories: TypeCategories[];
}) {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openCategoryDialog, setOpenCategoryDialog] = React.useState(false);
  const [leitorSelecionado, setLeitorSelecionado] = React.useState("");
  const [categoriaSelecionada, setCategoriaSelecionada] = React.useState("");
  const session = useUserSession();

  // Enviar consulta (ex: empréstimo)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    fetch(
      `/api/loan?email=${session?.email}&book=${book.id}&reader=${leitorSelecionado}`,
      {
        method: "POST",
      }
    ).then((res) => {
      if (res.ok) {
        toast.success("Consulta finalizada! ✅📅");
        setTimeout(() => window.location.reload(), 1000);
      } else {
        toast.error("Algo de errado aconteceu! ❌");
      }
    });

    setOpenDialog(false);
  };

  // Atualizar categoria
  const handleCategoryUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`/api/book?id=${book.id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: categoriaSelecionada }),
    });
    if (res.ok) {
      toast.success("Categoria atualizada!");
      setTimeout(() => window.location.reload(), 1000);
    } else {
      toast.error("Erro ao atualizar categoria.");
    }
    setOpenCategoryDialog(false);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Abrir menu</span>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Ações</DropdownMenuLabel>

        {/* Consultar Livro */}
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault();
                setOpenDialog(true);
              }}
              className="text-teal-800! bg-teal-200! font-medium cursor-pointer hover:bg-teal-100!"
            >
              Consultar Livro
            </DropdownMenuItem>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader className="border-b">
              <DialogTitle>Escolha o leitor</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <ComboboxReaders
                readers={readers}
                value={leitorSelecionado}
                onChange={setLeitorSelecionado}
              />
              <DialogFooter>
                <Button type="submit" disabled={!leitorSelecionado}>
                  Confirmar
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Atualizar Categoria */}
        <Dialog open={openCategoryDialog} onOpenChange={setOpenCategoryDialog}>
          <DialogTrigger asChild>
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault();
                setOpenCategoryDialog(true);
              }}
              className="text-purple-700! bg-purple-100! font-medium cursor-pointer hover:bg-purple-200!"
            >
              Atualizar Categoria
            </DropdownMenuItem>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader className="border-b">
              <DialogTitle>Escolha a categoria</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCategoryUpdate}>
              <CategoryCombobox
                categories={categories}
                value={categoriaSelecionada}
                onChange={setCategoriaSelecionada}
              />
              <DialogFooter>
                <Button type="submit" disabled={!categoriaSelecionada}>
                  Atualizar
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// Função para truncar textos longos na tabela
function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}
