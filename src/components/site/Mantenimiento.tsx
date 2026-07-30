import { CalendarClock, FileSearch, Headset, Wrench } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

const blocks = [
  {
    icon: CalendarClock,
    title: "Mantenimiento preventivo",
    text: "Rutinas programadas según el tipo de equipamiento y las horas de uso: limpieza de filtros y serpentinas, control de presiones, verificación eléctrica, medición de consumos y revisión de la distribución de aire.",
  },
  {
    icon: Wrench,
    title: "Mantenimiento correctivo",
    text: "Diagnóstico técnico ante fallas, reparación con repuestos adecuados y análisis de causa raíz para evitar que el problema se repita.",
  },
  {
    icon: FileSearch,
    title: "Planes de mantenimiento",
    text: "Alcance, frecuencia e informes definidos por escrito. Cada intervención queda registrada con mediciones, observaciones y recomendaciones.",
  },
  {
    icon: Headset,
    title: "Respuesta técnica",
    text: "Canales de contacto directo con el equipo que conoce la instalación, con tiempos de respuesta acordados según criticidad.",
  },
];

const outcomes = [
  "Menor cantidad de fallas imprevistas",
  "Consumo energético bajo control",
  "Continuidad operativa del edificio",
  "Historial técnico de la instalación",
];

export function Mantenimiento() {
  return (
    <section id="mantenimiento" className="bg-ink py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          tone="dark"
          eyebrow="Mantenimiento"
          title="El proyecto no termina con la puesta en marcha."
          description="Un sistema HVAC pierde rendimiento si no se lo sostiene. El mantenimiento es la etapa que protege la inversión realizada en ingeniería e instalación."
        />

        <div className="mt-20 grid gap-px border-t border-l border-ink-foreground/12 md:grid-cols-2">
          {blocks.map((block, index) => (
            <Reveal
              key={block.title}
              delay={index * 80}
              className="border-r border-b border-ink-foreground/12 p-10"
            >
              <block.icon className="size-6 text-accent" strokeWidth={1.3} />
              <h3 className="mt-8 text-lg font-semibold text-ink-foreground">{block.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-foreground/60">{block.text}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14 flex flex-wrap gap-x-10 gap-y-4">
          {outcomes.map((outcome) => (
            <span
              key={outcome}
              className="flex items-center gap-3 text-sm text-ink-foreground/70"
            >
              <span className="size-1.5 rounded-full bg-accent" />
              {outcome}
            </span>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
