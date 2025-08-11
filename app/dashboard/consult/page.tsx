"use client";

import { useUserSession } from "@/context/UserSessionContext";
import { ComboboxReaders } from "@/components/combo-box";
import { toast } from "sonner";
import { TypeBooks } from "@/types/books";
import React from "react";
import { Barcode } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "@/components/loading-spinner";

export default function Consult() {
  const [data, setBooks] = React.useState([]);
  const [readers, setReaders] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const load = async () => {
      try {
        const book = await fetch("/api/books");
        setBooks(await book.json());

        const readers = await fetch("/api/readers");
        setReaders(await readers.json());
      } finally {
        setLoading(true);
      }
    };

    load();
  }, []);

  // Estado do livro encontrado pelo código de barras
  const [selectedBook, setSelectedBook] = React.useState<TypeBooks | null>(
    null
  );

  const [popoverOpen, setPopoverOpen] = React.useState(false);
  const [leitorSelecionado, setleitorSelecionado] = React.useState<string>();
  const session = useUserSession();

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
  if (!loading) {
    return (
      <div className="w-full min-h-[90vh] flex items-center justify-center">
        <LoadingSpinner size="lg" variant="spinner" text="Carregando dados..."/>
      </div>
    )
  } else {
    return (
      <div className="w-full min-h-[90vh] flex items-center justify-center">
        <h1 className=" font-bold text-4xl">Pronto para procurar o Livro!</h1>
        {/* Dialog do código de barras */}
        <Dialog open={popoverOpen} onOpenChange={setPopoverOpen}>
          <DialogContent>
            <DialogHeader className='border-b'>
              <DialogTitle className='font-bold text-2xl'>
                Criando consulta
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className='flex flex-col gap-1'>
              <section className='shadow-md dark:bg-zinc-900 px-2 pb-2 pt-1 mb-2 rounded-md'>
                <h2 className='text-md font-bold'>{selectedBook?.title}</h2>
                <p className='text-xs italic'>
                  De autoria de{" "}
                  <span className='font-medium'>{selectedBook?.author}</span>{" "}
                  pela {selectedBook?.publisher}
                </p>
                <p className='text-xs italic text-end space-x-1'>
                  <Barcode className='inline size-3' />
                  {selectedBook?.barcode || "Código não cadastrado"}
                </p>
              </section>
              <ComboboxReaders data={readers} onSelect={setleitorSelecionado} />
              <DialogFooter>
                <Button type='submit' disabled={!leitorSelecionado}>
                  Criar consulta
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

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
