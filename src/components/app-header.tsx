import { Bell, Search } from "lucide-react";
import { useRouterState } from "@tanstack/react-router";
import { DPP_LABEL } from "@/lib/mock-data";

const TITLES: Array<[string, string]> = [
  ["/studi-pendahuluan", "Studi Pendahuluan"],
  ["/pelaksanaan", "Pelaksanaan DPP"],
  ["/evaluasi", "Evaluasi"],
  ["/peraturan", "Peraturan"],
  ["/berita-acara", "Berita Acara"],
  ["/pengaturan", "Pengaturan"],
];

const SUB_TITLES: Record<string, string> = {
  rekap: "Rekap Usulan",
  "buat-usulan": "Buat Usulan",
  verifikasi: "Verifikasi Masuk",
  laporan: "Laporan / Surat Usulan",
  rekomtek: "Rekomendasi Teknis",
  riwayat: "Riwayat Aktivitas",
};

function deriveTitle(pathname: string): string {
  if (pathname === "/") return "Dasbor";
  const dpp = pathname.match(/^\/perencanaan\/(awal|perubahan)(?:\/(.+))?/);
  if (dpp) {
    const label = DPP_LABEL[dpp[1] as "awal" | "perubahan"];
    const sub = dpp[2]?.split("/")[0];
    if (sub && SUB_TITLES[sub]) return `${label} · ${SUB_TITLES[sub]}`;
    return label;
  }
  return TITLES.find(([k]) => pathname.startsWith(k))?.[1] ?? "Dasbor";
}

export function AppHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const title = deriveTitle(pathname);

  return (
    <header className="h-16 bg-surface border-b border-border px-8 flex items-center justify-between shrink-0">
      <div>
        <h1 className="text-base font-semibold text-foreground tracking-tight">{title}</h1>
        <p className="text-[11px] text-muted-foreground">
          Sistem Informasi Manajemen Usulan & Verifikasi Berjenjang
        </p>
      </div>
      <div className="flex items-center gap-3">
        <div className="relative w-64 hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Cari usulan, nomor surat..."
            className="w-full bg-muted border-none rounded-md py-1.5 pl-9 pr-3 text-sm focus:ring-1 focus:ring-brand outline-none"
          />
        </div>
        <button className="size-9 flex items-center justify-center text-muted-foreground hover:bg-muted rounded-full relative">
          <Bell className="size-4" />
          <span className="absolute top-2 right-2 size-2 bg-destructive rounded-full border-2 border-surface" />
        </button>
      </div>
    </header>
  );
}
