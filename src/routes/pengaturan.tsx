import { createFileRoute } from "@tanstack/react-router";
import { useAppStore, ROLE_LABEL } from "@/lib/app-store";
import { DPP_LABEL } from "@/lib/mock-data";
import { ShieldAlert, ToggleRight } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/pengaturan")({
  component: Page,
});

function Page() {
  const { role, dppAwalEnabled, dppPerubahanEnabled, setDppEnabled } = useAppStore();

  return (
    <div className="p-8 max-w-3xl mx-auto space-y-6">
      <div className="bg-surface rounded-xl ring-1 ring-black/5 shadow-card p-6">
        <h2 className="text-base font-semibold">Profil Pengguna</h2>
        <p className="text-[11px] text-muted-foreground mb-6">Informasi akun aktif</p>
        <dl className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <dt className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Peran</dt>
            <dd className="mt-1 font-medium">{ROLE_LABEL[role]}</dd>
          </div>
          <div>
            <dt className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Status</dt>
            <dd className="mt-1 font-medium text-status-approved">Aktif</dd>
          </div>
        </dl>
      </div>

      {role === "verif2" ? (
        <div className="bg-surface rounded-xl ring-1 ring-black/5 shadow-card p-6">
          <div className="flex items-center gap-2 mb-1">
            <ToggleRight className="size-4 text-brand" />
            <h2 className="text-base font-semibold">Pengaturan Menu Perencanaan</h2>
          </div>
          <p className="text-[11px] text-muted-foreground mb-5">
            Aktifkan atau nonaktifkan akses sub-menu Perencanaan untuk seluruh pengguna sistem.
            Ketika dinonaktifkan, Balai/Satker & Pembina Teknis akan melihat pesan bahwa menu
            sedang tidak dapat diakses.
          </p>

          <div className="space-y-3">
            <Toggle
              label={DPP_LABEL.awal}
              hint="Sub-menu beserta seluruh sub-sub-menu di dalamnya"
              checked={dppAwalEnabled}
              onChange={(v) => {
                setDppEnabled("awal", v);
                toast.success(`${DPP_LABEL.awal} ${v ? "diaktifkan" : "dinonaktifkan"}`);
              }}
            />
            <Toggle
              label={DPP_LABEL.perubahan}
              hint="Sub-menu beserta seluruh sub-sub-menu di dalamnya"
              checked={dppPerubahanEnabled}
              onChange={(v) => {
                setDppEnabled("perubahan", v);
                toast.success(`${DPP_LABEL.perubahan} ${v ? "diaktifkan" : "dinonaktifkan"}`);
              }}
            />
          </div>
        </div>
      ) : (
        <div className="bg-surface rounded-xl ring-1 ring-black/5 shadow-card p-6">
          <div className="flex items-start gap-3">
            <ShieldAlert className="size-5 text-status-pending mt-0.5" />
            <div>
              <h2 className="text-base font-semibold">Pengaturan Menu Perencanaan</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Hanya peran SSPSDA yang dapat mengaktifkan atau menonaktifkan sub-menu Rincian DPP
                Awal dan Perubahan Rincian DPP.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Toggle({
  label,
  hint,
  checked,
  onChange,
}: {
  label: string;
  hint: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-center justify-between p-4 rounded-lg border border-border bg-background cursor-pointer hover:border-brand/40 transition-colors">
      <div>
        <div className="text-sm font-medium">{label}</div>
        <div className="text-[11px] text-muted-foreground mt-0.5">{hint}</div>
      </div>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative w-11 h-6 rounded-full transition-colors ${checked ? "bg-brand" : "bg-muted-foreground/30"}`}
        aria-pressed={checked}
      >
        <span
          className={`absolute top-0.5 size-5 bg-white rounded-full shadow transition-transform ${
            checked ? "translate-x-5" : "translate-x-0.5"
          }`}
        />
      </button>
    </label>
  );
}
