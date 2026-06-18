import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useAppStore } from "@/lib/app-store";
import {
  BALAI_LIST,
  CURRENT_BALAI,
  DPP_LABEL,
  PRIORITAS_LABEL,
  PRIORITAS_NILAI,
  TAHUN_PERENCANAAN,
  type DppType,
  type Prioritas,
  type Usulan,
} from "@/lib/mock-data";
import { DppPageLayout } from "@/components/dpp-page-layout";
import { Check, Upload, FileText, X, AlertCircle, ShieldAlert } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/perencanaan/$dppType/buat-usulan")({
  component: Page,
});

interface UploadFile {
  nama: string;
  tipe: "teknis" | "administrasi" | "lainnya";
  ukuran: string;
}

function Page() {
  const { dppType } = Route.useParams() as { dppType: DppType };
  const { role } = useAppStore();

  if (role !== "balai") {
    return (
      <DppPageLayout dppType={dppType}>
        <div className="p-8 max-w-2xl mx-auto">
          <div className="bg-surface rounded-xl ring-1 ring-black/5 shadow-card p-8 text-center">
            <ShieldAlert className="size-8 mx-auto text-status-pending mb-3" />
            <h2 className="text-base font-semibold">Akses Terbatas</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Hanya peran Balai/Satker yang dapat membuat usulan baru.
            </p>
          </div>
        </div>
      </DppPageLayout>
    );
  }

  return (
    <DppPageLayout dppType={dppType}>
      <Form dppType={dppType} />
    </DppPageLayout>
  );
}

function Form({ dppType }: { dppType: DppType }) {
  const navigate = useNavigate();
  const { addUsulan, tahunAnggaran } = useAppStore();

  const [namaKegiatan, setNamaKegiatan] = useState("");
  const [lokasi, setLokasi] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [anggaran, setAnggaran] = useState("");
  const [tahun, setTahun] = useState(tahunAnggaran);
  const [balai, setBalai] = useState(CURRENT_BALAI);
  const [prioritas, setPrioritas] = useState<Prioritas>("nasional");
  const [files, setFiles] = useState<UploadFile[]>([]);

  const checklist = useMemo(() => {
    const hasTeknis = files.some((f) => f.tipe === "teknis");
    const hasAdmin = files.some((f) => f.tipe === "administrasi");
    return [
      { label: "Nama kegiatan diisi", done: namaKegiatan.trim().length >= 5 },
      { label: "Lokasi kegiatan diisi", done: lokasi.trim().length >= 3 },
      { label: "Deskripsi minimal 30 karakter", done: deskripsi.trim().length >= 30 },
      { label: "Anggaran valid (> 0)", done: Number(anggaran) > 0 },
      { label: "Tahun pelaksanaan dipilih", done: tahun >= 2024 && tahun <= 2035 },
      { label: "Balai/Satker dipilih", done: !!balai },
      { label: "Tingkat prioritas dipilih", done: !!prioritas },
      { label: "Dokumen teknis diunggah", done: hasTeknis },
      { label: "Dokumen administrasi diunggah", done: hasAdmin },
    ];
  }, [namaKegiatan, lokasi, deskripsi, anggaran, tahun, balai, prioritas, files]);

  const completedCount = checklist.filter((c) => c.done).length;
  const isComplete = completedCount === checklist.length;
  const progress = Math.round((completedCount / checklist.length) * 100);

  const handleFakeUpload = (tipe: UploadFile["tipe"]) => {
    const seq = files.filter((f) => f.tipe === tipe).length + 1;
    const ukuran = `${(Math.random() * 3 + 0.5).toFixed(1)} MB`;
    setFiles((p) => [...p, { nama: `${tipe}_dokumen_${seq}.pdf`, tipe, ukuran }]);
  };

  const handleSubmit = () => {
    if (!isComplete) return;
    const nomor = `USL-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 9999)).padStart(4, "0")}${dppType === "perubahan" ? "-R1" : ""}`;
    const newUsulan: Usulan = {
      id: `u_${Date.now()}`,
      nomor,
      namaKegiatan,
      lokasi,
      deskripsi,
      anggaran: Number(anggaran),
      tahun,
      balai,
      prioritas,
      status: "menunggu_v1",
      tahap: dppType,
      tanggalPengajuan: new Date().toISOString().slice(0, 10),
      dokumen: files,
    };
    addUsulan(newUsulan);
    toast.success(`Usulan ${DPP_LABEL[dppType]} berhasil dikirim`, { description: nomor });
    navigate({ to: "/perencanaan/$dppType/rekap", params: { dppType } });
  };

  return (
    <div className="p-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-brand/5 border border-brand/20 rounded-xl px-5 py-3 text-xs">
          <span className="font-semibold text-brand">{DPP_LABEL[dppType]}</span>
          <span className="text-muted-foreground"> · usulan akan masuk ke kategori {DPP_LABEL[dppType]} TA {tahun}</span>
        </div>

        <Section title="Informasi Kegiatan" description="Identitas dasar usulan proyek">
          <Grid>
            <Input label="Nama Kegiatan" value={namaKegiatan} onChange={setNamaKegiatan} placeholder="Contoh: Rehabilitasi Bendungan ..." span={2} />
            <Input label="Lokasi Kegiatan" value={lokasi} onChange={setLokasi} placeholder="Kabupaten, Provinsi" />
            <NumberInput label="Tahun Pelaksanaan" value={tahun} onChange={setTahun} min={2024} max={2035} />
          </Grid>
          <div className="mt-4">
            <Label>Deskripsi Kegiatan</Label>
            <textarea
              value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)} rows={4}
              placeholder="Jelaskan latar belakang, ruang lingkup, dan target kegiatan minimal 30 karakter..."
              className="w-full mt-1.5 border border-border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-brand"
            />
            <div className="text-[10px] text-muted-foreground mt-1">{deskripsi.length} karakter</div>
          </div>
        </Section>

        <Section title="Anggaran & Pengusul" description="Pagu anggaran dan unit kerja pengusul">
          <Grid>
            <Input label="Anggaran (Rp)" value={anggaran} onChange={setAnggaran} placeholder="0" type="number" />
            <div>
              <Label>Balai/Satker Pengusul</Label>
              <select value={balai} onChange={(e) => setBalai(e.target.value)}
                className="w-full mt-1.5 border border-border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-brand">
                {BALAI_LIST.map((b) => <option key={b}>{b}</option>)}
              </select>
            </div>
          </Grid>
        </Section>

        <Section title="Tingkat Prioritas" description="Sistem otomatis menetapkan bobot nilai prioritas">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {(["nasional", "menteri", "dirjen"] as Prioritas[]).map((p) => {
              const active = prioritas === p;
              return (
                <button key={p} type="button" onClick={() => setPrioritas(p)}
                  className={`text-left p-4 rounded-lg border transition-all ${active ? "border-brand bg-brand/5 ring-2 ring-brand/20" : "border-border bg-surface hover:border-brand/40"}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${active ? "text-brand" : "text-muted-foreground"}`}>{PRIORITAS_LABEL[p]}</span>
                    <span className={`size-6 rounded-full flex items-center justify-center text-[11px] font-bold font-mono ${active ? "bg-brand text-brand-foreground" : "bg-muted text-muted-foreground"}`}>{PRIORITAS_NILAI[p]}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {p === "nasional" && "Tercantum dalam dokumen prioritas pembangunan nasional."}
                    {p === "menteri" && "Usulan atas arahan langsung dari Menteri."}
                    {p === "dirjen" && "Usulan dari Direktur Jenderal terkait."}
                  </p>
                </button>
              );
            })}
          </div>
        </Section>

        <Section title="Dokumen Pendukung" description="Unggah dokumen teknis, administrasi, dan pendukung (PDF)">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {(["teknis", "administrasi", "lainnya"] as const).map((tipe) => (
              <button key={tipe} type="button" onClick={() => handleFakeUpload(tipe)}
                className="border-2 border-dashed border-border rounded-lg p-5 text-center hover:border-brand hover:bg-brand/5 transition-all">
                <Upload className="size-5 mx-auto text-muted-foreground mb-2" />
                <div className="text-xs font-semibold capitalize">{tipe === "lainnya" ? "Pendukung Lainnya" : `Dokumen ${tipe}`}</div>
                <div className="text-[10px] text-muted-foreground mt-0.5">Klik untuk simulasi upload PDF</div>
              </button>
            ))}
          </div>
          {files.length > 0 && (
            <div className="mt-4 space-y-2">
              {files.map((f, i) => (
                <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg border border-border bg-surface">
                  <FileText className="size-4 text-brand" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{f.nama}</div>
                    <div className="text-[10px] text-muted-foreground uppercase">{f.tipe} · {f.ukuran}</div>
                  </div>
                  <button onClick={() => setFiles((p) => p.filter((_, j) => j !== i))} className="text-muted-foreground hover:text-destructive p-1">
                    <X className="size-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </Section>
      </div>

      <aside className="space-y-4 lg:sticky lg:top-6 lg:self-start">
        <div className="bg-surface rounded-xl ring-1 ring-black/5 shadow-card overflow-hidden">
          <div className="p-5 border-b border-border">
            <h3 className="text-sm font-semibold">Kelengkapan Data</h3>
            <p className="text-[11px] text-muted-foreground">Wajib lengkap sebelum dapat dikirim</p>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-semibold tracking-tight">{progress}%</span>
              <span className="text-[11px] text-muted-foreground">{completedCount} dari {checklist.length}</span>
            </div>
            <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
              <div className={`h-full transition-all ${isComplete ? "bg-status-approved" : "bg-brand"}`} style={{ width: `${progress}%` }} />
            </div>
          </div>
          <ul className="p-5 space-y-2.5">
            {checklist.map((c) => (
              <li key={c.label} className="flex items-start gap-2.5 text-xs">
                <div className={`mt-0.5 size-4 rounded shrink-0 flex items-center justify-center ${c.done ? "bg-status-approved" : "border border-border bg-background"}`}>
                  {c.done && <Check className="size-3 text-white" />}
                </div>
                <span className={c.done ? "text-foreground" : "text-muted-foreground"}>{c.label}</span>
              </li>
            ))}
          </ul>
          <div className="p-5 pt-0 space-y-2">
            <button
              onClick={handleSubmit}
              disabled={!isComplete}
              className="w-full py-2.5 rounded-md text-sm font-semibold bg-brand text-brand-foreground hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
            >
              Kirim Usulan
            </button>
            {!isComplete && (
              <div className="flex items-start gap-1.5 text-[10px] text-muted-foreground">
                <AlertCircle className="size-3 mt-0.5 shrink-0" />
                <span>Lengkapi semua item checklist untuk mengaktifkan tombol kirim.</span>
              </div>
            )}
          </div>
        </div>
      </aside>
    </div>
  );
}

function Section({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <section className="bg-surface rounded-xl ring-1 ring-black/5 shadow-card p-6">
      <div className="mb-4">
        <h3 className="text-sm font-semibold">{title}</h3>
        {description && <p className="text-[11px] text-muted-foreground mt-0.5">{description}</p>}
      </div>
      {children}
    </section>
  );
}
function Grid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>;
}
function Label({ children }: { children: React.ReactNode }) {
  return <label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{children}</label>;
}
function Input({ label, value, onChange, placeholder, type = "text", span }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string; span?: number;
}) {
  return (
    <div className={span === 2 ? "md:col-span-2" : ""}>
      <Label>{label}</Label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
        className="w-full mt-1.5 border border-border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-brand" />
    </div>
  );
}
function NumberInput({ label, value, onChange, min, max }: { label: string; value: number; onChange: (v: number) => void; min?: number; max?: number }) {
  return (
    <div>
      <Label>{label}</Label>
      <input type="number" value={value} min={min} max={max} onChange={(e) => onChange(Number(e.target.value))}
        className="w-full mt-1.5 border border-border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-brand" />
    </div>
  );
}
