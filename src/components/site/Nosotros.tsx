import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import nosotrosImage from "@/assets/nosotros.jpg";

const pillars = [
  {
    title: "Metodología antes que improvisación",
    text: "Cada proyecto atraviesa las mismas etapas técnicas. No se avanza a la instalación sin cálculo, documentación y criterios acordados con el cliente.",
  },
  {
    title: "Responsabilidad sobre el resultado",
    text: "Asumimos el sistema completo, no una parte. Si algo no rinde como fue proyectado, lo revisamos y lo corregimos.",
  },
  {
    title: "Atención personalizada",
    text: "Un interlocutor técnico por proyecto, con seguimiento directo y sin intermediarios comerciales.",
  },
  {
    title: "Transparencia técnica",
    text: "Explicamos por qué se elige cada solución, qué alternativas existen y qué implica cada una en costo operativo.",
  },
];

export function Nosotros() {
  return (
    <section id="nosotros" className="bg-surface py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid items-start gap-16 lg:grid-cols-2 lg:gap-24">
          <Reveal className="lg:sticky lg:top-28">
            <img
              src={nosotrosImage}
              alt="Equipo técnico de Refrigeraciones Onix revisando documentación de obra en sala de máquinas"
              width={1280}
              height={960}
              loading="lazy"
              className="aspect-[4/3] w-full object-cover"
            />
          </Reveal>

          <div>
            <SectionHeading
              eyebrow="Nosotros"
              title="Un equipo de ingeniería que trabaja con procedimiento, no con recetas."
              description="Refrigeraciones Onix se organiza como un estudio técnico: relevamos, calculamos, documentamos y ejecutamos. Ese orden es lo que permite sostener la calidad en proyectos comerciales, industriales y corporativos de distinta escala."
            />

            <div className="mt-14 space-y-10">
              {pillars.map((pillar, index) => (
                <Reveal key={pillar.title} delay={index * 80}>
                  <div className="flex gap-6">
                    <span className="mt-2 h-px w-8 shrink-0 bg-accent" />
                    <div>
                      <h3 className="text-base font-semibold text-ink">{pillar.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {pillar.text}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
