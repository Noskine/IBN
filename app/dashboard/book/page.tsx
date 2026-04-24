"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";

interface Category {
  id: string;
  name: string;
}

export default function NewBookPage() {
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [open, setOpen] = React.useState(false);

  // Categoria selecionada (id)
  const [categoryValue, setCategoryValue] = React.useState("");
  // Texto de busca do combobox
  const [query, setQuery] = React.useState("");

  const [formData, setFormData] = React.useState({
    title: "",
    author: "",
    publisher: "",
    categoryId: "",
    quantity: 1,
    barcode: "",
  });

  React.useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();
        if (Array.isArray(data)) {
          setCategories(data);
        } else {
          console.error("Resposta inválida de categorias", data);
          setCategories([]);
        }
      } catch (error) {
        console.error("Erro ao buscar categorias", error);
        setCategories([]);
      }
    }
    fetchCategories();
  }, []);

  function normalizeString(str: string) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  }

  const filteredCategories = React.useMemo(() => {
    if (!query) return categories;
    const normalizedQuery = normalizeString(query);
    return categories.filter((cat) =>
      normalizeString(cat.name).includes(normalizedQuery)
    );
  }, [query, categories]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "quantity" ? Number(value) : value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!formData.categoryId) {
      toast.error("Por favor, selecione uma categoria válida.");
      return;
    }

    console.log(formData)

    try {
      const res = await fetch("/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Erro ao criar livro");
      }

      toast("Livro cadrastrado com sucesso! 👍")
      setFormData({
        title: "",
        author: "",
        publisher: "",
        categoryId: "",
        quantity: 1,
        barcode: ""
      });
      setCategoryValue("");
      setQuery("");
    } catch (error) {
      toast.error("🚫 Erro ao criar livro");
      console.error(error);
    }
  }

  return (
    <section className="">
      <form onSubmit={handleSubmit} className=" mx-auto p-4  px-4 space-y-6">
        <h1 className="font-black text-2xl py-2 text-emerald-800 dark:text-emerald-400">Criar novo Livro</h1>

        <h3 className="text-lg  font-bold bg-emerald-800/20 w-1/3 py-1 border-[1px]dark:border-zinc-800 shadow-black/20 shadow-md dark:bg-zinc-200/20  px-3 rounded-xl  dark:text-zinc-100 text-emerald-800">Dados sobre a obra</h3>
        <div>
          <Label className="mb-1 text-xs flex gap-0.5 font-bold" htmlFor="title">
            Título<span className="text-emerald-500">*</span>
          </Label>
          <Input
            className="shadow-black/20 shadow-md rounded-xl bg-zinc-200 border-zinc-300 focus:ring-emerald-500 focus:ring-2 focus:ring-offset-0 dark:bg-zinc-800 dark:border-zinc-700 dark:focus:ring-emerald-400 dark:focus:ring-offset-0"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="ex. As Instituições da Fé Cristã - Tomo I"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label className="mb-1 text-xs  flex gap-0.5 font-bold" htmlFor="author">
              Autor<span className="text-emerald-500">*</span>
            </Label>
            <Input
              className="shadow-black/20 shadow-md rounded-xl bg-zinc-200 border-zinc-300 focus:ring-emerald-500 focus:ring-2 focus:ring-offset-0 dark:bg-zinc-800 dark:border-zinc-700 dark:focus:ring-emerald-400 dark:focus:ring-offset-0"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              required
              placeholder="ex. João Calvino"
            />
          </div>

          <div>
            <Label className="mb-1 text-xs flex gap-0.5 font-bold " htmlFor="publisher">
              Editora<span className="text-emerald-500">*</span>
            </Label>
            <Input
              className="shadow-black/20 shadow-md rounded-xl bg-zinc-200 border-zinc-300 focus:ring-emerald-500 focus:ring-2 focus:ring-offset-0 dark:bg-zinc-800 dark:border-zinc-700 dark:focus:ring-emerald-400 dark:focus:ring-offset-0"
              id="publisher"
              name="publisher"
              value={formData.publisher}
              onChange={handleChange}
              placeholder="ex. Cultura Cristã"
            />
          </div>
        </div>
        <Separator className="my-4 " />

        <h3 className="text-lg  font-bold bg-emerald-800/20 w-1/3 border-[1px]dark:border-zinc-800 shadow-black/20 shadow-md dark:bg-zinc-200/20  px-3 rounded-xl  dark:text-zinc-100 text-emerald-800">Logística</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label className="mb-1 flex gap-0.5 text-xs font-bold" htmlFor="category">
              Categoria<span className="text-emerald-500">*</span>
            </Label>

            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button

                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full justify-between shadow-black/20 shadow-md rounded-xl bg-zinc-200 border-zinc-300  dark:bg-zinc-800 dark:border-zinc-700"
                >
                  {categoryValue
                    ? categories.find((cat) => cat.id === categoryValue)?.name
                    : "Selecione uma categoria..."}
                  <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-full p-0 uppercase ">
                <Command>
                  <CommandInput placeholder="Busque uma categoria..." />

                  <CommandList>
                    <CommandEmpty>Nenhuma categoria encontrada.</CommandEmpty>

                    <CommandGroup>
                      {categories.map((cat) => (
                        <CommandItem
                          key={cat.id}
                          value={cat.name}
                          onSelect={() => {
                            setCategoryValue(cat.id);
                            setFormData((prev) => ({
                              ...prev,
                              categoryId: cat.id,
                            }));
                            setOpen(false);
                          }}
                        >
                          <CheckIcon
                            className={cn(
                              "mr-2 h-4 w-4",
                              categoryValue === cat.id
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {cat.name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <Label className="mb-1 text-xs font-bold" htmlFor="quantity">
              Quantidade
            </Label>
            <Input
              className="shadow-black/20 shadow-md rounded-xl bg-zinc-200 border-zinc-300 focus:ring-emerald-500 focus:ring-2 focus:ring-offset-0 dark:bg-zinc-800 dark:border-zinc-700 dark:focus:ring-emerald-400 dark:focus:ring-offset-0"
              id="quantity"
              name="quantity"
              type="number"
              min={1}
              value={formData.quantity}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label className="mb-1 text-xs font-bold" htmlFor="barcode">
              Código de Barras
            </Label>
            <Input
              className="shadow-black/20 shadow-md rounded-xl bg-zinc-200 border-zinc-300 focus:ring-emerald-500 focus:ring-2 focus:ring-offset-0 dark:bg-zinc-800 dark:border-zinc-700 dark:focus:ring-emerald-400 dark:focus:ring-offset-0"
              id="barcode"
              name="barcode"
              value={formData.barcode}
              onChange={handleChange}
              placeholder="Código de barras (opcional)"
            />
          </div>

          <div>
            <Label className="mb-1 text-xs font-bold" htmlFor="barcode">
              Quantidade de Páginas
            </Label>
            <Input
              className="shadow-black/20 shadow-md rounded-xl bg-zinc-200 border-zinc-300 focus:ring-emerald-500 focus:ring-2 focus:ring-offset-0 dark:bg-zinc-800 dark:border-zinc-700 dark:focus:ring-emerald-400 dark:focus:ring-offset-0"
              id="qp"

              name=""
              placeholder="Quantidade de páginas (opcional)"
            />
          </div>
        </div>

        <Button type="submit" className="bg-emerald-700 hover:bg-emerald-800 focus:bg-emerald-900">Cadastrar Livro</Button>
      </form>
    </section>

  );
}
