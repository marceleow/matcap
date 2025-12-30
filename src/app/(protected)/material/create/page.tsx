import Link from "next/link";
import MaterialCreateForm from "../_partials/material-create-form";
import { ArrowLeftIcon } from "lucide-react";
import { cn } from "#/lib/utils";
import { buttonVariants } from "#/components/ui/button";
import { getMaterialTypes } from "../_partials/action";

export default async function CreateMaterialPage() {
  const materialTypes = await getMaterialTypes();

  return (
    <div className="flex flex-col gap-6 px-4">
      <div className="flex justify-between items-baseline">
        <h1 className="text-3xl font-extrabold underline tracking-tight text-balance">
          Tambah Material Baru
        </h1>
        <Link
          href="/material"
          className={cn(buttonVariants({ variant: "link" }))}
        >
          <ArrowLeftIcon /> Kembali
        </Link>
      </div>
      <MaterialCreateForm materialTypes={materialTypes} />
    </div>
  );
}
