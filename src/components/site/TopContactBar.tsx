import { Mail, Phone } from "lucide-react";
import whatsappLogo from "@/assets/logo whatsapp.png";

const PHONE_LABEL = "+54 11 6924 6040";
const PHONE_HREF = "tel:+541169246040";
const WHATSAPP_LABEL = "+54 9 11 6924 6040";
const WHATSAPP_HREF =
  "https://wa.me/5491169246040?text=" +
  encodeURIComponent("Hola, quiero consultar sobre un proyecto de climatización.");
const EMAIL = "martin@estudionix.com";

export function TopContactBar() {
  return (
    <div className="hidden border-b border-ink-foreground/10 bg-ink lg:block">
      <div className="mx-auto flex h-9 max-w-7xl items-center justify-between px-6 text-xs text-ink-foreground/75 lg:px-10">
        <div className="flex items-center gap-6">
          <a
            href={PHONE_HREF}
            className="flex items-center gap-2 transition-colors hover:text-ink-foreground"
          >
            <Phone className="size-3.5" strokeWidth={1.6} />
            Llamadas: {PHONE_LABEL}
          </a>
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 transition-colors hover:text-ink-foreground"
          >
            <img src={whatsappLogo} alt="" className="size-3.5" />
            WhatsApp: {WHATSAPP_LABEL}
          </a>
        </div>
        <a
          href={`mailto:${EMAIL}`}
          className="flex items-center gap-2 transition-colors hover:text-ink-foreground"
        >
          <Mail className="size-3.5" strokeWidth={1.6} />
          {EMAIL}
        </a>
      </div>
    </div>
  );
}
