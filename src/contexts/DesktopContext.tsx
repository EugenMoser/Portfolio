import { createContext, useContext } from "react";

interface DesktopContextValue {
  onOpenCert: (url: string, title: string) => void;
}

export const DesktopContext = createContext<DesktopContextValue | null>(null);

export function useDesktop() {
  return useContext(DesktopContext);
}
