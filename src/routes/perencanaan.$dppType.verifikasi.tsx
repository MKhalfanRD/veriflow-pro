import { createFileRoute } from "@tanstack/react-router";
import { useAppStore } from "@/lib/app-store";
import { DPP_LABEL, type DppType } from "@/lib/mock-data";
import { UsulanTable } from "@/components/usulan-table";
import { DppPageLayout } from "@/components/dpp-page-layout";
import { ShieldAlert } from "lucide-react";

export const Route = createFileRoute("/perencanaan/$dppType/verifikasi")({
  component: Page,
});

function Page() {
  const { dppType } = Route.useParams() as { dppType: DppType };
  const { usulan: _allUsulan, usulanTahun: usulan, role } = useAppStore();

  if (role === "balai") {
    return (
      <DppPageLayout dppType={dppType}>
        <div className="p-8 max-w-2xl mx-auto">
          <div className="bg-surface rounded-xl ring-1 ring-black/5 shadow-card p-8 text-center">
            <ShieldAlert className="size-8 mx-auto text-status-pending mb-3" />
            <h2 className="text-base font-semibold">Akses Terbatas</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Hanya peran Pembina Teknis atau SSPSDA yang dapat mengakses Verifikasi Masuk.
            </p>
          </div>
        </div>
      </DppPageLayout>
    );
  }

  const v1Statuses = ["menunggu_v1", "revisi", "disetujui_v1", "ditolak_v1"];
  const v2Statuses = ["menunggu_v2", "disetujui_v2", "tidak_dilanjutkan"];

  const rows = usulan.filter(
    (u) =>
      u.tahap === dppType &&
      (role === "verif1" ? v1Statuses : v2Statuses).includes(u.status),
  );

  return (
    <DppPageLayout dppType={dppType}>
      <div className="p-8 max-w-7xl mx-auto">
        <UsulanTable
          rows={rows}
          title={`Verifikasi Masuk · ${DPP_LABEL[dppType]}`}
          description={
            role === "verif1"
              ? "Usulan dari Balai yang menunggu verifikasi teknis"
              : "Usulan yang telah disetujui Pembina Teknis dan menunggu validasi akhir SSPSDA"
          }
        />
      </div>
    </DppPageLayout>
  );
}
