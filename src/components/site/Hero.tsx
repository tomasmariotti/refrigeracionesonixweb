import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Reveal } from "./Reveal";
import { CtaModal } from "./CtaModal";
import heroImage from "@/assets/hero-hvac.jpg";

const metrics = [
  { value: "Ingeniería", label: "Cálculo térmico y documentación técnica propia" },
  { value: "Integral", label: "Del relevamiento inicial al plan de mantenimiento" },
  { value: "Coordinación", label: "Trabajo conjunto con obra, arquitectura y eléctrica" },
];

export function Hero() {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const offset = Math.min(window.scrollY, 600) * 0.12;
        if (imgRef.current) {
          imgRef.current.style.transform = `translate3d(0, ${offset}px, 0) scale(1.08)`;
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section id="inicio" className="relative min-h-screen overflow-hidden bg-ink">
      <img
        ref={imgRef}
        src={heroImage}
        alt="Sala de máquinas y equipos HVAC en la azotea de un edificio corporativo"
        width={1920}
        height={1280}
        className="absolute inset-0 size-full scale-105 object-cover opacity-45"
        style={{ transform: "translate3d(0, 0, 0) scale(1.08)" }}
      />
      <div className="absolute inset-0 bg-ink-gradient opacity-80" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 pt-32 pb-20 lg:px-10">
        <div className="max-w-4xl">
          <Reveal trigger="mount" className="flex items-center gap-4">
            <span className="h-px w-12 bg-steel" />
            <p className="eyebrow text-steel">Ingeniería termomecánica y soluciones HVAC</p>
          </Reveal>
          <Reveal trigger="mount" delay={90}>
            <h1 className="mt-8 text-4xl leading-[1.08] font-bold text-ink-foreground md:text-6xl lg:text-[4.2rem]">
              Soluciones de ingeniería HVAC para proyectos donde la planificación marca la
              diferencia.
            </h1>
          </Reveal>
          <Reveal trigger="mount" delay={180}>
            <p className="mt-8 max-w-2xl text-base leading-relaxed font-light text-ink-foreground/70 md:text-lg">
              Diseñamos, desarrollamos e implementamos sistemas de climatización y ventilación
              adaptados a cada proyecto, acompañando todas las etapas desde la ingeniería inicial
              hasta el mantenimiento.
            </p>
          </Reveal>
          <Reveal trigger="mount" delay={270} className="mt-11 flex flex-col gap-4 sm:flex-row">
            <CtaModal
              trigger={
                <Button variant="accent" size="xl">
                  Solicitar asesoramiento
                </Button>
              }
            />
            <Button asChild variant="outlineLight" size="xl">
              <a href="#servicios">Conocer nuestros servicios</a>
            </Button>
          </Reveal>
        </div>

        <Reveal trigger="mount" delay={360}>
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
        </Reveal>
      </div>
    </section>
  );
}
