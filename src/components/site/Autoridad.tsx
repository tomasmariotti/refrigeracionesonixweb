import { Reveal } from "./Reveal";

const points = [
  { value: "Comercial · Industrial · Corporativo", label: "Sectores atendidos" },
  { value: "Diseño · Instalación · Mantenimiento", label: "Ciclo completo del servicio" },
  { value: "Cálculo propio", label: "Ingeniería y documentación técnica in-house" },
  { value: "Interlocución directa", label: "Un responsable técnico por proyecto" },
];

export function Autoridad() {
  return (
    <section className="bg-ink-elevated py-14 md:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-8 divide-y divide-ink-foreground/12 sm:grid-cols-2 sm:gap-10 sm:divide-y-0 sm:divide-x lg:grid-cols-4">
          {points.map((point, index) => (
            <Reveal
              key={point.value}
              delay={index * 70}
              className="pt-8 first:pt-0 sm:px-8 sm:pt-0 sm:first:pl-0"
            >
              <p className="font-display text-lg leading-snug font-semibold text-ink-foreground">
                {point.value}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink-foreground/60">{point.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
