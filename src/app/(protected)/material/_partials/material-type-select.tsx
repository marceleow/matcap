"use client";

import * as React from "react";
import { Check, ChevronsUpDown, Layers3Icon, Plus } from "lucide-react";
import { cn } from "#/lib/utils";
import { Button } from "#/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "#/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "#/components/ui/popover";

interface MaterialType {
  id: string;
  name: string;
}

interface MaterialTypeSelectProps {
  value?: {
    typeId?: string;
    typeName: string;
  };
  materialTypes: MaterialType[];
  onChange: (value: { typeId?: string; typeName: string }) => void;
  className?: string;
}

export function MaterialTypeSelect({
  value,
  materialTypes,
  onChange,
  className,
}: MaterialTypeSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");

  const { items, canAdd } = React.useMemo(() => {
    const q = query.trim().toLowerCase();

    if (!q) return { items: materialTypes, canAdd: false };

    const items = materialTypes.filter((t) => t.name.toLowerCase().includes(q));

    const exact = materialTypes.some((t) => t.name.toLowerCase() === q);

    return {
      items,
      canAdd: !exact,
    };
  }, [materialTypes, query]);

  const select = (type?: MaterialType) => {
    onChange(
      type
        ? { typeId: type.id, typeName: type.name }
        : { typeName: query.trim() },
    );
    setOpen(false);
    setQuery("");
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button
            variant="outline"
            role="combobox"
            className={cn("w-full justify-between", className)}
          />
        }
      >
        <span className="flex items-center gap-2">
          <Layers3Icon className="text-muted-foreground" />
          {value?.typeName ?? "Pilih atau ketik jenis material"}
        </span>
        <ChevronsUpDown className="h-4 w-4 opacity-50" />
      </PopoverTrigger>
      <PopoverContent align="start" className="w-(--available-width) p-0">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Cari jenis material..."
            value={query}
            onValueChange={setQuery}
          />
          <CommandList>
            {!items.length && !canAdd && (
              <CommandEmpty>Jenis material tidak ditemukan.</CommandEmpty>
            )}

            <CommandGroup>
              {items.map((t) => (
                <CommandItem key={t.id} onSelect={() => select(t)}>
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value?.typeId === t.id ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {t.name}
                </CommandItem>
              ))}

              {canAdd && (
                <CommandItem onSelect={() => select()} className="text-primary">
                  <Plus className="mr-2 h-4 w-4" />
                  Tambah jenis material:
                  <strong className="ml-1">{query}</strong>
                </CommandItem>
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
