"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ThemeSwitch } from "@/components/theme-switch";
import { Separator } from "@/components/ui/separator";

export type LoanReceipt = {
  id: string;
  peopleId: string;
  bookId: string;
  loanDate: string; // ISO date string
  dueDate: string;
  returnDate: string | null;
  status: "ACTIVE" | "RETURNED" | string;
  userId: string;
  book: {
    id: string;
    title: string;
    author: string;
    publisher: string;
    barcode: string;
    totalCopies: number;
    availableCopies: number;
    category: {
      name: string;
    };
  };
  people: {
    name: string;
    status: string;
    course: {
      name: string;
      year: string;
    };
  };
  user: {
    name: string;
    email: string;
  };
};

import Image from "next/image";
import { useSearchParams } from "next/navigation";

export default function LoanReceiptPage() {
  const id = useSearchParams().get("id");
  const [loan, setLoan] = React.useState<LoanReceipt>();

  React.useEffect(() => {
    fetch(`api/loan/receipt?id=${id}`).then((res) =>
      res.json().then((data) => setLoan(data))
    );
  }, []);

  const handlePrint = () => window.print();

  return (
    <div className='max-w-3xl mx-auto p-6 rounded-md print:p-0 print:bg-white print:text-zinc-950'>
      <div className='flex justify-between print:hidden mb-4'>
        <ThemeSwitch />
        <Button onClick={handlePrint}>Imprimir comprovante</Button>
      </div>
      <Separator className='print:hidden' />
      <div className='print:mt-10 mt-5'>
        <Image
          src='/ibnhorizontal.png'
          alt=''
          className='mx-auto mb-3 dark:print:brightness-[0.11] print:brightness-[0.11] dark:brightness-[10] brightness-[0.10]'
          width={150}
          height={100}
        />
        <Separator className='bg-zinc-950 mb-3' />
        <section className='flex items-center justify-between border-y print:border-zinc-950 px-2 py-2 mb-1'>
          <p>
            <span className='font-bold'>Bibliotecário:</span> {loan?.user.name}
          </p>
          <p>
            <span className='font-bold'>Email:</span> {loan?.user.email}
          </p>
        </section>

        <section className='flex items-center justify-between border-y print:border-zinc-950 px-2 py-2 mb-1'>
          <div>
            <p>
              <span className='font-bold'>Leitor:</span> {loan?.people.name}
            </p>
            <p>
              <span className='font-bold'>Corpo:</span> {loan?.people.status}
            </p>
          </div>
          <p>
            <span className='font-bold'>Curso:</span> {loan?.people.course.name}
            -{loan?.people.course.year}
          </p>
        </section>

        <section className='flex flex-col items-center justify-between border-y print:border-zinc-950 px-2 py-2 mb-1'>
          <div className='flex items-center justify-between w-full'>
            <p>
              <span className='font-bold'>Livro:</span> {loan?.book.title}
            </p>
            <p>
              <span className='font-bold'>ID:</span> {loan?.book.id}
            </p>
          </div>
          <div className='flex items-center justify-between w-full'>
            <p>
              <span className='font-bold'>Autor:</span> {loan?.book.author}
            </p>
            <p></p>
          </div>
          <div className='flex items-center justify-between w-full'>
            <p>
              <span className='font-bold'>Editora:</span> {loan?.book.publisher}
            </p>
            <p>
              <span className='font-bold'>Categoria:</span>{" "}
              {loan?.book.category.name}
            </p>
          </div>
          <div className='flex items-center justify-between w-full'>
            <p>
              <span className='font-bold'>Quantidade Total:</span>{" "}
              {loan?.book.totalCopies}
            </p>
            <p>
              <span className='font-bold'>Quantidade Disponivél:</span>{" "}
              {loan?.book.availableCopies}
            </p>
          </div>

          <section className='flex w-full  items-center justify-between border-t print:border-zinc-950 py-2 mt-2'>
            <div className=''>
              <p>
                <span className='font-bold'>Data do emprestimo:</span>{" "}
                {new Date(loan?.loanDate!).toLocaleDateString()}
              </p>
              <p>
                <span className='font-bold'>Data de renovar:</span>{" "}
                {new Date(loan?.returnDate!).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p>
                <span className='font-bold '>Data de devolução:</span>{" "}
                {loan?.returnDate ? (
                  new Date(loan.returnDate).toLocaleDateString()
                ) : (
                  <span className='text-red-600 underline'>Não retornou ainda</span>
                )}
              </p>
            </div>
          </section>
        </section>

        <Separator className='bg-zinc-950 mb-3' />
      </div>
    </div>
  );
}
