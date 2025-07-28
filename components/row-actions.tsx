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
          <Button variant='ghost' className='h-8 w-8 p-0'>
            <span className='sr-only'>Abrir menu</span>
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>Ações</DropdownMenuLabel>

          {/* Link para outra página */}
          <Link href={`/receipt?id=${loan.id}`}>
            <DropdownMenuItem className='cursor-pointer'>
              Comprovante
            </DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={handleRenovar}
            className='cursor-pointer text-yellow-900 hover:text-yellow-900! hover:bg-yellow-100! bg-yellow-200'
          >
            Renovar
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
              <DropdownMenuItem
                onSelect={(e) => {
                  e.preventDefault(); // Evita fechar o menu ao abrir o Dialog
                  setOpenDialog(true);
                }}
                className='text-green-800! bg-green-200 cursor-pointer hover:bg-green-100! transition-colors!'
              >
                Confirmar Devolução
              </DropdownMenuItem>
            </DialogTrigger>

            <DialogContent className='border-green-50 dark:border-green-800 shadow-xl'>
              <DialogHeader>
                <DialogTitle>Confirmar devolução</DialogTitle>
              </DialogHeader>

              <p className='text-sm text-muted-foreground mb-2 select-none'>
                Digite{" "}
                <strong className='text-green-500 italic'>eu confirmo</strong>{" "}
                para confirmar a devolução do livro.
              </p>

              <Input
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                placeholder='Digite aqui...'
              />

              <DialogFooter>
                <Button
                  onClick={handleConfirm}
                  disabled={confirmText !== "eu confirmo" || loading}
                  className='disabled:bg-red-500 disabled:cursor-not-allowed! no-select-none cursor-pointer text-white dark:text-zinc-950 hover:bg-green-600! transition-colors bg-green-500'
                >
                  {loading ? "Confirmando..." : "Confirmar devolução"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
