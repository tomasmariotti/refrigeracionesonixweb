import whatsappLogo from "@/assets/logo whatsapp.png";

const WHATSAPP_NUMBER = "5491169246040";
const WHATSAPP_MESSAGE = "Hola, quiero consultar sobre un proyecto de climatización.";

export function WhatsAppButton() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chatear por WhatsApp"
      className="whatsapp-float fixed right-5 bottom-5 z-50 flex size-14 items-center justify-center rounded-full bg-[#25D366] shadow-elevated transition-transform duration-300 hover:scale-110 md:right-8 md:bottom-8"
    >
      <span
        className="whatsapp-pulse absolute inset-0 rounded-full bg-[#25D366]"
        aria-hidden="true"
      />
      <img src={whatsappLogo} alt="" className="relative size-8" />
    </a>
  );
}
