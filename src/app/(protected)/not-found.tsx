import { buttonVariants } from "#/components/ui/button";
import { cn } from "#/lib/utils";
import { HomeIcon } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col gap-2 justify-center items-center">
      <div className="flex items-baseline gap-2 fontmo">
        <h1 className="text-6xl font-bold">404</h1>
        <h1>Not Found</h1>
      </div>
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "outline" }),
          "border-zinc-900 font-bold",
        )}
      >
        <HomeIcon /> Back to Home
      </Link>
    </div>
  );
}
