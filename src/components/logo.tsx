import Image from "next/image";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  tone = "default",
}: {
  className?: string;
  tone?: "default" | "light";
}) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <Image
        src="/logo-mark.png"
        alt="Логотип мясной лавки"
        width={96}
        height={96}
        className="h-10 w-10 rounded-xl"
        priority
      />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-serif text-lg font-bold tracking-tight",
            tone === "light" ? "text-stone-50" : "text-foreground"
          )}
        >
          Мясная лавка
        </span>
        <span
          className={cn(
            "mt-1 text-[10px] font-medium uppercase tracking-[0.22em]",
            tone === "light" ? "text-stone-400" : "text-muted-foreground"
          )}
        >
          домашние деликатесы
        </span>
      </span>
    </span>
  );
}
