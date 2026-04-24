"use client";

import { DataTableDemo } from "@/components/data-table";
import { LoanTable } from "@/components/data-table-loans";
import { SectionCards } from "@/components/section-cards";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [books, setBooks] = useState<any[]>([]);
  const [readers, setReaders] = useState<any[]>([]);
  const [loans, setLoans] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchJson = async (url: string) => {
          const res = await fetch(url);

          if (!res.ok) {
            console.warn(`Erro ao buscar ${url}: ${res.status}`);
            return [];
          }

          const text = await res.text();
          return text ? JSON.parse(text) : [];
        };

        const [booksData, readersData, loansData, categoriesData, attendanceData] = await Promise.all([
          fetchJson("/api/books"),
          fetchJson("/api/readers"),
          fetchJson("/api/loan"),
          fetchJson("/api/categories"),
          fetchJson("/api/attendance/list"),
        ]);

        setBooks(booksData);
        setReaders(readersData);
        setLoans(loansData);
        setCategories(categoriesData);
      } catch (error) {
      }
    };

    fetchData();
  }, []);

  return (
    <div className='flex flex-1 flex-col px-4 lg:px-6 '>
      <div className='@container/main flex flex-1 flex-col gap-2'>
        <div className='flex flex-col gap-4 py-4 md:gap-6 md:py-6'>
          <div>
            <h2 className='text-2xl font-bold text-emerald-700 dark:text-emerald-500'>Livros em maior quantidade</h2>
            <Separator className='mt-1 mb-3 bg-emerald-700 dark:bg-emerald-200 ' />
            <SectionCards data={books} />
          </div>

          <div>
            <h2 className='text-2xl font-bold text-emerald-700 dark:text-emerald-500'>Livros</h2>
            <Separator className='mt-1 mb-3 bg-emerald-700 dark:bg-emerald-200' />
            <DataTableDemo data={books} readers={readers} categories={categories} />
          </div>
          <div>
            <h2 className='text-2xl font-bold text-emerald-700 dark:text-emerald-500'>Consultas</h2>
            <Separator className='mt-1 mb-3 bg-emerald-700 dark:bg-emerald-200' />
            <LoanTable data={loans} />

          </div>
          
          {/* <div>
            <AttendanceTable data={attendance} />
          </div> */}
        </div>
      </div>
    </div>
  );
}