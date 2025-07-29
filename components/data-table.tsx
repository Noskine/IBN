"use client";

import * as React from "react";
import Link from "next/link";
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
import {
  ArrowUpDown,
  Barcode,
  ChevronDown,
  MoreHorizontal,
} from "lucide-react";

import { useUserSession } from "@/context/UserSessionContext";
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
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogTrigger,
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

import { ComboboxReaders } from "./combo-box";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { TypeBooks } from "@/types/books";
import { TypeComboBoxReaders } from "@/types/combobox";
import { Label } from "./ui/label";

function BookActions({
  book,
  readers,
}: {
  book: TypeBooks;
  readers: TypeComboBoxReaders[];
}) {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [leitorSelecionado, setLeitorSelecionado] = React.useState("");
  const session = useUserSession();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    fetch(
      `/api/loan?email=${session?.email}&book=${book.id}&reader=${leitorSelecionado}`,
      {
        method: "POST",
      }
    ).then((res) => {
      if (res.ok) {
        toast("Consultado finalizada! ✅📅");
        const timer = setTimeout(() => {
          window.location.reload();
        }, 1000);

        return () => clearTimeout(timer);
      } else {
        toast("Algo de errado aconteceu! ❌");
      }
    });

    setOpenDialog(false);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='h-8 w-8 p-0'>
          <span className='sr-only'>Abrir menu</span>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align='end'>
        <DropdownMenuLabel>Ações</DropdownMenuLabel>

        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault(); // evita fechar o dropdown
                setOpenDialog(true);
              }}
              className='text-teal-800! bg-teal-200! font-medium cursor-pointer hover:bg-teal-100! transition-colors'
            >
              Consultar Livro
            </DropdownMenuItem>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader className='border-b'>
              <DialogTitle className='font-bold text-2xl '>
                Criando consulta
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className='flex flex-col gap-1'>
              <section className='shadow-md dark:bg-zinc-900 px-2 pb-2 pt-1 mb-2 rounded-md'>
                <h2 className='text-md font-bold'>{book.title}</h2>
                <p className='text-xs italic'>
                  De autoria de{" "}
                  <span className='font-medium'>{book.author}</span> pela{" "}
                  {book.publisher}
                </p>
                <p className='text-xs italic text-end space-x-1'>
                  <Barcode className='inline size-3' />
                  {book.barcode || "Código não cadastrado"}
                </p>
              </section>

              <ComboboxReaders
                data={readers!}
                onSelect={(leitor) => setLeitorSelecionado(leitor)}
              />

              <DialogFooter>
                <Button type='submit' disabled={!leitorSelecionado}>
                  Criar consulta
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </DropdownMenuContent>
      <DropdownMenuContent align='end'>
        <DropdownMenuLabel>Ações</DropdownMenuLabel>

        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault(); // evita fechar o dropdown
                setOpenDialog(true);
              }}
              className='text-teal-800! bg-teal-200! font-medium cursor-pointer hover:bg-teal-100! transition-colors'
            >
              Consultar Livro
            </DropdownMenuItem>
          </DialogTrigger>
          {book.barcode ? <IsBarcode id={book.id} /> : null}
        </Dialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function DataTableDemo({
  data,
  readers,
}: {
  data: TypeBooks[];
  readers: TypeComboBoxReaders[];
}) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const columns: ColumnDef<TypeBooks>[] = [
    {
      accessorKey: "title",
      header: () => <span className='font-bold'>Título</span>,
      cell: ({ row }) => (
        <div className='capitalize font-medium'>
          <HoverCard>
            <HoverCardTrigger className='cursor-default'>
              {truncate(row.original.title, 40)}
            </HoverCardTrigger>
            <HoverCardContent className='text-xs! p-1! text-center w-fit'>
              {row.original.title}
            </HoverCardContent>
          </HoverCard>
        </div>
      ),
    },
    {
      accessorKey: "author",
      header: ({ column }) => (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Autor <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => (
        <HoverCard>
          <HoverCardTrigger className='cursor-default text-center capitalize'>
            {truncate(row.getValue("author"), 15)}
          </HoverCardTrigger>
          <HoverCardContent className='text-xs! p-1! text-center w-fit'>
            {row.getValue("author")}
          </HoverCardContent>
        </HoverCard>
      ),
    },
    {
      accessorKey: "publisher",
      header: "Editora",
      cell: ({ row }) => (
        <div className='capitalize'>{row.getValue("publisher")}</div>
      ),
    },
    {
      accessorKey: "totalCopies",
      header: "Totais",
      cell: ({ row }) => (
        <div className='text-center'>{row.getValue("totalCopies")}</div>
      ),
    },
    {
      accessorKey: "availableCopies",
      header: ({ column }) => (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Disponíveis <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => (
        <div className='text-center'>{row.getValue("availableCopies")}</div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => <BookActions book={row.original} readers={readers!} />,
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
  return (
    <div className='w-full'>
      {/* Filtros e Colunas */}
      <div className='flex items-center py-4 gap-2'>
        <Input
          placeholder='Pesquisar por título'
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(e) =>
            table.getColumn("title")?.setFilterValue(e.target.value)
          }
          className='max-w-sm'
        />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline' className='ml-auto'>
              Colunas <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            {table
              .getAllColumns()
              .filter((col) => col.getCanHide())
              .map((col) => (
                <DropdownMenuCheckboxItem
                  key={col.id}
                  className='capitalize'
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
      <div className='rounded-md border px-2'>
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
                  className='h-24 text-center'
                >
                  Aguardando resultados...
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Paginação */}
      <div className='flex items-center justify-end space-x-2 py-4'>
        <div className='text-sm text-muted-foreground flex-1'>
          Página {table.getState().pagination.pageIndex + 1} de{" "}
          {table.getPageCount()} • Mostrando {table.getRowModel().rows.length}{" "}
          de {table.getFilteredRowModel().rows.length} linhas
        </div>

        <div className='space-x-2'>
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
    </div>
  );
}

function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}
type IsBarcodeProps = {
  id: string
}

export function IsBarcode({ id }: IsBarcodeProps) {
  const [code, setCode] = React.useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const res = await fetch(`/api/book?id=${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      })

      if (res.ok) {
        toast.success("Código de Barras registrado! 👍")
        setTimeout(() => window.location.reload(), 1000)
      } else {
        toast.error("Algo de errado aconteceu! ❌")
      }
    } catch (error) {
      console.error(error)
      toast.error("Erro de rede! ❌")
    }
  }

  return (
    <DialogContent>
      <DialogHeader className="border-b">
        <DialogTitle className="font-bold text-2xl">
          Atualizar o código de barras
        </DialogTitle>
      </DialogHeader>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 pt-4">
        <div className="space-y-1">
          <Label htmlFor="code">Código de barras</Label>
          <Input
            id="code"
            name="barcode"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
        </div>

        <DialogFooter>
          <Button type="submit">Criar consulta</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}