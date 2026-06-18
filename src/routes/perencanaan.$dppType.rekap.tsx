import { createFileRoute } from "@tanstack/react-router";
import { useAppStore } from "@/lib/app-store";
import {
  CURRENT_BALAI,
  DPP_LABEL,
  TAHUN_PERENCANAAN,
  type DppType,
} from "@/lib/mock-data";
import { UsulanTable } from "@/components/usulan-table";
import { DppPageLayout } from "@/components/dpp-page-layout";

export const Route = createFileRoute("/perencanaan/$dppType/rekap")({
  component: Page,
});

function Page() {
  const { dppType } = Route.useParams() as { dppType: DppType };
  const { usulan: _allUsulan, usulanTahun: usulan, role } = useAppStore();

  let rows = usulan.filter((u) => u.tahap === dppType && u.tahun === TAHUN_PERENCANAAN);
  if (role === "balai") rows = rows.filter((u) => u.balai === CURRENT_BALAI);
  if (role === "verif1") rows = rows.filter((u) => u.status !== "draft");

  const desc =
    role === "balai"
      ? `Seluruh usulan ${CURRENT_BALAI} pada ${DPP_LABEL[dppType]} TA ${TAHUN_PERENCANAAN}`
      : `Seluruh usulan SDA pada ${DPP_LABEL[dppType]} TA ${TAHUN_PERENCANAAN}`;

  return (
    <DppPageLayout dppType={dppType}>
      <div className="p-8 max-w-7xl mx-auto">
        <UsulanTable
          rows={rows}
          title={`Rekap Usulan · ${DPP_LABEL[dppType]} · TA ${TAHUN_PERENCANAAN}`}
          description={desc}
          showBalai={role !== "balai"}
        />
      </div>
    </DppPageLayout>
  );
}
