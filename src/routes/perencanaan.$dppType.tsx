import { createFileRoute, Navigate } from "@tanstack/react-router";
import type { DppType } from "@/lib/mock-data";

export const Route = createFileRoute("/perencanaan/$dppType")({
  component: RedirectToRekap,
});

function RedirectToRekap() {
  const { dppType } = Route.useParams();
  return <Navigate to="/perencanaan/$dppType/rekap" params={{ dppType: dppType as DppType }} replace />;
}
