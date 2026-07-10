// Form input Kesiapan Proyek untuk role Balai (dipakai di Buat Usulan)
import { Plus, Trash2, Upload, FileText, X } from "lucide-react";
import {
  KESIAPAN_LAHAN_OPT,
  JENIS_DOK_LAHAN_OPT,
  STATUS_DOK_TEKNIS_OPT,
  TAHUN_2020_2040,
  STATUS_IZIN_OPT,
  JENIS_IZIN_OPT,
  DUKUNGAN_KEBIJAKAN_OPT,
  DUKUNGAN_TEMATIK_OPT,
  RTRW_OPT,
  KLASTER_PKPN,
  PROGRAM_KERJA_BY_KLASTER,
  mockFile,
  newId,
  type KesiapanUsulan,
  type LahanRow,
  type IzinRow,
  type KebijakanRow,
  type TematikRow,
  type RtrwRow,
  type UploadedFile,
  type DokTeknisEntry,
} from "@/lib/kesiapan-data";

interface Props {
  value: KesiapanUsulan;
  onChange: (patch: Partial<KesiapanUsulan>) => void;
}

export function KesiapanForm({ value, onChange }: Props) {
  return (
    <>
      <Section
        title="Kriteria Kesiapan Administrasi Proyek"
        description="Unggah dokumen KAK & DSKP. Checklist penilaian per komponen akan diisi oleh Pembina Teknis & SSPSDA. Pastikan dokumen sudah final dan ditandatangani pejabat berwenang."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <DocUpload
            title="Kerangka Acuan Kerja (KAK)"
            file={value.kak}
            onUpload={() => onChange({ kak: mockFile("KAK") })}
            onRemove={() => onChange({ kak: undefined })}
          />
          <DocUpload
            title="Dokumen Studi Kelayakan Proyek (DSKP)"
            file={value.dskp}
            onUpload={() => onChange({ dskp: mockFile("DSKP") })}
            onRemove={() => onChange({ dskp: undefined })}
          />
        </div>
      </Section>

      <Section
        title="Kesiapan Lahan"
        description="Lampirkan bukti dokumen kepemilikan/pemanfaatan lahan lokasi proyek. Jika lahan masih dalam proses sertifikasi atau pembebasan, tetap wajib mencantumkan nomor dokumen/register proses dan mengunggah bukti progres terakhir."
      >
        <LahanRows
          rows={value.lahan}
          onChange={(rows) => onChange({ lahan: rows })}
        />
      </Section>

      <Section
        title="Dokumen Perencanaan Teknis"
        description="Feasibility Study (FS), Detail Engineering Design (DED), dan Rincian Anggaran Biaya (RAB). Jika salah satu dokumen masih dalam proses, pilih status 'Dalam proses' dan cantumkan tahun target penyelesaiannya."
      >
        <div className="space-y-4">
          {(
            [
              ["fs", "Feasibility Study (FS)"],
              ["ded", "Detail Engineering Design (DED)"],
              ["rab", "Rincian Anggaran Biaya (RAB)"],
            ] as const
          ).map(([key, label]) => (
            <DokTeknisBlock
              key={key}
              label={label}
              entry={value.dokTeknis[key]}
              onChange={(patch) =>
                onChange({
                  dokTeknis: { ...value.dokTeknis, [key]: { ...value.dokTeknis[key], ...patch } },
                })
              }
            />
          ))}
        </div>
      </Section>

      <Section
        title="Izin Lingkungan"
        description="Tambahkan tiap dokumen izin lingkungan (AMDAL/UKL-UPL/SPPL/PERTEK). Jika izin masih dalam proses, wajib mencantumkan nomor register/agenda proses perizinan dan mengunggah bukti pengurusan."
      >
        <IzinRows rows={value.izinLingkungan} onChange={(rows) => onChange({ izinLingkungan: rows })} />
      </Section>

      <Section
        title="Dukungan Kebijakan"
        description="Pemetaan usulan terhadap kebijakan/direktif prioritas nasional, Kementerian/Lembaga, atau Direktorat Jenderal. Minimal satu dukungan wajib dipilih. Untuk PKPN, pilih klaster & detail program kerjanya."
      >
        <KebijakanRows
          rows={value.dukunganKebijakan}
          onChange={(rows) => onChange({ dukunganKebijakan: rows })}
        />

        <div className="mt-6 pt-5 border-t border-border">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">
            Dukungan Tematik (opsional)
          </div>
          <p className="text-[11px] text-muted-foreground mb-3">
            Isi jika usulan mendukung tema lintas sektor tertentu (Green Project, Blue Economy,
            Ketahanan Pangan, dll.).
          </p>
          <TematikRows
            rows={value.dukunganTematik}
            onChange={(rows) => onChange({ dukunganTematik: rows })}
          />
        </div>
      </Section>

      <Section
        title="Kesesuaian dengan RTRW"
        description="Bukti bahwa lokasi proyek selaras dengan Rencana Tata Ruang Wilayah yang berlaku (Nasional/Provinsi/Kabupaten-Kota). Jika tidak sesuai, jelaskan rencana penyesuaiannya pada kolom keterangan."
      >
        <RtrwRows rows={value.rtrw} onChange={(rows) => onChange({ rtrw: rows })} />
      </Section>
    </>
  );
}

// =============== Sub-components ===============

function DocUpload({
  title,
  file,
  onUpload,
  onRemove,
}: {
  title: string;
  file?: UploadedFile;
  onUpload: () => void;
  onRemove: () => void;
}) {
  return (
    <div className="border border-border rounded-lg p-4 bg-background">
      <div className="text-xs font-semibold mb-2">{title}</div>
      {file ? (
        <div className="flex items-center gap-2 p-2 rounded-md border border-border bg-surface">
          <FileText className="size-4 text-brand shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="text-xs font-medium truncate">{file.nama}</div>
            <div className="text-[10px] text-muted-foreground">{file.ukuran}</div>
          </div>
          <button
            type="button"
            onClick={onRemove}
            className="text-muted-foreground hover:text-destructive p-1"
          >
            <X className="size-3.5" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={onUpload}
          className="w-full border-2 border-dashed border-border rounded-lg p-4 text-center hover:border-brand hover:bg-brand/5 transition-all"
        >
          <Upload className="size-5 mx-auto text-muted-foreground mb-1.5" />
          <div className="text-[11px] font-semibold">Klik untuk simulasi upload PDF</div>
        </button>
      )}
    </div>
  );
}

function LahanRows({ rows, onChange }: { rows: LahanRow[]; onChange: (r: LahanRow[]) => void }) {
  const update = (i: number, patch: Partial<LahanRow>) =>
    onChange(rows.map((r, j) => (j === i ? { ...r, ...patch } : r)));
  const add = () =>
    onChange([
      ...rows,
      { id: newId("lhn"), kesiapan: "", jenisDok: "", nomorDok: "" } as LahanRow,
    ]);
  const remove = (i: number) => onChange(rows.filter((_, j) => j !== i));

  return (
    <div className="space-y-2">
      <RowHeader cols={["No", "Kesiapan Lahan", "Jenis Dokumen", "Nomor Dokumen", "File", ""]} widths={[1, 3, 3, 2, 2, 1]} />
      {rows.length === 0 && <EmptyHint text="Belum ada baris. Klik 'Tambah baris' untuk menambahkan." />}
      {rows.map((r, i) => (
        <div key={r.id} className="grid grid-cols-12 gap-2 items-center">
          <div className="col-span-1 text-sm text-muted-foreground pl-2">{i + 1}</div>
          <SelCol span={3} value={r.kesiapan} onChange={(v) => update(i, { kesiapan: v })} options={KESIAPAN_LAHAN_OPT} placeholder="Pilih..." />
          <SelCol span={3} value={r.jenisDok} onChange={(v) => update(i, { jenisDok: v })} options={JENIS_DOK_LAHAN_OPT} placeholder="Pilih..." />
          <div className="col-span-2">
            <input
              value={r.nomorDok}
              onChange={(e) => update(i, { nomorDok: e.target.value })}
              placeholder="Nomor..."
              className="w-full border border-border rounded-md px-2 py-1.5 text-sm bg-background"
            />
          </div>
          <FileCol span={2} file={r.file} onUpload={() => update(i, { file: mockFile("LAHAN") })} onRemove={() => update(i, { file: undefined })} />
          <DeleteCol onClick={() => remove(i)} />
        </div>
      ))}
      <AddBtn label="Tambah baris" onClick={add} />
    </div>
  );
}

function DokTeknisBlock({
  label,
  entry,
  onChange,
}: {
  label: string;
  entry: DokTeknisEntry;
  onChange: (patch: Partial<DokTeknisEntry>) => void;
}) {
  return (
    <div className="border border-border rounded-lg p-4 bg-background">
      <div className="text-xs font-semibold mb-3">{label}</div>
      <div className="grid grid-cols-12 gap-2 items-center">
        <div className="col-span-4">
          <div className="text-[10px] text-muted-foreground mb-1">Status</div>
          <select
            value={entry.status}
            onChange={(e) => onChange({ status: e.target.value })}
            className="w-full border border-border rounded-md px-2 py-1.5 text-sm bg-background"
          >
            <option value="">-- Pilih --</option>
            {STATUS_DOK_TEKNIS_OPT.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div className="col-span-3">
          <div className="text-[10px] text-muted-foreground mb-1">Tahun</div>
          <select
            value={entry.tahun}
            onChange={(e) => onChange({ tahun: e.target.value })}
            className="w-full border border-border rounded-md px-2 py-1.5 text-sm bg-background"
          >
            <option value="">--</option>
            {TAHUN_2020_2040.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        <div className="col-span-5">
          <div className="text-[10px] text-muted-foreground mb-1">Dokumen</div>
          <FileCol
            span={12}
            file={entry.file}
            onUpload={() => onChange({ file: mockFile(label.split(" ")[0]) })}
            onRemove={() => onChange({ file: undefined })}
            fullWidth
          />
        </div>
      </div>
    </div>
  );
}

function IzinRows({ rows, onChange }: { rows: IzinRow[]; onChange: (r: IzinRow[]) => void }) {
  const update = (i: number, patch: Partial<IzinRow>) =>
    onChange(rows.map((r, j) => (j === i ? { ...r, ...patch } : r)));
  const add = () =>
    onChange([
      ...rows,
      { id: newId("izn"), statusIzin: "", jenisDok: "", tahun: "", nomor: "" } as IzinRow,
    ]);
  const remove = (i: number) => onChange(rows.filter((_, j) => j !== i));

  return (
    <div className="space-y-2">
      <RowHeader cols={["No", "Status Izin", "Jenis Dokumen", "Tahun", "Nomor", "File", ""]} widths={[1, 3, 2, 1, 2, 2, 1]} />
      {rows.length === 0 && <EmptyHint text="Belum ada baris. Klik 'Tambah baris' untuk menambahkan." />}
      {rows.map((r, i) => (
        <div key={r.id} className="grid grid-cols-12 gap-2 items-center">
          <div className="col-span-1 text-sm text-muted-foreground pl-2">{i + 1}</div>
          <SelCol span={3} value={r.statusIzin} onChange={(v) => update(i, { statusIzin: v })} options={STATUS_IZIN_OPT} placeholder="Pilih..." />
          <SelCol span={2} value={r.jenisDok} onChange={(v) => update(i, { jenisDok: v })} options={JENIS_IZIN_OPT} placeholder="Pilih..." />
          <SelCol span={1} value={r.tahun} onChange={(v) => update(i, { tahun: v })} options={TAHUN_2020_2040} placeholder="--" />
          <div className="col-span-2">
            <input
              value={r.nomor}
              onChange={(e) => update(i, { nomor: e.target.value })}
              placeholder="Nomor izin..."
              className="w-full border border-border rounded-md px-2 py-1.5 text-sm bg-background"
            />
          </div>
          <FileCol span={2} file={r.file} onUpload={() => update(i, { file: mockFile("IZIN") })} onRemove={() => update(i, { file: undefined })} />
          <DeleteCol onClick={() => remove(i)} />
        </div>
      ))}
      <AddBtn label="Tambah baris" onClick={add} />
    </div>
  );
}

function KebijakanRows({
  rows,
  onChange,
}: {
  rows: KebijakanRow[];
  onChange: (r: KebijakanRow[]) => void;
}) {
  const update = (i: number, patch: Partial<KebijakanRow>) =>
    onChange(rows.map((r, j) => (j === i ? { ...r, ...patch } : r)));
  const add = () =>
    onChange([...rows, { id: newId("kbj"), jenis: "" } as KebijakanRow]);
  const remove = (i: number) => onChange(rows.filter((_, j) => j !== i));

  return (
    <div className="space-y-3">
      {rows.length === 0 && <EmptyHint text="Belum ada baris. Klik 'Tambah baris' untuk menambahkan." />}
      {rows.map((r, i) => {
        const isPKPN = r.jenis === DUKUNGAN_KEBIJAKAN_OPT[0];
        const detailProgOpts = r.klaster ? PROGRAM_KERJA_BY_KLASTER[r.klaster] ?? [] : [];
        return (
          <div key={r.id} className="p-3 rounded-lg border border-border bg-background space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Baris {i + 1}
              </div>
              <button
                type="button"
                onClick={() => remove(i)}
                className="p-1 text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="size-3.5" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div>
                <div className="text-[10px] text-muted-foreground mb-1">Dukungan Kebijakan</div>
                <select
                  value={r.jenis}
                  onChange={(e) =>
                    update(i, {
                      jenis: e.target.value,
                      klaster: undefined,
                      detailProgram: undefined,
                      detailKebijakan: undefined,
                    })
                  }
                  className="w-full border border-border rounded-md px-2 py-1.5 text-sm bg-background"
                >
                  <option value="">-- Pilih --</option>
                  {DUKUNGAN_KEBIJAKAN_OPT.map((o) => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
              </div>
              {isPKPN ? (
                <>
                  <div>
                    <div className="text-[10px] text-muted-foreground mb-1">Klaster PKPN</div>
                    <select
                      value={r.klaster ?? ""}
                      onChange={(e) => update(i, { klaster: e.target.value, detailProgram: "" })}
                      className="w-full border border-border rounded-md px-2 py-1.5 text-sm bg-background"
                    >
                      <option value="">-- Pilih Klaster --</option>
                      {KLASTER_PKPN.map((k) => (
                        <option key={k} value={k}>{k}</option>
                      ))}
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <div className="text-[10px] text-muted-foreground mb-1">Detail Program Kerja</div>
                    <select
                      value={r.detailProgram ?? ""}
                      onChange={(e) => update(i, { detailProgram: e.target.value })}
                      disabled={!r.klaster}
                      className="w-full border border-border rounded-md px-2 py-1.5 text-sm bg-background disabled:opacity-50"
                    >
                      <option value="">
                        {r.klaster ? "-- Pilih Detail Program Kerja --" : "Pilih klaster dulu"}
                      </option>
                      {detailProgOpts.map((p) => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                  </div>
                </>
              ) : r.jenis ? (
                <div className="md:col-span-1">
                  <div className="text-[10px] text-muted-foreground mb-1">Detail Kebijakan</div>
                  <input
                    value={r.detailKebijakan ?? ""}
                    onChange={(e) => update(i, { detailKebijakan: e.target.value })}
                    placeholder="Isi detail kebijakan / direktif..."
                    className="w-full border border-border rounded-md px-2 py-1.5 text-sm bg-background"
                  />
                </div>
              ) : null}
            </div>
          </div>
        );
      })}
      <AddBtn label="Tambah baris" onClick={add} />
    </div>
  );
}

function TematikRows({
  rows,
  onChange,
}: {
  rows: TematikRow[];
  onChange: (r: TematikRow[]) => void;
}) {
  const update = (i: number, patch: Partial<TematikRow>) =>
    onChange(rows.map((r, j) => (j === i ? { ...r, ...patch } : r)));
  const add = () => onChange([...rows, { id: newId("tem"), tematik: "", keterangan: "" }]);
  const remove = (i: number) => onChange(rows.filter((_, j) => j !== i));

  return (
    <div className="space-y-2">
      {rows.length === 0 && <EmptyHint text="Opsional — kosongkan jika tidak ada." />}
      {rows.map((r, i) => (
        <div key={r.id} className="grid grid-cols-12 gap-2 items-center">
          <SelCol span={4} value={r.tematik} onChange={(v) => update(i, { tematik: v })} options={DUKUNGAN_TEMATIK_OPT} placeholder="Pilih..." />
          <div className="col-span-7">
            <input
              value={r.keterangan}
              onChange={(e) => update(i, { keterangan: e.target.value })}
              placeholder="Keterangan..."
              className="w-full border border-border rounded-md px-2 py-1.5 text-sm bg-background"
            />
          </div>
          <DeleteCol onClick={() => remove(i)} />
        </div>
      ))}
      <AddBtn label="Tambah baris" onClick={add} />
    </div>
  );
}

function RtrwRows({ rows, onChange }: { rows: RtrwRow[]; onChange: (r: RtrwRow[]) => void }) {
  const update = (i: number, patch: Partial<RtrwRow>) =>
    onChange(rows.map((r, j) => (j === i ? { ...r, ...patch } : r)));
  const add = () =>
    onChange([...rows, { id: newId("rtw"), kesesuaian: "", tahun: "", keterangan: "" }]);
  const remove = (i: number) => onChange(rows.filter((_, j) => j !== i));

  return (
    <div className="space-y-2">
      <RowHeader cols={["No", "Kesesuaian RTRW", "Tahun", "Keterangan", ""]} widths={[1, 4, 2, 4, 1]} />
      {rows.length === 0 && <EmptyHint text="Belum ada baris. Klik 'Tambah baris' untuk menambahkan." />}
      {rows.map((r, i) => (
        <div key={r.id} className="grid grid-cols-12 gap-2 items-center">
          <div className="col-span-1 text-sm text-muted-foreground pl-2">{i + 1}</div>
          <SelCol span={4} value={r.kesesuaian} onChange={(v) => update(i, { kesesuaian: v })} options={RTRW_OPT} placeholder="Pilih..." />
          <div className="col-span-2">
            <input
              value={r.tahun}
              onChange={(e) => update(i, { tahun: e.target.value })}
              placeholder="Tahun"
              className="w-full border border-border rounded-md px-2 py-1.5 text-sm bg-background"
            />
          </div>
          <div className="col-span-4">
            <input
              value={r.keterangan}
              onChange={(e) => update(i, { keterangan: e.target.value })}
              placeholder="Keterangan..."
              className="w-full border border-border rounded-md px-2 py-1.5 text-sm bg-background"
            />
          </div>
          <DeleteCol onClick={() => remove(i)} />
        </div>
      ))}
      <AddBtn label="Tambah baris" onClick={add} />
    </div>
  );
}

// =============== Presentational primitives ===============

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
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

function RowHeader({ cols, widths }: { cols: string[]; widths: number[] }) {
  return (
    <div className="grid grid-cols-12 gap-2 px-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
      {cols.map((c, i) => (
        <div key={i} className={`col-span-${widths[i]}`}>{c}</div>
      ))}
    </div>
  );
}

function SelCol({
  span,
  value,
  onChange,
  options,
  placeholder,
}: {
  span: number;
  value: string;
  onChange: (v: string) => void;
  options: readonly string[];
  placeholder: string;
}) {
  return (
    <div className={`col-span-${span}`}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-border rounded-md px-2 py-1.5 text-sm bg-background"
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}

function FileCol({
  span,
  file,
  onUpload,
  onRemove,
  fullWidth,
}: {
  span: number;
  file?: UploadedFile;
  onUpload: () => void;
  onRemove: () => void;
  fullWidth?: boolean;
}) {
  const cls = fullWidth ? "" : `col-span-${span}`;
  return (
    <div className={cls}>
      {file ? (
        <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-md border border-border bg-surface">
          <FileText className="size-3.5 text-brand shrink-0" />
          <div className="flex-1 min-w-0 text-[11px] truncate" title={file.nama}>
            {file.nama}
          </div>
          <button
            type="button"
            onClick={onRemove}
            className="text-muted-foreground hover:text-destructive p-0.5"
          >
            <X className="size-3" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={onUpload}
          className="w-full inline-flex items-center justify-center gap-1 px-2 py-1.5 rounded-md border border-dashed border-border hover:border-brand hover:bg-brand/5 text-[11px] font-medium"
        >
          <Upload className="size-3" /> Upload
        </button>
      )}
    </div>
  );
}

function DeleteCol({ onClick }: { onClick: () => void }) {
  return (
    <div className="col-span-1 flex justify-end">
      <button
        type="button"
        onClick={onClick}
        className="p-1.5 text-muted-foreground hover:text-destructive"
      >
        <Trash2 className="size-3.5" />
      </button>
    </div>
  );
}

function AddBtn({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand hover:underline mt-1"
    >
      <Plus className="size-3" /> {label}
    </button>
  );
}

function EmptyHint({ text }: { text: string }) {
  return (
    <div className="text-[11px] text-muted-foreground italic px-2 py-2 border border-dashed border-border rounded-md text-center">
      {text}
    </div>
  );
}

// =============== Checklist helper ===============

export function isKesiapanComplete(k: KesiapanUsulan) {
  const has = (f?: UploadedFile) => !!f;
  const lahanOK = k.lahan.length > 0 && k.lahan.every((r) => r.kesiapan && r.jenisDok && r.nomorDok && r.file);
  const dt = k.dokTeknis;
  const dokTeknisOK =
    !!dt.fs.status && !!dt.fs.tahun && has(dt.fs.file) &&
    !!dt.ded.status && !!dt.ded.tahun && has(dt.ded.file) &&
    !!dt.rab.status && !!dt.rab.tahun && has(dt.rab.file);
  const izinOK = k.izinLingkungan.length > 0 && k.izinLingkungan.every((r) => r.statusIzin && r.jenisDok && r.tahun && r.nomor && r.file);
  const kebijakanOK =
    k.dukunganKebijakan.length > 0 &&
    k.dukunganKebijakan.every((r) => {
      if (!r.jenis) return false;
      if (r.jenis === DUKUNGAN_KEBIJAKAN_OPT[0]) return !!r.klaster && !!r.detailProgram;
      return !!(r.detailKebijakan && r.detailKebijakan.trim());
    });
  const rtrwOK = k.rtrw.length > 0 && k.rtrw.every((r) => r.kesesuaian && r.tahun && r.keterangan);

  return {
    kak: has(k.kak),
    dskp: has(k.dskp),
    lahan: lahanOK,
    dokTeknis: dokTeknisOK,
    izinLingkungan: izinOK,
    dukunganKebijakan: kebijakanOK,
    rtrw: rtrwOK,
  };
}
