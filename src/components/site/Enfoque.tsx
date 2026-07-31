import {
  ClipboardList,
  Compass,
  DraftingCompass,
  Layers,
  PlayCircle,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { useTiltGlow } from "@/hooks/use-tilt-glow";

const stages = [
  {
    icon: ClipboardList,
    title: "Diagnóstico",
    text: "Analizamos cargas térmicas, uso real de los espacios y las restricciones del edificio antes de proponer una solución.",
  },
  {
    icon: DraftingCompass,
    title: "Ingeniería",
    text: "Cálculo termomecánico, caudales, presiones y balance de aire documentados y verificables.",
  },
  {
    icon: Compass,
    title: "Diseño",
    text: "Planos de conductos, cañerías y salas técnicas coordinados con arquitectura, estructura e instalación eléctrica.",
  },
  {
    icon: Layers,
    title: "Selección de equipos",
    text: "Definimos tecnología y capacidades según rendimiento, consumo, mantenimiento y vida útil esperada.",
  },
  {
    icon: Wrench,
    title: "Instalación",
    text: "Ejecución supervisada, con control de avance, calidad de montaje y coordinación con el resto de los gremios.",
  },
  {
    icon: PlayCircle,
    title: "Puesta en marcha",
    text: "Balanceo, mediciones, ajuste de parámetros y entrega de documentación de operación.",
  },
  {
    icon: ShieldCheck,
    title: "Mantenimiento",
    text: "Planes preventivos y respuesta correctiva para sostener el rendimiento del sistema en el tiempo.",
  },
];

type Stage = (typeof stages)[number];

function StageCard({ stage, index }: { stage: Stage; index: number }) {
  const tiltRef = useTiltGlow<HTMLDivElement>();

  return (
    <Reveal as="li" delay={index * 70}>
      <div
        ref={tiltRef}
        className="tilt-card cursor-glow group relative h-full border-r border-b border-border bg-background p-8 transition-colors duration-500 ease-out-expo hover:bg-surface"
      >
        <span className="absolute top-0 left-0 h-px w-0 bg-accent transition-all duration-500 ease-out-expo group-hover:w-full" />
        <div className="flex items-center justify-between">
          <stage.icon className="size-6 text-accent" strokeWidth={1.4} />
          <span className="font-display text-xs tracking-widest text-muted-foreground/60">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <h3 className="mt-8 text-lg font-semibold text-ink">{stage.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{stage.text}</p>
      </div>
    </Reveal>
  );
}

export function Enfoque() {
  return (
    <section id="enfoque" className="bg-background py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow="Nuestro enfoque"
          title="No empezamos instalando equipos. Empezamos entendiendo el proyecto."
          description="La instalación es apenas una parte del trabajo. El valor real está en las decisiones que se toman antes: qué se necesita, cómo se calcula, cómo se integra al edificio y cómo se sostiene en el tiempo."
        />

        <ol className="mt-20 grid gap-px border-t border-l border-border sm:grid-cols-2 lg:grid-cols-4">
          {stages.map((stage, index) => (
            <StageCard key={stage.title} stage={stage} index={index} />
          ))}
          <li className="hidden border-r border-b border-border bg-surface p-8 lg:block">
            <p className="text-sm leading-relaxed text-muted-foreground">
              Cada etapa queda documentada. El cliente sabe en todo momento qué se decidió, por qué
              y con qué criterio técnico.
            </p>
          </li>
        </ol>
      </div>
    </section>
  );
}
