import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronLeft, ChevronRight, BookOpen } from "lucide-react";

export const Route = createFileRoute("/studi-pendahuluan")({
  component: Page,
});

const SLIDES = [
  {
    eyebrow: "Bab 1",
    title: "Latar Belakang",
    body: "Studi pendahuluan disusun sebagai dasar perencanaan Daftar Program & Pendanaan (DPP) tahun T+1 di lingkungan Direktorat Jenderal Sumber Daya Air, untuk memastikan setiap usulan kegiatan memenuhi prinsip kemanfaatan, kesiapan, dan keterpaduan.",
    stats: [
      { k: "Wilayah Sungai", v: "131" },
      { k: "Balai/Satker", v: "42" },
      { k: "Tahun Anggaran", v: new Date().getFullYear() + 1 },
    ],
  },
  {
    eyebrow: "Bab 2",
    title: "Maksud & Tujuan",
    body: "Memberikan pedoman teknis bagi Balai/Satker dalam menyiapkan usulan kegiatan; memberikan tolok ukur bagi Pembina Teknis dan SSPSDA dalam melakukan verifikasi berjenjang; serta menyediakan informasi publik atas seluruh proses perencanaan SDA.",
    bullets: [
      "Standarisasi format usulan kegiatan SDA.",
      "Menjamin keterbukaan informasi publik (UU 14/2008).",
      "Mempercepat siklus verifikasi dari pengusul hingga penetapan.",
    ],
  },
  {
    eyebrow: "Bab 3",
    title: "Metodologi Verifikasi",
    body: "Pendekatan verifikasi berjenjang dilakukan dalam 3 tahap: pengajuan oleh Balai/Satker, verifikasi teknis oleh Pembina Teknis (V1), dan verifikasi akhir oleh SSPSDA (V2). Setiap tahap menghasilkan dokumen Berita Acara digital yang dapat ditelusuri.",
    bullets: [
      "V1 memastikan kelengkapan KAK, RAB, DED, dan dokumen administrasi.",
      "V2 menilai prioritas (Nasional 3, Menteri 2, Dirjen 1) & keterpaduan kebijakan.",
    ],
  },
  {
    eyebrow: "Bab 4",
    title: "Skema Prioritas",
    body: "Prioritas usulan ditetapkan berdasarkan bobot kebijakan: Prioritas Nasional (PSN), Usulan Menteri, dan Usulan Dirjen. Bobot ini menjadi dasar penyusunan rekomendasi teknis dan alokasi pendanaan tahunan.",
    bullets: [
      "Prioritas Nasional · bobot 3",
      "Usulan Menteri · bobot 2",
      "Usulan Dirjen · bobot 1",
    ],
  },
  {
    eyebrow: "Penutup",
    title: "Tindak Lanjut",
    body: "Hasil studi pendahuluan ini menjadi acuan penyusunan Rincian DPP Awal dan pemantauan Perubahan Rincian DPP, yang seluruhnya dapat diakses publik melalui menu Perencanaan pada portal ini.",
  },
];

function Page() {
  const [i, setI] = useState(0);
  const slide = SLIDES[i];
  const next = () => setI((v) => Math.min(SLIDES.length - 1, v + 1));
  const prev = () => setI((v) => Math.max(0, v - 1));

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <BookOpen className="size-4 text-brand" />
          <span>Dokumen Publik · dapat di-preview, tidak dapat diunduh</span>
        </div>
        <span className="text-xs font-mono text-muted-foreground">
          Slide {i + 1} / {SLIDES.length}
        </span>
      </div>

      <div className="aspect-[16/9] bg-gradient-to-br from-surface to-muted/40 rounded-2xl ring-1 ring-black/5 shadow-elevated p-12 flex flex-col relative overflow-hidden">
        <div className="absolute top-6 right-8 text-[10px] uppercase tracking-widest font-semibold text-brand/70">
          STUDI PENDAHULUAN
        </div>
        <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand">
          {slide.eyebrow}
        </div>
        <h2 className="text-4xl font-bold mt-3 tracking-tight max-w-3xl">{slide.title}</h2>
        <p className="mt-6 text-base text-foreground/80 leading-relaxed max-w-3xl">{slide.body}</p>

        {slide.bullets && (
          <ul className="mt-6 space-y-2 max-w-2xl">
            {slide.bullets.map((b) => (
              <li key={b} className="flex gap-3 text-sm text-foreground/80">
                <span className="size-1.5 rounded-full bg-brand mt-2 shrink-0" />
                {b}
              </li>
            ))}
          </ul>
        )}

        {slide.stats && (
          <div className="mt-auto grid grid-cols-3 gap-4 max-w-2xl">
            {slide.stats.map((s) => (
              <div key={s.k} className="bg-surface rounded-lg p-4 border border-border">
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                  {s.k}
                </div>
                <div className="text-2xl font-bold text-brand mt-1">{s.v}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={prev}
          disabled={i === 0}
          className="inline-flex items-center gap-1 px-3 py-2 rounded-md border border-border bg-surface text-sm disabled:opacity-40 hover:bg-muted"
        >
          <ChevronLeft className="size-4" /> Sebelumnya
        </button>
        <div className="flex gap-1.5">
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              className={`h-1.5 rounded-full transition-all ${
                idx === i ? "w-8 bg-brand" : "w-1.5 bg-muted-foreground/30"
              }`}
            />
          ))}
        </div>
        <button
          onClick={next}
          disabled={i === SLIDES.length - 1}
          className="inline-flex items-center gap-1 px-3 py-2 rounded-md bg-brand text-brand-foreground text-sm disabled:opacity-40 hover:opacity-90"
        >
          Selanjutnya <ChevronRight className="size-4" />
        </button>
      </div>
    </div>
  );
}
