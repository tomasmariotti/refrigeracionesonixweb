import { useState, type FormEvent } from "react";
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

export function ContactForm() {
  const [sent, setSent] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };

  if (sent) {
    return (
      <div className="flex min-h-[26rem] flex-col justify-center">
        <p className="eyebrow text-accent">Consulta enviada</p>
        <h3 className="mt-4 text-2xl font-semibold text-ink">Gracias por escribirnos.</h3>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          Un responsable técnico revisará la información y se pondrá en contacto para coordinar el
          relevamiento inicial.
        </p>
      </div>
    );
  }

  return (
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
  );
}
