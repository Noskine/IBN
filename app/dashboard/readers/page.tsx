"use client";

import { ReadTable } from "@/components/data-table-readers";
import { useEffect, useState } from "react";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { toast } from "sonner";

export default function BookPage() {
  const [readers, setReaders] = useState([]);

  useEffect(() => {
    fetch("/api/readers").then((res) =>
      res.json().then((data) => {
        setReaders(data);
        console.log(data);
      })
    );
  }, []);

  return (
    <div className='flex flex-1 flex-col px-4 mt-6 lg:px-6'>
      <ReadTable data={readers} />
      <PeopleForm />
    </div>
  );
}

const formSchema = z.object({
  name: z.string().min(2, "Nome obrigatório"),
  status: z.string().min(2, "Status obrigatório"),
  courseId: z.string().min(1, "Curso obrigatório"),
});

type FormData = z.infer<typeof formSchema>;

function PeopleForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      status: "",
      courseId: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const res = await fetch("/api/readers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Erro ao criar leitor");
      toast("Leitor criado com sucesso!");
      router.refresh();
      form.reset();
    } catch (error) {
      toast("Falha ao criar leitor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-1/2 mx-auto my-5">
      <h1 className="font-bold text-2xl py-2">Criar novo Leitor</h1>
       <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder='Nome do leitor' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='status'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Corpo</FormLabel>
              <FormControl>
                <Input placeholder='Ex: DICENTE ou DOCENTE' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='courseId'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Curso</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Selecione um curso' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {[{id: "1", name:"1 ANO"}, {id: "1", name:"2 ANO"}].map((course) => (
                    <SelectItem key={course.id} value={course.id}>
                      {course.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' disabled={loading}>
          {loading ? "Criando..." : "Criar Leitor"}
        </Button>
      </form>
    </Form>
    </div>
  );
}
