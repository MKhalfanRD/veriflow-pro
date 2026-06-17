import { createFileRoute, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ShieldCheck, Building2, BadgeCheck, Lock } from "lucide-react";
import { useAppStore, ROLE_LABEL } from "@/lib/app-store";
import type { Role } from "@/lib/mock-data";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

const ROLE_OPTIONS: { value: Role; icon: typeof Building2; hint: string }[] = [
  { value: "balai", icon: Building2, hint: "Membuat & mengirim usulan kegiatan" },
  { value: "verif1", icon: BadgeCheck, hint: "Verifikasi teknis usulan dari Balai/Satker" },
  { value: "verif2", icon: ShieldCheck, hint: "Validasi akhir & penentu kelanjutan" },
];

function LoginPage() {
  const { login, loggedIn } = useAppStore();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin");
  const [role, setRole] = useState<Role>("balai");

  useEffect(() => {
    if (loggedIn && pathname === "/login") navigate({ to: "/" });
  }, [loggedIn, pathname, navigate]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) return;
    login(role);
    navigate({ to: "/" });
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="hidden lg:flex relative bg-gradient-to-br from-brand to-brand/70 text-brand-foreground p-12 flex-col justify-between overflow-hidden">
        <div className="flex items-center gap-3">
          <div className="size-10 bg-white/15 rounded-lg flex items-center justify-center backdrop-blur">
            <ShieldCheck className="size-5" />
          </div>
          <div>
            <div className="font-semibold tracking-tight">SIPRO-SDA</div>
            <div className="text-[10px] uppercase tracking-widest opacity-80">
              Sistem Manajemen Usulan & Verifikasi
            </div>
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-semibold tracking-tight leading-tight">
            Verifikasi berjenjang untuk perencanaan SDA.
          </h1>
          <p className="mt-3 text-sm opacity-90 max-w-md leading-relaxed">
            Portal internal Direktorat Jenderal Sumber Daya Air — Kementerian PUPR. Akses
            terbatas untuk pengguna terdaftar pada masing-masing kewenangan.
          </p>
        </div>
        <div className="text-[11px] opacity-70">
          © {new Date().getFullYear()} Ditjen SDA · Sistem internal terotorisasi
        </div>
        <div className="absolute -bottom-32 -right-32 size-96 rounded-full bg-white/5 blur-2xl" />
      </div>

      <div className="flex items-center justify-center p-6 sm:p-12 bg-background">
        <form onSubmit={submit} className="w-full max-w-md space-y-6">
          <div className="lg:hidden flex items-center gap-3 mb-2">
            <div className="size-9 bg-brand rounded-lg flex items-center justify-center">
              <ShieldCheck className="size-4 text-brand-foreground" />
            </div>
            <div>
              <div className="font-semibold tracking-tight text-sm">SIPRO-SDA</div>
              <div className="text-[9px] uppercase tracking-widest text-muted-foreground">
                Portal Internal
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Masuk ke akun Anda</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Gunakan kredensial yang diberikan administrator sistem.
            </p>
          </div>

          <div className="space-y-3">
            <label className="block">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Username / NIP
              </span>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full mt-1.5 border border-border rounded-md px-3 py-2.5 text-sm bg-surface focus:outline-none focus:ring-1 focus:ring-brand"
                placeholder="contoh: budi.santoso"
                autoComplete="username"
              />
            </label>
            <label className="block">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Kata Sandi
              </span>
              <div className="relative mt-1.5">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 border border-border rounded-md px-3 py-2.5 text-sm bg-surface focus:outline-none focus:ring-1 focus:ring-brand"
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
              </div>
            </label>
          </div>

          <div>
            <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              Pilih Peran (Demo)
            </div>
            <div className="space-y-2">
              {ROLE_OPTIONS.map((o) => {
                const Icon = o.icon;
                const active = role === o.value;
                return (
                  <button
                    key={o.value}
                    type="button"
                    onClick={() => setRole(o.value)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg border text-left transition-all ${
                      active
                        ? "border-brand bg-brand/5 ring-2 ring-brand/20"
                        : "border-border bg-surface hover:border-brand/40"
                    }`}
                  >
                    <div
                      className={`size-9 rounded-md flex items-center justify-center shrink-0 ${
                        active ? "bg-brand text-brand-foreground" : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <Icon className="size-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium">{ROLE_LABEL[o.value]}</div>
                      <div className="text-[11px] text-muted-foreground">{o.hint}</div>
                    </div>
                    {active && <div className="size-2 rounded-full bg-brand" />}
                  </button>
                );
              })}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-brand text-brand-foreground font-medium text-sm py-2.5 rounded-md hover:opacity-90 transition-opacity"
          >
            Masuk
          </button>

          <p className="text-[11px] text-center text-muted-foreground">
            Demo · username & password apapun diterima. Pilih peran untuk uji coba sistem.
          </p>
        </form>
      </div>
    </div>
  );
}
