"use client";

import { buttonVariants } from "#/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "#/components/ui/input-group";
import { cn } from "#/lib/utils";
import { PlusIcon, SearchIcon } from "lucide-react";
import Link from "next/link";
import MaterialCard from "./material-card";
import { Material } from "#/lib/type";
import { ScrollArea } from "#/components/ui/scroll-area";
import { useMemo, useState } from "react";
import Fuse from "fuse.js";

interface MaterialListProps {
  materials: Material[];
}

export default function MaterialList({ materials }: MaterialListProps) {
  const [query, setQuery] = useState("");

  const fuse = useMemo(
    () =>
      new Fuse(materials, {
        keys: ["name", "code", "type"], // sesuaikan struktur data
        threshold: 0.4, // makin kecil = makin ketat
      }),
    [materials],
  );

  const filteredMaterials = useMemo(() => {
    if (!query) return materials;
    return fuse.search(query).map((r) => r.item);
  }, [query, fuse, materials]);

  return (
    <div className="flex-1 flex flex-col gap-2">
      <div className="flex gap-2">
        <InputGroup>
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
          <InputGroupInput
            placeholder="Cari material..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </InputGroup>
        <Link
          href="/material/create"
          className={cn(buttonVariants({ size: "icon" }))}
        >
          <PlusIcon />
        </Link>
      </div>
      <div className="flex-1">
        <ScrollArea className="h-[calc(100dvh-215px)]">
          <div className="flex flex-col gap-2">
            {filteredMaterials.map((material) => (
              <MaterialCard key={material.id} {...material} />
            ))}
          </div>
        </ScrollArea>
      </div>
      <div className="border-t border-zinc-800 py-4 space-y-4">
        <h1 className="font-bold text-sm">Refrensi Status Stok</h1>
        <div className="grid grid-cols-3 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-xs text-muted-foreground">Stok Aman</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-amber-500" />
            <span className="text-xs text-muted-foreground">Stok Rendah</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <span className="text-xs text-muted-foreground">
              Di Bawah Minimum
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
