import { useUserSession } from "@/context/UserSessionContext";
import { ComboboxReaders } from "./combo-box";
import { Separator } from "./ui/separator";
import { Button } from "@/components/ui/button";
import { TypeBooks } from "@/types/books";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import * as React from "react";
import { TypeComboBoxReaders } from "@/types/combobox";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Barcode, MoreHorizontal } from "lucide-react";
import { Label } from "./ui/label";
import { CategoryCombobox } from "./category-combox";
import { IsBarcode } from "./data-table";
import { TypeCategories } from "@/types/categories";

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
  const [openDialogTwo, setOpenDialogTwo] = React.useState(false);
  const [openCategoryDialog, setOpenCategoryDialog] = React.useState(false);
  const [leitorSelecionado, setLeitorSelecionado] = React.useState("");
  const [categoriaSelecionada, setCategoriaSelecionada] = React.useState("");
  const session = useUserSession();


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    fetch(
      `/api/loan?email=${session?.email}&book=${book.id}&reader=${leitorSelecionado}`,
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

    setOpenDialog(false);
  };

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
        <Button variant='ghost' className='h-8 w-8 p-0'>
          <span className='sr-only'>Abrir menu</span>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align='end'>
        <DropdownMenuLabel>Ações</DropdownMenuLabel>

        {/* Consultar Livro */}
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault();
                setOpenDialog(true);
              }}
              className='text-teal-800! bg-teal-200! font-medium cursor-pointer hover:bg-teal-100!'
            >
              Consultar Livro
            </DropdownMenuItem>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader className='border-b'>
              <DialogTitle className='font-bold text-2xl'>
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
        <Separator className='my-1' />

        {/* Atualizar Categoria */}
        <Dialog open={openCategoryDialog} onOpenChange={setOpenCategoryDialog}>
          <DialogTrigger asChild>
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault();
                setOpenCategoryDialog(true);
              }}
              className='font-medium cursor-pointer mb-1 '
            >
              Atualizar categoria
            </DropdownMenuItem>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader className='border-b'>
              <DialogTitle className='font-bold text-2xl'>
                Atualizar Categoria
              </DialogTitle>
            </DialogHeader>
            <form
              onSubmit={handleCategoryUpdate}
              className='flex flex-col gap-4 pt-4'
            >
              <Label>Categoria</Label>
              <CategoryCombobox
                categorias={categories}
                onSelect={(val) => setCategoriaSelecionada(val)}
              />
              <DialogFooter>
                <Button type='submit' disabled={!categoriaSelecionada}>
                  Atualizar
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Atualizar Código de Barras */}
        {!book.barcode ? (
          <>
            <Dialog open={openDialogTwo} onOpenChange={setOpenDialogTwo}>
              <DialogTrigger asChild>
                <DropdownMenuItem
                  onSelect={(e) => {
                    e.preventDefault();
                    setOpenDialogTwo(true);
                  }}
                  className='text-yellow-800! bg-yellow-200! font-medium cursor-pointer hover:bg-yellow-100!'
                >
                  Atualizar código
                </DropdownMenuItem>
              </DialogTrigger>
              <IsBarcode id={book.id} />
            </Dialog>
          </>
        ) : (
          ""
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
