import {
  AirVent,
  Building2,
  Factory,
  Fan,
  Gauge,
  LineChart,
  Recycle,
  Ruler,
  Settings2,
  Wind,
} from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { useTiltGlow } from "@/hooks/use-tilt-glow";

const services = [
  {
    icon: Ruler,
    title: "Diseño HVAC",
    text: "Definición del sistema completo: zonificación, distribución de aire, cañerías y salas técnicas.",
  },
  {
    icon: LineChart,
    title: "Ingeniería termomecánica",
    text: "Cálculo de cargas, dimensionamiento y documentación técnica para licitación y obra.",
  },
  {
    icon: Building2,
    title: "Climatización comercial",
    text: "Oficinas, locales, centros de atención y espacios de alta circulación de personas.",
  },
  {
    icon: Factory,
    title: "Climatización industrial",
    text: "Procesos productivos, depósitos y áreas con exigencias térmicas específicas.",
  },
  {
    icon: Wind,
    title: "Ventilación",
    text: "Sistemas de inyección y distribución de aire con control de caudales y presiones.",
  },
  {
    icon: Fan,
    title: "Extracción",
    text: "Extracción localizada y general para cocinas, procesos, depósitos y áreas técnicas.",
  },
  {
    icon: Recycle,
    title: "Renovación de aire",
    text: "Calidad de aire interior, filtrado y recuperación de energía en la renovación.",
  },
  {
    icon: Gauge,
    title: "Puesta en marcha",
    text: "Balanceo, mediciones de caudal, ajuste de parámetros y protocolos de entrega.",
  },
  {
    icon: Settings2,
    title: "Mantenimiento preventivo",
    text: "Rutinas programadas, registro de intervenciones e indicadores de estado del sistema.",
  },
  {
    icon: AirVent,
    title: "Mantenimiento correctivo",
    text: "Diagnóstico técnico, resolución de fallas y análisis de causa para evitar recurrencias.",
  },
];

type Service = (typeof services)[number];

function ServiceCard({ service, delay }: { service: Service; delay: number }) {
  const tiltRef = useTiltGlow<HTMLDivElement>();

  return (
    <Reveal delay={delay} className="group">
      <div
        ref={tiltRef}
        className="tilt-card cursor-glow rounded-sm border border-border bg-background p-7"
      >
        <service.icon
          className="size-7 text-navy transition-colors duration-300 group-hover:text-accent"
          strokeWidth={1.3}
        />
        <h3 className="mt-6 text-base font-semibold text-ink">{service.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{service.text}</p>
        <span className="mt-6 block h-px w-10 bg-border transition-all duration-500 group-hover:w-20 group-hover:bg-accent" />
      </div>
    </Reveal>
  );
}

export function Servicios() {
  return (
    <section id="servicios" className="bg-surface py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow="Servicios"
          title="Capacidades técnicas integradas en un mismo equipo."
          description="Todas las disciplinas del proyecto bajo una misma coordinación, con criterios consistentes desde el cálculo hasta la operación."
        />

        <div className="mt-20 grid gap-x-12 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} delay={(index % 3) * 90} />
          ))}
        </div>
      </div>
    </section>
  );
}
