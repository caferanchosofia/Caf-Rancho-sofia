import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { DEFAULT_WHATSAPP, type VenueId } from "./data/menu";

type Store = {
  venue: VenueId;
  setVenue: (venue: VenueId) => void;
  menuUrl: string;
  siteUrl: string;
  showToast: (message: string) => void;
  toast: string | null;
  formattedPhone: string;
};

const StoreContext = createContext<Store | null>(null);

function cleanNumber(value: string): string {
  return value.replace(/\D/g, "");
}

export function formatPhone(value: string): string {
  const digits = cleanNumber(value);
  if (digits.length === 11 && digits.startsWith("504")) {
    return `+504 ${digits.slice(3, 7)}-${digits.slice(7)}`;
  }
  if (digits.startsWith("+")) return digits;
  return digits ? `+${digits}` : "";
}

export function getDefaultSiteUrl(): string {
  try {
    const url = new URL(window.location.href);
    url.hash = "";
    url.search = "";
    return url.toString().replace(/\/$/, "");
  } catch {
    return "https://cafe-ranchosofia.com";
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [venue, setVenue] = useState<VenueId>("cafe");
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    },
    [],
  );

  const showToast = useCallback((message: string) => {
    setToast(message);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 3600);
  }, []);

  const siteUrl = getDefaultSiteUrl();
  const menuUrl = siteUrl;
  const digits = cleanNumber(DEFAULT_WHATSAPP);

  const value = useMemo<Store>(
    () => ({
      venue,
      setVenue,
      menuUrl,
      siteUrl,
      showToast,
      toast,
      formattedPhone: formatPhone(digits),
    }),
    [venue, menuUrl, siteUrl, showToast, toast, digits],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): Store {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used inside StoreProvider");
  return context;
}
