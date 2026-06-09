import { createFileRoute } from "@tanstack/react-router";
import { useAppStore, ROLE_LABEL } from "@/lib/app-store";

export const Route = createFileRoute("/pengaturan")({
  component: Page,
});

function Page() {
  const { role } = useAppStore();
  return (
    <div className="p-8 max-w-3xl mx-auto space-y-6">
      <div className="bg-surface rounded-xl ring-1 ring-black/5 shadow-card p-6">
        <h2 className="text-base font-semibold">Profil Pengguna</h2>
        <p className="text-[11px] text-muted-foreground mb-6">Informasi akun aktif</p>
        <dl className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <dt className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Peran</dt>
            <dd className="mt-1 font-medium">{ROLE_LABEL[role]}</dd>
          </div>
          <div>
            <dt className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Status</dt>
            <dd className="mt-1 font-medium text-status-approved">Aktif</dd>
          </div>
        </dl>
      </div>
      <div className="bg-surface rounded-xl ring-1 ring-black/5 shadow-card p-6">
        <h2 className="text-base font-semibold">Manajemen Role (RBAC)</h2>
        <p className="text-[11px] text-muted-foreground mb-4">
          Sistem mendukung 3 peran utama dengan hak akses berjenjang.
        </p>
        <ul className="space-y-3 text-sm">
          <li className="flex items-start gap-3"><span className="size-2 mt-1.5 rounded-full bg-brand" /><div><strong>Balai/Satker</strong> — membuat & mengirim usulan, melihat status & catatan revisi.</div></li>
          <li className="flex items-start gap-3"><span className="size-2 mt-1.5 rounded-full bg-prio-menteri" /><div><strong>Pembina Teknis (V1)</strong> — memeriksa, meminta revisi, atau menyetujui usulan; menerbitkan Berita Acara.</div></li>
          <li className="flex items-start gap-3"><span className="size-2 mt-1.5 rounded-full bg-prio-nasional" /><div><strong>SSPSDA (V2)</strong> — validasi akhir, melanjutkan atau menghentikan usulan.</div></li>
        </ul>
      </div>
    </div>
  );
}
