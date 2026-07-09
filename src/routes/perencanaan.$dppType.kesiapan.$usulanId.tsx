import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ShieldAlert } from "lucide-react";
import { useAppStore } from "@/lib/app-store";
import { DppPageLayout } from "@/components/dpp-page-layout";
import { StatusBadge } from "@/components/status-badge";
import { KesiapanVerifyView, type VerifyMode } from "@/components/kesiapan-verify";
import type { DppType } from "@/lib/mock-data";
import {
  emptyKesiapan,
  emptyVerifikasi,
  newId,
  SECTION_ORDER,
  type SectionKey,
  type SectionVerdict,
  type TimelineEvent,
} from "@/lib/kesiapan-data";
import { toast } from "sonner";

export const Route = createFileRoute("/perencanaan/$dppType/kesiapan/$usulanId")({
  component: Page,
});

function Page() {
  const { dppType, usulanId } = Route.useParams() as { dppType: DppType; usulanId: string };
  const navigate = useNavigate();
  const { usulan, role, updateUsulan } = useAppStore();
  const u = usulan.find((x) => x.id === usulanId);

  if (!u) {
    return (
      <DppPageLayout dppType={dppType}>
        <div className="p-8 max-w-2xl mx-auto">
          <div className="bg-surface rounded-xl ring-1 ring-black/5 shadow-card p-8 text-center">
            <ShieldAlert className="size-8 mx-auto text-status-pending mb-3" />
            <h2 className="text-base font-semibold">Usulan tidak ditemukan</h2>
            <p className="text-sm text-muted-foreground mt-1">
              ID usulan yang Anda buka tidak tersedia.
            </p>
            <button
              onClick={() => navigate({ to: "/perencanaan/$dppType/rekap", params: { dppType } })}
              className="mt-4 px-4 py-2 rounded-md text-sm font-medium bg-brand text-brand-foreground"
            >
              Kembali ke Rekap
            </button>
          </div>
        </div>
      </DppPageLayout>
    );
  }

  const kesiapan = u.kesiapan ?? emptyKesiapan();
  const verifikasi = u.verifikasi ?? emptyVerifikasi();

  const mode: VerifyMode =
    role === "verif1" ? "verif1" : role === "verif2" ? "verif2" : "readonly";

  const handleSectionChange = (
    verifikatorRole: "teknis" | "sspsda",
    section: SectionKey,
    verdict: SectionVerdict,
  ) => {
    const nextVerif = {
      ...verifikasi,
      [verifikatorRole]: { ...verifikasi[verifikatorRole], [section]: verdict },
    };

    // Cek promosi status usulan otomatis
    const allTeknisAccepted = SECTION_ORDER.every(
      (s) => nextVerif.teknis[s]?.status === "disetujui",
    );
    const allSspsdaAccepted = SECTION_ORDER.every(
      (s) => nextVerif.sspsda[s]?.status === "disetujui",
    );
    const anyRevisi = SECTION_ORDER.some((s) =>
      ["revisi", "ditolak"].includes(nextVerif.teknis[s]?.status ?? ""),
    );

    let newStatus = u.status;
    if (verifikatorRole === "teknis") {
      if (anyRevisi) newStatus = "revisi";
      else if (allTeknisAccepted) newStatus = "menunggu_v2";
      else newStatus = "menunggu_v1";
    } else if (verifikatorRole === "sspsda") {
      if (allSspsdaAccepted) newStatus = "disetujui_v2";
    }

    updateUsulan(u.id, { verifikasi: nextVerif, status: newStatus });

    if (verifikatorRole === "teknis" && allTeknisAccepted && !anyRevisi) {
      toast.success("Semua komponen disetujui Pembina Teknis — diteruskan ke SSPSDA");
    }
    if (verifikatorRole === "sspsda" && allSspsdaAccepted) {
      toast.success("Verifikasi final SSPSDA selesai");
    }
  };

  const handlePushHistory = (ev: Omit<TimelineEvent, "id" | "waktu">) => {
    const full: TimelineEvent = { ...ev, id: newId("evt"), waktu: new Date().toISOString() };
    const nextVerif = { ...verifikasi, history: [...verifikasi.history, full] };
    updateUsulan(u.id, { verifikasi: nextVerif });
  };

  return (
    <DppPageLayout dppType={dppType}>
      <div className="p-8 max-w-7xl mx-auto space-y-6">
        <div>
          <Link
            to="/perencanaan/$dppType/verifikasi"
            params={{ dppType }}
            className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground mb-2"
          >
            <ArrowLeft className="size-3.5" /> Kembali ke Verifikasi Masuk
          </Link>
          <div className="bg-surface rounded-xl ring-1 ring-black/5 shadow-card p-5 flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="text-[10px] font-mono text-muted-foreground uppercase">{u.nomor}</div>
              <h1 className="text-lg font-semibold">{u.namaKegiatan}</h1>
              <div className="text-xs text-muted-foreground mt-0.5">
                {u.balai} · {u.lokasi}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <StatusBadge status={u.status} />
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-brand/10 text-brand font-semibold uppercase">
                Mode:{" "}
                {mode === "verif1" ? "Pembina Teknis" : mode === "verif2" ? "SSPSDA" : "Read-only"}
              </span>
            </div>
          </div>
        </div>

        <KesiapanVerifyView
          kesiapan={kesiapan}
          verifikasi={verifikasi}
          mode={mode}
          onSectionChange={handleSectionChange}
          onPushHistory={handlePushHistory}
        />
      </div>
    </DppPageLayout>
  );
}
