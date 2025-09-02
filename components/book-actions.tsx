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
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);

  const [leitorSelecionado, setLeitorSelecionado] = React.useState("");
  const [categoriaSelecionada, setCategoriaSelecionada] = React.useState<string>(book.category?.id || "");
  const [editora, setEditora] = React.useState<string>(book.publisher || "");
  const [quantidadeTotal, setQuantidadeTotal] = React.useState<number>(book.totalCopies ?? 0);
  const [barcode, setBarcode] = React.useState<string>(book.barcode || "");
  const [author, setAuthor] = React.useState<string>(book.author || "");
  const [title, setTitle] = React.useState<string>(book.title || "");
  const [availableCopies, setAvailableCopies] = React.useState<number>(book.availableCopies ?? 0);

  const [confirmText, setConfirmText] = React.useState("");
  const [isDeleting, setIsDeleting] = React.useState(false);

  const session = useUserSession();

  React.useEffect(() => {
    if (openUpdateDialog) {
      setTitle(book.title || "");
      setCategoriaSelecionada(book.category?.id || "");
      setEditora(book.publisher || "");
      setAuthor(book.author || "");
      setBarcode(book.barcode || "");
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
} else if (res.status === 400) {
  const l = await res.json()
  toast(`${l.message} 😢`);
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
      author,
      title,
      availableCopies,
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

  const handleDelete = async () => {

    try {
      const res = await fetch(`/api/book?id=${book.id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("Livro Deletado 👍");
        setTimeout(() => window.location.reload(), 1000);
      } else {
        toast.error("Erro ao atualizar livro. ❌");
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
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Abrir menu</span>
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Ações</DropdownMenuLabel>

          <DropdownMenuItem asChild>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setOpenDialog(true);
              }}
              className="w-full text-left font-medium cursor-pointer px-2 py-1"
            >
              Consultar Livro
            </button>
          </DropdownMenuItem>

          <Separator className="my-1" />

          <DropdownMenuItem asChild>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setOpenUpdateDialog(true);
              }}
              className="w-full text-left font-medium cursor-pointer px-2 py-1"
            >
              Atualizar livro
            </button>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setDeleteDialogOpen(true);
              }}
              className="w-full text-left text-red-600 font-medium cursor-pointer px-2 py-1"
            >
              Deletar livro
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Dialog de Consulta */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Criando consulta</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <section className="shadow-md px-2 pb-2 pt-1 mb-2 rounded-md">
              <h2 className="text-md font-bold">{book.title}</h2>
              <p className="text-xs italic">
                De autoria de <span className="font-medium">{book.author}</span> pela {book.publisher}
              </p>
              <p className="text-xs italic text-end">
                Código: {book.barcode || "Não cadastrado"}
              </p>
            </section>

            <ComboboxReaders data={readers} onSelect={setLeitorSelecionado} />

            <DialogFooter className="mt-1">
              <Button type="submit" disabled={!leitorSelecionado} onClick={() => {setOpenDialog(false)}}>
                Criar consulta
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Dialog de Atualização */}
      <Dialog open={openUpdateDialog} onOpenChange={setOpenUpdateDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Atualizar {title}</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleUpdateAll} className="flex flex-col gap-4">
            <div>
              <Label htmlFor="title">Título</Label>
              <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <Label>Categoria</Label>
            <CategoryCombobox categorias={categories} onSelect={setCategoriaSelecionada} selectedCategoryId={categoriaSelecionada} />

            <div className="flex gap-2">
              <div>
                <Label htmlFor="author">Autor</Label>
                <Input id="author" value={author} onChange={(e) => setAuthor(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="publisher">Editora</Label>
                <Input id="publisher" value={editora} onChange={(e) => setEditora(e.target.value)} />
              </div>
            </div>

            <div className="flex gap-2">
              <div>
                <Label htmlFor="quantity">Quantidade Total</Label>
                <Input id="quantity" type="number" value={quantidadeTotal} onChange={(e) => setQuantidadeTotal(Number(e.target.value))} />
              </div>
              <div>
                <Label htmlFor="availableCopies">Disponíveis</Label>
                <Input id="availableCopies" type="number" value={availableCopies} onChange={(e) => setAvailableCopies(Number(e.target.value))} />
              </div>
            </div>

            <div>
              <Label htmlFor="barcode">Código de Barras</Label>
              <Input id="barcode" value={barcode} onChange={(e) => setBarcode(e.target.value)} />
            </div>

            <DialogFooter>
              <Button type="submit">Atualizar</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Dialog de Exclusão */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Deletar Livro</DialogTitle>
          </DialogHeader>
          <p>
            Tem certeza que deseja deletar <strong>{book.title}</strong>? Digite <span className="text-yellow-500 italic">eu confirmo</span> para confirmar.
          </p>
          <Input value={confirmText} onChange={(e) => setConfirmText(e.target.value)} placeholder="Digite eu confirmo" />
          <DialogFooter>
            <Button variant="destructive" disabled={confirmText !== "eu confirmo" || isDeleting} onClick={handleDelete}>
              {isDeleting ? "Deletando..." : "Confirmar Exclusão"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
