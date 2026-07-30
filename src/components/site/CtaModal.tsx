import type { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ContactForm } from "./ContactForm";

export function CtaModal({ trigger }: { trigger: ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        overlayClassName="bg-ink/60 backdrop-blur-md"
        className="max-h-[90vh] max-w-2xl gap-0 overflow-y-auto rounded-sm border-border bg-background p-8 shadow-elevated md:p-12"
      >
        <p className="eyebrow text-accent">Contacto</p>
        <DialogTitle className="mt-3 text-2xl leading-snug font-bold text-ink md:text-3xl">
          Conversemos sobre su proyecto antes de definir equipos.
        </DialogTitle>
        <DialogDescription className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Cuéntenos el tipo de instalación, la etapa en la que se encuentra y el objetivo del
          espacio. Le respondemos con una primera lectura técnica y los pasos siguientes.
        </DialogDescription>
        <div className="mt-8">
          <ContactForm />
        </div>
      </DialogContent>
    </Dialog>
  );
}
