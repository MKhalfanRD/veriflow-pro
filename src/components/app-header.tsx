import { Bell, Search, Plus, LogIn } from "lucide-react";
import { Link, useRouterState } from "@tanstack/react-router";
import { useAppStore } from "@/lib/app-store";

const TITLES: Array<[string, string]> = [
  ["/studi-pendahuluan", "Studi Pendahuluan"],
  ["/perencanaan/rincian-dpp", "Perencanaan · Rincian DPP Awal"],
  ["/perencanaan/perubahan-dpp", "Perencanaan · Perubahan Rincian DPP"],
  ["/pelaksanaan", "Pelaksanaan DPP"],
  ["/evaluasi", "Evaluasi"],
  ["/peraturan", "Peraturan"],
  ["/balai/rekap", "Rekap Usulan Balai"],
  ["/balai/laporan", "Laporan / Cetak Balai"],
  ["/teknis/rekap", "Rekap Usulan Teknis"],
  ["/teknis/laporan/surat", "Laporan · Surat Usulan"],
  ["/teknis/laporan/rekomtek", "Laporan · Rekomtek"],
  ["/sspsda/rekap", "Rekap Usulan SSPSDA"],
  ["/sspsda/laporan", "Laporan / Cetak SSPSDA"],
  ["/usulan/baru", "Buat Usulan Baru"],
  ["/usulan", "Usulan Saya"],
  ["/verifikasi-akhir", "Verifikasi Akhir SSPSDA"],
  ["/verifikasi", "Verifikasi Usulan"],
  ["/berita-acara", "Berita Acara"],
  ["/riwayat", "Riwayat Aktivitas"],
  ["/pengaturan", "Pengaturan"],
];

export function AppHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { role, setRole } = useAppStore();
  const isHome = pathname === "/";
  const title =
    (isHome
      ? role === "publik"
        ? "Beranda Publik"
        : "Dasbor"
      : TITLES.find(([k]) => pathname.startsWith(k))?.[1]) ?? "Dasbor";

  return (
    <header className="h-16 bg-surface border-b border-border px-8 flex items-center justify-between shrink-0">
      <div>
        <h1 className="text-base font-semibold text-foreground tracking-tight">{title}</h1>
        <p className="text-[11px] text-muted-foreground">
          {role === "publik"
            ? "Portal Informasi Publik · Sistem Manajemen Usulan & Verifikasi"
            : "Sistem Informasi Manajemen Usulan & Verifikasi Berjenjang"}
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
        {role !== "publik" && (
          <button className="size-9 flex items-center justify-center text-muted-foreground hover:bg-muted rounded-full relative">
            <Bell className="size-4" />
            <span className="absolute top-2 right-2 size-2 bg-destructive rounded-full border-2 border-surface" />
          </button>
        )}
        {role === "balai" && (
          <Link
            to="/usulan/baru"
            className="bg-brand text-brand-foreground text-sm font-medium py-2 px-3 flex items-center gap-2 rounded-md shadow-card hover:opacity-90 transition-opacity"
          >
            <Plus className="size-4" />
            Buat Usulan
          </Link>
        )}
        {role === "publik" && (
          <button
            onClick={() => setRole("balai")}
            className="bg-brand text-brand-foreground text-sm font-medium py-2 px-3 flex items-center gap-2 rounded-md shadow-card hover:opacity-90 transition-opacity"
          >
            <LogIn className="size-4" />
            Masuk
          </button>
        )}
      </div>
    </header>
  );
}
