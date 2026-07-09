
# Kriteria Kesiapan Proyek SBSN — Extend Buat Usulan + Verifikasi V1/V2

## Flow ringkas
Balai isi form Buat Usulan (termasuk section baru "Kriteria Kesiapan") → submit → masuk antrean Veri 1 (Pembina Teknis) → beri feedback (setuju / minta revisi / tolak) per komponen → jika **semua** komponen di-ACC, usulan masuk ke Veri 2 (SSPSDA) → Veri 2 beri feedback yang sama → ACC final. Timeline history mencatat tiap event (upload / feedback / revisi).

---

## 1. Buat Usulan (role Balai) — tambahan section di bawah Lokasi

File: `src/routes/perencanaan.$dppType.buat-usulan.tsx` — tambah blok baru di bawah section Lokasi. Semua sub-section pakai card dengan judul & deskripsi ringkas.

### A. Kriteria Kesiapan Administrasi Proyek
Dua card dokumen: **KAK** dan **DSKP**.

Per card:
- Tombol *Upload dokumen* (mock: simpan nama file + ukuran + waktu).
- Info file yang sudah di-upload (nama, size, tombol hapus/ganti).

Balai tidak mengisi checklist di sini — checklist adalah *field verifikator* yang terisi belakangan.

### B. Kesiapan Lahan
Baris dinamis (`+ Tambah`). Kolom per baris:
- Dropdown *Kesiapan Lahan*: Clean and Clear / Dalam proses sertifikasi / Belum dibebaskan-sengketa.
- Dropdown *Jenis Dokumen*: Sertifikat (HM / HGP / HGB), Kartu Identitas Barang, Tanah Negara (Surat pernyataan).
- Input *Nomor Dokumen* (manual).
- Upload dokumen (mock).
- Tombol hapus baris.

### C. Dokumen Perencanaan Teknis
Tiga sub-blok fixed: **Feasibility Study (FS)**, **Detail Engineering Design (DED)**, **Rincian Anggaran Biaya (RAB)**.
Per sub-blok:
- Dropdown *Status*: Ada / Dalam proses.
- Dropdown *Tahun*: 2020–2040.
- Upload dokumen.

### D. Izin Lingkungan
Baris dinamis:
- Dropdown *Status Izin*: Sudah terbit / Dalam proses / Belum diproses.
- Dropdown *Jenis Dokumen*: AMDAL / UKL-UPL / SPPL / PERTEK.
- Dropdown *Tahun*: 2020–2040.
- Input *Nomor* (manual).
- Upload dokumen.

### E. Dukungan Kebijakan
Baris dinamis. Cascading:
- Dropdown *Dukungan Kebijakan*:
  - `Program Kerja Prioritas Nasional`
  - `Prioritas Program (PP) K/L / Direktif Menteri`
  - `Tugas fungsi reguler K/L / Direktif Direktur Jenderal`
- Jika PKPN: dropdown *Klaster PKPN* (Kedaulatan Pangan, Kemandirian Energi & Air, Pendidikan, Kesehatan, Hilirisasi & Industrialisasi, Infrastruktur/Perumahan/Ketahanan Bencana, Ekonomi Kerakyatan & Desa, Penurunan Kemiskinan) → dropdown *Detail Program Kerja* (list per klaster dari Excel).
- Jika PP atau Tugas fungsi: input *Detail Kebijakan* manual.

Blok tambahan **Dukungan Tematik (opsional)**: dropdown tematik + input keterangan.

### F. Kesesuaian RTRW
Baris dinamis:
- Dropdown *Kesesuaian RTRW*: RTRW Nasional (RTRWN) / RTRW Provinsi (RTRWP) / RTRW Kabupaten-Kota (RTRWK) / Tidak sesuai.
- Input *Tahun* (manual).
- Input *Keterangan* (manual).

### Integrasi checklist form
Semua field di atas masuk state form (`useState`) dan tersimpan ke object usulan saat submit (`kesiapan: { kak, dskp, lahan[], dokTeknis{...}, izinLingkungan[], dukunganKebijakan[], dukunganTematik[], rtrw[] }`). Checklist kelengkapan submit (progress bar) mendapat item baru: "KAK terunggah", "DSKP terunggah", "Kesiapan Lahan minimal 1 baris", "FS/DED/RAB diisi", "Izin Lingkungan minimal 1 baris", "Dukungan Kebijakan minimal 1 baris", "RTRW minimal 1 baris".

---

## 2. Halaman Verifikasi Kesiapan (role Veri 1 & Veri 2)

Halaman baru: `src/routes/perencanaan.$dppType.kesiapan.$usulanId.tsx`. Akses via tombol **"Verifikasi Kesiapan"** di baris tabel `Verifikasi Masuk` (row action baru).

### Layout halaman
1. **Header ringkas**: nomor usulan, nama proyek, balai, status, badge role verifikator aktif.
2. **Activity Timeline** (kiri, sticky): daftar event terurut waktu — upload dokumen, feedback V1/V2, revisi balai, ACC. Setiap event: waktu, aktor, tipe, ringkasan.
3. **Konten kanan**: 6 section (KAK, DSKP, Lahan, Dok. Teknis, Izin Lingkungan, Dukungan Kebijakan, RTRW). Setiap section berupa card yang bisa di-expand.

### Isi per section verifikasi
- **Data dari Balai** (read-only): file yang diunggah, dropdown & isian yang dipilih.
- **Panel Verifikator**:
  - Untuk KAK & DSKP: checklist dari Excel (per komponen: sub-poin dengan checkbox + textarea catatan per komponen).
    - KAK: 15 komponen (Latar Belakang, Maksud & Tujuan, Kesesuaian Strategis, Kesesuaian Tata Ruang, Keterkaitan Proyek, Ruang Lingkup, Target & Indikator, Lokasi, Pelaksana, Jangka Waktu, Rencana Pembiayaan, Rencana Penarikan, Skema Pelaksanaan, Rencana Pengadaan, Pemantauan & Evaluasi).
    - DSKP: 7 kajian (Teknis, Ekonomi, Dampak Lingkungan & Sosial, Kelembagaan, Risiko, Potensi Pemanfaatan, Kesesuaian Prinsip Syariah).
  - Untuk section lainnya (Lahan, Dok. Teknis, Izin Lingkungan, Kebijakan, RTRW): textarea catatan per baris + tombol status per baris (Setuju / Minta Revisi / Tolak).
- **Aksi status section**: dropdown/tombol *Setuju / Minta Revisi / Tolak* level section.
- **Dua tab role**: "Evaluasi Pembina Teknis" & "Evaluasi SSPSDA" (mirip preview Word doc). Veri 1 hanya bisa edit tab Teknis; Veri 2 hanya bisa edit tab SSPSDA. Balai hanya bisa view kedua tab (read-only).

### Aturan flow
- Setelah Balai submit, semua section = `menunggu_teknis`.
- Veri 1 buka halaman → mengisi checklist/catatan per section → set status per section. Ketika **semua** section berstatus `disetujui_teknis`, status usulan naik ke `menunggu_sspsda` (otomatis).
- Sebelum semua ACC Teknis, tab Veri 2 read-only ("Menunggu penyelesaian Pembina Teknis"). Veri 2 tetap bisa melihat progres.
- Jika ada section `revisi` atau `ditolak` oleh V1, usulan kembali ke Balai (status `revisi`). Balai bisa buka Buat Usulan versi edit untuk mengganti file/isian section terkait (tombol "Revisi Usulan" di tabel Rekap ketika status = revisi). Setelah re-submit, section yang tadinya revisi kembali `menunggu_teknis`.
- Setelah V2 ACC semua section → usulan `disetujui_v2` (final).

### Modal "Lihat Penilaian" untuk role Balai
Di halaman verifikasi (dan juga dari tabel Rekap milik balai), tombol *"Lihat Penilaian"* buka modal berisi ringkasan checklist V1 & V2 per section (checkbox terkunci + catatan).

---

## 3. Data & store

- **`src/lib/kesiapan-data.ts`** (baru):
  - `KAK_KOMPONEN[]` — array 15 komponen + sub-poin (dari Excel).
  - `DSKP_KAJIAN[]` — array 7 kajian + sub-poin.
  - `KLASTER_PKPN[]` dan `PROGRAM_KERJA_BY_KLASTER` (mapping klaster → detail program).
  - Konstanta dropdown: `KESIAPAN_LAHAN_OPT`, `JENIS_DOK_LAHAN_OPT`, `STATUS_DOK_TEKNIS_OPT`, `TAHUN_2020_2040`, `STATUS_IZIN_OPT`, `JENIS_IZIN_OPT`, `DUKUNGAN_KEBIJAKAN_OPT`, `DUKUNGAN_TEMATIK_OPT`, `RTRW_OPT`.

- **`src/lib/mock-data.ts`** (edit): perluas type `Usulan` dengan optional field `kesiapan?: KesiapanUsulan` dan `verifikasiKesiapan?: { teknis: SectionVerdict[]; sspsda: SectionVerdict[]; history: TimelineEvent[] }`. Tambah tipe pendukung.

- **`src/lib/app-store.ts`** (edit): tambah action `updateKesiapan(usulanId, patch)` dan `pushKesiapanHistory(usulanId, event)`; persistensi via `localStorage` (biar bertahan antar refresh mock).

---

## 4. Komponen baru

- `src/components/kesiapan/kak-uploader.tsx` — card upload KAK.
- `src/components/kesiapan/dskp-uploader.tsx` — card upload DSKP.
- `src/components/kesiapan/lahan-rows.tsx` — tabel baris dinamis Lahan (reusable pattern).
- `src/components/kesiapan/dok-teknis-block.tsx` — FS/DED/RAB.
- `src/components/kesiapan/izin-rows.tsx`.
- `src/components/kesiapan/kebijakan-rows.tsx` (cascade PKPN → Klaster → Detail).
- `src/components/kesiapan/rtrw-rows.tsx`.
- `src/components/kesiapan/activity-timeline.tsx`.
- `src/components/kesiapan/checklist-panel.tsx` — panel verifikator untuk KAK/DSKP (checkbox + catatan).
- `src/components/kesiapan/section-verdict.tsx` — tombol Setuju / Revisi / Tolak per section + textarea.
- `src/components/kesiapan/penilaian-modal.tsx` — modal read-only untuk Balai.

Komponen di atas dipakai berdua: di form Buat Usulan (mode input balai) dan di halaman Verifikasi (mode read-only + panel verifikator). Prop `mode: "input" | "verify" | "readonly"` mengatur render.

---

## 5. UI style

Mengikuti tema project:
- Card: `bg-surface ring-1 ring-black/5 shadow-card rounded-xl p-6`.
- Status verdict badge pakai varian `StatusBadge` existing atau ekstensi ringan (`disetujui_teknis`, `disetujui_sspsda`, `revisi`, `ditolak`).
- Timeline pakai ikon Lucide (`Upload`, `Check`, `AlertCircle`, `X`, `RefreshCw`), dot warna sesuai tipe event.
- Semua textarea/select/input pakai style yang sudah ada di form Buat Usulan (`bg-surface border border-border rounded-md text-sm`).

---

## 6. File yang berubah

**Baru**
- `src/lib/kesiapan-data.ts`
- `src/routes/perencanaan.$dppType.kesiapan.$usulanId.tsx`
- `src/components/kesiapan/*` (9 komponen di atas)

**Edit**
- `src/routes/perencanaan.$dppType.buat-usulan.tsx` — tambah section Kesiapan di bawah Lokasi + integrasi state & submit.
- `src/lib/mock-data.ts` — perluas type `Usulan`, tambah tipe verifikasi.
- `src/lib/app-store.ts` — action baru + persist.
- `src/components/usulan-table.tsx` — tombol "Verifikasi Kesiapan" pada baris untuk role verif; "Lihat Penilaian" untuk role balai.

Setuju dieksekusi seperti ini?
