import { Check, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
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
import { cn } from "@/lib/utils";
import * as React from "react";

type category = {
  name: string;
  id: string;
};

export function CategoryCombobox({
  categorias,
  onSelect,
  selectedCategoryId,
}: {
  categorias: category[];
  onSelect: (val: string) => void;
  selectedCategoryId: string;
}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(selectedCategoryId || "");

  React.useEffect(() => {
    setValue(selectedCategoryId);
  }, [selectedCategoryId]);

  const handleSelect = (currentValue: string) => {
    setValue(currentValue);
    onSelect(currentValue);
    setOpen(false);
  };

  const selectedName =
    categorias.find((cat) => cat.id === value)?.name ?? "Selecione uma categoria";

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          className='w-full justify-between'
        >
          {selectedName}
          <ChevronDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className='w-full p-0'
        // ⛔ EVITA FECHAR AO DIGITAR
        onOpenAutoFocus={(e) => e.preventDefault()}
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        <Command loop>
          <CommandInput placeholder='Buscar categoria...' />
          <CommandEmpty>Nenhuma categoria encontrada.</CommandEmpty>
          <CommandGroup>
            {categorias.map((cat) => (
              <CommandItem
                key={cat.id}
                onSelect={() => handleSelect(cat.id)}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === cat.id ? "opacity-100" : "opacity-0"
                  )}
                />
                {cat.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
