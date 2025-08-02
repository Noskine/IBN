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
 type category = {
  name: string;
  id: string;
};

import { cn } from "@/lib/utils";
import * as React from "react";

export function CategoryCombobox({
  categorias,
  onSelect,
}: {
  categorias: category[];
  onSelect: (val: string) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const handleSelect = (currentValue: string) => {
    setValue(currentValue);
    onSelect(currentValue);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          className='w-full justify-between'
        >
          {value ? value : "Selecione uma categoria"}
          <ChevronDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-full p-0'>
        <Command>
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
