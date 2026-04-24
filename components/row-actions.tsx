"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { MoreHorizontal } from "lucide-react";

import { Loan } from "./data-table-loans";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Separator } from "./ui/separator";

export function RowActions({ loan }: { loan: Loan }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRenovar = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/loan?id=${loan.id}`, {
        method: "PATCH",
      });

      if (res.ok) {
        toast.success("Livro Renovado 👍");
        setOpenDialog(false);
        router.refresh();
      }
      if (res.status == 400) {
        toast.warning("Livro atrasado não pode ser renovado 📚");
      }
    } catch (err) {
      toast.error("Erro inesperado.");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async () => {
    if (confirmText !== "eu confirmo") return;

    setLoading(true);
    try {
      const res = await fetch(`/api/loan?id=${loan.id}`, {
        method: "PUT",
      });

      if (res.ok) {
        toast.success("Livro devolvido com sucesso!");
        setOpenDialog(false);
        const timer = setTimeout(() => {
          window.location.reload();
        }, 2000);

        return () => clearTimeout(timer);
      }
      if (res.status == 400) {
        toast.error("Erro ao devolver o livro.");
      }
    } catch (err) {
      toast.error("Erro inesperado.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex justify-end gap-2'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className="h-8 w-8 p-0 bg-zinc-300 hover:bg-zinc-400 dark:bg-zinc-800 cursor-pointer dark:focus:ring-emerald-400 dark:focus:ring-offset-0 focus:ring-emerald-500 focus:ring-2 focus:ring-offset-0">
            <span className='sr-only'>Abrir menu</span>
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align='end' className="space-y-0.5 bg-zinc-200 dark:bg-zinc-800 border-zinc-400 dark:border-zinc-600">
          <DropdownMenuLabel>Ações</DropdownMenuLabel>
          <DropdownMenuSeparator className="my-1 bg-zinc-400 dark:bg-zinc-600" />



          <DropdownMenuItem
            onClick={handleRenovar}
            className="w-full text-left font-medium cursor-pointer px-2 py-1 bg-yellow-200 text-yellow-800 dark:bg-yellow-700 dark:hover:bg-yellow-800 dark:text-yellow-200"
          >
            Renovar
          </DropdownMenuItem>

          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
              <DropdownMenuItem
                onSelect={(e) => {
                  e.preventDefault(); // Evita fechar o menu ao abrir o Dialog
                  setOpenDialog(true);
                }}
                 className="w-full text-left font-black cursor-pointer px-2 py-1 bg-emerald-200 text-emerald-800 dark:bg-emerald-700 dark:hover:bg-emerald-800 dark:text-emerald-200"
              >
                Confirmar Devolução
              </DropdownMenuItem>
            </DialogTrigger>
            <Separator className="my-1 bg-zinc-400 dark:bg-zinc-600" />

            <DialogContent className='border-green-50 dark:border-green-800 shadow-xl'>
              <DialogHeader>
                <DialogTitle className="text-emerald-700 dark:text-emerald-500 font-bold">Confirmar devolução</DialogTitle>
              </DialogHeader>
              <p className='text-sm text-muted-foreground mb-2 select-none'>
                Digite{" "}
                <strong className='text-sky-500 italic'>eu confirmo</strong>{" "}
                para confirmar a devolução do livro.
              </p>

              <Input
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                 className=" rounded-xl bg-zinc-50 dark:bg-zinc-800 shadow-sm placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:ring-emerald-500 focus:border-emerald-500 focus-visible:ring-emerald-500 focus-visible:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-zinc-200 disabled:text-zinc-500 disabled:border-zinc-200"
                placeholder='Digite aqui...'
              />

              <DialogFooter>
                <Button
                  onClick={handleConfirm}
                  disabled={confirmText !== "eu confirmo" || loading}
                  className='disabled:bg-red-500 disabled:cursor-not-allowed! no-select-none cursor-pointer text-white dark:text-zinc-950 hover:bg-yellow-600! transition-colors bg-yellow-500'
                >
                  {loading ? "Confirmando..." : "Confirmar devolução"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Link para outra página */}
              <Link href={`/receipt?id=${loan.id}`}>
                <DropdownMenuItem className='w-full text-left font-medium cursor-pointer px-2 py-1'>
                  Comprovante
                </DropdownMenuItem>
              </Link>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
