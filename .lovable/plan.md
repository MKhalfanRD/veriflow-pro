# Rencana: Landing Page Publik + Restrukturisasi Sidebar per Role

## 1. Konsep akses

- **Publik (tanpa login)**: dapat akses landing page + dashboard ringkas (data agregat saja, tanpa detail anggaran/dokumen/catatan internal).
- **Login (3 role)**: lihat data sesuai role + akses menu kerja masing-masing.
- Untuk demo masih pakai role-switcher (belum integrasi auth). Tambah opsi "Publik" di switcher.

## 2. Struktur route baru

```text
src/routes/
  __root.tsx                       (shell: sidebar publik vs sidebar role)
  index.tsx                        Landing Home (publik)
  studi-pendahuluan.tsx            Slide preview publik
  perencanaan.rincian-dpp.tsx      Tabel proyek per prioritas (dari usulan)
  perencanaan.perubahan-dpp.tsx    Tabel proyek yang diedit
  pelaksanaan.tsx                  Dummy publik
  evaluasi.tsx                     Dummy publik
  peraturan.tsx                    Dummy publik (list peraturan)

  # Balai
  balai.rekap.tsx                  Rekap T+1 (balai aktif saja)
  usulan.baru.tsx                  (existing)
  balai.laporan.tsx                Daftar usulan balai yang disetujui V2

  # Teknis (verif1)
  teknis.rekap.tsx                 Rekap T+1 (lingkup teknis)
  verifikasi.tsx                   (existing)
  teknis.laporan.surat.tsx         Surat usulan disetujui V2
  teknis.laporan.rekomtek.tsx      PDF rekomtek

  # SSPSDA (verif2)
  sspsda.rekap.tsx                 Rekap T+1 (semua SDA)
  verifikasi-akhir.tsx             (existing)
  sspsda.laporan.tsx               Semua surat disetujui V2

  riwayat.tsx                      (existing — filter per role)
```

## 3. Sidebar dinamis (`app-sidebar.tsx`)

Switch berdasar role aktif (`publik | balai | verif1 | verif2`):

- **Publik**: Home, Studi Pendahuluan, Perencanaan ▸ (Rincian DPP, Perubahan DPP), Pelaksanaan DPP, Evaluasi, Peraturan.
- **Balai**: Rekap Usulan T+1, Buat Usulan, Laporan/Cetak, Riwayat.
- **Teknis**: Rekap Usulan T+1, Verif Masuk, Laporan/Cetak ▸ (Surat Usulan, Rekomtek), Riwayat.
- **SSPSDA**: Rekap Usulan T+1, Verif Masuk, Laporan/Cetak, Riwayat.

Pakai komponen `Collapsible` (sudah ada) untuk sub-menu.

## 4. Landing Home (publik dashboard)

Dashboard mirip `index.tsx` lama tapi data yang ditampilkan publik:
- KPI agregat: total usulan, jumlah per prioritas, jumlah disetujui V2, total balai.
- Chart distribusi per prioritas, per balai.
- **Tidak ditampilkan**: angka anggaran detail, catatan revisi, nama verifikator, dokumen.
- Daftar proyek disetujui V2 (read-only, kolom: nama, balai, prioritas, status — tanpa rupiah/dokumen).

## 5. Halaman publik lain

- **Studi Pendahuluan**: slide deck (prev/next + indicator), 4-5 slide dummy berisi latar belakang, tujuan, metodologi, hasil.
- **Rincian DPP Awal**: ambil dari `usulan` store, group by prioritas (nasional → menteri → dirjen), tampil tabel nomor/kegiatan/balai/tahun. Tanpa rupiah.
- **Perubahan Rincian DPP**: filter usulan yang status `revisi` atau pernah diedit (tandai dengan flag `diubah` di mock). Tampil perubahan + tanggal.
- **Pelaksanaan / Evaluasi / Peraturan**: konten dummy (cards/list peraturan PUPR, dsb.).

## 6. Halaman role baru

- **Rekap T+1** (3 varian): heading "Rekap Usulan TA {currentYear+1}", tabel + ringkasan, filter scope:
  - balai: `u.balai === currentBalai` (pakai "BBWS Bengawan Solo" sebagai balai aktif demo)
  - teknis: semua kecuali `draft`
  - sspsda: semua
- **Laporan/Cetak**: list usulan dengan `status === 'disetujui_v2'`, tombol "Cetak" → buka berita acara existing. Untuk teknis ada sub Rekomtek (list + tombol unduh PDF dummy).
- **Riwayat**: filter event sesuai role (balai → event balai-nya, teknis → semua verif V1, sspsda → semua verif V2 + grouping per role).

## 7. Detail teknis

- Tambah `Role = "publik" | ...` di `mock-data.ts`. Default role saat load = `publik`.
- Tambah field opsional `tanggalEdit` & flag `diubah` di beberapa mock untuk Perubahan DPP.
- `app-header.tsx`: untuk publik sembunyikan tombol "Buat Usulan" dan ganti judul.
- `__root.tsx`: jika role `publik`, header tampilkan tombol "Masuk" (dummy, buka switcher).
- Berita acara & detail drawer: sembunyikan info sensitif jika role `publik`.

## 8. Yang TIDAK diubah

- Skema warna / typography / komponen UI dasar.
- Form `usulan.baru`, `detail-drawer`, `usulan-table`, `berita-acara` (hanya tambah guard publik).
- Belum sambung backend / auth real — masih in-memory store.

Setelah disetujui, saya implementasi semua sekaligus dalam satu batch.