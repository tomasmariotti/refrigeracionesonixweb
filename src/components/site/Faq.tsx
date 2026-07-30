import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

const faqs = [
  {
    q: "¿Cómo trabajan en un proyecto nuevo?",
    a: "Comenzamos con un relevamiento técnico en el lugar y una conversación sobre el uso previsto del espacio. Con esa información realizamos el cálculo de cargas y presentamos una propuesta de ingeniería con alcances, criterios y alternativas, antes de hablar de equipos.",
  },
  {
    q: "¿Qué tipo de proyectos realizan?",
    a: "Proyectos comerciales, industriales y corporativos: oficinas, plantas de producción, depósitos y centros logísticos, locales de gran superficie y edificios con salas técnicas. Trabajamos tanto en obra nueva como en readecuación de instalaciones existentes.",
  },
  {
    q: "¿Cómo comienza un proyecto?",
    a: "Con una consulta técnica. A partir de ahí coordinamos la visita, definimos el alcance del relevamiento y establecemos qué documentación se necesita del proyecto de arquitectura o del proceso productivo.",
  },
  {
    q: "¿Qué incluye la ingeniería?",
    a: "Cálculo de cargas térmicas, definición del sistema, caudales y presiones, esquemas de distribución de conductos y cañerías, layout de sala técnica, criterios de selección de equipos y documentación para obra.",
  },
  {
    q: "¿En qué momento del proyecto conviene que intervengan?",
    a: "Cuanto antes, mejor. Participar durante la etapa de anteproyecto permite resolver espacios técnicos, recorridos y previsiones eléctricas sin modificar lo ya construido. También intervenimos en obras en curso o instalaciones existentes con bajo rendimiento.",
  },
  {
    q: "¿Cómo realizan el mantenimiento?",
    a: "Mediante planes con alcance y frecuencia definidos por escrito. Cada visita genera un informe con mediciones, tareas realizadas y recomendaciones. Ante una falla, el mismo equipo que conoce la instalación realiza el diagnóstico y la corrección.",
  },
];

export function Faq() {
  return (
    <section className="bg-background py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <SectionHeading
            eyebrow="Preguntas frecuentes"
            title="Cómo trabajamos, en detalle."
          />

          <Reveal>
            <Accordion type="single" collapsible className="w-full border-t border-border">
              {faqs.map((faq) => (
                <AccordionItem key={faq.q} value={faq.q} className="border-b border-border">
                  <AccordionTrigger className="py-6 text-left text-base font-semibold text-ink hover:no-underline">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="pb-8 text-sm leading-relaxed text-muted-foreground">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
