import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Inbox,
  CheckSquare,
  FileSignature,
  History,
  Settings,
  ShieldCheck,
  Building2,
  ListChecks,
  PlusCircle,
} from "lucide-react";
import { useAppStore, ROLE_LABEL } from "@/lib/app-store";
import type { Role } from "@/lib/mock-data";

interface NavItem {
  to: string;
  label: string;
  icon: typeof LayoutDashboard;
  roles: Role[];
}

const NAV: NavItem[] = [
  { to: "/", label: "Dasbor", icon: LayoutDashboard, roles: ["balai", "verif1", "verif2"] },
  { to: "/usulan", label: "Usulan Saya", icon: ListChecks, roles: ["balai"] },
  { to: "/usulan/baru", label: "Buat Usulan", icon: PlusCircle, roles: ["balai"] },
  { to: "/verifikasi", label: "Verifikasi Masuk", icon: Inbox, roles: ["verif1"] },
  { to: "/verifikasi-akhir", label: "Verifikasi Akhir", icon: CheckSquare, roles: ["verif2"] },
  { to: "/berita-acara", label: "Berita Acara", icon: FileSignature, roles: ["verif1", "verif2", "balai"] },
  { to: "/riwayat", label: "Riwayat", icon: History, roles: ["balai", "verif1", "verif2"] },
  { to: "/pengaturan", label: "Pengaturan", icon: Settings, roles: ["balai", "verif1", "verif2"] },
];

export function AppSidebar() {
  const { role, setRole } = useAppStore();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const items = NAV.filter((n) => n.roles.includes(role));

  return (
    <aside className="w-64 bg-sidebar-bg flex flex-col shrink-0 h-screen sticky top-0">
      <div className="h-16 flex items-center px-6 border-b border-sidebar-border">
        <div className="size-7 bg-brand rounded flex items-center justify-center shadow-inner">
          <ShieldCheck className="size-4 text-brand-foreground" />
        </div>
        <div className="ml-3 leading-tight">
          <div className="text-sidebar-fg font-semibold tracking-tight text-sm">SIPRO-SDA</div>
          <div className="text-[9px] text-sidebar-muted uppercase tracking-widest">e-Verifikasi</div>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        {items.map((item) => {
          const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
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
        })}
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
            <option value="balai">Balai/Satker</option>
            <option value="verif1">Pembina Teknis (V1)</option>
            <option value="verif2">SSPSDA (V2)</option>
          </select>
        </div>

        <div className="flex items-center gap-3 px-2 py-2">
          <div className="size-8 rounded-full bg-brand/20 border border-sidebar-border flex items-center justify-center">
            <Building2 className="size-4 text-brand" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-medium text-sidebar-fg truncate">
              {role === "balai" ? "Andi Maulana" : role === "verif1" ? "Budi Santoso" : "Hendra Wijaya"}
            </span>
            <span className="text-[10px] text-sidebar-muted truncate">{ROLE_LABEL[role]}</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
