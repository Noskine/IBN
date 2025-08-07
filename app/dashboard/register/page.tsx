import { StudentObservationForm } from "@/components/observation";
import ScannerListener from "@/components/ScannerListener";

export default function Page() {
  return (
    <>
      <div className='h-1/2 flex items-center justify-center'>
        <h1 className='text-2xl font-bold'>Controle Saída</h1>
        <ScannerListener />
      </div>
      <StudentObservationForm />
    </>
  );
}
