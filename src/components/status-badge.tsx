import type { Prioritas, StatusUsulan } from "@/lib/mock-data";
import { PRIORITAS_LABEL, STATUS_LABEL } from "@/lib/mock-data";

const statusStyles: Record<StatusUsulan, string> = {
  draft: "bg-status-draft-bg text-status-draft border-status-draft/20",
  menunggu_v1: "bg-status-pending-bg text-status-pending border-status-pending/20",
  menunggu_v2: "bg-status-pending-bg text-status-pending border-status-pending/20",
  revisi: "bg-status-revisi-bg text-status-revisi border-status-revisi/20",
  disetujui_v1: "bg-status-approved-bg text-status-approved border-status-approved/20",
  disetujui_v2: "bg-status-approved-bg text-status-approved border-status-approved/20",
  ditolak_v1: "bg-status-rejected-bg text-status-rejected border-status-rejected/20",
  tidak_dilanjutkan: "bg-status-rejected-bg text-status-rejected border-status-rejected/20",
};

export function StatusBadge({ status }: { status: StatusUsulan }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[10px] font-semibold uppercase tracking-wide ${statusStyles[status]}`}
    >
      <span className="size-1.5 rounded-full bg-current opacity-70" />
      {STATUS_LABEL[status]}
    </span>
  );
}

const prioStyles: Record<Prioritas, string> = {
  nasional: "bg-prio-nasional-bg text-prio-nasional border-prio-nasional/20",
  menteri: "bg-prio-menteri-bg text-prio-menteri border-prio-menteri/20",
  dirjen: "bg-prio-dirjen-bg text-prio-dirjen border-prio-dirjen/20",
};

export function PrioritasBadge({ prioritas }: { prioritas: Prioritas }) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full border text-[10px] font-bold uppercase tracking-wider ${prioStyles[prioritas]}`}
    >
      {PRIORITAS_LABEL[prioritas].replace("Prioritas ", "").replace("Usulan ", "")}
    </span>
  );
}
