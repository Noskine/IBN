'use client'
import { AttendanceTable } from "@/components/AttendanceTable";
import ScannerListener from "@/components/ScannerListener";
import { useEffect, useState } from "react";

export default function Page() {
  const [attendance, setAttendance] = useState([]);

    useEffect(() => {
      fetch("/api/attendance/list").then((res) => res.json().then((data) => setAttendance(data)));
  
    }, []);
  

  return (
    <>
      <div className='h-1/2 flex items-center justify-center'>
        <h1 className='text-2xl font-bold'>Controle Saída</h1>
        <ScannerListener />
      </div>
      <AttendanceTable data={attendance} />
    </>
  );
}
