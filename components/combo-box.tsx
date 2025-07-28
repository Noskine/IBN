"use client";

import * as React from "react";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TypeComboBoxReaders } from "@/types/combobox";


type Props = {
  data: TypeComboBoxReaders[];
  id?: string;
  onSelect?: (reader: string) => void; 
};

export function ComboboxReaders({ data, id: initialId = "", onSelect }: Props) {
  const [open, setOpen] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState(initialId);

  const selectedReader = data.find((reader) => reader.id === selectedId);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="secondary"
          role="combobox"
          aria-expanded={open}
          className="justify-between shadow-md cursor-pointer"
        >
          {selectedReader ? selectedReader.name : "Selecionar Leitor..."}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Pesquisar..." />
          <CommandList>
            <CommandEmpty>Leitor não existe</CommandEmpty>
            <CommandGroup>
              {data.map((reader) => (
                <CommandItem
                  key={reader.id}
                  value={reader.name}
                  onSelect={() => {
                    setSelectedId(reader.id);
                    onSelect?.(reader.id); // dispara callback para componente pai
                    setOpen(false);
                  }}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedId === reader.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {reader.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
