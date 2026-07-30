import { Mail, MapPin, Phone } from "lucide-react";
import { Reveal } from "./Reveal";
import { ContactForm } from "./ContactForm";

const contactData = [
  { icon: Mail, label: "Correo", value: "martin@estudionix.com" },
  { icon: Phone, label: "Teléfono", value: "+54 11 69246040" },
  { icon: MapPin, label: "Zona de trabajo", value: "Área metropolitana y alrededores" },
];

export function Contacto() {
  return (
    <section id="contacto" className="bg-ink py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
          <Reveal>
            <p className="eyebrow text-steel">Contacto</p>
            <h2 className="mt-5 text-3xl leading-[1.15] font-bold text-ink-foreground md:text-[2.6rem]">
              Conversemos sobre su proyecto antes de definir equipos.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-ink-foreground/70">
              Cuéntenos el tipo de instalación, la etapa en la que se encuentra y el objetivo del
              espacio. Le respondemos con una primera lectura técnica y los pasos siguientes.
            </p>

            <dl className="mt-12 space-y-8 border-t border-ink-foreground/15 pt-10">
              {contactData.map((item) => (
                <div key={item.label} className="flex gap-5">
                  <item.icon className="mt-0.5 size-5 text-steel" strokeWidth={1.4} />
                  <div>
                    <dt className="eyebrow text-ink-foreground/50">{item.label}</dt>
                    <dd className="mt-1 text-sm font-medium text-ink-foreground">{item.value}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={120}>
            <div className="bg-background p-8 shadow-elevated md:p-12">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
