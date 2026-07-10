// Halaman verifikasi Kesiapan (V1 Teknis / V2 SSPSDA) + view read-only untuk Balai
import { useEffect, useState, type ReactNode } from "react";
import {
  Check,
  X,
  AlertCircle,
  FileText,
  Upload,
  RefreshCw,
  Clock,
  Star,
  Eye,
  Download,
  Lock,
} from "lucide-react";
import {
  KAK_KOMPONEN,
  DSKP_KAJIAN,
  SECTION_LABEL,
  SECTION_ORDER,
  formatWaktu,
  type SectionKey,
  type SectionVerdict,
  type VerdictStatus,
  type VerifikasiKesiapan,
  type KesiapanUsulan,
  type TimelineEvent,
  type KomponenChecklist,
  type UploadedFile,
} from "@/lib/kesiapan-data";
import { generateMockPdf, downloadBlob } from "@/lib/mock-data";

export type VerifyMode = "verif1" | "verif2" | "readonly";

interface Props {
  kesiapan: KesiapanUsulan;
  verifikasi: VerifikasiKesiapan;
  mode: VerifyMode;
  onSectionChange?: (
    role: "teknis" | "sspsda",
    section: SectionKey,
    verdict: SectionVerdict,
  ) => void;
  onPushHistory?: (ev: Omit<TimelineEvent, "id" | "waktu">) => void;
}

// ============ File preview helpers ============

function viewFile(file: UploadedFile) {
  const blob = generateMockPdf(file.nama);
  const url = URL.createObjectURL(blob);
  window.open(url, "_blank");
  setTimeout(() => URL.revokeObjectURL(url), 60_000);
}

function downloadFile(file: UploadedFile) {
  downloadBlob(generateMockPdf(file.nama), file.nama);
}

function FileButton({ file, compact = false }: { file?: UploadedFile; compact?: boolean }) {
  if (!file) return <span className="text-muted-foreground text-xs">—</span>;
  if (compact) {
    return (
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={() => viewFile(file)}
          className="inline-flex items-center gap-1 text-[11px] text-brand hover:underline"
          title={`Lihat ${file.nama}`}
        >
          <Eye className="size-3" /> Lihat
        </button>
        <button
          type="button"
          onClick={() => downloadFile(file)}
          className="inline-flex items-center gap-1 text-[11px] text-muted-foreground hover:text-brand"
          title="Unduh"
        >
          <Download className="size-3" />
        </button>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-2 p-2 rounded-md border border-border bg-background">
      <FileText className="size-4 text-brand shrink-0" />
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium truncate">{file.nama}</div>
        <div className="text-[10px] text-muted-foreground">
          {file.ukuran} · Diunggah {formatWaktu(file.waktu)}
        </div>
      </div>
      <button
        type="button"
        onClick={() => viewFile(file)}
        className="inline-flex items-center gap-1 text-[11px] text-brand hover:underline px-1.5 py-1"
      >
        <Eye className="size-3.5" /> Lihat
      </button>
      <button
        type="button"
        onClick={() => downloadFile(file)}
        className="inline-flex items-center gap-1 text-[11px] text-muted-foreground hover:text-brand px-1.5 py-1"
      >
        <Download className="size-3.5" />
      </button>
    </div>
  );
}

export function KesiapanVerifyView({
  kesiapan,
  verifikasi,
  mode,
  onSectionChange,
  onPushHistory,
}: Props) {
  const teknisSelesai = SECTION_ORDER.every(
    (s) => verifikasi.teknis[s]?.status === "disetujui",
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <aside className="lg:col-span-1 space-y-4 lg:sticky lg:top-6 lg:self-start">
        <div className="bg-surface rounded-xl ring-1 ring-black/5 shadow-card p-5">
          <div className="text-xs font-semibold mb-3 flex items-center gap-1.5">
            <Clock className="size-3.5 text-brand" /> Riwayat Aktivitas
          </div>
          <ActivityTimeline events={verifikasi.history} />
        </div>

        <ProgressCard verifikasi={verifikasi} teknisSelesai={teknisSelesai} />
      </aside>

      <div className="lg:col-span-3 space-y-4">
        {SECTION_ORDER.map((key) => (
          <SectionCard
            key={key}
            sectionKey={key}
            kesiapan={kesiapan}
            teknisVerdict={verifikasi.teknis[key]}
            sspsdaVerdict={verifikasi.sspsda[key]}
            mode={mode}
            teknisSelesai={teknisSelesai}
            onSectionChange={onSectionChange}
            onPushHistory={onPushHistory}
          />
        ))}
      </div>
    </div>
  );
}

// =============== Timeline ===============

function ActivityTimeline({ events }: { events: TimelineEvent[] }) {
  if (events.length === 0) {
    return (
      <div className="text-[11px] italic text-muted-foreground text-center py-4">
        Belum ada aktivitas.
      </div>
    );
  }
  return (
    <ol className="relative border-l border-border pl-4 space-y-4">
      {[...events].reverse().map((ev) => (
        <li key={ev.id} className="relative">
          <span
            className={`absolute -left-[21px] top-1 size-3 rounded-full ring-2 ring-surface flex items-center justify-center ${eventDot(ev.tipe)}`}
          >
            {eventIcon(ev.tipe)}
          </span>
          <div className="text-[10px] text-muted-foreground">{formatWaktu(ev.waktu)}</div>
          <div className="text-xs font-medium">{ev.aktor}</div>
          <div className="text-[11px] text-muted-foreground">{ev.ringkasan}</div>
        </li>
      ))}
    </ol>
  );
}

function eventDot(t: TimelineEvent["tipe"]) {
  switch (t) {
    case "upload":
    case "submit":
    case "resubmit":
      return "bg-brand";
    case "setuju":
    case "final":
      return "bg-status-approved";
    case "revisi":
      return "bg-status-revisi";
    case "tolak":
      return "bg-status-rejected";
  }
}
function eventIcon(t: TimelineEvent["tipe"]) {
  const cls = "size-2 text-white";
  switch (t) {
    case "upload":
    case "submit":
      return <Upload className={cls} />;
    case "resubmit":
      return <RefreshCw className={cls} />;
    case "setuju":
    case "final":
      return <Check className={cls} />;
    case "revisi":
      return <AlertCircle className={cls} />;
    case "tolak":
      return <X className={cls} />;
  }
}

// =============== Progress card ===============

function ProgressCard({
  verifikasi,
  teknisSelesai,
}: {
  verifikasi: VerifikasiKesiapan;
  teknisSelesai: boolean;
}) {
  const sspsdaSelesai = SECTION_ORDER.every(
    (s) => verifikasi.sspsda[s]?.status === "disetujui",
  );
  return (
    <div className="bg-surface rounded-xl ring-1 ring-black/5 shadow-card p-5">
      <div className="text-xs font-semibold mb-3 flex items-center gap-1.5">
        <Star className="size-3.5 text-brand" /> Status Verifikasi
      </div>
      <div className="space-y-3 text-xs">
        <StatusRow label="Pembina Teknis (V1)" done={teknisSelesai} />
        <StatusRow
          label="SSPSDA (V2)"
          done={sspsdaSelesai}
          disabled={!teknisSelesai}
          note={!teknisSelesai ? "Menunggu V1 selesai" : undefined}
        />
      </div>
    </div>
  );
}

function StatusRow({
  label,
  done,
  disabled,
  note,
}: {
  label: string;
  done: boolean;
  disabled?: boolean;
  note?: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <div className={disabled ? "text-muted-foreground" : ""}>{label}</div>
        {note && <div className="text-[10px] text-muted-foreground">{note}</div>}
      </div>
      <div
        className={`size-5 rounded-full flex items-center justify-center ${
          done
            ? "bg-status-approved text-white"
            : disabled
              ? "bg-muted text-muted-foreground"
              : "bg-status-pending-bg text-status-pending"
        }`}
      >
        {done ? <Check className="size-3" /> : <Clock className="size-3" />}
      </div>
    </div>
  );
}

// =============== Section card ===============

function SectionCard({
  sectionKey,
  kesiapan,
  teknisVerdict,
  sspsdaVerdict,
  mode,
  teknisSelesai,
  onSectionChange,
  onPushHistory,
}: {
  sectionKey: SectionKey;
  kesiapan: KesiapanUsulan;
  teknisVerdict?: SectionVerdict;
  sspsdaVerdict?: SectionVerdict;
  mode: VerifyMode;
  teknisSelesai: boolean;
  onSectionChange?: Props["onSectionChange"];
  onPushHistory?: Props["onPushHistory"];
}) {
  const [tab, setTab] = useState<"teknis" | "sspsda">(mode === "verif2" ? "sspsda" : "teknis");
  const label = SECTION_LABEL[sectionKey];

  const activeVerdict = tab === "teknis" ? teknisVerdict : sspsdaVerdict;
  const canEditTeknis = mode === "verif1";
  const canEditSspsda = mode === "verif2" && teknisSelesai;
  const canEdit = tab === "teknis" ? canEditTeknis : canEditSspsda;

  return (
    <section className="bg-surface rounded-xl ring-1 ring-black/5 shadow-card overflow-hidden">
      <div className="px-6 py-4 border-b border-border flex items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold">{label}</h3>
          <div className="mt-1 flex items-center gap-2">
            <VerdictBadge label="Teknis" v={teknisVerdict} />
            <VerdictBadge label="SSPSDA" v={sspsdaVerdict} />
          </div>
        </div>
        <div className="flex rounded-md overflow-hidden border border-border text-xs">
          <button
            onClick={() => setTab("teknis")}
            className={`px-3 py-1.5 ${tab === "teknis" ? "bg-brand text-brand-foreground" : "bg-surface hover:bg-muted"}`}
          >
            Evaluasi Teknis
          </button>
          <button
            onClick={() => setTab("sspsda")}
            className={`px-3 py-1.5 ${tab === "sspsda" ? "bg-brand text-brand-foreground" : "bg-surface hover:bg-muted"}`}
          >
            Evaluasi SSPSDA
          </button>
        </div>
      </div>

      {/* Split kiri (data balai) / kanan (panel verif) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-border">
        <div className="p-6 bg-muted/20">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
            <FileText className="size-3" /> Data dari Balai
          </div>
          <BalaiData sectionKey={sectionKey} kesiapan={kesiapan} />
        </div>

        <div className="p-6">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">
            Panel Verifikator — {tab === "teknis" ? "Pembina Teknis" : "SSPSDA"}
          </div>

          {tab === "sspsda" && !teknisSelesai && mode !== "readonly" && (
            <div className="mb-3 p-3 rounded-md bg-status-pending-bg border border-status-pending/20 text-xs flex items-start gap-2 text-status-pending">
              <AlertCircle className="size-3.5 mt-0.5 shrink-0" />
              <span>
                SSPSDA menunggu Pembina Teknis menyetujui semua komponen sebelum dapat memberi
                penilaian.
              </span>
            </div>
          )}

          <VerdictPanel
            sectionKey={sectionKey}
            verdict={activeVerdict}
            canEdit={canEdit}
            role={tab}
            onChange={(v) => {
              onSectionChange?.(tab, sectionKey, v);
            }}
            onCommit={(v) => {
              const status = v.status;
              const aktor =
                tab === "teknis"
                  ? "Pembina Teknis / Budi Santoso"
                  : "SSPSDA / Hendra Wijaya";
              const tipe =
                status === "disetujui"
                  ? "setuju"
                  : status === "revisi"
                    ? "revisi"
                    : "tolak";
              onPushHistory?.({
                aktor,
                tipe,
                ringkasan: `${label} — ${status === "disetujui" ? "disetujui" : status === "revisi" ? "diminta revisi" : "ditolak"}${v.catatan ? `: ${v.catatan}` : ""}`,
              });
            }}
          />
        </div>
      </div>
    </section>
  );
}

// =============== Balai data display (read-only, dengan viewer) ===============

function BalaiData({
  sectionKey,
  kesiapan,
}: {
  sectionKey: SectionKey;
  kesiapan: KesiapanUsulan;
}) {
  switch (sectionKey) {
    case "kak":
      return <FileBlock file={kesiapan.kak} placeholder="KAK belum diunggah" />;
    case "dskp":
      return <FileBlock file={kesiapan.dskp} placeholder="DSKP belum diunggah" />;
    case "lahan":
      return (
        <DataTable
          headers={["Kesiapan Lahan", "Jenis Dokumen", "Nomor", "File"]}
          rows={kesiapan.lahan.map((r) => [
            r.kesiapan,
            r.jenisDok,
            r.nomorDok,
            <FileButton key="f" file={r.file} compact />,
          ])}
          emptyMsg="Belum ada data kesiapan lahan."
        />
      );
    case "dokTeknis": {
      const dt = kesiapan.dokTeknis;
      return (
        <DataTable
          headers={["Dokumen", "Status", "Tahun", "File"]}
          rows={[
            [
              "Feasibility Study",
              dt.fs.status,
              dt.fs.tahun,
              <FileButton key="f" file={dt.fs.file} compact />,
            ],
            [
              "Detail Engineering Design",
              dt.ded.status,
              dt.ded.tahun,
              <FileButton key="f" file={dt.ded.file} compact />,
            ],
            [
              "Rincian Anggaran Biaya",
              dt.rab.status,
              dt.rab.tahun,
              <FileButton key="f" file={dt.rab.file} compact />,
            ],
          ]}
          emptyMsg=""
        />
      );
    }
    case "izinLingkungan":
      return (
        <DataTable
          headers={["Status", "Jenis", "Tahun", "Nomor", "File"]}
          rows={kesiapan.izinLingkungan.map((r) => [
            r.statusIzin,
            r.jenisDok,
            r.tahun,
            r.nomor,
            <FileButton key="f" file={r.file} compact />,
          ])}
          emptyMsg="Belum ada data izin lingkungan."
        />
      );
    case "dukunganKebijakan":
      return (
        <DataTable
          headers={["Jenis", "Klaster / Detail Kebijakan", "Detail Program"]}
          rows={kesiapan.dukunganKebijakan.map((r) => [
            r.jenis,
            r.klaster ?? r.detailKebijakan ?? "—",
            r.detailProgram ?? "—",
          ])}
          emptyMsg="Belum ada dukungan kebijakan."
        />
      );
    case "rtrw":
      return (
        <DataTable
          headers={["Kesesuaian", "Tahun", "Keterangan"]}
          rows={kesiapan.rtrw.map((r) => [r.kesesuaian, r.tahun, r.keterangan])}
          emptyMsg="Belum ada data RTRW."
        />
      );
  }
}

function FileBlock({ file, placeholder }: { file?: UploadedFile; placeholder: string }) {
  if (!file) {
    return (
      <div className="text-xs italic text-muted-foreground px-2 py-2 border border-dashed border-border rounded-md">
        {placeholder}
      </div>
    );
  }
  return <FileButton file={file} />;
}

function DataTable({
  headers,
  rows,
  emptyMsg,
}: {
  headers: string[];
  rows: ReactNode[][];
  emptyMsg: string;
}) {
  if (rows.length === 0) {
    return (
      <div className="text-xs italic text-muted-foreground px-2 py-2 border border-dashed border-border rounded-md text-center">
        {emptyMsg}
      </div>
    );
  }
  return (
    <div className="overflow-x-auto border border-border rounded-md bg-surface">
      <table className="w-full text-xs">
        <thead className="bg-muted/60">
          <tr>
            {headers.map((h) => (
              <th
                key={h}
                className="text-left px-3 py-2 font-semibold text-[10px] uppercase tracking-wider text-muted-foreground"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {rows.map((r, i) => (
            <tr key={i}>
              {r.map((c, j) => (
                <td key={j} className="px-3 py-2 align-top">
                  {c === "" || c == null ? (
                    <span className="text-muted-foreground">—</span>
                  ) : (
                    c
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// =============== Verdict badge ===============

function VerdictBadge({ label, v }: { label: string; v?: SectionVerdict }) {
  const status = v?.status ?? "menunggu";
  const map: Record<VerdictStatus, string> = {
    menunggu: "bg-status-pending-bg text-status-pending border-status-pending/20",
    disetujui: "bg-status-approved-bg text-status-approved border-status-approved/20",
    revisi: "bg-status-revisi-bg text-status-revisi border-status-revisi/20",
    ditolak: "bg-status-rejected-bg text-status-rejected border-status-rejected/20",
  };
  const text: Record<VerdictStatus, string> = {
    menunggu: "Menunggu",
    disetujui: "Disetujui",
    revisi: "Revisi",
    ditolak: "Ditolak",
  };
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[9px] font-semibold uppercase tracking-wide ${map[status]}`}
    >
      {label}: {text[status]}
    </span>
  );
}

// =============== Verdict panel ===============

const VERDICT_LABEL: Record<VerdictStatus, string> = {
  menunggu: "Belum diputuskan",
  disetujui: "Setujui",
  revisi: "Minta Revisi",
  ditolak: "Tolak",
};

function VerdictPanel({
  sectionKey,
  verdict,
  canEdit,
  role,
  onChange,
  onCommit,
}: {
  sectionKey: SectionKey;
  verdict?: SectionVerdict;
  canEdit: boolean;
  role: "teknis" | "sspsda";
  onChange: (v: SectionVerdict) => void;
  onCommit: (v: SectionVerdict) => void;
}) {
  const cur: SectionVerdict = verdict ?? { status: "menunggu", catatan: "", checklist: {} };
  const isChecklistSection = sectionKey === "kak" || sectionKey === "dskp";
  const komponen: KomponenChecklist[] =
    sectionKey === "kak" ? KAK_KOMPONEN : sectionKey === "dskp" ? DSKP_KAJIAN : [];

  // Locked setelah verdict dibuat — hanya bisa diubah setelah Balai mengirim data terbaru
  const locked = cur.status !== "menunggu";
  const editable = canEdit && !locked;

  const [catatan, setCatatan] = useState(cur.catatan);
  useEffect(() => {
    setCatatan(cur.catatan);
  }, [cur.catatan]);

  const [pending, setPending] = useState<VerdictStatus | null>(null);

  const toggleItem = (kode: string, item: string) => {
    if (!editable) return;
    const cur2 = cur.checklist?.[kode] ?? { checked: [], catatan: "" };
    const checked = cur2.checked.includes(item)
      ? cur2.checked.filter((i) => i !== item)
      : [...cur2.checked, item];
    onChange({
      ...cur,
      checklist: { ...(cur.checklist ?? {}), [kode]: { ...cur2, checked } },
    });
  };

  const setCatatanKomponen = (kode: string, val: string) => {
    if (!editable) return;
    const cur2 = cur.checklist?.[kode] ?? { checked: [], catatan: "" };
    onChange({
      ...cur,
      checklist: { ...(cur.checklist ?? {}), [kode]: { ...cur2, catatan: val } },
    });
  };

  const confirmSubmit = () => {
    if (!pending) return;
    const v: SectionVerdict = { ...cur, status: pending, catatan };
    onChange(v);
    onCommit(v);
    setPending(null);
  };

  return (
    <div className="space-y-4">
      {locked && (
        <div className="flex items-start gap-2 p-3 rounded-md bg-muted border border-border text-xs">
          <Lock className="size-3.5 mt-0.5 shrink-0 text-muted-foreground" />
          <span>
            Keputusan sudah diberikan (<b>{VERDICT_LABEL[cur.status]}</b>). Anda tidak dapat mengubah
            penilaian sampai Balai mengirim data terbaru.
          </span>
        </div>
      )}

      {isChecklistSection && (
        <div className="space-y-3 max-h-[520px] overflow-y-auto pr-1">
          {komponen.map((k) => {
            const state = cur.checklist?.[k.kode] ?? { checked: [], catatan: "" };
            return (
              <div key={k.kode} className="border border-border rounded-md p-3 bg-background">
                <div className="text-xs font-semibold mb-2">
                  {k.kode}. {k.nama}
                </div>
                <ul className="space-y-1.5">
                  {k.poin.map((p) => {
                    const checked = state.checked.includes(p);
                    return (
                      <li key={p} className="flex items-start gap-2">
                        <button
                          type="button"
                          onClick={() => toggleItem(k.kode, p)}
                          disabled={!editable}
                          className={`mt-0.5 size-4 rounded shrink-0 flex items-center justify-center border ${
                            checked
                              ? "bg-status-approved border-status-approved"
                              : "bg-background border-border"
                          } ${!editable ? "cursor-not-allowed opacity-70" : "hover:border-brand"}`}
                        >
                          {checked && <Check className="size-3 text-white" />}
                        </button>
                        <span className="text-xs">{p}</span>
                      </li>
                    );
                  })}
                </ul>
                <textarea
                  value={state.catatan}
                  onChange={(e) => setCatatanKomponen(k.kode, e.target.value)}
                  disabled={!editable}
                  placeholder="Catatan / kelengkapan (opsional)..."
                  rows={2}
                  className="w-full mt-2 border border-border rounded-md px-2 py-1.5 text-xs bg-background focus:outline-none focus:ring-1 focus:ring-brand disabled:opacity-60"
                />
              </div>
            );
          })}
        </div>
      )}

      <div>
        <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
          Catatan umum
        </div>
        <textarea
          value={catatan}
          onChange={(e) => setCatatan(e.target.value)}
          disabled={!editable}
          rows={3}
          placeholder="Tulis catatan atas seluruh section ini..."
          className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-brand disabled:opacity-60"
        />
      </div>

      {canEdit ? (
        <div className="pt-3 border-t border-border">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
            Keputusan
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <select
              disabled={locked}
              value={cur.status}
              onChange={(e) => {
                const s = e.target.value as VerdictStatus;
                if (s === "menunggu") return;
                setPending(s);
              }}
              className={`border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-brand disabled:opacity-60 ${
                locked ? "border-border" : "border-brand"
              }`}
            >
              <option value="menunggu">— Pilih Keputusan —</option>
              <option value="disetujui">Setujui</option>
              <option value="revisi">Minta Revisi</option>
              <option value="ditolak">Tolak</option>
            </select>
            {locked && (
              <span className="text-[11px] text-muted-foreground italic inline-flex items-center gap-1">
                <Lock className="size-3" /> Terkunci
              </span>
            )}
          </div>
        </div>
      ) : (
        <div className="text-[11px] text-muted-foreground italic">
          Panel penilaian terkunci untuk peran Anda saat ini.
        </div>
      )}

      {pending && (
        <ConfirmDialog
          status={pending}
          role={role}
          onCancel={() => setPending(null)}
          onConfirm={confirmSubmit}
        />
      )}
    </div>
  );
}

function ConfirmDialog({
  status,
  role,
  onCancel,
  onConfirm,
}: {
  status: VerdictStatus;
  role: "teknis" | "sspsda";
  onCancel: () => void;
  onConfirm: () => void;
}) {
  const label = VERDICT_LABEL[status];
  const roleLabel = role === "teknis" ? "Pembina Teknis" : "SSPSDA";
  const tone: Record<VerdictStatus, string> = {
    menunggu: "",
    disetujui: "bg-status-approved text-white hover:opacity-90",
    revisi: "bg-status-revisi text-white hover:opacity-90",
    ditolak: "bg-status-rejected text-white hover:opacity-90",
  };
  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4"
      onClick={onCancel}
    >
      <div
        className="bg-surface rounded-xl shadow-lg max-w-md w-full p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start gap-3 mb-4">
          <div className="size-9 rounded-full bg-status-pending-bg text-status-pending flex items-center justify-center shrink-0">
            <AlertCircle className="size-5" />
          </div>
          <div>
            <h4 className="text-sm font-semibold">Konfirmasi: {label}</h4>
            <p className="text-xs text-muted-foreground mt-1">
              Apakah Anda yakin ingin <b>{label.toLowerCase()}</b> komponen ini sebagai{" "}
              <b>{roleLabel}</b>?
            </p>
          </div>
        </div>
        <div className="p-3 rounded-md bg-muted border border-border text-[11px] text-muted-foreground mb-4 flex items-start gap-2">
          <Lock className="size-3.5 mt-0.5 shrink-0" />
          <span>
            Setelah dikirim, Anda <b>tidak dapat mengubah keputusan</b> sampai Balai mengirim data
            terbaru.
          </span>
        </div>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-md text-xs font-semibold border border-border hover:bg-muted"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`px-4 py-2 rounded-md text-xs font-semibold ${tone[status]}`}
          >
            Ya, {label}
          </button>
        </div>
      </div>
    </div>
  );
}
