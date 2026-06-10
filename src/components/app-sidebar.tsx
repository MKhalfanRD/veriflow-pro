import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  Home,
  BookOpen,
  ClipboardList,
  Layers,
  BarChart3,
  Scale,
  ShieldCheck,
  Building2,
  PlusCircle,
  ListChecks,
  Inbox,
  CheckSquare,
  Printer,
  History,
  ChevronDown,
  FileText,
  FileSignature,
  LogIn,
} from "lucide-react";
import { useAppStore, ROLE_LABEL, ROLE_NAME } from "@/lib/app-store";
import type { Role } from "@/lib/mock-data";

type Icon = typeof Home;

interface SubItem {
  to: string;
  label: string;
}
interface NavItem {
  to?: string;
  label: string;
  icon: Icon;
  children?: SubItem[];
}

const NAV: Record<Role, NavItem[]> = {
  publik: [
    { to: "/", label: "Home", icon: Home },
    { to: "/studi-pendahuluan", label: "Studi Pendahuluan", icon: BookOpen },
    {
      label: "Perencanaan",
      icon: Layers,
      children: [
        { to: "/perencanaan/rincian-dpp", label: "Rincian DPP Awal" },
        { to: "/perencanaan/perubahan-dpp", label: "Perubahan Rincian DPP" },
      ],
    },
    { to: "/pelaksanaan", label: "Pelaksanaan DPP", icon: ClipboardList },
    { to: "/evaluasi", label: "Evaluasi", icon: BarChart3 },
    { to: "/peraturan", label: "Peraturan", icon: Scale },
  ],
  balai: [
    { to: "/balai/rekap", label: "Rekap Usulan Tahun", icon: ListChecks },
    { to: "/usulan/baru", label: "Buat Usulan", icon: PlusCircle },
    { to: "/balai/laporan", label: "Laporan / Cetak", icon: Printer },
    { to: "/riwayat", label: "Riwayat", icon: History },
  ],
  verif1: [
    { to: "/teknis/rekap", label: "Rekap Usulan Tahun", icon: ListChecks },
    { to: "/verifikasi", label: "Verifikasi Masuk", icon: Inbox },
    {
      label: "Laporan / Cetak",
      icon: Printer,
      children: [
        { to: "/teknis/laporan/surat", label: "Surat Usulan" },
        { to: "/teknis/laporan/rekomtek", label: "Rekomtek" },
      ],
    },
    { to: "/riwayat", label: "Riwayat", icon: History },
  ],
  verif2: [
    { to: "/sspsda/rekap", label: "Rekap Usulan Tahun", icon: ListChecks },
    { to: "/verifikasi-akhir", label: "Verifikasi Masuk", icon: CheckSquare },
    { to: "/sspsda/laporan", label: "Laporan / Cetak", icon: Printer },
    { to: "/riwayat", label: "Riwayat", icon: History },
  ],
};

export function AppSidebar() {
  const { role, setRole } = useAppStore();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const items = NAV[role];

  return (
    <aside className="w-64 bg-sidebar-bg flex flex-col shrink-0 h-screen sticky top-0">
      <div className="h-16 flex items-center px-6 border-b border-sidebar-border">
        <div className="size-7 bg-brand rounded flex items-center justify-center shadow-inner">
          <ShieldCheck className="size-4 text-brand-foreground" />
        </div>
        <div className="ml-3 leading-tight">
          <div className="text-sidebar-fg font-semibold tracking-tight text-sm">SIPRO-SDA</div>
          <div className="text-[9px] text-sidebar-muted uppercase tracking-widest">
            {role === "publik" ? "Portal Publik" : "e-Verifikasi"}
          </div>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        {items.map((item) =>
          item.children ? (
            <NavGroup key={item.label} item={item} pathname={pathname} />
          ) : (
            <NavLink key={item.to} item={item} pathname={pathname} />
          ),
        )}
      </nav>

      <div className="p-3 border-t border-sidebar-border space-y-3">
        <div className="px-2">
          <div className="text-[9px] uppercase tracking-widest text-sidebar-muted mb-1.5 font-semibold">
            Peran Aktif (Demo)
          </div>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as Role)}
            className="w-full bg-sidebar-active text-sidebar-fg text-xs rounded-md px-2 py-1.5 border border-sidebar-border focus:outline-none focus:ring-1 focus:ring-brand"
          >
            <option value="publik">Publik (tanpa login)</option>
            <option value="balai">Balai/Satker</option>
            <option value="verif1">Pembina Teknis (V1)</option>
            <option value="verif2">SSPSDA (V2)</option>
          </select>
        </div>

        <div className="flex items-center gap-3 px-2 py-2">
          <div className="size-8 rounded-full bg-brand/20 border border-sidebar-border flex items-center justify-center">
            {role === "publik" ? (
              <LogIn className="size-4 text-brand" />
            ) : (
              <Building2 className="size-4 text-brand" />
            )}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-medium text-sidebar-fg truncate">{ROLE_NAME[role]}</span>
            <span className="text-[10px] text-sidebar-muted truncate">{ROLE_LABEL[role]}</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

function NavLink({ item, pathname }: { item: NavItem; pathname: string }) {
  const Icon = item.icon;
  const to = item.to ?? "/";
  const active = to === "/" ? pathname === "/" : pathname.startsWith(to);
  return (
    <Link
      to={to}
      className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        active
          ? "bg-sidebar-active text-sidebar-fg"
          : "text-sidebar-muted hover:text-sidebar-fg hover:bg-sidebar-active/50"
      }`}
    >
      <Icon className="size-4 shrink-0" />
      <span>{item.label}</span>
      {active && <div className="ml-auto size-1.5 rounded-full bg-brand" />}
    </Link>
  );
}

function NavGroup({ item, pathname }: { item: NavItem; pathname: string }) {
  const Icon = item.icon;
  const childActive = item.children!.some((c) => pathname.startsWith(c.to));
  const [open, setOpen] = useState(childActive);
  const isOpen = open || childActive;

  return (
    <div>
      <button
        onClick={() => setOpen((v) => !v)}
        className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
          childActive
            ? "text-sidebar-fg"
            : "text-sidebar-muted hover:text-sidebar-fg hover:bg-sidebar-active/50"
        }`}
      >
        <Icon className="size-4 shrink-0" />
        <span>{item.label}</span>
        <ChevronDown
          className={`ml-auto size-3.5 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      {isOpen && (
        <div className="ml-7 mt-0.5 border-l border-sidebar-border pl-3 space-y-0.5">
          {item.children!.map((c) => {
            const active = pathname.startsWith(c.to);
            return (
              <Link
                key={c.to}
                to={c.to}
                className={`block px-3 py-1.5 rounded-md text-xs transition-colors ${
                  active
                    ? "bg-sidebar-active text-sidebar-fg font-medium"
                    : "text-sidebar-muted hover:text-sidebar-fg hover:bg-sidebar-active/50"
                }`}
              >
                {c.label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
