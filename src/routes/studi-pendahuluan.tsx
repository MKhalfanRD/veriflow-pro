import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, Download, FileText } from "lucide-react";
import { downloadBlob, generateMockPdf } from "@/lib/mock-data";

export const Route = createFileRoute("/studi-pendahuluan")({
  component: Page,
});

interface PdfItem {
  judul: string;
  ukuran: string;
}

const CURRENT_YEAR = new Date().getFullYear();

const DATA: { tahun: number; items: PdfItem[] }[] = [
  {
    tahun: CURRENT_YEAR + 1,
    items: [
      { judul: "Studi Pendahuluan Bendungan & Embung Strategis", ukuran: "2.6 MB" },
      { judul: "Studi Pendahuluan Pengendalian Banjir Wilayah Sungai", ukuran: "3.1 MB" },
      { judul: "Studi Pendahuluan Jaringan Irigasi Modernisasi", ukuran: "1.9 MB" },
    ],
  },
  {
    tahun: CURRENT_YEAR,
    items: [
      { judul: "Studi Pendahuluan Konservasi SDA", ukuran: "2.2 MB" },
      { judul: "Studi Pendahuluan Air Baku Kawasan Prioritas", ukuran: "1.7 MB" },
      { judul: "Studi Pendahuluan Pengamanan Pantai", ukuran: "2.4 MB" },
    ],
  },
  {
    tahun: CURRENT_YEAR - 1,
    items: [
      { judul: "Studi Pendahuluan Revitalisasi Danau", ukuran: "2.0 MB" },
      { judul: "Studi Pendahuluan Rawa & Lahan Basah", ukuran: "1.5 MB" },
    ],
  },
];

function Page() {
  const handleDownload = (tahun: number, item: PdfItem) => {
    const fileName = `${item.judul.replace(/\s+/g, "_")}_${tahun}.pdf`;
    const blob = generateMockPdf(`${item.judul} (${tahun})`);
    downloadBlob(blob, fileName);
  };

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-6">
      <div className="bg-surface rounded-xl ring-1 ring-black/5 shadow-card p-6">
        <div className="flex items-center gap-2">
          <BookOpen className="size-4 text-brand" />
          <h2 className="text-base font-semibold">Studi Pendahuluan</h2>
        </div>
        <p className="text-[12px] text-muted-foreground mt-1 max-w-2xl">
          Dokumen studi pendahuluan tahunan sebagai dasar penyusunan Rincian DPP. Tersedia dalam
          format PDF dan dapat diunduh untuk keperluan referensi internal.
        </p>
      </div>

      {DATA.map((group) => (
        <div key={group.tahun} className="bg-surface rounded-xl ring-1 ring-black/5 shadow-card overflow-hidden">
          <div className="px-6 py-3 border-b border-border bg-muted/40 flex items-center justify-between">
            <h3 className="text-sm font-semibold">Tahun {group.tahun}</h3>
            <span className="text-[11px] text-muted-foreground font-mono">{group.items.length} dokumen</span>
          </div>
          <ul className="divide-y divide-border">
            {group.items.map((item) => (
              <li key={item.judul} className="px-6 py-4 flex items-center gap-4 hover:bg-muted/30">
                <div className="size-10 rounded-lg bg-brand/10 flex items-center justify-center shrink-0">
                  <FileText className="size-5 text-brand" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium">{item.judul}</div>
                  <div className="text-[11px] text-muted-foreground font-mono">
                    PDF · {item.ukuran}
                  </div>
                </div>
                <button
                  onClick={() => handleDownload(group.tahun, item)}
                  className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 bg-brand text-brand-foreground rounded-md hover:opacity-90"
                >
                  <Download className="size-3.5" /> Unduh
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
