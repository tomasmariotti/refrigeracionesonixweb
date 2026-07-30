import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CtaModal } from "./CtaModal";
import { cn } from "@/lib/utils";
import onixLogo from "@/assets/refrigeracionesonix.png";

const links = [
  { href: "#enfoque", label: "Enfoque" },
  { href: "#servicios", label: "Servicios" },
  { href: "#metodologia", label: "Metodología" },
  { href: "#proyectos", label: "Proyectos" },
  { href: "#mantenimiento", label: "Mantenimiento" },
  { href: "#nosotros", label: "Nosotros" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        solid
          ? "border-b border-border bg-background/95 backdrop-blur-md"
          : "border-b border-transparent",
      )}
    >
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
        <a href="#inicio" className="flex items-center" aria-label="Refrigeraciones Onix">
          <img
            src={onixLogo}
            alt="Refrigeraciones Onix"
            width={280}
            height={80}
            className={cn(
              "h-16 w-auto transition-all duration-500",
              !solid && "brightness-0 invert",
            )}
          />
        </a>

        <div className="hidden items-center gap-9 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                "text-[0.8rem] font-medium tracking-wide transition-colors",
                solid
                  ? "text-muted-foreground hover:text-ink"
                  : "text-ink-foreground/75 hover:text-ink-foreground",
              )}
            >
              {link.label}
            </a>
          ))}
          <CtaModal
            trigger={
              <Button variant={solid ? "ink" : "outlineLight"} size="lg">
                Solicitar asesoramiento
              </Button>
            }
          />
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Abrir menú"
          className={cn(
            "lg:hidden",
            solid ? "text-ink" : "text-ink-foreground",
          )}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-border bg-background px-6 pt-4 pb-8 lg:hidden">
          <div className="flex flex-col gap-1">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-border/60 py-3 text-sm text-muted-foreground"
              >
                {link.label}
              </a>
            ))}
          </div>
          <CtaModal
            trigger={
              <Button variant="ink" size="lg" className="mt-6 w-full" onClick={() => setOpen(false)}>
                Solicitar asesoramiento
              </Button>
            }
          />
        </div>
      )}
    </header>
  );
}
