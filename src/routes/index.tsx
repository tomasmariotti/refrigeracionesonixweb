import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Enfoque } from "@/components/site/Enfoque";
import { Servicios } from "@/components/site/Servicios";
import { Metodologia } from "@/components/site/Metodologia";
import { Beneficios } from "@/components/site/Beneficios";
import { Nosotros } from "@/components/site/Nosotros";
import { Casos } from "@/components/site/Casos";
import { Mantenimiento } from "@/components/site/Mantenimiento";
import { Faq } from "@/components/site/Faq";
import { Contacto } from "@/components/site/Contacto";
import { Footer } from "@/components/site/Footer";

const title = "Refrigeraciones Onix | Ingeniería HVAC y climatización industrial";
const description =
  "Ingeniería termomecánica, diseño HVAC, climatización comercial e industrial, ventilación y mantenimiento para proyectos corporativos e industriales.";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <Enfoque />
        <Servicios />
        <Metodologia />
        <Beneficios />
        <Casos />
        <Nosotros />
        <Mantenimiento />
        <Faq />
        <Contacto />
      </main>
      <Footer />
    </div>
  );
}
