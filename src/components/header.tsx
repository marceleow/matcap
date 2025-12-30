"use client";

import { getFormattedDateTime } from "#/lib/time";
import { useEffect, useMemo, useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { Button } from "./ui/button";
import { HomeIcon, type LucideIcon, MenuIcon, PackageIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "#/lib/utils";

const LINKS: {
  label: string;
  href: string;
  icon: LucideIcon;
}[] = [
  {
    label: "Home",
    href: "/",
    icon: HomeIcon,
  },
  {
    label: "Material",
    href: "/material",
    icon: PackageIcon,
  },
];

export default function Header() {
  const [now, setNow] = useState(getFormattedDateTime());
  const pathname = usePathname();

  useEffect(() => {
    const id = setInterval(() => setNow(getFormattedDateTime()), 1000);
    return () => clearInterval(id);
  }, []);

  const currentLink = useMemo(() => {
    return (
      LINKS.sort((a, b) => b.href.length - a.href.length).find(
        (l) => pathname === l.href || pathname.startsWith(l.href + "/"),
      ) ?? {
        label: "Unknown",
        href: pathname,
        icon: HomeIcon,
      }
    );
  }, [pathname]);

  return (
    <header className="p-4 bg-background z-10">
      <div className="flex justify-between border-b border-zinc-800 pb-1">
        <div className="flex gap-2 items-baseline">
          <h1 className="text-xl font-bold">{now.time}</h1>
          <p className="text-sm font-semibold">{now.date}</p>
        </div>

        <div className="flex items-baseline gap-2">
          <h1 className="text-xl font-bold">{currentLink.label}</h1>
          <MenuDrawer time={now.time} />
        </div>
      </div>
    </header>
  );
}

interface MenuDrawerProps {
  time: string;
}

export function MenuDrawer({ time }: MenuDrawerProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon">
          <MenuIcon className="size-6" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="text-2xl font-bold">{time}</DrawerTitle>
        </DrawerHeader>
        <div className="flex flex-col gap-2 p-4">
          {LINKS.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href;

            return (
              <DrawerClose asChild key={href}>
                <Link
                  href={href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center gap-4 rounded-lg px-4 py-4 text-base font-medium transition-colors hover:bg-muted/50",
                    isActive
                      ? "bg-muted text-primary"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <Icon
                    className={cn(
                      "h-6 w-6 shrink-0",
                      isActive ? "text-primary" : "text-muted-foreground",
                    )}
                  />
                  {label}
                </Link>
              </DrawerClose>
            );
          })}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
