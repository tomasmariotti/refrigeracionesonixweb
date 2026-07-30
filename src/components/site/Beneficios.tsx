import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

const benefits = [
  {
    title: "Menos errores de obra",
    text: "La coordinación previa evita interferencias, retrabajos y modificaciones costosas durante la ejecución.",
  },
  {
    title: "Mayor eficiencia energética",
    text: "Sistemas dimensionados sobre datos reales, sin sobrecapacidad ni equipos trabajando fuera de su punto óptimo.",
  },
  {
    title: "Mayor vida útil",
    text: "Selección adecuada, montaje correcto y mantenimiento planificado extienden el ciclo de vida del equipamiento.",
  },
  {
    title: "Mejor rendimiento",
    text: "Distribución de aire equilibrada y parámetros ajustados en la puesta en marcha.",
  },
  {
    title: "Menores costos operativos",
    text: "Consumo controlado, menos fallas imprevistas y decisiones de inversión mejor fundamentadas.",
  },
  {
    title: "Mayor confiabilidad",
    text: "Instalaciones documentadas y trazables, con criterios de redundancia donde el proceso lo requiere.",
  },
  {
    title: "Coordinación entre disciplinas",
    text: "Interlocución directa con arquitectura, estructura, electricidad y dirección de obra.",
  },
];

export function Beneficios() {
  return (
    <section className="bg-ink py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
          <SectionHeading
            tone="dark"
            eyebrow="Beneficios"
            title="El impacto se mide en la operación del edificio, no en la factura del equipo."
            description="Una instalación bien planificada se nota durante años: en el consumo, en la cantidad de intervenciones y en la continuidad del negocio."
          />

          <div className="grid gap-px border-t border-l border-ink-foreground/12 sm:grid-cols-2">
            {benefits.map((benefit, index) => (
              <Reveal
                key={benefit.title}
                delay={index * 60}
                className="border-r border-b border-ink-foreground/12 p-7 transition-colors duration-500 hover:bg-ink-elevated"
              >
                <h3 className="text-sm font-semibold tracking-wide text-ink-foreground">
                  {benefit.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-foreground/60">
                  {benefit.text}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
