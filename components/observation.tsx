"use client";

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxTrigger,
  ComboboxValue,
} from "@/components/ui/combobox";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Check, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type Student = {
  id: string;
  name: string;
  attendanceId: string;
  observation: string | null;
};

export function StudentObservationForm() {
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [observation, setObservation] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await fetch("/api/attendance/today");
      const data = await res.json();
      setStudents(data);
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleSelect = (studentId: string) => {
    const student = students.find((s) => s.id === studentId);
    if (student) {
      setSelectedStudent(student);
      setObservation(student.observation ?? "");
      setSaved(false);
    }
  };

  const handleSave = async () => {
    if (!selectedStudent) return;

    setSaving(true);
    try {
      const res = await fetch("/api/attendance/observation", {
        method: "POST",
        body: JSON.stringify({
          attendanceId: selectedStudent.attendanceId,
          observation,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error();
      toast.success("Observação salva!");
      setSaved(true);
    } catch {
      toast.error("Erro ao salvar observação.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Combobox onValueChange={handleSelect}>
          <ComboboxTrigger className="w-full">
            <ComboboxValue placeholder="Selecione um aluno..." />
          </ComboboxTrigger>
          <ComboboxContent>
            <ComboboxInput placeholder="Buscar aluno..." />
            {students.length === 0 ? (
              <ComboboxEmpty>Nenhum aluno presente hoje.</ComboboxEmpty>
            ) : (
              students.map((student) => (
                <ComboboxItem key={student.id} value={student.id}>
                  {student.name}
                </ComboboxItem>
              ))
            )}
          </ComboboxContent>
        </Combobox>
      </div>

      {selectedStudent && (
        <div className="space-y-2">
          <Textarea
            value={observation}
            onChange={(e) => setObservation(e.target.value)}
            placeholder="Digite uma observação sobre este aluno..."
            className="text-sm"
          />
          <Button onClick={handleSave} disabled={saving}>
            {saving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : saved ? (
              <>
                <Check className="w-4 h-4 mr-2" /> Salvo
              </>
            ) : (
              "Salvar observação"
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
