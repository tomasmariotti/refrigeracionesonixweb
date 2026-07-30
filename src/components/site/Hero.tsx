import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-hvac.jpg";

const metrics = [
  { value: "Ingeniería", label: "Cálculo térmico y documentación técnica propia" },
  { value: "Integral", label: "Del relevamiento inicial al plan de mantenimiento" },
  { value: "Coordinación", label: "Trabajo conjunto con obra, arquitectura y eléctrica" },
];

export function Hero() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => setOffset(Math.min(window.scrollY, 600) * 0.12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="inicio" className="relative min-h-screen overflow-hidden bg-ink">
      <img
        src={heroImage}
        alt="Sala de máquinas y equipos HVAC en la azotea de un edificio corporativo"
        width={1920}
        height={1280}
        className="absolute inset-0 size-full scale-105 object-cover opacity-45"
        style={{ transform: `translate3d(0, ${offset}px, 0) scale(1.08)` }}
      />
      <div className="absolute inset-0 bg-ink-gradient opacity-80" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 pt-32 pb-20 lg:px-10">
        <div className="max-w-4xl animate-fade-in">
          <div className="flex items-center gap-4">
            <span className="h-px w-12 bg-accent" />
            <p className="eyebrow text-accent">Ingeniería termomecánica y soluciones HVAC</p>
          </div>
          <h1 className="mt-8 text-4xl leading-[1.08] font-semibold text-ink-foreground md:text-6xl lg:text-[4.2rem]">
            Soluciones de ingeniería HVAC para proyectos donde la planificación marca la
            diferencia.
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-ink-foreground/70 md:text-lg">
            Diseñamos, desarrollamos e implementamos sistemas de climatización y ventilación
            adaptados a cada proyecto, acompañando todas las etapas desde la ingeniería inicial
            hasta el mantenimiento.
          </p>
          <div className="mt-11 flex flex-col gap-4 sm:flex-row">
            <Button asChild variant="accent" size="xl">
              <a href="#contacto">Solicitar asesoramiento</a>
            </Button>
            <Button asChild variant="outlineLight" size="xl">
              <a href="#servicios">Conocer nuestros servicios</a>
            </Button>
          </div>
        </div>

        <dl className="mt-20 grid gap-px overflow-hidden border-t border-ink-foreground/15 pt-10 sm:grid-cols-3 sm:gap-10">
          {metrics.map((metric) => (
            <div key={metric.value} className="py-3">
              <dt className="font-display text-lg font-semibold text-ink-foreground">
                {metric.value}
              </dt>
              <dd className="mt-2 max-w-xs text-sm leading-relaxed text-ink-foreground/60">
                {metric.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
