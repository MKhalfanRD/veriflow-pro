import { createContext, useContext } from "react";
import type { Role, Usulan } from "./mock-data";

export interface AppStore {
  loggedIn: boolean;
  role: Role;
  login: (r: Role) => void;
  logout: () => void;
  setRole: (r: Role) => void;
  usulan: Usulan[];
  usulanTahun: Usulan[];
  updateUsulan: (id: string, patch: Partial<Usulan>) => void;
  addUsulan: (u: Usulan) => void;
  dppAwalEnabled: boolean;
  dppPerubahanEnabled: boolean;
  setDppEnabled: (t: "awal" | "perubahan", v: boolean) => void;
  tahunAnggaran: number;
  setTahunAnggaran: (y: number) => void;
  tahunOptions: number[];
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

export const ROLE_NAME: Record<Role, string> = {
  balai: "Andi Maulana",
  verif1: "Budi Santoso",
  verif2: "Hendra Wijaya",
};
