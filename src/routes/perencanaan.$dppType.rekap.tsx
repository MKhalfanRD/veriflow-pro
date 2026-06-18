import { createFileRoute } from "@tanstack/react-router";
import { useAppStore } from "@/lib/app-store";
import { CURRENT_BALAI, DPP_LABEL, type DppType } from "@/lib/mock-data";
import { UsulanTable } from "@/components/usulan-table";
import { DppPageLayout } from "@/components/dpp-page-layout";

export const Route = createFileRoute("/perencanaan/$dppType/rekap")({
  component: Page,
});

function Page() {
  const { dppType } = Route.useParams() as { dppType: DppType };
  const { usulanTahun: usulan, role, tahunAnggaran } = useAppStore();

  let rows = usulan.filter((u) => u.tahap === dppType);
  if (role === "balai") rows = rows.filter((u) => u.balai === CURRENT_BALAI);
  if (role === "verif1") rows = rows.filter((u) => u.status !== "draft");

  const desc =
    role === "balai"
      ? `Seluruh usulan ${CURRENT_BALAI} pada ${DPP_LABEL[dppType]} TA ${tahunAnggaran}`
      : `Seluruh usulan SDA pada ${DPP_LABEL[dppType]} TA ${tahunAnggaran}`;

  return (
    <DppPageLayout dppType={dppType}>
      <div className="p-8 max-w-7xl mx-auto">
        <UsulanTable
          rows={rows}
          title={`Rekap Usulan · ${DPP_LABEL[dppType]} · TA ${tahunAnggaran}`}
          description={desc}
          showBalai={role !== "balai"}
        />
      </div>
    </DppPageLayout>
  );
}
