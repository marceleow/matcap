import { notFound } from "next/navigation";
import { getMaterialById } from "../../_partials/action";
import MaterialMovement from "../../_partials/material-movement";
import Link from "next/link";
import { cn } from "#/lib/utils";
import { buttonVariants } from "#/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";

export default async function MaterialDetailMovementPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const material = await getMaterialById((await params).id);
  if (!material) notFound();

  return (
    <div className="flex-1 px-4 space-y-2">
      <div className="p-4 border bg-muted rounded-sm">
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold text-start">{material.name}</h1>
          <Link
            href="/material"
            className={cn(buttonVariants({ variant: "link" }))}
          >
            <ArrowLeftIcon /> Kembali
          </Link>
        </div>
        <div className="flex gap-2">
          <span className="text-xs uppercase font-mono font-semibold text-foreground">
            {material.type}
          </span>
          {material.code && (
            <span className="text-xs uppercase font-mono font-semibold text-foreground">
              - {material.code}
            </span>
          )}
        </div>
        <p className="text-sm">{material.note}</p>
        <div className="border-t mt-2 pt-2">
          <h1 className="font-mono text-sm">CURRENT STOCK</h1>
          <div className="flex gap-2 font-mono items-baseline">
            <h1 className="text-2xl font-bold">{material.stock}</h1>
            <h1 className="text-sm">{material.uom}</h1>
          </div>
        </div>
      </div>
      <MaterialMovement materialId={material.id} />
    </div>
  );
}
