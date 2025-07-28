"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ReaderType } from "@/types/reader";
import { AlertOctagon, Check, Loader } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function BookPage() {
  const [reader, setReader] = useState<ReaderType>();
    const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    fetch(`/api/reader?id=${params.id}`).then((res) =>
      res.json().then((data) => {
        setReader(data);
        console.log(data);
      })
    );
  }, []);

  return (
    <div className='flex flex-1 flex-col px-4 mt-6 lg:px-6'>
      <h1 className='text-3xl font-bold'>{reader?.name}</h1>
      <div className='text-xs italic my-1'>
        <span>{reader?.status}</span>{" "}
        <span>
          {reader?.course.name} - {reader?.course.year}
        </span>
      </div>
      <Separator className='my-1' />
      {reader?.loans.map((e, k) => {
        const color =
          e.status === "ACTIVE"
            ? "bg-sky-500 text-zinc-950 dark:bg-sky-600 dark:text-white"
            : status === "RETURNED"
            ? "bg-green-500 text-zinc-950 dark:bg-green-600 dark:text-white"
            : status === "LATE"
            ? "bg-yellow-500 text-zinc-950 dark:bg-yellow-600 dark:text-white"
            : "bg-red-500 text-zinc-950 dark:bg-red-600 dark:text-white";

        return (
          <div
            className='w-full shadow-lg dark:bg-zinc-800 bg-zinc-50 px-2 py-3 rounded-lg mb-3'
            key={k}
          >
            <h2 className='font-bold'>{e.book.title}</h2>
            <Separator className='bg-zinc-400 my-1' />
            <p className='space-x-3'>
              <span className='text-xs'>
                <span className='font-bold'>Autor: </span>
                {e.book.author}
              </span>
              <span className='text-xs'>
                <span className='font-bold'>Publicado por: </span>
                {e.book.publisher}
              </span>
              <span className='text-xs'>
                <span className='font-bold'>Código de barras: </span>
                {e.book.barcode ? e.book.barcode : "N/A"}
              </span>
            </p>
            <p className='space-x-3 mt-1'>
              <span className='text-xs'>
                <span className='font-bold'>Consultado em: </span>
                {new Date(e?.loanDate!).toLocaleDateString()}
              </span>
              <span className='text-xs'>
                <span className='font-bold'>Prazo de Entrega: </span>
                {new Date(e?.dueDate!).toLocaleDateString()}
              </span>
              <span className='text-xs'>
                <span className='font-bold'>Entregado em: </span>
                {e.returnDate ? new Date(e?.returnDate!).toLocaleDateString(): "—"}
              </span>
              <span>
                <Badge className={color + ""} variant='outline'>
                  {e.status === "ACTIVE" ? (
                    <Emprestado />
                  ) : e.status === "RETURNED" ? (
                    <Retornado />
                  ) : e.status === "LATE" ? (
                    <Atrasado />
                  ) : (
                    <Perdido />
                  )}
                </Badge>
              </span>
            </p>
          </div>
        );
      })}
    </div>
  );
}


function Emprestado() {
  return (
    <span className='flex gap-1 items-center'>
      <Loader className='size-3' /> Emprestado{" "}
    </span>
  );
}

function Retornado() {
  return (
    <span className='flex gap-1 items-center'>
      <Check className='size-3' /> Retornado{" "}
    </span>
  );
}

function Perdido() {
  return (
    <span className='flex gap-1 items-center'>
      <AlertOctagon className='size-3' /> Perdido{" "}
    </span>
  );
}

function Atrasado() {
  return (
    <span className='flex gap-1 items-center'>
      <AlertOctagon className='size-3' /> Atrasado{" "}
    </span>
  );
}
