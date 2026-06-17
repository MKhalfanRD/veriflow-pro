import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  Home,
  BookOpen,
  Layers,
  BarChart3,
  Scale,
  ShieldCheck,
  Building2,
  ClipboardList,
  ChevronDown,
  LogOut,
  Settings2,
} from "lucide-react";
import { useAppStore, ROLE_LABEL, ROLE_NAME } from "@/lib/app-store";
import type { Role, DppType } from "@/lib/mock-data";

type Icon = typeof Home;

interface NavLeaf {
  to: string;
  label: string;
}
interface NavBranch {
  label: string;
  children: (NavLeaf | NavBranch)[];
}
interface NavTop {
  to?: string;
  label: string;
  icon: Icon;
  children?: (NavLeaf | NavBranch)[];
}

function dppSubmenu(dpp: DppType, role: Role): (NavLeaf | NavBranch)[] {
  const base = `/perencanaan/${dpp}`;
  const items: (NavLeaf | NavBranch)[] = [
    { to: `${base}/rekap`, label: "Rekap Usulan" },
  ];
  if (role === "balai") {
    items.push({ to: `${base}/buat-usulan`, label: "Buat Usulan" });
  }
  if (role === "verif1" || role === "verif2") {
    items.push({ to: `${base}/verifikasi`, label: "Verif Masuk" });
  }
  if (role === "verif1") {
    items.push({
      label: "Laporan / Cetak",
      children: [
        { to: `${base}/laporan`, label: "Surat Usulan" },
        { to: `${base}/rekomtek`, label: "Rekomtek" },
      ],
    });
  } else {
    items.push({ to: `${base}/laporan`, label: "Laporan / Cetak" });
  }
  items.push({ to: `${base}/riwayat`, label: "Riwayat" });
  return items;
}

function buildNav(role: Role): NavTop[] {
  const items: NavTop[] = [
    { to: "/", label: "Home", icon: Home },
    { to: "/studi-pendahuluan", label: "Studi Pendahuluan", icon: BookOpen },
    {
      label: "Perencanaan",
      icon: Layers,
      children: [
        { label: "Rincian DPP Awal", children: dppSubmenu("awal", role) },
        { label: "Perubahan Rincian DPP", children: dppSubmenu("perubahan", role) },
      ],
    },
    { to: "/pelaksanaan", label: "Pelaksanaan", icon: ClipboardList },
    { to: "/evaluasi", label: "Evaluasi", icon: BarChart3 },
    { to: "/peraturan", label: "Peraturan", icon: Scale },
  ];
  if (role === "verif2") {
    items.push({ to: "/pengaturan", label: "Pengaturan Menu", icon: Settings2 });
  }
  return items;
}

export function AppSidebar() {
  const { role, logout } = useAppStore();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const items = buildNav(role);

  return (
    <aside className="w-72 bg-sidebar-bg flex flex-col shrink-0 h-screen sticky top-0">
      <div className="h-16 flex items-center px-6 border-b border-sidebar-border">
        <div className="size-7 bg-brand rounded flex items-center justify-center shadow-inner">
          <ShieldCheck className="size-4 text-brand-foreground" />
        </div>
        <div className="ml-3 leading-tight">
          <div className="text-sidebar-fg font-semibold tracking-tight text-sm">SIPRO-SDA</div>
          <div className="text-[9px] text-sidebar-muted uppercase tracking-widest">
            e-Verifikasi Berjenjang
          </div>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        {items.map((item) =>
          item.children ? (
            <TopGroup key={item.label} item={item} pathname={pathname} />
          ) : (
            <TopLink key={item.to} item={item} pathname={pathname} />
          ),
        )}
      </nav>

      <div className="p-3 border-t border-sidebar-border space-y-3">
        <div className="flex items-center gap-3 px-2 py-2">
          <div className="size-9 rounded-full bg-brand/20 border border-sidebar-border flex items-center justify-center">
            <Building2 className="size-4 text-brand" />
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-xs font-medium text-sidebar-fg truncate">{ROLE_NAME[role]}</span>
            <span className="text-[10px] text-sidebar-muted truncate">{ROLE_LABEL[role]}</span>
          </div>
          <button
            onClick={logout}
            title="Keluar"
            className="size-8 rounded-md text-sidebar-muted hover:text-sidebar-fg hover:bg-sidebar-active flex items-center justify-center"
          >
            <LogOut className="size-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}

function TopLink({ item, pathname }: { item: NavTop; pathname: string }) {
  const Icon = item.icon;
  const to = item.to ?? "/";
  const active = to === "/" ? pathname === "/" : pathname === to || pathname.startsWith(to + "/");
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

function isLeaf(n: NavLeaf | NavBranch): n is NavLeaf {
  return "to" in n;
}

function branchActive(n: NavLeaf | NavBranch, pathname: string): boolean {
  if (isLeaf(n)) return pathname === n.to || pathname.startsWith(n.to + "/");
  return n.children.some((c) => branchActive(c, pathname));
}

function TopGroup({ item, pathname }: { item: NavTop; pathname: string }) {
  const Icon = item.icon;
  const active = item.children!.some((c) => branchActive(c, pathname));
  const [open, setOpen] = useState(active);
  const isOpen = open || active;

  return (
    <div>
      <button
        onClick={() => setOpen((v) => !v)}
        className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
          active
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
        <div className="ml-6 mt-0.5 border-l border-sidebar-border pl-2 space-y-0.5">
          {item.children!.map((c, i) => (
            <SubNode key={i} node={c} pathname={pathname} depth={1} />
          ))}
        </div>
      )}
    </div>
  );
}

function SubNode({
  node,
  pathname,
  depth,
}: {
  node: NavLeaf | NavBranch;
  pathname: string;
  depth: number;
}) {
  if (isLeaf(node)) {
    const active = pathname === node.to || pathname.startsWith(node.to + "/");
    return (
      <Link
        to={node.to}
        className={`block px-3 py-1.5 rounded-md text-xs transition-colors ${
          active
            ? "bg-sidebar-active text-sidebar-fg font-medium"
            : "text-sidebar-muted hover:text-sidebar-fg hover:bg-sidebar-active/50"
        }`}
      >
        {node.label}
      </Link>
    );
  }
  return <BranchNode node={node} pathname={pathname} depth={depth} />;
}

function BranchNode({
  node,
  pathname,
  depth,
}: {
  node: NavBranch;
  pathname: string;
  depth: number;
}) {
  const active = branchActive(node, pathname);
  const [open, setOpen] = useState(active);
  const isOpen = open || active;
  return (
    <div>
      <button
        onClick={() => setOpen((v) => !v)}
        className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-md text-xs transition-colors ${
          active
            ? "text-sidebar-fg font-medium"
            : "text-sidebar-muted hover:text-sidebar-fg hover:bg-sidebar-active/50"
        }`}
      >
        <span className="flex-1 text-left">{node.label}</span>
        <ChevronDown
          className={`size-3 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      {isOpen && (
        <div className="ml-3 mt-0.5 border-l border-sidebar-border pl-2 space-y-0.5">
          {node.children.map((c, i) => (
            <SubNode key={i} node={c} pathname={pathname} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}
