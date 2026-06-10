import { createFileRoute } from "@tanstack/react-router";
import { BarChart3, CheckCircle2, AlertTriangle } from "lucide-react";

export const Route = createFileRoute("/evaluasi")({
  component: Page,
});

const KPI = [
  { label: "Kegiatan Selesai 2025", value: "187", tone: "text-status-approved" },
  { label: "Tepat Waktu", value: "92%", tone: "text-brand" },
  { label: "Realisasi Anggaran", value: "94.2%", tone: "text-status-approved" },
  { label: "Temuan Audit", value: "12", tone: "text-status-revisi" },
];

const ISSUES = [
  { judul: "Penyesuaian volume pekerjaan", balai: "BBWS Citarum", level: "Sedang" },
  { judul: "Keterlambatan pembebasan lahan", balai: "BWS Sumatera II", level: "Tinggi" },
  { judul: "Penyesuaian DED segmen 3", balai: "BBWS Bengawan Solo", level: "Rendah" },
];

function Page() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div className="bg-surface rounded-xl ring-1 ring-black/5 shadow-card p-6 flex items-start gap-4">
        <div className="size-10 rounded-lg bg-brand/10 flex items-center justify-center">
          <BarChart3 className="size-5 text-brand" />
        </div>
        <div>
          <h2 className="text-base font-semibold">Evaluasi Kinerja</h2>
          <p className="text-[11px] text-muted-foreground mt-1">
            Ringkasan hasil evaluasi pelaksanaan kegiatan tahun berjalan dan temuan untuk
            perbaikan perencanaan tahun berikutnya.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {KPI.map((k) => (
          <div key={k.label} className="bg-surface p-5 rounded-xl ring-1 ring-black/5 shadow-card">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
              {k.label}
            </div>
            <div className={`text-3xl font-bold tracking-tight mt-2 ${k.tone}`}>{k.value}</div>
          </div>
        ))}
      </div>

      <div className="bg-surface rounded-xl ring-1 ring-black/5 shadow-card overflow-hidden">
        <div className="px-6 py-4 border-b border-border flex items-center gap-2">
          <AlertTriangle className="size-4 text-status-revisi" />
          <h3 className="text-sm font-semibold">Temuan & Rekomendasi</h3>
        </div>
        <ul className="divide-y divide-border">
          {ISSUES.map((i) => (
            <li key={i.judul} className="px-6 py-3 flex items-center gap-4">
              <CheckCircle2 className="size-4 text-brand shrink-0" />
              <div className="flex-1">
                <div className="text-sm font-medium">{i.judul}</div>
                <div className="text-[11px] text-muted-foreground">{i.balai}</div>
              </div>
              <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-muted">
                {i.level}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="text-[11px] text-muted-foreground italic text-center">
        Data dummy untuk demo.
      </div>
    </div>
  );
}
