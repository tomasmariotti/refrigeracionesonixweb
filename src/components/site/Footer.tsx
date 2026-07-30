import onixLogo from "@/assets/refrigeracionesonix.png";

const columns = [
  {
    title: "Servicios",
    links: [
      { label: "Diseño HVAC", href: "#servicios" },
      { label: "Ingeniería termomecánica", href: "#servicios" },
      { label: "Climatización industrial", href: "#servicios" },
      { label: "Ventilación y extracción", href: "#servicios" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { label: "Enfoque", href: "#enfoque" },
      { label: "Metodología", href: "#metodologia" },
      { label: "Proyectos", href: "#proyectos" },
      { label: "Nosotros", href: "#nosotros" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-ink pt-20 pb-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-14 border-b border-ink-foreground/12 pb-16 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <img
              src={onixLogo}
              alt="Refrigeraciones Onix"
              width={300}
              height={88}
              loading="lazy"
              className="h-20 w-auto brightness-0 invert"
            />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-ink-foreground/60">
              Ingeniería termomecánica, climatización y ventilación para proyectos comerciales,
              industriales y corporativos.
            </p>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <p className="eyebrow text-ink-foreground/50">{column.title}</p>
              <ul className="mt-6 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-ink-foreground/70 transition-colors hover:text-steel"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3 pt-8 text-xs text-ink-foreground/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Refrigeraciones Onix. Todos los derechos reservados.</p>
          <p>Ingeniería HVAC · Climatización · Ventilación</p>
        </div>
      </div>
    </footer>
  );
}
