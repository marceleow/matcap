import { getMaterials } from "./_partials/action";
import MaterialList from "./_partials/material-list";

export const dynamic = "force-dynamic";

export default async function MaterialPage() {
  const materials = await getMaterials();

  return (
    <div className="flex-1 px-4 pb-2 flex flex-col">
      <MaterialList materials={materials} />
    </div>
  );
}
