"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
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
  const [open, setOpen] = useState(false);

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
      setOpen(false);
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
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full justify-start">
            {selectedStudent ? selectedStudent.name : "Selecione um aluno..."}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Buscar aluno..." />
            <CommandEmpty>Nenhum aluno presente hoje.</CommandEmpty>
            <CommandGroup>
              {students.map((student) => (
                <CommandItem
                  key={student.id}
                  onSelect={() => handleSelect(student.id)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedStudent?.id === student.id
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {student.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>

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
