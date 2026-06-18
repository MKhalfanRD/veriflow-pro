import { createFileRoute } from "@tanstack/react-router";
import { useAppStore } from "@/lib/app-store";
import { formatRupiah, formatTanggal, PRIORITAS_LABEL, PRIORITAS_NILAI } from "@/lib/mock-data";
import { useState } from "react";
import { Download, Printer, Eye, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/berita-acara")({
  component: Page,
});

function Page() {
  const { usulanTahun: usulan } = useAppStore();
  const eligible = usulan.filter((u) =>
    ["disetujui_v1", "menunggu_v2", "disetujui_v2"].includes(u.status),
  );
  const [selectedId, setSelectedId] = useState(eligible[0]?.id);
  const selected = eligible.find((u) => u.id === selectedId);

  return (
    <div className="p-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="bg-surface rounded-xl ring-1 ring-black/5 shadow-card overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <h3 className="text-sm font-semibold">Usulan Disetujui V1</h3>
          <p className="text-[11px] text-muted-foreground">{eligible.length} berita acara tersedia</p>
        </div>
        <div className="divide-y divide-border max-h-[70vh] overflow-y-auto">
          {eligible.map((u) => (
            <button key={u.id} onClick={() => setSelectedId(u.id)}
              className={`w-full text-left p-4 hover:bg-muted/40 transition-colors ${selectedId === u.id ? "bg-brand/5 border-l-2 border-brand" : "border-l-2 border-transparent"}`}>
              <div className="text-[10px] font-mono text-muted-foreground">{u.nomor}</div>
              <div className="text-sm font-medium mt-0.5 truncate">{u.namaKegiatan}</div>
              <div className="text-[11px] text-muted-foreground mt-1">{u.balai}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="lg:col-span-2">
        {selected ? (
          <div className="bg-surface rounded-xl ring-1 ring-black/5 shadow-card overflow-hidden">
            <div className="px-6 py-4 border-b border-border flex items-center justify-between">
              <div>
                <h2 className="text-base font-semibold">Pratinjau Berita Acara</h2>
                <p className="text-[11px] text-muted-foreground">Generated otomatis dari data usulan terverifikasi</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => toast.info("Mode pratinjau")} className="text-xs flex items-center gap-1.5 px-3 py-1.5 border border-border rounded-md hover:bg-muted">
                  <Eye className="size-3.5" /> Preview
                </button>
                <button onClick={() => window.print()} className="text-xs flex items-center gap-1.5 px-3 py-1.5 border border-border rounded-md hover:bg-muted">
                  <Printer className="size-3.5" /> Print
                </button>
                <button onClick={() => toast.success("Berita Acara berhasil diunduh (simulasi)")} className="text-xs flex items-center gap-1.5 px-3 py-1.5 bg-brand text-brand-foreground rounded-md hover:opacity-90">
                  <Download className="size-3.5" /> Download PDF
                </button>
              </div>
            </div>

            <div className="p-10 bg-white text-zinc-900 font-serif">
              <div className="text-center border-b-2 border-zinc-900 pb-4 mb-6">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <ShieldCheck className="size-6" />
                  <span className="text-[10px] tracking-[0.3em] uppercase font-sans font-semibold">Kementerian PUPR · Ditjen SDA</span>
                </div>
                <h1 className="text-xl font-bold tracking-wide">BERITA ACARA VERIFIKASI USULAN KEGIATAN</h1>
                <p className="text-xs mt-1 font-mono">Nomor: BA-{selected.nomor}</p>
              </div>

              <p className="text-sm leading-relaxed mb-4">
                Pada hari ini, <strong>{formatTanggal(selected.tanggalVerifV1 ?? selected.tanggalPengajuan)}</strong>,
                telah dilaksanakan verifikasi teknis terhadap usulan kegiatan dengan rincian sebagai berikut:
              </p>

              <table className="w-full text-sm mb-6">
                <tbody className="[&>tr>td]:py-1.5 [&>tr>td:first-child]:w-48 [&>tr>td:first-child]:font-semibold [&>tr>td:nth-child(2)]:pr-2 align-top">
                  <tr><td>Nama Kegiatan</td><td>:</td><td>{selected.namaKegiatan}</td></tr>
                  <tr><td>Balai Pengusul</td><td>:</td><td>{selected.balai}</td></tr>
                  <tr><td>Lokasi</td><td>:</td><td>{selected.lokasi}</td></tr>
                  <tr><td>Tahun Pelaksanaan</td><td>:</td><td>{selected.tahun}</td></tr>
                  <tr><td>Anggaran</td><td>:</td><td className="font-mono">{formatRupiah(selected.anggaran)}</td></tr>
                  <tr><td>Tingkat Prioritas</td><td>:</td><td>{PRIORITAS_LABEL[selected.prioritas]} <span className="font-mono text-xs">(bobot {PRIORITAS_NILAI[selected.prioritas]})</span></td></tr>
                  <tr><td>Tanggal Verifikasi</td><td>:</td><td>{selected.tanggalVerifV1 ? formatTanggal(selected.tanggalVerifV1) : "—"}</td></tr>
                </tbody>
              </table>

              <p className="text-sm leading-relaxed mb-2"><strong>Deskripsi Kegiatan:</strong></p>
              <p className="text-sm leading-relaxed mb-6 text-justify">{selected.deskripsi}</p>

              <p className="text-sm leading-relaxed mb-8">
                Berdasarkan hasil pemeriksaan dokumen teknis dan administrasi, usulan kegiatan tersebut dinyatakan
                <strong> MEMENUHI SYARAT</strong> untuk diteruskan kepada SSPSDA (Verifikator Akhir) guna proses lebih lanjut.
              </p>

              <div className="grid grid-cols-2 gap-12 mt-12">
                <div className="text-center">
                  <p className="text-sm mb-16">Pembina Teknis,</p>
                  <p className="text-sm font-semibold underline">{selected.verifikatorV1 ?? "Ir. Budi Santoso, M.T."}</p>
                  <p className="text-xs text-zinc-600 mt-1">Verifikator 1</p>
                </div>
                <div className="text-center">
                  <p className="text-sm mb-16">Pengusul,</p>
                  <p className="text-sm font-semibold underline">Andi Maulana, S.T.</p>
                  <p className="text-xs text-zinc-600 mt-1">{selected.balai}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-surface rounded-xl ring-1 ring-black/5 shadow-card p-16 text-center text-sm text-muted-foreground">
            Belum ada usulan yang disetujui Verifikator 1.
          </div>
        )}
      </div>
    </div>
  );
}
