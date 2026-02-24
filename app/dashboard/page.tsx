"use client";

import { AttendanceTable } from "@/components/AttendanceTable";
import { DataTableDemo } from "@/components/data-table";
import { LoanTable } from "@/components/data-table-loans";
import { SectionCards } from "@/components/section-cards";
import { Separator } from "@/components/ui/separator";
import RelatorioConsultasButton from "@/components/RelatorioConsultasButton";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [books, setBooks] = useState<any[]>([]);
  const [readers, setReaders] = useState<any[]>([]);
  const [loans, setLoans] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [attendance, setAttendance] = useState<any[]>([]);

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
        console.log(loansData)
        setCategories(categoriesData);
        setAttendance(attendanceData);
      } catch (error) {
        console.error("Falha ao carregar dados do dashboard:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='flex flex-1 flex-col px-4 lg:px-6'>
      <div className='@container/main flex flex-1 flex-col gap-2'>
        <div className='flex flex-col gap-4 py-4 md:gap-6 md:py-6'>
          <div>
            <h2 className='text-2xl font-bold'>Livros em maior quantidade</h2>
            <Separator className='mt-1 mb-3' />
            <SectionCards data={books} />
          </div>

          <div>
            <h2 className='text-2xl font-bold'>Livros</h2>
            <Separator className='mt-1 mb-3' />
            <DataTableDemo data={books} readers={readers} categories={categories} />
          </div>

          <div>
            <h2 className='text-2xl font-bold'>Consultas</h2>
            <Separator className='mt-1 mb-3' />
            <LoanTable data={loans} />

          </div>
          <div>
            <AttendanceTable data={attendance} />
          </div>
        </div>
      </div>
    </div>
  );
}