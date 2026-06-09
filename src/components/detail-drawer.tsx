import { useState, type ReactNode } from "react";
import { X, FileText, Download, Eye } from "lucide-react";
import { useAppStore } from "@/lib/app-store";
import { formatRupiah, formatTanggal, PRIORITAS_LABEL, PRIORITAS_NILAI, type Usulan } from "@/lib/mock-data";
import { StatusBadge, PrioritasBadge } from "@/components/status-badge";
import { toast } from "sonner";

interface Props {
  usulan: Usulan;
  onClose: () => void;
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">{label}</div>
      <div className="text-sm">{children}</div>
    </div>
  );
}

export function DetailDrawer({ usulan, onClose }: Props) {
  const { role, updateUsulan } = useAppStore();
  const [catatan, setCatatan] = useState("");
  const [alasan, setAlasan] = useState("");
  const [action, setAction] = useState<"none" | "revisi" | "tolak">("none");

  const handleApproveV1 = () => {
    updateUsulan(usulan.id, {
      status: "menunggu_v2",
      tanggalVerifV1: new Date().toISOString().slice(0, 10),
      verifikatorV1: "Ir. Budi Santoso, M.T.",
    });
    toast.success("Usulan disetujui dan diteruskan ke Verifikator 2");
    onClose();
  };

  const handleRevisi = () => {
    if (!catatan.trim()) {
      toast.error("Catatan revisi wajib diisi");
      return;
    }
    updateUsulan(usulan.id, { status: "revisi", catatanRevisi: catatan });
    toast.success("Usulan dikembalikan untuk direvisi");
    onClose();
  };

  const handleLanjutkan = () => {
    updateUsulan(usulan.id, {
      status: "disetujui_v2",
      verifikatorV2: "Dr. Ir. Hendra Wijaya",
    });
    toast.success("Usulan disetujui final oleh SSPSDA");
    onClose();
  };

  const handleTolak = () => {
    if (!alasan.trim()) {
      toast.error("Alasan tidak dilanjutkan wajib diisi");
      return;
    }
    updateUsulan(usulan.id, {
      status: "tidak_dilanjutkan",
      alasanTidakDilanjutkan: alasan,
      verifikatorV2: "Dr. Ir. Hendra Wijaya",
    });
    toast.success("Usulan ditandai tidak dilanjutkan");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="ml-auto relative w-full max-w-2xl bg-background h-full overflow-y-auto shadow-2xl flex flex-col">
        <div className="sticky top-0 z-10 px-6 py-4 border-b border-border bg-surface flex items-center justify-between">
          <div>
            <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">{usulan.nomor}</div>
            <h2 className="text-base font-semibold">{usulan.namaKegiatan}</h2>
          </div>
          <button onClick={onClose} className="size-8 rounded-md hover:bg-muted flex items-center justify-center">
            <X className="size-4" />
          </button>
        </div>

        <div className="flex-1 p-6 space-y-6">
          <div className="flex items-center gap-2 flex-wrap">
            <StatusBadge status={usulan.status} />
            <PrioritasBadge prioritas={usulan.prioritas} />
            <span className="text-[10px] text-muted-foreground font-mono">
              Bobot: {PRIORITAS_NILAI[usulan.prioritas]}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            <Field label="Balai Pengusul">{usulan.balai}</Field>
            <Field label="Lokasi">{usulan.lokasi}</Field>
            <Field label="Anggaran">
              <span className="font-mono font-semibold">{formatRupiah(usulan.anggaran)}</span>
            </Field>
            <Field label="Tahun Pelaksanaan">{usulan.tahun}</Field>
            <Field label="Tanggal Pengajuan">{formatTanggal(usulan.tanggalPengajuan)}</Field>
            <Field label="Tingkat Prioritas">{PRIORITAS_LABEL[usulan.prioritas]}</Field>
            {usulan.tanggalVerifV1 && (
              <Field label="Verifikasi V1">
                {formatTanggal(usulan.tanggalVerifV1)}<br />
                <span className="text-xs text-muted-foreground">{usulan.verifikatorV1}</span>
              </Field>
            )}
            {usulan.verifikatorV2 && (
              <Field label="Verifikator Akhir">{usulan.verifikatorV2}</Field>
            )}
          </div>

          <Field label="Deskripsi Kegiatan">
            <p className="text-sm leading-relaxed text-foreground/80">{usulan.deskripsi}</p>
          </Field>

          {usulan.catatanRevisi && (
            <div className="rounded-lg border border-status-revisi/30 bg-status-revisi-bg p-4">
              <div className="text-[10px] font-bold uppercase tracking-wider text-status-revisi mb-1">
                Catatan Revisi
              </div>
              <p className="text-sm text-foreground/90">{usulan.catatanRevisi}</p>
            </div>
          )}

          {usulan.alasanTidakDilanjutkan && (
            <div className="rounded-lg border border-status-rejected/30 bg-status-rejected-bg p-4">
              <div className="text-[10px] font-bold uppercase tracking-wider text-status-rejected mb-1">
                Alasan Tidak Dilanjutkan
              </div>
              <p className="text-sm text-foreground/90">{usulan.alasanTidakDilanjutkan}</p>
            </div>
          )}

          <div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-2">
              Dokumen Pendukung
            </div>
            <div className="space-y-2">
              {usulan.dokumen.map((d) => (
                <div
                  key={d.nama}
                  className="flex items-center gap-3 p-3 rounded-lg border border-border bg-surface hover:border-brand/40 transition-colors"
                >
                  <FileText className="size-4 text-brand shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{d.nama}</div>
                    <div className="text-[10px] text-muted-foreground uppercase">
                      {d.tipe} · {d.ukuran}
                    </div>
                  </div>
                  <button className="text-xs text-muted-foreground hover:text-foreground p-1.5">
                    <Eye className="size-4" />
                  </button>
                  <button className="text-xs text-muted-foreground hover:text-foreground p-1.5">
                    <Download className="size-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {role === "verif1" && usulan.status === "menunggu_v1" && (
            <div className="rounded-lg border border-border bg-surface p-4 space-y-3">
              <div className="text-sm font-semibold">Tindakan Verifikator 1 (Pembina Teknis)</div>
              {action === "revisi" ? (
                <>
                  <textarea
                    value={catatan}
                    onChange={(e) => setCatatan(e.target.value)}
                    rows={3}
                    placeholder="Tulis catatan revisi yang harus diperbaiki oleh pengusul..."
                    className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-brand"
                  />
                  <div className="flex gap-2">
                    <button onClick={handleRevisi} className="px-4 py-2 bg-status-revisi text-white rounded-md text-sm font-medium">
                      Kirim Catatan Revisi
                    </button>
                    <button onClick={() => setAction("none")} className="px-4 py-2 border border-border rounded-md text-sm">
                      Batal
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex gap-2">
                  <button onClick={handleApproveV1} className="flex-1 px-4 py-2 bg-brand text-brand-foreground rounded-md text-sm font-medium hover:opacity-90">
                    Setujui & Teruskan ke V2
                  </button>
                  <button onClick={() => setAction("revisi")} className="flex-1 px-4 py-2 border border-status-revisi/40 text-status-revisi rounded-md text-sm font-medium hover:bg-status-revisi-bg">
                    Minta Revisi
                  </button>
                </div>
              )}
            </div>
          )}

          {role === "verif2" && usulan.status === "menunggu_v2" && (
            <div className="rounded-lg border border-border bg-surface p-4 space-y-3">
              <div className="text-sm font-semibold">Tindakan Verifikator 2 (SSPSDA)</div>
              {action === "tolak" ? (
                <>
                  <textarea
                    value={alasan}
                    onChange={(e) => setAlasan(e.target.value)}
                    rows={3}
                    placeholder="Tulis alasan mengapa usulan tidak dilanjutkan..."
                    className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-brand"
                  />
                  <div className="flex gap-2">
                    <button onClick={handleTolak} className="px-4 py-2 bg-status-rejected text-white rounded-md text-sm font-medium">
                      Konfirmasi Tidak Dilanjutkan
                    </button>
                    <button onClick={() => setAction("none")} className="px-4 py-2 border border-border rounded-md text-sm">
                      Batal
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex gap-2">
                  <button onClick={handleLanjutkan} className="flex-1 px-4 py-2 bg-brand text-brand-foreground rounded-md text-sm font-medium hover:opacity-90">
                    Lanjutkan
                  </button>
                  <button onClick={() => setAction("tolak")} className="flex-1 px-4 py-2 border border-status-rejected/40 text-status-rejected rounded-md text-sm font-medium hover:bg-status-rejected-bg">
                    Tidak Dilanjutkan
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
