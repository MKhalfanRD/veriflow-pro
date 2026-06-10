import { createFileRoute } from "@tanstack/react-router";
import { useAppStore } from "@/lib/app-store";
import { formatTanggal, formatRupiah } from "@/lib/mock-data";
import { PrioritasBadge } from "@/components/status-badge";
import { Download, FileText } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/teknis/laporan/rekomtek")({
  component: Page,
});

function Page() {
  const { usulan } = useAppStore();
  const rows = usulan.filter((u) =>
    ["disetujui_v1", "menunggu_v2", "disetujui_v2"].includes(u.status),
  );

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="bg-surface rounded-xl ring-1 ring-black/5 shadow-card overflow-hidden">
        <div className="px-6 py-4 border-b border-border">
          <h2 className="text-base font-semibold">Rekomendasi Teknis (Rekomtek)</h2>
          <p className="text-[11px] text-muted-foreground">
            Dokumen PDF rekomendasi teknis dari Pembina Teknis · {rows.length} dokumen
          </p>
        </div>
        <div className="divide-y divide-border">
          {rows.map((u) => (
            <div key={u.id} className="px-6 py-4 flex items-center gap-4 hover:bg-muted/30">
              <div className="size-10 rounded-lg bg-brand/10 flex items-center justify-center shrink-0">
                <FileText className="size-5 text-brand" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium">REKOMTEK-{u.nomor}.pdf</div>
                <div className="text-[11px] text-muted-foreground">
                  {u.namaKegiatan} · {u.balai}
                </div>
                <div className="text-[10px] text-muted-foreground font-mono mt-0.5">
                  Diterbitkan {u.tanggalVerifV1 ? formatTanggal(u.tanggalVerifV1) : "—"} · {formatRupiah(u.anggaran)}
                </div>
              </div>
              <PrioritasBadge prioritas={u.prioritas} />
              <button
                onClick={() => toast.success(`Mengunduh REKOMTEK-${u.nomor}.pdf (simulasi)`)}
                className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 bg-brand text-brand-foreground rounded-md hover:opacity-90"
              >
                <Download className="size-3.5" /> Unduh PDF
              </button>
            </div>
          ))}
          {rows.length === 0 && (
            <div className="px-6 py-12 text-center text-sm text-muted-foreground">
              Belum ada rekomtek diterbitkan.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
