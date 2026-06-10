import { createFileRoute } from "@tanstack/react-router";
import { Scale, FileText, ExternalLink } from "lucide-react";

export const Route = createFileRoute("/peraturan")({
  component: Page,
});

const PERATURAN = [
  {
    nomor: "UU No. 17 Tahun 2019",
    judul: "Sumber Daya Air",
    kategori: "Undang-Undang",
    tahun: 2019,
  },
  {
    nomor: "PP No. 121 Tahun 2015",
    judul: "Pengusahaan Sumber Daya Air",
    kategori: "Peraturan Pemerintah",
    tahun: 2015,
  },
  {
    nomor: "Permen PUPR No. 04/PRT/M/2015",
    judul: "Kriteria dan Penetapan Wilayah Sungai",
    kategori: "Peraturan Menteri",
    tahun: 2015,
  },
  {
    nomor: "Permen PUPR No. 10/PRT/M/2015",
    judul: "Rencana & Rencana Teknis Tata Pengaturan Air dan Tata Pengairan",
    kategori: "Peraturan Menteri",
    tahun: 2015,
  },
  {
    nomor: "Permen PUPR No. 06/PRT/M/2015",
    judul: "Eksploitasi & Pemeliharaan Sumber Air dan Bangunan Pengairan",
    kategori: "Peraturan Menteri",
    tahun: 2015,
  },
  {
    nomor: "Kepdirjen SDA No. 25/2023",
    judul: "Pedoman Penyusunan DPP dan Verifikasi Berjenjang",
    kategori: "Keputusan Direktur Jenderal",
    tahun: 2023,
  },
];

function Page() {
  return (
    <div className="p-8 max-w-5xl mx-auto space-y-6">
      <div className="bg-surface rounded-xl ring-1 ring-black/5 shadow-card p-6 flex items-start gap-4">
        <div className="size-10 rounded-lg bg-brand/10 flex items-center justify-center">
          <Scale className="size-5 text-brand" />
        </div>
        <div>
          <h2 className="text-base font-semibold">Peraturan Terkait</h2>
          <p className="text-[11px] text-muted-foreground mt-1">
            Kumpulan peraturan perundang-undangan yang menjadi dasar pengelolaan sumber daya air
            dan proses verifikasi usulan kegiatan.
          </p>
        </div>
      </div>

      <div className="bg-surface rounded-xl ring-1 ring-black/5 shadow-card divide-y divide-border">
        {PERATURAN.map((p) => (
          <div key={p.nomor} className="px-6 py-4 flex items-center gap-4 hover:bg-muted/30 transition-colors">
            <div className="size-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
              <FileText className="size-4 text-brand" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold">{p.judul}</div>
              <div className="text-[11px] text-muted-foreground font-mono">{p.nomor}</div>
            </div>
            <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-brand/10 text-brand whitespace-nowrap">
              {p.kategori}
            </span>
            <button className="text-xs inline-flex items-center gap-1 text-muted-foreground hover:text-foreground">
              Unduh <ExternalLink className="size-3" />
            </button>
          </div>
        ))}
      </div>

      <div className="text-[11px] text-muted-foreground italic text-center">
        Data dummy · akan tersambung ke JDIH Kementerian PUPR.
      </div>
    </div>
  );
}
