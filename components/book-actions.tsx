"use client";

import * as React from "react";
import { useUserSession } from "@/context/UserSessionContext";
import { ComboboxReaders } from "./combo-box";
import { Separator } from "./ui/separator";
import { Button } from "@/components/ui/button";
import { TypeBooks } from "@/types/books";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { TypeComboBoxReaders } from "@/types/combobox";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Label } from "./ui/label";
import { CategoryCombobox } from "./category-combox";
import { TypeCategories } from "@/types/categories";
import { Input } from "@/components/ui/input";

export function BookActions({
  book,
  readers,
  categories,
}: {
  book: TypeBooks;
  readers: TypeComboBoxReaders[];
  categories: TypeCategories[];
}) {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = React.useState(false);
  const [leitorSelecionado, setLeitorSelecionado] = React.useState("");
  const [categoriaSelecionada, setCategoriaSelecionada] =
    React.useState<string>(book.category?.id || "");
  const [editora, setEditora] = React.useState<string>(book.publisher || "");
  const [quantidadeTotal, setQuantidadeTotal] = React.useState<number>(
    book.totalCopies ?? 0
  );
  const [barcode, setbarcode] = React.useState<string>("");
  const [author, setAuthor] = React.useState<string>("");
  const [title, setTitle] = React.useState<string>("");
  const [availableCopies, setAvailableCopies] = React.useState<number>(
    book.totalCopies ?? 0
  );
  const session = useUserSession();

  // Re-inicializa campos sempre que o diálogo de atualização abrir
  React.useEffect(() => {
    if (openUpdateDialog) {
      setTitle(book.title || "");
      setCategoriaSelecionada(book.category?.id || "");
      setEditora(book.publisher || "");
      setAuthor(book.author || "");
      setbarcode(book.barcode || "");
      setQuantidadeTotal(book.totalCopies ?? 0);
      setAvailableCopies(book.availableCopies ?? 0);
    }
  }, [openUpdateDialog, book]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(
      `/api/loan?email=${session?.email}&book=${book.id}&reader=${leitorSelecionado}`,
      { method: "POST" }
    );

    if (res.ok) {
      toast("Consulta finalizada! ✅📅");
      setTimeout(() => window.location.reload(), 1000);
    } else {
      toast("Algo de errado aconteceu! ❌");
    }

    setOpenDialog(false);
  };

  const handleUpdateAll = async (e: React.FormEvent) => {
    e.preventDefault();

    const body = {
      categoryId: categoriaSelecionada,
      publisher: editora,
      quantity: quantidadeTotal,
      code: barcode,
      author: author,
    };

    try {
      const res = await fetch(`/api/book?id=${book.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        toast.success("Livro atualizado com sucesso!");
        setTimeout(() => window.location.reload(), 1000);
      } else {
        toast.error("Erro ao atualizar livro.");
      }
    } catch {
      toast.error("Erro de rede ao atualizar livro.");
    }

    setOpenUpdateDialog(false);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='h-8 w-8 p-0'>
            <span className='sr-only'>Abrir menu</span>
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>Ações</DropdownMenuLabel>

          {/* Usando asChild + button para abrir o dialog */}
          <DropdownMenuItem asChild>
            <button
              type='button'
              onClick={(e) => {
                e.stopPropagation();
                // abre o dialog (direto)
                setOpenDialog(true);
              }}
              className='w-full text-left text-teal-800! bg-teal-200! font-medium cursor-pointer hover:bg-teal-100! px-2 py-1'
            >
              Consultar Livro
            </button>
          </DropdownMenuItem>

          <Separator className='my-1' />

          <DropdownMenuItem asChild>
            <button
              type='button'
              onClick={(e) => {
                e.stopPropagation();
                setOpenUpdateDialog(true);
              }}
              className='w-full text-left font-medium cursor-pointer mt-1 px-2 py-1'
            >
              Atualizar livro
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* DIALOG CONSULTA (fora do menu) */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog} modal>
        {/* Previne fechamento por ESC / clique fora enquanto testamos */}
        <DialogContent
          onEscapeKeyDown={(ev: any) => ev.preventDefault?.()}
          onPointerDownOutside={(ev: any) => ev.preventDefault?.()}
        >
          <DialogHeader className='border-b'>
            <DialogTitle className='font-bold text-2xl'>
              Criando consulta
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className='flex flex-col gap-1'>
            <section className='shadow-md dark:bg-zinc-900 px-2 pb-2 pt-1 mb-2 rounded-md'>
              <h2 className='text-md font-bold'>{book.title}</h2>
              <p className='text-xs italic'>
                De autoria de <span className='font-medium'>{book.author}</span>{" "}
                pela {book.publisher}
              </p>
              <p className='text-xs italic text-end space-x-1'>
                Código: {book.barcode || "Não cadastrado"}
              </p>
            </section>

            <ComboboxReaders
              data={readers}
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

      {/* DIALOG ATUALIZAÇÃO (fora do menu) */}
      <Dialog open={openUpdateDialog} onOpenChange={setOpenUpdateDialog} modal>
        <DialogContent
          onEscapeKeyDown={(ev: any) => ev.preventDefault?.()}
          onPointerDownOutside={(ev: any) => ev.preventDefault?.()}
        >
          <DialogHeader className='border-b'>
            <DialogTitle className='font-bold text-2xl'>
              Atualizar Livro
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleUpdateAll} className='flex flex-col gap-4 pt-4'>
            <Label>Categoria</Label>
            <div>
              <Label htmlFor='title'>Titulo</Label>
              <Input
                id='title'
                type='string'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <CategoryCombobox
              categorias={categories}
              onSelect={(val) => setCategoriaSelecionada(val)}
              selectedCategoryId={categoriaSelecionada}
            />
            <section className='flex gap-1 items-center space-y-1 justify-between'>
              <div>
                <Label htmlFor='author'>Author</Label>
                <Input
                  id='author'
                  type='string'
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor='publisher'>Editora</Label>
                <Input
                  id='publisher'
                  value={editora}
                  onChange={(e) => setEditora(e.target.value)}
                  required
                />
              </div>
            </section>
            
            <section className='flex gap-1 space-y-1 items-center justify-between'>
              <div>
                <Label htmlFor='quantity'>Quantidade Total</Label>
                <Input
                  id='quantity'
                  type='number'
                  min={0}
                  value={quantidadeTotal}
                  onChange={(e) => setQuantidadeTotal(Number(e.target.value))}
                  required
                />
              </div>
              <div>
                <Label htmlFor='availableCopies'>Quantidade Disponíveis</Label>
                <Input
                  id='availableCopies'
                  type='number'
                  min={0}
                  value={availableCopies}
                  onChange={(e) => setAvailableCopies(Number(e.target.value))}
                  required
                />
              </div>
            </section>
            <div>
              <Label htmlFor='barcode'>Código de Barras</Label>
              <Input
                id='barcode'
                type='string'
                value={barcode}
                onChange={(e) => setbarcode(e.target.value)}
              />
            </div>
            <DialogFooter>
              <Button
                type='submit'
                disabled={
                  !categoriaSelecionada || !editora || quantidadeTotal < 0
                }
              >
                Atualizar
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
