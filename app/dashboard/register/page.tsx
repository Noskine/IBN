'use client'
import { AttendanceTable } from "@/components/AttendanceTable";
import { StudentObservationForm } from "@/components/observation";
import ScannerListener from "@/components/ScannerListener";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";

export default function Page() {
  const [attendance, setAttendance] = useState([]);
  const [obs, setObs] = useState([]);

  useEffect(() => {
    fetch("/api/attendance/list").then((res) => res.json().then((data) => setAttendance(data)));
    fetch("/api/obs").then((res) => res.json().then((data) => setObs(data)));
  }, []);


  return (
    <div className="px-6">
      <div className='h-1/2 flex items-center justify-center'>
        <h1 className='text-2xl font-bold'>Controle Saída</h1>
        <ScannerListener />
      </div>
      <AttendanceTable data={attendance} />
      <StudentObservationForm />
    </div>
  );
}
