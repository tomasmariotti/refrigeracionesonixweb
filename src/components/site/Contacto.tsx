import { useState, type FormEvent } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Reveal } from "./Reveal";

const contactData = [
  { icon: Mail, label: "Correo", value: "contacto@refrigeracionesonix.com" },
  { icon: Phone, label: "Teléfono", value: "+54 11 0000 0000" },
  { icon: MapPin, label: "Zona de trabajo", value: "Área metropolitana y alrededores" },
];

export function Contacto() {
  const [sent, setSent] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <section id="contacto" className="bg-surface py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
          <Reveal>
            <p className="eyebrow text-accent">Contacto</p>
            <h2 className="mt-5 text-3xl leading-[1.15] font-semibold text-ink md:text-[2.6rem]">
              Conversemos sobre su proyecto antes de definir equipos.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Cuéntenos el tipo de instalación, la etapa en la que se encuentra y el objetivo del
              espacio. Le respondemos con una primera lectura técnica y los pasos siguientes.
            </p>

            <dl className="mt-12 space-y-8 border-t border-border pt-10">
              {contactData.map((item) => (
                <div key={item.label} className="flex gap-5">
                  <item.icon className="mt-0.5 size-5 text-accent" strokeWidth={1.4} />
                  <div>
                    <dt className="eyebrow text-muted-foreground">{item.label}</dt>
                    <dd className="mt-1 text-sm font-medium text-ink">{item.value}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={120}>
            <div className="bg-background p-8 shadow-elevated md:p-12">
              {sent ? (
                <div className="flex min-h-[26rem] flex-col justify-center">
                  <p className="eyebrow text-accent">Consulta enviada</p>
                  <h3 className="mt-4 text-2xl font-semibold text-ink">
                    Gracias por escribirnos.
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    Un responsable técnico revisará la información y se pondrá en contacto para
                    coordinar el relevamiento inicial.
                  </p>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="nombre">Nombre</Label>
                      <Input id="nombre" name="nombre" required autoComplete="name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="empresa">Empresa</Label>
                      <Input id="empresa" name="empresa" autoComplete="organization" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Correo</Label>
                      <Input id="email" name="email" type="email" required autoComplete="email" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="telefono">Teléfono</Label>
                      <Input id="telefono" name="telefono" type="tel" autoComplete="tel" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tipo">Tipo de proyecto</Label>
                    <Select name="tipo">
                      <SelectTrigger id="tipo">
                        <SelectValue placeholder="Seleccione una opción" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="industrial">Industrial</SelectItem>
                        <SelectItem value="corporativo">Corporativo</SelectItem>
                        <SelectItem value="comercial">Comercial</SelectItem>
                        <SelectItem value="ventilacion">Ventilación / extracción</SelectItem>
                        <SelectItem value="mantenimiento">Plan de mantenimiento</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mensaje">Mensaje</Label>
                    <Textarea id="mensaje" name="mensaje" rows={5} required />
                  </div>

                  <Button type="submit" variant="accent" size="xl" className="w-full">
                    Enviar consulta
                  </Button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
