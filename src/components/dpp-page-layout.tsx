import { Link } from "@tanstack/react-router";
import { Lock, Settings2 } from "lucide-react";
import type { ReactNode } from "react";
import { useAppStore } from "@/lib/app-store";
import { DPP_LABEL, type DppType } from "@/lib/mock-data";

interface Props {
  dppType: DppType;
  children: ReactNode;
}

export function DppPageLayout({ dppType, children }: Props) {
  const { dppAwalEnabled, dppPerubahanEnabled, role } = useAppStore();
  const enabled = dppType === "awal" ? dppAwalEnabled : dppPerubahanEnabled;

  if (!enabled) {
    return (
      <div className="p-8 max-w-3xl mx-auto">
        <div className="bg-surface rounded-xl ring-1 ring-black/5 shadow-card p-10 text-center">
          <div className="size-14 mx-auto rounded-full bg-status-pending-bg text-status-pending flex items-center justify-center mb-4">
            <Lock className="size-6" />
          </div>
          <h2 className="text-lg font-semibold">{DPP_LABEL[dppType]} belum dapat diakses</h2>
          <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto">
            Menu ini sedang dinonaktifkan. Akses akan terbuka setelah SSPSDA mengaktifkannya pada
            halaman Pengaturan Menu.
          </p>
          {role === "verif2" && (
            <Link
              to="/pengaturan"
              className="mt-5 inline-flex items-center gap-2 text-sm font-medium px-4 py-2 bg-brand text-brand-foreground rounded-md hover:opacity-90"
            >
              <Settings2 className="size-4" />
              Buka Pengaturan Menu
            </Link>
          )}
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
