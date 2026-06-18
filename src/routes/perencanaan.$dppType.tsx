import { createFileRoute, Outlet, Navigate, useRouterState } from "@tanstack/react-router";
import type { DppType } from "@/lib/mock-data";

export const Route = createFileRoute("/perencanaan/$dppType")({
  component: Layout,
});

function Layout() {
  const { dppType } = Route.useParams();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const base = `/perencanaan/${dppType}`;

  // Only redirect when the user lands exactly on the parent (no sub-route)
  if (pathname === base || pathname === `${base}/`) {
    return (
      <Navigate
        to="/perencanaan/$dppType/rekap"
        params={{ dppType: dppType as DppType }}
        replace
      />
    );
  }

  return <Outlet />;
}
