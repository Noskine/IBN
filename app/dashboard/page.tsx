"use client";

import { AttendanceTable } from "@/components/AttendanceTable";
import { DataTableDemo } from "@/components/data-table";
import { LoanTable } from "@/components/data-table-loans";
import { SectionCards } from "@/components/section-cards";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [books, setBooks] = useState([]);
  const [readers, setReaders] = useState([]);
  const [loans, setLoans] = useState([]);
  const [categories, setCategories] = useState([]);
  const [attendance, setAttendance] = useState([]);
  
  useEffect(() => {
    fetch("/api/books").then((res) =>
      res.json().then((data) => setBooks(data))
    );

    fetch("/api/readers").then((res) =>
      res.json().then((data) => setReaders(data))
    );

    fetch("/api/loan").then((res) => res.json().then((data) => setLoans(data)));

    fetch("/api/categories").then((res) => res.json().then((data) => setCategories(data)));
    fetch("/api/attendance/list").then((res) => res.json().then((data) => setAttendance(data)));

  }, []);

  return (
    <div className='flex flex-1 flex-col px-4 lg:px-6'>
      <div className='@container/main flex flex-1 flex-col gap-2'>
        <div className='flex flex-col gap-4 py-4 md:gap-6 md:py-6'>
          <div>
            <h2 className='text-2xl font-bold'>Livros em maior quantidade</h2>
            <Separator className='mt-1 mb-3' />
            <SectionCards data={books!} />
          </div>
          <div>
            <h2 className='text-2xl font-bold'>Livros</h2>
            <Separator className='mt-1 mb-3' />
            <DataTableDemo data={books!} readers={readers!} categories={categories} />
          </div>
          <div>
            <h2 className='text-2xl font-bold'>Consultas</h2>
            <Separator className='mt-1 mb-3' />
            <LoanTable data={loans!} />
          </div>
          <div>
             <AttendanceTable data={attendance} />
          </div>
        </div>
      </div>
    </div>
  );
}
