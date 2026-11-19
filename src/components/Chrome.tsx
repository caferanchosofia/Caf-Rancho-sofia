import { useStore } from "../store";
import { BikeIcon, CheckIcon, CrepeIcon } from "./Icons";

export function MobileBar() {
  const { setVenue } = useStore();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-gold/20 bg-[#12100e] pb-[env(safe-area-inset-bottom)] lg:hidden"
      aria-label="Acciones rápidas"
    >
      <div className="grid h-[62px] grid-cols-3">
        <button
          type="button"
          onClick={() => scrollTo("carta")}
          className="flex flex-col items-center justify-center gap-1 text-cream/60 transition-colors hover:text-gold"
        >
          <span className="text-[15px] leading-none">☕</span>
          <span className="font-sans text-[7.5px] font-medium uppercase tracking-[0.14em]">
            Carta
          </span>
        </button>
        <button
          type="button"
          onClick={() => {
            setVenue("crepe");
            window.setTimeout(() => scrollTo("carta"), 50);
          }}
          className="flex flex-col items-center justify-center gap-1 text-pink/75 transition-colors hover:text-pink"
        >
          <CrepeIcon className="h-4 w-4" />
          <span className="font-sans text-[7.5px] font-medium uppercase tracking-[0.14em]">
            Crêpe
          </span>
        </button>
        <button
          type="button"
          onClick={() => {
            setVenue("bikery");
            window.setTimeout(() => scrollTo("carta"), 50);
          }}
          className="flex flex-col items-center justify-center gap-1 text-mint/80 transition-colors hover:text-mint"
        >
          <BikeIcon className="h-4 w-4" />
          <span className="px-0.5 text-center font-sans text-[6.5px] font-medium uppercase leading-tight tracking-[0.08em]">
            Repostería Bikery
          </span>
        </button>
      </div>
    </nav>
  );
}

export function Toast() {
  const { toast } = useStore();
  if (!toast) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed bottom-[78px] left-1/2 z-[95] w-[calc(100%-2rem)] max-w-[400px] -translate-x-1/2 animate-fade-up lg:bottom-8"
    >
      <div className="flex items-center gap-3 rounded-full border border-gold/30 bg-[#1c1813]/97 px-4 py-3 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.9)] backdrop-blur-xl">
        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gold text-ink">
          <CheckIcon className="h-3.5 w-3.5" />
        </span>
        <p className="font-sans text-[11px] leading-snug text-cream/85">{toast}</p>
      </div>
    </div>
  );
}
