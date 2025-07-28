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
      alert("Por favor, selecione uma categoria válida.");
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

      alert("Livro criado com sucesso!");
      setFormData({
        title: "",
        author: "",
        publisher: "",
        categoryId: "",
        quantity: 1,
      });
      setCategoryValue("");
      setQuery("");
    } catch (error) {
      alert("Erro ao criar livro. Veja o console.");
      console.error(error);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full mx-auto p-4 space-y-6">
      <h1 className="font-bold text-2xl py-2">Criar novo Livro</h1>

      <div>
        <Label className="mb-1 text-xs" htmlFor="title">
          Título
        </Label>
        <Input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          placeholder="Título do livro"
        />
      </div>

      <div>
        <Label className="mb-1 text-xs" htmlFor="author">
          Autor
        </Label>
        <Input
          id="author"
          name="author"
          value={formData.author}
          onChange={handleChange}
          required
          placeholder="Nome do autor"
        />
      </div>

      <div>
        <Label className="mb-1 text-xs" htmlFor="publisher">
          Editora
        </Label>
        <Input
          id="publisher"
          name="publisher"
          value={formData.publisher}
          onChange={handleChange}
          placeholder="Editora (opcional)"
        />
      </div>

      <div>
        <Label className="mb-1 text-xs" htmlFor="category">
          Categoria
        </Label>

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between"
            >
              {categoryValue
                ? categories.find((cat) => cat.id === categoryValue)?.name
                : "Selecione uma categoria..."}
              <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-full p-0">
            <Command>
              {/* NOTE: Aqui não controlamos 'value', só 'onValueChange' */}
              <CommandInput
                placeholder="Busque uma categoria..."
                onValueChange={setQuery}
              />
              <CommandList>
                <CommandEmpty>Nenhuma categoria encontrada.</CommandEmpty>
                <CommandGroup>
                  {filteredCategories.map((cat) => (
                    <CommandItem
                      key={cat.id}
                      value={cat.id}
                      onSelect={(val) => {
                        setCategoryValue(val);
                        setFormData((prev) => ({ ...prev, categoryId: val }));
                        setOpen(false);
                        setQuery("");
                      }}
                    >
                      <CheckIcon
                        className={cn(
                          "mr-2 h-4 w-4",
                          categoryValue === cat.id ? "opacity-100" : "opacity-0"
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
        <Label className="mb-1 text-xs" htmlFor="quantity">
          Quantidade
        </Label>
        <Input
          id="quantity"
          name="quantity"
          type="number"
          min={1}
          value={formData.quantity}
          onChange={handleChange}
          required
        />
      </div>

      <Button type="submit">Cadastrar Livro</Button>
    </form>
  );
}
