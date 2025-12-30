import { Button, buttonVariants } from "#/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "#/components/ui/drawer";
import { Material } from "#/lib/type";
import { cn } from "#/lib/utils";
import Link from "next/link";

export interface MaterialCardProps {
  id: string;
  name: string;
  quantity: number;
  uom: string;
  note?: string;
  status: "safe" | "low" | "critical";
}

const statusConfig = {
  safe: {
    color: "bg-green-500",
    lightBg: "bg-green-50 dark:bg-green-950/20",
    label: "SAFE",
  },
  low: {
    color: "bg-amber-500",
    lightBg: "bg-amber-50 dark:bg-amber-950/20",
    label: "LOW",
  },
  critical: {
    color: "bg-red-500",
    lightBg: "bg-red-50 dark:bg-red-950/20",
    label: "CRITICAL",
  },
};

export default function MaterialCard({
  id,
  name,
  stock,
  type,
  uom,
  code,
  note,
  minStock,
  stockStatus,
}: Material) {
  const config = statusConfig[stockStatus];

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <div
          className={cn(
            "flex items-center gap-4 rounded-sm border border-border p-4 transition-colors",
          )}
        >
          <div className={cn("h-18 w-1 rounded-sm", config.color)} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs uppercase font-mono font-semibold text-foreground bg-muted px-2 py-1 rounded">
                {type}
              </span>
              {code && (
                <span className="text-xs uppercase font-mono font-semibold text-foreground bg-muted px-2 py-1 rounded">
                  {code}
                </span>
              )}
            </div>
            <div className="flex items-baseline gap-2">
              <h3 className="font-medium text-foreground leading-tight">
                {name}
              </h3>
              <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {config.label}
              </span>
            </div>
            {note && (
              <p className="text-sm text-muted-foreground mt-1 truncate">
                {note}
              </p>
            )}
          </div>
          <div className="flex flex-col items-end justify-center">
            <div className="font-mono text-2xl font-semibold text-foreground">
              {stock}
            </div>
            <div className="text-xs uppercase tracking-wide text-muted-foreground">
              {uom}
            </div>
          </div>
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="border-b-2 space-y-2">
          <DrawerTitle className="text-4xl font-bold text-start">
            {name}
          </DrawerTitle>
          <div className="flex justify-start gap-4">
            <span className="text-xs uppercase font-mono font-semibold text-foreground bg-muted px-2 py-1 rounded">
              {type}
            </span>
            {code && (
              <span className="text-xs uppercase font-mono font-semibold text-foreground bg-muted px-2 py-1 rounded">
                {code}
              </span>
            )}
            <span
              className={cn(
                "text-xs font-semibold uppercase px-2 py-1 rounded text-white",
                config.color,
              )}
            >
              {config.label}
            </span>
          </div>
        </DrawerHeader>
        <div className="px-6 py-6 space-y-6">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">
              Current Stock
            </h3>
            <p className="text-2xl font-mono font-semibold text-foreground">
              {stock}
              <span className="text-sm font-normal text-muted-foreground ml-1">
                {uom}
              </span>
            </p>
          </div>
          {minStock !== undefined && (
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">
                Minimum Stock
              </h3>
              <p className="text-base text-foreground font-medium">
                {minStock} {uom}
              </p>
            </div>
          )}
          {note && (
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">
                Note
              </h3>
              <p className="text-sm text-foreground">{note}</p>
            </div>
          )}
        </div>
        <DrawerFooter className="border-t-2">
          <Link
            href={`/material/${id}/movement`}
            className={cn(
              buttonVariants(),
              "bg-blue-600 [a]:hover:bg-blue-500 text-white",
            )}
          >
            Catat Pergerakan Stok
          </Link>
          <DrawerClose asChild>
            <Button>Tutup</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
