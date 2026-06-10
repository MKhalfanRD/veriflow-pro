import { createFileRoute } from "@tanstack/react-router";
import { ClipboardList, TrendingUp, Calendar } from "lucide-react";

export const Route = createFileRoute("/pelaksanaan")({
  component: Page,
});

const DUMMY = [
  { nama: "Rehabilitasi Bendung Colo", balai: "BBWS Bengawan Solo", progress: 78, target: "Q4 2026" },
  { nama: "Pembangunan Tanggul Kali Gading", balai: "BWS Sumatera II", progress: 54, target: "Q3 2026" },
  { nama: "Normalisasi Sungai Ciliwung Paket 1", balai: "BBWS Ciliwung Cisadane", progress: 92, target: "Q2 2026" },
  { nama: "Pemeliharaan Irigasi Rentang", balai: "BBWS Cimanuk Cisanggarung", progress: 35, target: "Q4 2026" },
];

function Page() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div className="bg-surface rounded-xl ring-1 ring-black/5 shadow-card p-6 flex items-start gap-4">
        <div className="size-10 rounded-lg bg-brand/10 flex items-center justify-center">
          <ClipboardList className="size-5 text-brand" />
        </div>
        <div>
          <h2 className="text-base font-semibold">Pelaksanaan DPP</h2>
          <p className="text-[11px] text-muted-foreground mt-1">
            Monitoring pelaksanaan kegiatan yang telah ditetapkan dalam Daftar Program & Pendanaan.
            Data ditampilkan secara publik untuk transparansi progres pekerjaan.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {DUMMY.map((d) => (
          <div key={d.nama} className="bg-surface p-5 rounded-xl ring-1 ring-black/5 shadow-card">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-sm font-semibold">{d.nama}</h3>
                <p className="text-[11px] text-muted-foreground">{d.balai}</p>
              </div>
              <span className="text-[10px] inline-flex items-center gap-1 px-2 py-0.5 bg-muted rounded-full font-mono">
                <Calendar className="size-3" /> {d.target}
              </span>
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-[11px] mb-1.5">
                <span className="text-muted-foreground">Progres fisik</span>
                <span className="font-mono font-semibold text-brand">{d.progress}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-brand to-brand/70 rounded-full"
                  style={{ width: `${d.progress}%` }}
                />
              </div>
            </div>
            <div className="mt-3 flex items-center gap-1.5 text-[11px] text-status-approved">
              <TrendingUp className="size-3.5" /> Tepat jadwal
            </div>
          </div>
        ))}
      </div>

      <div className="text-[11px] text-muted-foreground italic text-center">
        Data dummy untuk demo · akan tersambung dengan SIRUP dan SIPP.
      </div>
    </div>
  );
}
