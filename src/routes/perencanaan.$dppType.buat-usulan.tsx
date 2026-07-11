import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useAppStore } from "@/lib/app-store";
import {
  CURRENT_BALAI,
  DPP_LABEL,
  PRIORITAS_LABEL,
  PRIORITAS_NILAI,
  type DppType,
  type Prioritas,
  type Usulan,
} from "@/lib/mock-data";
import { DppPageLayout } from "@/components/dpp-page-layout";
import { Check, Upload, FileText, X, AlertCircle, ShieldAlert, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  PROGRAM_OPTIONS,
  SASARAN_PROGRAM,
  INDIKATOR_SASARAN_PROGRAM,
  KEGIATAN_LIST,
  SASARAN_KEGIATAN,
  INDIKATOR_SASARAN_KEGIATAN,
  KRO_BY_KEGIATAN,
  type RO,
} from "@/lib/program-kegiatan";
import {
  SATUAN_KERJA_LIST,
  PROVINSI_LIST,
  PROVINSI_KABUPATEN,
  SBSN_JENIS,
  ROMAWI,
  JENIS_PAKET,
  SATUAN_OUTPUT,
  SATUAN_OUTCOME,
  SKEMA_KONTRAK,
  JENIS_PENGADAAN,
  SBSN_START_YEAR,
  formatRupiah,
  diffDays,
  formatDuration,
} from "@/lib/sda-lookup";
import { KesiapanForm, isKesiapanComplete } from "@/components/kesiapan-form";
import {
  emptyKesiapan,
  emptyVerifikasi,
  newId,
  type KesiapanUsulan,
  type TimelineEvent,
} from "@/lib/kesiapan-data";

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
  const { addUsulan, tahunAnggaran, usulan } = useAppStore();

  // Struktur Program & Kegiatan
  const [program, setProgram] = useState<string>(PROGRAM_OPTIONS[0]);
  const [sasaranProgram, setSasaranProgram] = useState<string>("");
  const [indikatorSP, setIndikatorSP] = useState<string>("");
  const [kegiatan, setKegiatan] = useState<string>("");
  const [sasaranKegiatan, setSasaranKegiatan] = useState<string>("");
  const [indikatorSK, setIndikatorSK] = useState<string>("");
  const [kro, setKro] = useState<string>("");
  const [ro, setRo] = useState<string>("");
  const [customRos, setCustomRos] = useState<Record<string, RO[]>>({});
  const [addingRo, setAddingRo] = useState(false);
  const [newRoName, setNewRoName] = useState("");

  // Satker & Balai
  const [satker, setSatker] = useState<string>("");
  const satkerObj = SATUAN_KERJA_LIST.find((s) => s.kode === satker);
  const balai = satkerObj?.balai ?? CURRENT_BALAI;

  // SBSN
  const [sbsnJenis, setSbsnJenis] = useState<string>("");
  const [sbsnNama, setSbsnNama] = useState<string>("");
  const [tahap, setTahap] = useState<string>("-");
  const [tahapRomawi, setTahapRomawi] = useState<string>("-");

  // Paket Pekerjaan
  interface Paket { jenis: string; nama: string }
  const [paket, setPaket] = useState<Paket[]>([{ jenis: "Fisik", nama: "" }]);

  // Waktu Pelaksanaan
  const [tglMulai, setTglMulai] = useState<string>("");
  const [tglSelesai, setTglSelesai] = useState<string>("");
  const totalHari = diffDays(tglMulai, tglSelesai);

  // Alokasi Anggaran — nilai per paket (indeks sinkron dengan paket)
  const [alokasiNilai, setAlokasiNilai] = useState<string[]>([""]);
  const totalAlokasi = paket.reduce((sum, _p, i) => sum + Number(alokasiNilai[i] || 0), 0);

  // Skema Kontrak & Tahun
  const [skema, setSkema] = useState<string>("Kontrak Tahun Tunggal");
  const [tahunAkhirJamak, setTahunAkhirJamak] = useState<number>(SBSN_START_YEAR + 1);

  // Pengadaan
  const [jenisPengadaan, setJenisPengadaan] = useState<string>("");

  // Volume Output
  interface Output { volume: string; satuan: string }
  const [outputs, setOutputs] = useState<Output[]>([{ volume: "", satuan: "km" }]);
  interface YearRow { tahun: number; volume: string; satuan: string }
  const [outputPerTahun, setOutputPerTahun] = useState<YearRow[]>([{ tahun: SBSN_START_YEAR, volume: "", satuan: "km" }]);

  // Volume Outcome
  interface Outcome { volume: string; satuan: string }
  const [outcomes, setOutcomes] = useState<Outcome[]>([{ volume: "", satuan: "ha" }]);
  const [outcomePerTahun, setOutcomePerTahun] = useState<YearRow[]>([{ tahun: SBSN_START_YEAR, volume: "", satuan: "ha" }]);

  // Lokasi
  const [provinsi, setProvinsi] = useState<string>("");
  const [kabupaten, setKabupaten] = useState<string>("");
  const [kecamatan, setKecamatan] = useState<string>("");
  const [desa, setDesa] = useState<string>("");

  // Legacy fields — kept minimally for Usulan record
  const [prioritas, setPrioritas] = useState<Prioritas>("nasional");
  const [files, setFiles] = useState<UploadFile[]>([]);

  // Kesiapan (KAK/DSKP/Lahan/Dok Teknis/Izin/Kebijakan/RTRW)
  const [kesiapan, setKesiapan] = useState<KesiapanUsulan>(() => emptyKesiapan());
  const kesiapanStatus = useMemo(() => isKesiapanComplete(kesiapan), [kesiapan]);

  const indikatorSPOptions = sasaranProgram ? INDIKATOR_SASARAN_PROGRAM[sasaranProgram] ?? [] : [];
  const sasaranKegiatanOptions = kegiatan ? SASARAN_KEGIATAN[kegiatan] ?? [] : [];
  const indikatorSKOptions =
    kegiatan && sasaranKegiatan
      ? INDIKATOR_SASARAN_KEGIATAN[kegiatan]?.[sasaranKegiatan.slice(0, 2)] ?? []
      : [];
  const kroOptions = kegiatan ? KRO_BY_KEGIATAN[kegiatan] ?? [] : [];
  const selectedKro = kroOptions.find((k) => k.code === kro);
  const roOptions: RO[] = selectedKro ? [...selectedKro.ros, ...(customRos[kro] ?? [])] : [];

  const generateNextRoCode = (): string => {
    if (!selectedKro) return "";
    const all = [...selectedKro.ros, ...(customRos[kro] ?? [])];
    let maxNum = 0;
    for (const r of all) {
      const parts = r.code.split(".");
      const n = parseInt(parts[parts.length - 1], 10);
      if (!isNaN(n) && n > maxNum) maxNum = n;
    }
    return `${kro}.${String(maxNum + 1).padStart(3, "0")}`;
  };

  // Auto-set romawi to "-" when tahap is "-"
  const effRomawi = tahap === "-" ? "-" : tahapRomawi === "-" ? "" : tahapRomawi;
  const namaProyekLengkap = [sbsnJenis, sbsnNama, tahap !== "-" ? `Tahap ${effRomawi}` : ""]
    .filter(Boolean)
    .join(" ")
    .trim();

  const isDuplicateNama = useMemo(() => {
    const n = namaProyekLengkap.trim().toLowerCase();
    if (!n) return false;
    return usulan.some((u) => (u.namaKegiatan ?? "").trim().toLowerCase() === n);
  }, [namaProyekLengkap, usulan]);

  const checklist = useMemo(() => {
    return [
      { label: "Program & Sasaran Program dipilih", done: !!program && !!sasaranProgram && !!indikatorSP },
      { label: "Kegiatan & Sasaran Kegiatan dipilih", done: !!kegiatan && !!sasaranKegiatan && !!indikatorSK },
      { label: "KRO & RO dipilih", done: kroOptions.length === 0 || (!!kro && !!ro) },
      { label: "Satuan Kerja dipilih", done: !!satker },
      { label: "Nama Proyek SBSN diisi & tidak duplikat", done: !!sbsnJenis && sbsnNama.trim().length >= 3 && !isDuplicateNama },
      { label: "Minimal 1 paket pekerjaan", done: paket.some((p) => p.nama.trim().length > 0) },
      { label: "Waktu pelaksanaan diisi", done: totalHari > 0 },
      { label: "Alokasi anggaran diisi", done: totalAlokasi > 0 },
      { label: "Skema kontrak & jenis pengadaan", done: !!skema && !!jenisPengadaan },
      { label: "Minimal 1 output diisi", done: outputs.some((o) => Number(o.volume) > 0) },
      { label: "Minimal 1 outcome diisi", done: outcomes.some((o) => Number(o.volume) > 0) },
      { label: "Lokasi (provinsi & kabupaten) dipilih", done: !!provinsi && !!kabupaten },
      { label: "KAK terunggah", done: kesiapanStatus.kak },
      { label: "DSKP terunggah", done: kesiapanStatus.dskp },
      { label: "Kesiapan Lahan (min. 1 baris lengkap)", done: kesiapanStatus.lahan },
      { label: "Dokumen Perencanaan Teknis (FS/DED/RAB) lengkap", done: kesiapanStatus.dokTeknis },
      { label: "Izin Lingkungan (min. 1 baris lengkap)", done: kesiapanStatus.izinLingkungan },
      { label: "Dukungan Kebijakan (min. 1 baris lengkap)", done: kesiapanStatus.dukunganKebijakan },
      { label: "Kesesuaian RTRW (min. 1 baris lengkap)", done: kesiapanStatus.rtrw },
    ];
  }, [program, sasaranProgram, indikatorSP, kegiatan, sasaranKegiatan, indikatorSK, kro, ro, kroOptions.length, satker, sbsnJenis, sbsnNama, isDuplicateNama, paket, totalHari, totalAlokasi, skema, jenisPengadaan, outputs, outcomes, provinsi, kabupaten, kesiapanStatus]);

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
    const lokasi = [desa, kecamatan, kabupaten, provinsi].filter(Boolean).join(", ");
    const deskripsi = `${namaProyekLengkap}. Paket: ${paket.map((p) => `${p.jenis}-${p.nama}`).join("; ")}. Skema: ${skema}. Pengadaan: ${jenisPengadaan}.`;
    const newUsulan: Usulan = {
      id: `u_${Date.now()}`,
      nomor,
      kodeRo: ro || undefined,
      namaKegiatan: namaProyekLengkap,
      lokasi,
      deskripsi,
      anggaran: totalAlokasi,
      tahun: tahunAnggaran,
      balai,
      prioritas,
      status: "menunggu_v1",
      tahap: dppType,
      tanggalPengajuan: new Date().toISOString().slice(0, 10),
      dokumen: files,
      kesiapan,
      verifikasi: {
        teknis: {},
        sspsda: {},
        history: [
          {
            id: newId("evt"),
            waktu: new Date().toISOString(),
            aktor: "Balai / Andi Maulana",
            tipe: "submit",
            ringkasan: `Balai mengunggah usulan & dokumen kesiapan proyek (${nomor}).`,
          } as TimelineEvent,
        ],
      },
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
          <span className="text-muted-foreground"> · usulan akan masuk ke kategori {DPP_LABEL[dppType]} TA {tahunAnggaran}</span>
        </div>

        <Section title="Struktur Program & Kegiatan" description="Pemetaan usulan ke struktur program/kegiatan Ditjen SDA">
          <Grid>
            <SelectField label="Program" value={program} onChange={setProgram} options={PROGRAM_OPTIONS.map((p) => ({ value: p, label: p }))} span={2} />
            <SelectField
              label="Sasaran Program"
              value={sasaranProgram}
              onChange={(v) => { setSasaranProgram(v); setIndikatorSP(""); }}
              options={SASARAN_PROGRAM.map((s) => ({ value: s.kode, label: s.label }))}
              placeholder="-- Pilih Sasaran Program --"
            />
            <SelectField
              label="Indikator Sasaran Program"
              value={indikatorSP}
              onChange={setIndikatorSP}
              options={indikatorSPOptions.map((i) => ({ value: i, label: i }))}
              placeholder={sasaranProgram ? "-- Pilih Indikator --" : "Pilih Sasaran Program dulu"}
              disabled={!sasaranProgram}
            />
            <SelectField
              label="Kegiatan"
              value={kegiatan}
              onChange={(v) => { setKegiatan(v); setSasaranKegiatan(""); setIndikatorSK(""); setKro(""); setRo(""); setAddingRo(false); }}
              options={KEGIATAN_LIST.map((k) => ({ value: k.kode, label: `${k.kode} — ${k.nama}` }))}
              placeholder="-- Pilih Kegiatan --"
              span={2}
            />
            <SelectField
              label="Sasaran Kegiatan"
              value={sasaranKegiatan}
              onChange={(v) => { setSasaranKegiatan(v); setIndikatorSK(""); }}
              options={sasaranKegiatanOptions.map((s) => ({ value: s, label: s }))}
              placeholder={kegiatan ? "-- Pilih Sasaran Kegiatan --" : "Pilih Kegiatan dulu"}
              disabled={!kegiatan}
              span={2}
            />
            <SelectField
              label="Indikator Sasaran Kegiatan"
              value={indikatorSK}
              onChange={setIndikatorSK}
              options={indikatorSKOptions.map((i) => ({ value: i, label: i }))}
              placeholder={sasaranKegiatan ? "-- Pilih Indikator Sasaran Kegiatan --" : "Pilih Sasaran Kegiatan dulu"}
              disabled={!sasaranKegiatan}
              span={2}
            />
            <SelectField
              label="KRO (Klasifikasi Rincian Output)"
              value={kro}
              onChange={(v) => { setKro(v); setRo(""); setAddingRo(false); }}
              options={kroOptions.map((k) => ({ value: k.code, label: `${k.code} — ${k.name}` }))}
              placeholder={kegiatan ? (kroOptions.length ? "-- Pilih KRO --" : "Tidak ada KRO untuk kegiatan ini") : "Pilih Kegiatan dulu"}
              disabled={!kegiatan || kroOptions.length === 0}
              span={2}
            />
            <div className="md:col-span-2">
              <div className="flex items-center justify-between mb-1.5">
                <Label>RO (Rincian Output)</Label>
                {kro && !addingRo && (
                  <button
                    type="button"
                    onClick={() => { setAddingRo(true); setNewRoName(""); }}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand hover:underline"
                  >
                    <Plus className="size-3" /> Tambah RO baru
                  </button>
                )}
              </div>
              <select
                value={ro}
                onChange={(e) => setRo(e.target.value)}
                disabled={!kro}
                className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-brand disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="">{kro ? "-- Pilih RO --" : "Pilih KRO dulu"}</option>
                {roOptions.map((r) => (
                  <option key={r.code} value={r.code}>{r.code} — {r.name}</option>
                ))}
              </select>
              {addingRo && (
                <div className="mt-3 p-3 rounded-lg border border-brand/30 bg-brand/5 space-y-2">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-brand">Tambah RO Baru</div>
                  <div className="flex flex-col md:flex-row gap-2">
                    <div className="md:w-40">
                      <div className="text-[10px] text-muted-foreground mb-1">Kode (otomatis)</div>
                      <div className="px-3 py-2 rounded-md bg-background border border-border font-mono text-sm">
                        {generateNextRoCode()}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="text-[10px] text-muted-foreground mb-1">Nama RO</div>
                      <input
                        value={newRoName}
                        onChange={(e) => setNewRoName(e.target.value)}
                        placeholder="Isi nama RO baru..."
                        className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-brand"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2 justify-end">
                    <button type="button" onClick={() => { setAddingRo(false); setNewRoName(""); }}
                      className="px-3 py-1.5 rounded-md text-xs font-semibold border border-border hover:bg-muted">Batal</button>
                    <button
                      type="button"
                      disabled={newRoName.trim().length < 3}
                      onClick={() => {
                        const code = generateNextRoCode();
                        const newRo: RO = { code, name: newRoName.trim() };
                        setCustomRos((p) => ({ ...p, [kro]: [...(p[kro] ?? []), newRo] }));
                        setRo(code);
                        setAddingRo(false);
                        setNewRoName("");
                        toast.success("RO baru ditambahkan", { description: `${code} — ${newRo.name}` });
                      }}
                      className="px-3 py-1.5 rounded-md text-xs font-semibold bg-brand text-brand-foreground disabled:opacity-40 disabled:cursor-not-allowed"
                    >Simpan RO</button>
                  </div>
                </div>
              )}
            </div>
          </Grid>
        </Section>

        <Section title="Satuan Kerja & Balai" description="Pilih satuan kerja pengusul; balai terisi otomatis">
          <Grid>
            <SelectField
              label="Satuan Kerja"
              value={satker}
              onChange={setSatker}
              options={SATUAN_KERJA_LIST.map((s) => ({ value: s.kode, label: `${s.kode} — ${s.nama}` }))}
              placeholder="-- Pilih Satuan Kerja --"
            />
            <div>
              <Label>Balai (otomatis)</Label>
              <div className="w-full mt-1.5 border border-border rounded-md px-3 py-2 text-sm bg-muted/50 text-foreground">
                {satker ? balai : <span className="text-muted-foreground">— pilih satuan kerja dulu —</span>}
              </div>
            </div>
          </Grid>
        </Section>

        <Section title="Nama Proyek SBSN" description="Struktur nama proyek: [Jenis] [Nama] [Tahap ...]">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            <div className="md:col-span-3">
              <Label>Nama Proyek SBSN</Label>
              <select value={sbsnJenis} onChange={(e) => setSbsnJenis(e.target.value)}
                className="w-full mt-1.5 border border-border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-brand">
                <option value="">-- Pilih --</option>
                {SBSN_JENIS.map((j) => <option key={j} value={j}>{j}</option>)}
              </select>
            </div>
            <div className="md:col-span-5">
              <Label>Nama Proyek</Label>
              <input value={sbsnNama} onChange={(e) => setSbsnNama(e.target.value)} placeholder="Isi nama proyek..."
                className="w-full mt-1.5 border border-border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-brand" />
            </div>
            <div className="md:col-span-2">
              <Label>Tahap</Label>
              <select value={tahap} onChange={(e) => { setTahap(e.target.value); if (e.target.value === "-") setTahapRomawi("-"); else if (tahapRomawi === "-") setTahapRomawi("I"); }}
                className="w-full mt-1.5 border border-border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-brand">
                <option value="-">-</option>
                <option value="Tahap">Tahap</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <Label>Romawi</Label>
              <select value={tahapRomawi} onChange={(e) => setTahapRomawi(e.target.value)} disabled={tahap === "-"}
                className="w-full mt-1.5 border border-border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-brand disabled:opacity-50">
                <option value="-">-</option>
                {ROMAWI.map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
          </div>
          {namaProyekLengkap && (
            <div className={`mt-3 p-2.5 rounded-md text-xs ${isDuplicateNama ? "bg-destructive/5 border border-destructive/30" : "bg-brand/5 border border-brand/20"}`}>
              <span className="text-muted-foreground">Preview:</span>{" "}
              <span className={`font-semibold ${isDuplicateNama ? "text-destructive" : "text-brand"}`}>{namaProyekLengkap}</span>
              {isDuplicateNama && (
                <div className="mt-1.5 flex items-start gap-1.5 text-destructive">
                  <AlertCircle className="size-3.5 mt-0.5 shrink-0" />
                  <span>Nama Proyek SBSN ini sudah pernah diusulkan. Ubah nama/tahap agar tidak duplikat sebelum mengirim.</span>
                </div>
              )}
            </div>
          )}
        </Section>

        <Section title="Nama Paket Pekerjaan" description="Daftar paket pekerjaan (Fisik/Supervisi)">
          <div className="space-y-2">
            <div className="grid grid-cols-12 gap-2 px-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              <div className="col-span-1">No</div>
              <div className="col-span-3">Jenis Paket</div>
              <div className="col-span-7">Nama Paket</div>
              <div className="col-span-1"></div>
            </div>
            {paket.map((p, i) => (
              <div key={i} className="grid grid-cols-12 gap-2 items-center">
                <div className="col-span-1 text-sm text-muted-foreground pl-2">{i + 1}</div>
                <div className="col-span-3">
                  <select value={p.jenis} onChange={(e) => setPaket((arr) => arr.map((r, j) => j === i ? { ...r, jenis: e.target.value } : r))}
                    className="w-full border border-border rounded-md px-2 py-1.5 text-sm bg-background">
                    {JENIS_PAKET.map((j) => <option key={j} value={j}>{j}</option>)}
                  </select>
                </div>
                <div className="col-span-7">
                  <input value={p.nama} onChange={(e) => setPaket((arr) => arr.map((r, j) => j === i ? { ...r, nama: e.target.value } : r))}
                    placeholder="Nama paket pekerjaan..."
                    className="w-full border border-border rounded-md px-2 py-1.5 text-sm bg-background" />
                </div>
                <div className="col-span-1 flex justify-end">
                  <button type="button" onClick={() => setPaket((arr) => arr.filter((_, j) => j !== i))} disabled={paket.length === 1}
                    className="p-1.5 text-muted-foreground hover:text-destructive disabled:opacity-30 disabled:cursor-not-allowed">
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
              </div>
            ))}
            <button type="button" onClick={() => setPaket((p) => [...p, { jenis: "Fisik", nama: "" }])}
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand hover:underline mt-1">
              <Plus className="size-3" /> Tambah paket
            </button>
          </div>
        </Section>

        <Section title="Waktu Pelaksanaan" description="Rentang tanggal pelaksanaan pekerjaan">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <Label>Tanggal Mulai</Label>
              <input type="date" value={tglMulai} onChange={(e) => setTglMulai(e.target.value)}
                className="w-full mt-1.5 border border-border rounded-md px-3 py-2 text-sm bg-background" />
            </div>
            <div>
              <Label>Tanggal Selesai</Label>
              <input type="date" value={tglSelesai} onChange={(e) => setTglSelesai(e.target.value)} min={tglMulai}
                className="w-full mt-1.5 border border-border rounded-md px-3 py-2 text-sm bg-background" />
            </div>
            <div>
              <Label>Total Waktu</Label>
              <div className="w-full mt-1.5 border border-border rounded-md px-3 py-2 text-sm bg-muted/50 font-semibold">
                {totalHari > 0 ? (
                  <>
                    <div>{totalHari} hari</div>
                    <div className="text-[11px] font-normal text-muted-foreground mt-0.5">{formatDuration(totalHari)}</div>
                  </>
                ) : <span className="text-muted-foreground font-normal">—</span>}
              </div>
            </div>
          </div>
        </Section>

        <Section title="Alokasi Anggaran" description="Nilai alokasi diambil otomatis dari daftar paket pekerjaan — cukup isi nilainya">
          <div className="space-y-2">
            <div className="grid grid-cols-12 gap-2 px-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              <div className="col-span-1">No</div>
              <div className="col-span-2">Jenis</div>
              <div className="col-span-4">Nama Paket</div>
              <div className="col-span-5">Alokasi (Rp)</div>
            </div>
            {paket.length === 0 || paket.every((p) => !p.nama.trim()) ? (
              <div className="text-xs text-muted-foreground italic px-2 py-3 border border-dashed border-border rounded-md text-center">
                Isi Nama Paket Pekerjaan terlebih dahulu — daftar paket akan otomatis muncul di sini.
              </div>
            ) : (
              paket.map((p, i) => {
                const nilai = alokasiNilai[i] ?? "";
                return (
                  <div key={i} className="grid grid-cols-12 gap-2 items-center">
                    <div className="col-span-1 text-sm text-muted-foreground pl-2">{i + 1}</div>
                    <div className="col-span-2 text-xs px-2 py-1.5 rounded-md bg-muted/50 border border-border truncate">{p.jenis}</div>
                    <div className="col-span-4 text-xs px-2 py-1.5 rounded-md bg-muted/50 border border-border truncate" title={p.nama}>
                      {p.nama.trim() || <span className="text-muted-foreground italic">— belum diisi —</span>}
                    </div>
                    <div className="col-span-5">
                      <div className="flex gap-2 items-center">
                        <input
                          type="number"
                          value={nilai}
                          disabled={!p.nama.trim()}
                          onChange={(e) => setAlokasiNilai((arr) => {
                            const next = [...arr];
                            while (next.length < paket.length) next.push("");
                            next[i] = e.target.value;
                            return next;
                          })}
                          placeholder="0"
                          className="flex-1 border border-border rounded-md px-2 py-1.5 text-sm bg-background disabled:opacity-50"
                        />
                        <span className="text-[11px] text-muted-foreground w-40 truncate">{formatRupiah(nilai)}</span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
            <div className="flex items-center justify-end mt-2">
              <div className="text-xs">
                <span className="text-muted-foreground">Total: </span>
                <span className="font-semibold">{formatRupiah(totalAlokasi)}</span>
              </div>
            </div>
          </div>
        </Section>

        <Section title="Skema Kontrak & Pengadaan" description="Skema kontrak, tahun anggaran, dan jenis pengadaan">
          <Grid>
            <div>
              <Label>Skema Kontrak</Label>
              <select value={skema} onChange={(e) => setSkema(e.target.value)}
                className="w-full mt-1.5 border border-border rounded-md px-3 py-2 text-sm bg-background">
                {SKEMA_KONTRAK.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <Label>Tahun Anggaran</Label>
              {skema === "Kontrak Tahun Tunggal" ? (
                <div className="w-full mt-1.5 border border-border rounded-md px-3 py-2 text-sm bg-muted/50 font-semibold">
                  {SBSN_START_YEAR} <span className="text-[10px] font-normal text-muted-foreground ml-1">(SYC)</span>
                </div>
              ) : (
                <div className="flex gap-2 mt-1.5">
                  <div className="flex-1 border border-border rounded-md px-3 py-2 text-sm bg-muted/50 font-semibold">{SBSN_START_YEAR}</div>
                  <select value={tahunAkhirJamak} onChange={(e) => setTahunAkhirJamak(Number(e.target.value))}
                    className="flex-1 border border-border rounded-md px-3 py-2 text-sm bg-background">
                    {[1, 2, 3, 4, 5].map((n) => <option key={n} value={SBSN_START_YEAR + n}>{SBSN_START_YEAR + n}</option>)}
                  </select>
                </div>
              )}
            </div>
            <SelectField
              label="Jenis Pengadaan"
              value={jenisPengadaan}
              onChange={setJenisPengadaan}
              options={JENIS_PENGADAAN.map((j) => ({ value: j, label: j }))}
              placeholder="-- Pilih Jenis Pengadaan --"
              span={2}
            />
          </Grid>
        </Section>

        <VolumeSection
          title="Volume Rencana Output Pekerjaan"
          note="Contoh: pembangunan jaringan irigasi 30 km merupakan 1 output; pembangunan turap 3 km & kolam retensi 1 unit merupakan 2 output."
          rows={outputs}
          setRows={setOutputs as any}
          perTahun={outputPerTahun}
          setPerTahun={setOutputPerTahun as any}
          satuanOptions={SATUAN_OUTPUT as unknown as string[]}
          skema={skema}
          labelSingular="Output"
        />

        <VolumeSection
          title="Volume Rencana Outcome Pekerjaan"
          note="Contoh: irigasi 1000 Ha merupakan 1 outcome; pembangunan turap melindungi 200 Ha sawah dan 20 Ha kawasan pemukiman merupakan 2 outcome."
          rows={outcomes}
          setRows={setOutcomes as any}
          perTahun={outcomePerTahun}
          setPerTahun={setOutcomePerTahun as any}
          satuanOptions={SATUAN_OUTCOME as unknown as string[]}
          skema={skema}
          labelSingular="Outcome"
        />

        <Section title="Lokasi" description="Lokasi pelaksanaan proyek">
          <Grid>
            <SelectField
              label="Provinsi"
              value={provinsi}
              onChange={(v) => { setProvinsi(v); setKabupaten(""); }}
              options={PROVINSI_LIST.map((p) => ({ value: p, label: p }))}
              placeholder="-- Pilih Provinsi --"
            />
            <SelectField
              label="Kabupaten/Kota"
              value={kabupaten}
              onChange={setKabupaten}
              options={(provinsi ? PROVINSI_KABUPATEN[provinsi] ?? [] : []).map((k) => ({ value: k, label: k }))}
              placeholder={provinsi ? "-- Pilih Kabupaten/Kota --" : "Pilih Provinsi dulu"}
              disabled={!provinsi}
            />
            <Input label="Kecamatan" value={kecamatan} onChange={setKecamatan} placeholder="Nama kecamatan" />
            <Input label="Desa/Kelurahan" value={desa} onChange={setDesa} placeholder="Nama desa/kelurahan" />
          </Grid>
        </Section>

        <KesiapanForm value={kesiapan} onChange={(patch) => setKesiapan((prev) => ({ ...prev, ...patch }))} />
      </div>

      <aside className="space-y-4 lg:sticky lg:top-6 lg:self-start">
        <div className="bg-surface rounded-xl ring-1 ring-black/5 shadow-card overflow-hidden flex flex-col max-h-[calc(100vh-3rem)]">
          <div className="p-5 border-b border-border shrink-0">
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
          <ul className="p-5 space-y-2.5 overflow-y-auto flex-1 min-h-0">
            {checklist.map((c) => (
              <li key={c.label} className="flex items-start gap-2.5 text-xs">
                <div className={`mt-0.5 size-4 rounded shrink-0 flex items-center justify-center ${c.done ? "bg-status-approved" : "border border-border bg-background"}`}>
                  {c.done && <Check className="size-3 text-white" />}
                </div>
                <span className={c.done ? "text-foreground" : "text-muted-foreground"}>{c.label}</span>
              </li>
            ))}
          </ul>
          <div className="p-5 space-y-2 shrink-0 border-t border-border bg-surface">
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

interface VolumeRow { volume: string; satuan: string }
interface YearVolumeRow { tahun: number; volume: string; satuan: string }

function VolumeSection({
  title, note, rows, setRows, perTahun, setPerTahun, satuanOptions, skema, labelSingular,
}: {
  title: string;
  note: string;
  rows: VolumeRow[];
  setRows: (fn: (prev: VolumeRow[]) => VolumeRow[]) => void;
  perTahun: YearVolumeRow[];
  setPerTahun: (fn: (prev: YearVolumeRow[]) => YearVolumeRow[]) => void;
  satuanOptions: string[];
  skema: string;
  labelSingular: string;
}) {
  const isJamak = skema === "Kontrak Tahun Jamak";
  const defaultSatuan = satuanOptions[0];
  return (
    <Section title={title} description={note}>
      <div className="space-y-2">
        <div className="grid grid-cols-12 gap-2 px-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          <div className="col-span-3">{labelSingular}</div>
          <div className="col-span-5">Volume</div>
          <div className="col-span-3">Satuan</div>
          <div className="col-span-1"></div>
        </div>
        {rows.map((r, i) => (
          <div key={i} className="grid grid-cols-12 gap-2 items-center">
            <div className="col-span-3 text-sm font-medium pl-2">{labelSingular} {i + 1}</div>
            <div className="col-span-5">
              <input type="number" step="0.01" value={r.volume} onChange={(e) => setRows((arr) => arr.map((x, j) => j === i ? { ...x, volume: e.target.value } : x))}
                placeholder="0" className="w-full border border-border rounded-md px-2 py-1.5 text-sm bg-background" />
            </div>
            <div className="col-span-3">
              <select value={r.satuan} onChange={(e) => setRows((arr) => arr.map((x, j) => j === i ? { ...x, satuan: e.target.value } : x))}
                className="w-full border border-border rounded-md px-2 py-1.5 text-sm bg-background">
                {satuanOptions.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="col-span-1 flex justify-end">
              <button type="button" onClick={() => setRows((arr) => arr.filter((_, j) => j !== i))} disabled={rows.length === 1}
                className="p-1.5 text-muted-foreground hover:text-destructive disabled:opacity-30 disabled:cursor-not-allowed">
                <Trash2 className="size-3.5" />
              </button>
            </div>
          </div>
        ))}
        <button type="button" onClick={() => setRows((p) => [...p, { volume: "", satuan: defaultSatuan }])}
          className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand hover:underline mt-1">
          <Plus className="size-3" /> Tambah {labelSingular.toLowerCase()}
        </button>
      </div>

      <div className="mt-6 pt-5 border-t border-border">
        <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-3">
          Rencana {labelSingular} Per Tahun {isJamak ? "(Tahun Jamak)" : "(Tahun Tunggal)"}
        </div>
        <div className="space-y-2">
          <div className="grid grid-cols-12 gap-2 px-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            <div className="col-span-3">Tahun</div>
            <div className="col-span-5">Volume</div>
            <div className="col-span-3">Satuan</div>
            <div className="col-span-1"></div>
          </div>
          {perTahun.map((r, i) => (
            <div key={i} className="grid grid-cols-12 gap-2 items-center">
              <div className="col-span-3 text-sm font-semibold pl-2">{r.tahun}</div>
              <div className="col-span-5">
                <input type="number" step="0.01" value={r.volume} onChange={(e) => setPerTahun((arr) => arr.map((x, j) => j === i ? { ...x, volume: e.target.value } : x))}
                  placeholder="0" className="w-full border border-border rounded-md px-2 py-1.5 text-sm bg-background" />
              </div>
              <div className="col-span-3">
                <select value={r.satuan} onChange={(e) => setPerTahun((arr) => arr.map((x, j) => j === i ? { ...x, satuan: e.target.value } : x))}
                  className="w-full border border-border rounded-md px-2 py-1.5 text-sm bg-background">
                  {satuanOptions.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="col-span-1 flex justify-end">
                {isJamak && (
                  <button type="button" onClick={() => setPerTahun((arr) => arr.filter((_, j) => j !== i))} disabled={perTahun.length === 1}
                    className="p-1.5 text-muted-foreground hover:text-destructive disabled:opacity-30 disabled:cursor-not-allowed">
                    <Trash2 className="size-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))}
          {isJamak && (
            <button type="button" onClick={() => setPerTahun((p) => {
              const lastYear = p.length ? p[p.length - 1].tahun : SBSN_START_YEAR - 1;
              return [...p, { tahun: lastYear + 1, volume: "", satuan: defaultSatuan }];
            })}
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand hover:underline mt-1">
              <Plus className="size-3" /> Tambah tahun
            </button>
          )}
        </div>
      </div>
    </Section>
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
function SelectField({ label, value, onChange, options, placeholder, disabled, span }: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  disabled?: boolean;
  span?: number;
}) {
  return (
    <div className={span === 2 ? "md:col-span-2" : ""}>
      <Label>{label}</Label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="w-full mt-1.5 border border-border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-brand disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <option value="">{placeholder ?? "-- Pilih --"}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  );
}
