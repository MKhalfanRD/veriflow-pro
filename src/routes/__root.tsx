import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { AppSidebar } from "@/components/app-sidebar";
import { AppHeader } from "@/components/app-header";
import { AppStoreContext } from "@/lib/app-store";
import { USULAN_MOCK, type Role, type Usulan } from "@/lib/mock-data";
import { Toaster } from "sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Halaman tidak ditemukan</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Halaman yang Anda cari tidak tersedia atau telah dipindahkan.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center justify-center rounded-md bg-brand px-4 py-2 text-sm font-medium text-brand-foreground hover:opacity-90"
        >
          Kembali ke Dasbor
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold">Terjadi kesalahan</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Halaman tidak dapat dimuat. Silakan coba lagi.
        </p>
        <div className="mt-6 flex justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="rounded-md bg-brand px-4 py-2 text-sm font-medium text-brand-foreground"
          >
            Coba lagi
          </button>
          <a
            href="/"
            className="rounded-md border border-border bg-surface px-4 py-2 text-sm font-medium"
          >
            Ke Dasbor
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "SIPRO-SDA · Sistem Manajemen Usulan & Verifikasi Berjenjang" },
      {
        name: "description",
        content:
          "Sistem manajemen usulan kegiatan dengan verifikasi berjenjang untuk Balai/Satker, Pembina Teknis, dan SSPSDA.",
      },
      { property: "og:title", content: "SIPRO-SDA · Sistem Manajemen Usulan & Verifikasi Berjenjang" },
      { name: "twitter:title", content: "SIPRO-SDA · Sistem Manajemen Usulan & Verifikasi Berjenjang" },
      { name: "description", content: "Proyek Berjalan is a web application for managing and verifying project proposals through a tiered approval process." },
      { property: "og:description", content: "Proyek Berjalan is a web application for managing and verifying project proposals through a tiered approval process." },
      { name: "twitter:description", content: "Proyek Berjalan is a web application for managing and verifying project proposals through a tiered approval process." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/b30715e0-1169-4508-825f-04fdb42258a5/id-preview-4f3e2dca--31abbaaf-a2d1-4802-a076-0be3cc09412a.lovable.app-1780983256001.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/b30715e0-1169-4508-825f-04fdb42258a5/id-preview-4f3e2dca--31abbaaf-a2d1-4802-a076-0be3cc09412a.lovable.app-1780983256001.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="id">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const [role, setRole] = useState<Role>("balai");
  const [usulan, setUsulan] = useState<Usulan[]>(USULAN_MOCK);

  const store = {
    role,
    setRole,
    usulan,
    updateUsulan: (id: string, patch: Partial<Usulan>) =>
      setUsulan((prev) => prev.map((u) => (u.id === id ? { ...u, ...patch } : u))),
    addUsulan: (u: Usulan) => setUsulan((prev) => [u, ...prev]),
  };

  return (
    <QueryClientProvider client={queryClient}>
      <AppStoreContext.Provider value={store}>
        <div className="flex min-h-screen w-full bg-background">
          <AppSidebar />
          <div className="flex-1 flex flex-col min-w-0">
            <AppHeader />
            <main className="flex-1 overflow-y-auto">
              <Outlet />
            </main>
          </div>
        </div>
        <Toaster richColors position="top-right" />
      </AppStoreContext.Provider>
    </QueryClientProvider>
  );
}
