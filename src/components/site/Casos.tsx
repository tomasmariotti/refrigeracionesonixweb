import { useState } from "react";
import { X } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";
import { useTiltGlow } from "@/hooks/use-tilt-glow";
import araujo from "@/assets/case-araujo.jpg";
import figueroaAlcorta from "@/assets/case-figueroa-alcorta.jpg";
import lavaderoMauro from "@/assets/case-lavadero-mauro.jpg";
import veterinariaPanda from "@/assets/case-veterinaria-panda.jpg";
import viviendaEco from "@/assets/case-vivienda-eco.jpg";
import olleros from "@/assets/case-olleros.jpg";

type Category = "Edificios" | "Viviendas" | "Comercios";

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
    title: "Edificio Araujo — Ventilación mecánica en altura",
    category: "Edificios",
    image: araujo,
    description:
      "Ventilación mecánica integral para un edificio de 12 pisos, con extracción en palieres y campanas de cocina en cada departamento.",
    problem:
      "Edificio en altura sin un sistema de ventilación mecánica coordinado: los palieres carecían de renovación de aire y cada departamento necesitaba extracción independiente para su campana de cocina, con recorridos de conducto que debían atravesar múltiples niveles sin interferir con la estructura.",
    solution:
      "Diseño e instalación de un sistema de ventilación mecánica para todo el edificio, con extracción centralizada en los palieres y conductos dedicados a las parrillas y campanas de cada uno de los 12 pisos, coordinando los recorridos verticales con la estructura existente.",
    result:
      "Renovación de aire garantizada en las circulaciones comunes y extracción de cocina resuelta en cada unidad, con un sistema único operando de forma coordinada en todo el edificio.",
    gallery: [araujo],
  },
  {
    title: "Vivienda Figueroa Alcorta — Climatización integral VRV",
    category: "Viviendas",
    image: figueroaAlcorta,
    description:
      "Climatización integral de una vivienda mediante sistema VRV con equipos de baja silueta y conductos en toda la casa, con difusores de ranura embutidos en cielorraso de yeso.",
    problem:
      "Vivienda unifamiliar sin climatización central, con la exigencia arquitectónica de no dejar equipos ni rejillas a la vista, integrando la distribución de aire al diseño interior definido por el estudio de arquitectura.",
    solution:
      "Sistema VRV con unidades de baja silueta distribuidas por sector y una red de conductos que recorre toda la vivienda, resolviendo la salida de aire con difusores de ranura embutidos en cielorraso de yeso para mantener las terminaciones limpias.",
    result:
      "Climatización homogénea en toda la vivienda sin equipos visibles, integrada al diseño arquitectónico original.",
    gallery: [figueroaAlcorta],
  },
  {
    title: "Lavadero Mauro — Extracción de aire caliente",
    category: "Comercios",
    image: lavaderoMauro,
    description:
      "Extracción motorizada del aire caliente generado por las lavadoras industriales, con aislación de conductos para evitar condensación.",
    problem:
      "El calor y la humedad generados por las lavadoras se acumulaban en el local, con riesgo de condensación en los conductos de extracción y sin un sistema de salida de aire dimensionado para el caudal real del equipamiento.",
    solution:
      "Instalación de una extracción motorizada dedicada al aire caliente de las lavadoras, con conductos aislados térmicamente para evitar la condensación en todo el recorrido.",
    result:
      "Aire caliente evacuado de forma eficiente, sin condensación en los conductos ni acumulación de calor en el local.",
    gallery: [lavaderoMauro],
  },
  {
    title: "Veterinaria Panda, Recoleta — Climatización y ventilación",
    category: "Comercios",
    image: veterinariaPanda,
    description:
      "Climatización y ventilación integral de un local comercial mediante dos sistemas multisplit Samsung y equipos axiales de extracción e inyección.",
    problem:
      "Local comercial sin climatización ni ventilación mecánica, con la necesidad de mantener condiciones de confort estables para el público y el personal durante toda la jornada.",
    solution:
      "Instalación de dos sistemas multisplit Samsung para la climatización del local, complementados con conductos y equipos axiales independientes de extracción e inyección para garantizar la renovación de aire.",
    result:
      "Local climatizado y ventilado de forma continua, con condiciones de confort estables y renovación de aire permanente.",
    gallery: [veterinariaPanda],
  },
  {
    title: "Vivienda ECO, Recoleta — Climatización integral en madera",
    category: "Viviendas",
    image: viviendaEco,
    description:
      "Climatización integral de una vivienda de madera mediante sistema VRV, con equipos de baja silueta y conductos integrados a la estructura, resueltos con difusores de ranura embutidos en cielorraso de yeso.",
    problem:
      "Vivienda de estructura de madera, donde el recorrido de conductos debía integrarse a un sistema constructivo liviano sin comprometer el aislamiento térmico ni la terminación interior.",
    solution:
      "Diseño de un sistema VRV con equipos de baja silueta y una red de conductos coordinada con la estructura de madera y la aislación de la envolvente, resuelta con difusores de ranura embutidos en cielorraso.",
    result:
      "Climatización integral de la vivienda sin afectar la aislación ni la terminación de la estructura en madera, con equipos y conductos completamente ocultos.",
    gallery: [viviendaEco],
  },
  {
    title: "Veterinaria Panda, Olleros 1747 — Reacondicionamiento termomecánico",
    category: "Comercios",
    image: olleros,
    description:
      "Reacondicionamiento y puesta en funcionamiento de las instalaciones termomecánicas existentes, adaptándolas a las necesidades del local.",
    problem:
      "Instalaciones existentes sin optimizar: el equipo rooftop y el multiposición de planta baja no estaban aprovechados y las oficinas de planta alta no contaban con climatización propia.",
    solution:
      "Intervención sobre el equipo rooftop y el equipo multiposición de planta baja, con mantenimiento y modificaciones en los conductos para mejorar la distribución de aire, además de la instalación de equipos split independientes en las oficinas de planta alta.",
    result:
      "Instalaciones existentes puestas en funcionamiento con mejor distribución de aire, y climatización independiente incorporada en las oficinas de planta alta.",
    gallery: [olleros],
  },
];

const filters: ("Todos" | Category)[] = ["Todos", "Edificios", "Viviendas", "Comercios"];

type Project = (typeof projects)[number];

function FeaturedProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  const tiltRef = useTiltGlow<HTMLButtonElement>();

  return (
    <Reveal className="group mt-12 cursor-pointer">
      <button
        ref={tiltRef}
        type="button"
        onClick={onOpen}
        className="tilt-card cursor-glow grid w-full gap-8 text-left md:grid-cols-2 md:items-center md:gap-12"
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
        <div>
          <p className="eyebrow text-accent">{project.category}</p>
          <h3 className="mt-4 text-2xl leading-snug font-bold text-ink md:text-3xl">
            {project.title}
          </h3>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            {project.description}
          </p>
          <span className="mt-6 inline-block text-xs font-medium tracking-widest text-ink uppercase">
            Ver caso completo
          </span>
        </div>
      </button>
    </Reveal>
  );
}

function ProjectCard({
  project,
  delay,
  onOpen,
}: {
  project: Project;
  delay: number;
  onOpen: () => void;
}) {
  const tiltRef = useTiltGlow<HTMLButtonElement>();

  return (
    <Reveal as="article" delay={delay} className="group cursor-pointer">
      <button
        ref={tiltRef}
        type="button"
        onClick={onOpen}
        className="tilt-card cursor-glow block w-full text-left"
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
        <h3 className="mt-3 text-lg leading-snug font-semibold text-ink">{project.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
        <span className="mt-5 inline-block text-xs font-medium tracking-widest text-ink uppercase">
          Ver caso
        </span>
      </button>
    </Reveal>
  );
}

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
                "inline-flex min-h-11 items-center justify-center border px-5 py-2 text-xs font-medium tracking-wide transition-colors ease-out-expo",
                filter === item
                  ? "border-ink bg-ink text-ink-foreground"
                  : "border-border text-muted-foreground hover:border-ink/40 hover:text-ink",
              )}
            >
              {item}
            </button>
          ))}
        </Reveal>

        {featured && <FeaturedProjectCard project={featured} onOpen={() => openCase(featured)} />}

        <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              delay={index * 90}
              onOpen={() => openCase(project)}
            />
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
                <h3 className="mt-3 text-2xl font-semibold text-ink md:text-3xl">{detail.title}</h3>
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
