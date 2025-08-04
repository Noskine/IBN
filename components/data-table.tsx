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
import {
  ArrowUpDown,
  ChevronDown,

} from "lucide-react";

import { BookActions } from "./book-actions";

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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
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
import { Label } from "./ui/label";
import { TypeCategories } from "@/types/categories";

export function DataTableDemo({
  data,
  readers,
  categories
}: {
  data: TypeBooks[];
    readers: TypeComboBoxReaders[];
  categories: TypeCategories[]
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
      accessorKey: "category.name",
      header: "Categoria",
      cell: ({ row }) => (
        <div className='capitalize'>{row.original.category.name}</div>
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
      cell: ({ row }) => <BookActions book={row.original} readers={readers!} categories={categories!} />,
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
  id: string;
};

export function IsBarcode({ id }: IsBarcodeProps) {
  const [code, setCode] = React.useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/book?id=${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      });

      if (res.ok) {
        toast.success("Código de Barras registrado! 👍");
        setTimeout(() => window.location.reload(), 1000);
      } else {
        toast.error("Algo de errado aconteceu! ❌");
      }
    } catch (error) {
      console.error(error);
      toast.error("Erro de rede! ❌");
    }
  };

  return (
    <DialogContent>
      <DialogHeader className='border-b'>
        <DialogTitle className='font-bold text-2xl'>
          Atualizar o código de barras
        </DialogTitle>
      </DialogHeader>

      <form onSubmit={handleSubmit} className='flex flex-col gap-4 pt-4'>
        <div className='space-y-1'>
          <Label htmlFor='code'>Código de barras</Label>
          <Input
            id='code'
            name='barcode'
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
        </div>

        <DialogFooter>
          <Button type='submit'>Atualizar</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
