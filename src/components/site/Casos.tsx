import { useState } from "react";
import { X } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";
import industrial from "@/assets/case-industrial.jpg";
import corporativo from "@/assets/case-corporativo.jpg";
import comercial from "@/assets/case-comercial.jpg";

type Category = "Industrial" | "Corporativo" | "Comercial";

const projects: {
  title: string;
  category: Category;
  image: string;
  description: string;
  problem: string;
  solution: string;
  result: string;
  gallery: string[];
}[] = [
  {
    title: "Planta de producción — Ventilación y extracción",
    category: "Industrial",
    image: industrial,
    description:
      "Sistema de ventilación general y extracción localizada para una nave de producción con equipamiento de proceso de alta carga térmica.",
    problem:
      "Acumulación de calor y aire viciado en zonas de proceso, con condiciones de trabajo inestables y equipos operando por encima de su temperatura recomendada.",
    solution:
      "Relevamiento de cargas por sector, rediseño del recorrido de conductos, incorporación de extracción localizada sobre los focos de calor y balanceo de caudales por zona.",
    result:
      "Temperatura estabilizada en las áreas críticas, menor cantidad de paradas por sobrecalentamiento y una distribución de aire verificable con mediciones.",
    gallery: [industrial, comercial],
  },
  {
    title: "Edificio corporativo — Climatización de oficinas",
    category: "Corporativo",
    image: corporativo,
    description:
      "Proyecto integral de climatización y renovación de aire para plantas de oficinas con ocupación variable.",
    problem:
      "Zonas con temperaturas desparejas, consumo elevado y un sistema original dimensionado sin considerar la ocupación real ni la orientación del edificio.",
    solution:
      "Recalculo de cargas por orientación y uso, zonificación del sistema, selección de equipamiento con control de capacidad e integración de la renovación de aire.",
    result:
      "Confort homogéneo entre plantas, reducción del consumo en horarios de baja ocupación y trazabilidad de la operación del sistema.",
    gallery: [corporativo, comercial],
  },
  {
    title: "Centro comercial — Sala técnica y distribución",
    category: "Comercial",
    image: comercial,
    description:
      "Ingeniería y ejecución de sala de máquinas y distribución hidráulica para un complejo comercial con múltiples locales.",
    problem:
      "Sala técnica sin espacio de mantenimiento, cañerías sin identificación y dificultad para intervenir sin afectar la operación del complejo.",
    solution:
      "Reordenamiento completo de la sala, nuevo trazado de cañerías con aislación y señalización, sectorización de válvulas y documentación as-built.",
    result:
      "Intervenciones de mantenimiento sin cortar el servicio general y tiempos de diagnóstico notablemente más cortos.",
    gallery: [comercial, industrial],
  },
];

const filters: ("Todos" | Category)[] = ["Todos", "Industrial", "Corporativo", "Comercial"];

export function Casos() {
  const [filter, setFilter] = useState<"Todos" | Category>("Todos");
  const [active, setActive] = useState<number | null>(null);

  const visible = projects.filter((p) => filter === "Todos" || p.category === filter);
  const [featured, ...rest] = visible;
  const detail = active !== null ? projects[active] : null;
  const openCase = (project: (typeof projects)[number]) => setActive(projects.indexOf(project));

  return (
    <section id="proyectos" className="bg-background py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow="Proyectos"
          title="Casos donde la ingeniería cambió el resultado."
          description="Una selección de intervenciones representativas, con el problema original, el criterio técnico aplicado y el resultado obtenido."
        />

        <Reveal className="mt-12 flex flex-wrap gap-3">
          {filters.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setFilter(item)}
              className={cn(
                "border px-5 py-2 text-xs font-medium tracking-wide transition-colors",
                filter === item
                  ? "border-ink bg-ink text-ink-foreground"
                  : "border-border text-muted-foreground hover:border-ink/40 hover:text-ink",
              )}
            >
              {item}
            </button>
          ))}
        </Reveal>

        {featured && (
          <Reveal className="group mt-12 cursor-pointer">
            <button
              type="button"
              onClick={() => openCase(featured)}
              className="grid w-full gap-8 text-left md:grid-cols-2 md:items-center md:gap-12"
            >
              <div className="overflow-hidden bg-ink">
                <img
                  src={featured.image}
                  alt={featured.title}
                  width={1280}
                  height={960}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
                />
              </div>
              <div>
                <p className="eyebrow text-accent">{featured.category}</p>
                <h3 className="mt-4 text-2xl leading-snug font-bold text-ink md:text-3xl">
                  {featured.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  {featured.description}
                </p>
                <span className="mt-6 inline-block text-xs font-medium tracking-widest text-ink uppercase">
                  Ver caso completo
                </span>
              </div>
            </button>
          </Reveal>
        )}

        <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((project, index) => (
            <Reveal
              as="article"
              key={project.title}
              delay={index * 90}
              className="group cursor-pointer"
            >
              <button
                type="button"
                onClick={() => openCase(project)}
                className="block w-full text-left"
              >
                <div className="overflow-hidden bg-ink">
                  <img
                    src={project.image}
                    alt={project.title}
                    width={1280}
                    height={960}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
                  />
                </div>
                <p className="eyebrow mt-6 text-accent">{project.category}</p>
                <h3 className="mt-3 text-lg leading-snug font-semibold text-ink">
                  {project.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </p>
                <span className="mt-5 inline-block text-xs font-medium tracking-widest text-ink uppercase">
                  Ver caso
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {detail && (
        <div
          className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-ink/80 p-4 backdrop-blur-sm md:p-10"
          onClick={() => setActive(null)}
        >
          <div
            className="animate-scale-in w-full max-w-4xl bg-background p-8 md:p-14"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-8">
              <div>
                <p className="eyebrow text-accent">{detail.category}</p>
                <h3 className="mt-3 text-2xl font-semibold text-ink md:text-3xl">
                  {detail.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActive(null)}
                aria-label="Cerrar"
                className="text-muted-foreground transition-colors hover:text-ink"
              >
                <X className="size-5" />
              </button>
            </div>

            <p className="mt-8 text-sm leading-relaxed text-muted-foreground md:text-base">
              {detail.description}
            </p>

            <dl className="mt-10 grid gap-8 border-t border-border pt-10 md:grid-cols-3">
              {[
                ["Problema", detail.problem],
                ["Solución", detail.solution],
                ["Resultado", detail.result],
              ].map(([label, value]) => (
                <div key={label}>
                  <dt className="eyebrow text-ink">{label}</dt>
                  <dd className="mt-3 text-sm leading-relaxed text-muted-foreground">{value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {detail.gallery.map((image) => (
                <img
                  key={image}
                  src={image}
                  alt={detail.title}
                  width={1280}
                  height={960}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover"
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
