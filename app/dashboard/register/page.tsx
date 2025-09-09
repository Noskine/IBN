import { useEffect, useState } from "react";
import { AttendanceTable } from "@/components/AttendanceTable";
import { StudentObservationForm } from "@/components/observation";
import ScannerListener from "@/components/ScannerListener";
import ManualEntry from "@/components/manualEntrey";  // Importando o componente ManualEntry

export default function Page() {
  const [attendance, setAttendance] = useState([]);
  const [obs, setObs] = useState([]);
  const [statusMessage, setStatusMessage] = useState("");  // Mensagem de status para feedback do usuário

  useEffect(() => {
    fetch("/api/attendance/list").then((res) => res.json().then((data) => setAttendance(data)));
    fetch("/api/obs").then((res) => res.json().then((data) => setObs(data)));
  }, []);

  return (
    <div className="p-6 min-[100vh]!">
      <div className='h-1/2 flex items-center justify-center'>
        <h1 className='text-2xl font-bold'>Controle de Entrada e Saída</h1>
        <ScannerListener /> {/* Componente do Scanner */}
      </div>

      {/* Componente para Entrada Manual */}
      <ManualEntry />

      {/* Tabela de presença */}
      <AttendanceTable data={attendance} />

      {/* Formulário de observação */}
      <StudentObservationForm />
    </div>
  );
}
