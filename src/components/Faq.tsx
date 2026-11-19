import { useState } from "react";
import { Ornament, SectionTitle } from "./Brand";
import { ArrowRightIcon, MinusIcon, PlusIcon } from "./Icons";

const FAQS = [
  {
    q: "¿Cómo se usa esta carta digital?",
    a: "Navega entre Café Rancho Sofía, La Crêpe y Repostería Bikery, elige una categoría y consulta nombres, descripciones y precios. Cuando sepas qué te late, pide en barra o en tu mesa. Esta página es solo para consultar la carta.",
  },
  {
    q: "¿Puedo usar el QR en la mesa del local?",
    a: "Sí. Descarga el QR desde esta página, imprímelo en tamaño tarjeta o mesa y colócalo donde tus visitas lo vean. También puedes compartir el enlace en historias o estados.",
  },
  {
    q: "¿El QR abre la carta completa?",
    a: "Sí. Quien lo escanee ve las tres cartas con precios en lempiras: bebidas del café, crepas de La Crêpe y la repostería de Bikery.",
  },
  {
    q: "¿Cuál es el horario?",
    a: "Abrimos todos los días de 7:00 am a 7:00 pm, en Flores, Comayagua. Ven por un café y quédate por el postre.",
  },
  {
    q: "¿Puedo pedir ajustes o avisar alergias?",
    a: "Claro. Avísanos en barra antes de ordenar y revisamos los ingredientes contigo: menos azúcar, sin hielo o sin algún ingrediente.",
  },
];

export function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section className="relative overflow-hidden bg-cream-2 py-16 lg:py-24">
      <div className="mx-auto max-w-[1360px] px-5 sm:px-6 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
          <div className="lg:sticky lg:top-[128px] lg:self-start">
            <SectionTitle
              kicker="Antes de pedir"
              title={
                <>
                  Preguntas
                  <br />
                  <span className="italic text-gold-deep">frecuentes.</span>
                </>
              }
              description="Todo lo que necesitas saber sobre la carta digital, el QR y tu visita al rancho."
            />
            <button
              type="button"
              onClick={() =>
                document.getElementById("visitanos")?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                })
              }
              className="mt-7 inline-flex items-center gap-2.5 rounded-full border border-ink/20 px-5 py-3.5 font-sans text-[10px] font-medium uppercase tracking-[0.14em] text-ink/70 transition-colors hover:border-ink hover:bg-ink hover:text-cream"
            >
              Cómo llegar
              <ArrowRightIcon className="h-3.5 w-3.5" />
            </button>
            <Ornament tone="dark" className="mt-9 hidden lg:inline-flex" />
          </div>

          <div className="divide-y divide-ink/12 border-y border-ink/12">
            {FAQS.map((faq, index) => {
              const isOpen = open === index;
              return (
                <div key={faq.q}>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : index)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${index}`}
                    className="flex w-full items-center justify-between gap-5 py-5 text-left"
                  >
                    <span className="flex items-start gap-4">
                      <span className="mt-1 font-sans text-[9px] tracking-[0.14em] text-gold-deep/70">
                        0{index + 1}
                      </span>
                      <span
                        className={`font-display text-[1.22rem] leading-snug transition-colors sm:text-[1.38rem] ${
                          isOpen ? "text-ink" : "text-ink/70"
                        }`}
                      >
                        {faq.q}
                      </span>
                    </span>
                    <span
                      className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border transition-colors ${
                        isOpen
                          ? "border-ink bg-ink text-cream"
                          : "border-ink/25 text-ink/50"
                      }`}
                    >
                      {isOpen ? (
                        <MinusIcon className="h-3.5 w-3.5" />
                      ) : (
                        <PlusIcon className="h-3.5 w-3.5" />
                      )}
                    </span>
                  </button>
                  <div
                    id={`faq-panel-${index}`}
                    className={`grid transition-all duration-300 ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-2xl pb-5 pl-8 pr-10 text-[12.5px] font-light leading-[1.85] text-ink/55">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
