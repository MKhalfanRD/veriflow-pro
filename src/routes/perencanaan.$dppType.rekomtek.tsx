import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useAppStore } from "@/lib/app-store";
import { DPP_LABEL, type DppType } from "@/lib/mock-data";
import { DppPageLayout } from "@/components/dpp-page-layout";
import { ShieldAlert, FileText, Printer, ListPlus, Eye } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/perencanaan/$dppType/rekomtek")({
  component: Page,
});

interface RekomtekData {
  id: string;
  kementerian: string;
  unitEselon: string;
  satuanKerja: string;
  namaProyek: string;
  latarBelakang: string;
  dasarHukum: string;
  maksudTujuan: string;
  outputOutcome: string;
  biayaTahapan: string;
  waktuPelaksanaan: string;
  tanggal: string;
}

const SEED: RekomtekData[] = [
  {
    id: "rt1",
    kementerian: "Kementerian Pekerjaan Umum dan Perumahan Rakyat",
    unitEselon: "Direktorat Jenderal Sumber Daya Air",
    satuanKerja: "BBWS Bengawan Solo",
    namaProyek: "Rehabilitasi Bendungan Wonogiri",
    latarBelakang:
      "Bendungan Wonogiri telah beroperasi sejak 1981 dan memerlukan rehabilitasi struktur tubuh bendungan serta peningkatan kapasitas tampung untuk pengendalian banjir hilir.",
    dasarHukum:
      "UU No. 17 Tahun 2019 tentang Sumber Daya Air; PP No. 121 Tahun 2015 tentang Pengusahaan SDA; Permen PUPR No. 27/PRT/M/2015.",
    maksudTujuan:
      "Meningkatkan keandalan struktur bendungan, memperpanjang umur layanan, serta meningkatkan kapasitas pengendalian banjir.",
    outputOutcome:
      "Output: Struktur bendungan terehabilitasi, spillway optimal. Outcome: Pengurangan risiko banjir hilir dan tambahan air baku 5 m³/det.",
    biayaTahapan:
      "Total Rp 125.000.000.000. Tahap I (2026): Mobilisasi & desain detail. Tahap II (2027): Konstruksi utama. Tahap III (2028): Finishing & uji fungsi.",
    waktuPelaksanaan: "36 bulan (Januari 2026 – Desember 2028)",
    tanggal: "2025-05-14",
  },
];

function Page() {
  const { dppType } = Route.useParams() as { dppType: DppType };
  const { role } = useAppStore();

  if (role !== "verif1") {
    return (
      <DppPageLayout dppType={dppType}>
        <div className="p-8 max-w-2xl mx-auto">
          <div className="bg-surface rounded-xl ring-1 ring-black/5 shadow-card p-8 text-center">
            <ShieldAlert className="size-8 mx-auto text-status-pending mb-3" />
            <h2 className="text-base font-semibold">Akses Terbatas</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Hanya Pembina Teknis yang dapat membuat dan mencetak Rekomendasi Teknis.
            </p>
          </div>
        </div>
      </DppPageLayout>
    );
  }

  return (
    <DppPageLayout dppType={dppType}>
      <RekomtekManager dppType={dppType} />
    </DppPageLayout>
  );
}

function RekomtekManager({ dppType }: { dppType: DppType }) {
  const [items, setItems] = useState<RekomtekData[]>(SEED);
  const [editing, setEditing] = useState<RekomtekData | null>(null);
  const [previewing, setPreviewing] = useState<RekomtekData | null>(null);
  const [mode, setMode] = useState<"list" | "form">("list");

  const startNew = () => {
    setEditing({
      id: `rt_${Date.now()}`,
      kementerian: "Kementerian Pekerjaan Umum dan Perumahan Rakyat",
      unitEselon: "Direktorat Jenderal Sumber Daya Air",
      satuanKerja: "",
      namaProyek: "",
      latarBelakang: "",
      dasarHukum: "",
      maksudTujuan: "",
      outputOutcome: "",
      biayaTahapan: "",
      waktuPelaksanaan: "",
      tanggal: new Date().toISOString().slice(0, 10),
    });
    setMode("form");
  };

  const save = () => {
    if (!editing) return;
    if (!editing.namaProyek.trim() || !editing.satuanKerja.trim()) {
      toast.error("Nama proyek dan satuan kerja wajib diisi");
      return;
    }
    setItems((prev) => {
      const exists = prev.some((x) => x.id === editing.id);
      return exists ? prev.map((x) => (x.id === editing.id ? editing : x)) : [editing, ...prev];
    });
    toast.success("Rekomtek tersimpan");
    setMode("list");
    setEditing(null);
  };

  if (previewing) {
    return <RekomtekPreview data={previewing} onClose={() => setPreviewing(null)} dppType={dppType} />;
  }

  if (mode === "form" && editing) {
    return (
      <RekomtekForm
        data={editing}
        onChange={setEditing}
        onSave={save}
        onCancel={() => {
          setMode("list");
          setEditing(null);
        }}
        onPreview={() => setPreviewing(editing)}
        dppType={dppType}
      />
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="bg-surface rounded-xl ring-1 ring-black/5 shadow-card overflow-hidden">
        <div className="px-6 py-4 border-b border-border flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold">Rekomendasi Teknis · {DPP_LABEL[dppType]}</h2>
            <p className="text-[11px] text-muted-foreground">
              Daftar dokumen rekomendasi teknis yang telah dibuat oleh Pembina Teknis
            </p>
          </div>
          <button
            onClick={startNew}
            className="inline-flex items-center gap-2 bg-brand text-brand-foreground text-sm font-medium px-3 py-2 rounded-md hover:opacity-90"
          >
            <ListPlus className="size-4" /> Buat Rekomtek
          </button>
        </div>
        <div className="divide-y divide-border">
          {items.map((rt) => (
            <div key={rt.id} className="px-6 py-4 flex items-center gap-4 hover:bg-muted/30">
              <div className="size-10 rounded-lg bg-brand/10 flex items-center justify-center shrink-0">
                <FileText className="size-5 text-brand" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium">REKOMTEK · {rt.namaProyek || "(tanpa nama)"}</div>
                <div className="text-[11px] text-muted-foreground">{rt.satuanKerja}</div>
                <div className="text-[10px] text-muted-foreground font-mono mt-0.5">
                  Diterbitkan {rt.tanggal}
                </div>
              </div>
              <button
                onClick={() => setPreviewing(rt)}
                className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 border border-border rounded-md hover:bg-muted"
              >
                <Eye className="size-3.5" /> Preview
              </button>
              <button
                onClick={() => {
                  setEditing(rt);
                  setMode("form");
                }}
                className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 bg-brand text-brand-foreground rounded-md hover:opacity-90"
              >
                Edit
              </button>
            </div>
          ))}
          {items.length === 0 && (
            <div className="px-6 py-12 text-center text-sm text-muted-foreground">
              Belum ada rekomtek. Klik "Buat Rekomtek" untuk memulai.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function RekomtekForm({
  data,
  onChange,
  onSave,
  onCancel,
  onPreview,
  dppType,
}: {
  data: RekomtekData;
  onChange: (d: RekomtekData) => void;
  onSave: () => void;
  onCancel: () => void;
  onPreview: () => void;
  dppType: DppType;
}) {
  const set = <K extends keyof RekomtekData>(k: K, v: RekomtekData[K]) =>
    onChange({ ...data, [k]: v });

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-4">
      <div className="bg-brand/5 border border-brand/20 rounded-xl px-5 py-3 text-xs">
        <span className="font-semibold text-brand">Form Rekomendasi Teknis</span>
        <span className="text-muted-foreground"> · {DPP_LABEL[dppType]}. Isi semua field. Paragraf penutup akan digenerate otomatis berdasarkan nama proyek.</span>
      </div>

      <div className="bg-surface rounded-xl ring-1 ring-black/5 shadow-card p-6 space-y-5">
        <Grid>
          <Field label="Kementerian / Lembaga" value={data.kementerian} onChange={(v) => set("kementerian", v)} />
          <Field label="Unit Eselon" value={data.unitEselon} onChange={(v) => set("unitEselon", v)} />
          <Field label="Satuan Kerja" value={data.satuanKerja} onChange={(v) => set("satuanKerja", v)} />
          <Field label="Nama Proyek" value={data.namaProyek} onChange={(v) => set("namaProyek", v)} />
        </Grid>
        <TextArea label="Latar Belakang" value={data.latarBelakang} onChange={(v) => set("latarBelakang", v)} rows={4} />
        <TextArea label="Dasar Hukum" value={data.dasarHukum} onChange={(v) => set("dasarHukum", v)} rows={3} />
        <TextArea label="Maksud dan Tujuan" value={data.maksudTujuan} onChange={(v) => set("maksudTujuan", v)} rows={3} />
        <TextArea label="Output dan Outcome" value={data.outputOutcome} onChange={(v) => set("outputOutcome", v)} rows={3} />
        <TextArea label="Biaya dan Tahapan" value={data.biayaTahapan} onChange={(v) => set("biayaTahapan", v)} rows={3} />
        <Field label="Waktu Pelaksanaan" value={data.waktuPelaksanaan} onChange={(v) => set("waktuPelaksanaan", v)} />
      </div>

      <div className="flex gap-2 justify-end">
        <button onClick={onCancel} className="px-4 py-2 text-sm border border-border rounded-md hover:bg-muted">
          Batal
        </button>
        <button onClick={onPreview} className="px-4 py-2 text-sm border border-border rounded-md hover:bg-muted inline-flex items-center gap-1.5">
          <Eye className="size-3.5" /> Preview
        </button>
        <button onClick={onSave} className="px-4 py-2 text-sm bg-brand text-brand-foreground rounded-md hover:opacity-90">
          Simpan
        </button>
      </div>
    </div>
  );
}

function RekomtekPreview({
  data,
  onClose,
  dppType,
}: {
  data: RekomtekData;
  onClose: () => void;
  dppType: DppType;
}) {
  const penutup = useMemo(
    () =>
      `Demikian Rekomendasi Teknis untuk kegiatan "${data.namaProyek || "—"}" disusun sebagai dasar pertimbangan teknis dalam ${DPP_LABEL[dppType]} Tahun Anggaran ${new Date().getFullYear() + 1}. Diharapkan kegiatan ini dapat dilaksanakan sesuai dengan ketentuan yang berlaku dan memberikan manfaat optimal bagi pengelolaan sumber daya air.`,
    [data.namaProyek, dppType],
  );

  return (
    <div className="bg-muted/40 min-h-screen p-6 print:p-0 print:bg-white">
      <div className="max-w-5xl mx-auto flex items-center justify-between mb-4 print:hidden">
        <button onClick={onClose} className="text-sm text-muted-foreground hover:text-foreground">
          ← Kembali
        </button>
        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 bg-brand text-brand-foreground text-sm font-medium px-4 py-2 rounded-md hover:opacity-90"
        >
          <Printer className="size-4" /> Cetak / Simpan PDF
        </button>
      </div>

      <article className="max-w-5xl mx-auto bg-white text-black rounded shadow-card print:shadow-none print:rounded-none p-12 print:p-16 leading-relaxed font-serif">
        <header className="text-center border-b-4 border-double border-black pb-4 mb-6">
          <div className="text-xs uppercase tracking-wider">{data.kementerian}</div>
          <div className="text-xs uppercase tracking-wider">{data.unitEselon}</div>
          <div className="text-xs uppercase tracking-wider">{data.satuanKerja}</div>
        </header>
        <div className="text-center mb-8">
          <h1 className="text-xl font-bold uppercase tracking-wider">Rekomendasi Teknis</h1>
          <div className="text-sm mt-1">Nomor: REKOMTEK/{data.id.toUpperCase()}/{new Date(data.tanggal).getFullYear()}</div>
        </div>

        <Section label="A. Latar Belakang" body={data.latarBelakang} />
        <Section label="B. Dasar Hukum" body={data.dasarHukum} />
        <Section label="C. Maksud dan Tujuan" body={data.maksudTujuan} />
        <Section label="D. Output dan Outcome" body={data.outputOutcome} />
        <Section label="E. Biaya dan Tahapan" body={data.biayaTahapan} />
        <Section label="F. Waktu Pelaksanaan" body={data.waktuPelaksanaan} />

        <div className="mt-8">
          <div className="font-semibold text-sm mb-2">G. Penutup</div>
          <p className="text-sm text-justify">{penutup}</p>
        </div>

        <div className="mt-16 flex justify-end">
          <div className="text-sm text-center">
            <div>Ditetapkan di Jakarta</div>
            <div>Pada tanggal {new Date(data.tanggal).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}</div>
            <div className="mt-1 font-semibold">Pembina Teknis,</div>
            <div className="h-20" />
            <div className="font-semibold underline">Ir. Budi Santoso, M.T.</div>
            <div>NIP. 19700101 199003 1 001</div>
          </div>
        </div>
      </article>
    </div>
  );
}

function Section({ label, body }: { label: string; body: string }) {
  return (
    <div className="mt-4">
      <div className="font-semibold text-sm mb-1">{label}</div>
      <p className="text-sm text-justify whitespace-pre-wrap">{body || "—"}</p>
    </div>
  );
}

function Grid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>;
}
function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full mt-1.5 border border-border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-brand"
      />
    </div>
  );
}
function TextArea({ label, value, onChange, rows = 3 }: { label: string; value: string; onChange: (v: string) => void; rows?: number }) {
  return (
    <div>
      <label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className="w-full mt-1.5 border border-border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-brand"
      />
    </div>
  );
}
