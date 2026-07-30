import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

const steps = [
  {
    title: "Relevamiento",
    text: "Visita técnica, medición del espacio, revisión de instalaciones existentes y condiciones de obra.",
  },
  {
    title: "Diagnóstico",
    text: "Identificación de necesidades reales, restricciones y objetivos de uso del cliente.",
  },
  {
    title: "Ingeniería",
    text: "Cálculo de cargas térmicas, caudales y selección de criterios de diseño.",
  },
  {
    title: "Diseño",
    text: "Documentación de planos, esquemas y coordinación con las demás disciplinas del proyecto.",
  },
  {
    title: "Selección de equipos",
    text: "Definición de tecnología, capacidades y componentes según rendimiento y operación.",
  },
  {
    title: "Instalación",
    text: "Montaje supervisado con control de calidad y seguimiento de avance en obra.",
  },
  {
    title: "Puesta en marcha",
    text: "Balanceo, pruebas de funcionamiento, mediciones y capacitación de operación.",
  },
  {
    title: "Seguimiento",
    text: "Acompañamiento posterior, ajustes finos y plan de mantenimiento a medida.",
  },
];

export function Metodologia() {
  return (
    <section id="metodologia" className="bg-ink py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          tone="dark"
          eyebrow="Metodología"
          title="Un proceso ordenado, con etapas claras y responsabilidades definidas."
          description="La misma secuencia se aplica en cada proyecto, ajustando profundidad y alcance según su escala. Eso reduce imprevistos y hace que el resultado sea previsible."
        />

        <ol className="relative mt-20 border-l border-ink-foreground/15 pl-8 md:pl-14">
          {steps.map((step, index) => (
            <Reveal
              as="li"
              key={step.title}
              delay={index * 60}
              className="group relative pb-12 last:pb-0"
            >
              <span className="absolute top-1.5 -left-8 size-2.5 -translate-x-1/2 rounded-full bg-steel transition-transform duration-500 group-hover:scale-150 md:-left-14" />
              <div className="grid gap-3 md:grid-cols-[7rem_1fr] md:gap-10">
                <span className="font-display text-sm tracking-widest text-steel">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-xl font-semibold text-ink-foreground">{step.title}</h3>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-foreground/60 md:text-base">
                    {step.text}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
