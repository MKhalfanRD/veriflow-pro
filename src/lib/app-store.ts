import { createContext, useContext } from "react";
import type { Role, Usulan } from "./mock-data";

export interface AppStore {
  role: Role;
  setRole: (r: Role) => void;
  usulan: Usulan[];
  updateUsulan: (id: string, patch: Partial<Usulan>) => void;
  addUsulan: (u: Usulan) => void;
}

export const AppStoreContext = createContext<AppStore | null>(null);

export function useAppStore(): AppStore {
  const ctx = useContext(AppStoreContext);
  if (!ctx) throw new Error("AppStoreContext missing");
  return ctx;
}

export const ROLE_LABEL: Record<Role, string> = {
  balai: "Balai/Satker",
  verif1: "Pembina Teknis (Verifikator 1)",
  verif2: "SSPSDA (Verifikator 2)",
};
