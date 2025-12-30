import { Tabs, TabsList, TabsTrigger } from "#/components/ui/tabs";
import { ArrowDownLeftIcon, ArrowUpRightIcon } from "lucide-react";
import MaterialMovementTabsIn from "./material-movement-tabs-in";
import MaterialMovementTabsOut from "./material-movement-tabs-out";

export default function MaterialMovement({
  materialId,
}: {
  materialId: string;
}) {
  return (
    <Tabs defaultValue={null}>
      <TabsList className="w-full">
        <TabsTrigger
          value="in"
          className="data-active:text-green-600 hover:text-green-600 font-bold py-2"
        >
          <ArrowDownLeftIcon />
          Material Masuk
        </TabsTrigger>
        <TabsTrigger
          value="out"
          className="data-active:text-yellow-600 hover:text-yellow-600 font-bold py-2"
        >
          <ArrowUpRightIcon />
          Material Keluar
        </TabsTrigger>
      </TabsList>
      <MaterialMovementTabsOut materialId={materialId} />
      <MaterialMovementTabsIn materialId={materialId} />
    </Tabs>
  );
}
