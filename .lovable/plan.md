# Revisi SIPRO-SDA

## 1. Hapus akses publik → wajib login

- Hapus role `publik`. Tambah state `loggedIn` di app-store.
- `__root.tsx`: jika belum login → render **halaman login** (tanpa sidebar/header).
- `src/routes/login.tsx` baru: form sederhana (username + password mock) + pilihan role demo (Balai / Pembina Teknis / SSPSDA) + tombol Masuk.
- Tombol **Keluar** di sidebar (ganti role switcher → muncul setelah login, kembali ke `/login`).

## 2. Struktur sidebar baru (sama untuk 3 role, beda di sub-menu tertentu)

Semua role melihat:

- Home
- Studi Pendahuluan
- **Perencanaan**
  - Rincian DPP Awal (group, 3-level nested)
    - Rekap Usulan
    - Buat Usulan *(balai & sspsda)*
    - Verif Masuk (Teknis (verif dari daftar usulan balai) & sspsda (verif dari hasil usulan yang di verif teknis))
    - Laporan / Cetak (untuk role teknis akan muncul sub menu lagi bernama rekomtek dan surat usulan. Untuk Balai dan sspsda hanya akan muncul sub menu surat usulan)
    - Riwayat
  - Perubahan Rincian DPP (struktur sub-menu identik dengan Rincian DPP Awal, data = versi terbaru)
- Pelaksanaan
- Evaluasi
- Peraturan

SSPSDA tambahan: menu **Pengaturan Menu** untuk meng-aktifkan / non-aktifkan submenu *Rincian DPP Awal* & *Perubahan Rincian DPP*.

## 3. Routing

Pakai dynamic segment `$dppType` (`awal` | `perubahan`) supaya satu set komponen melayani kedua sub-menu:

/perencanaan/$dppType                  → layout (cek toggle SSPSDA, jika non-aktif tampilkan pesan terkunci)  
/perencanaan/$dppType/rekap            → Rekap Usulan T+1  
/perencanaan/$dppType/buat-usulan      → Form Buat Usulan (balai/sspsda)  
/perencanaan/$dppType/laporan          → Laporan / Cetak  
/perencanaan/$dppType/riwayat          → Riwayat aktivitas (filter per role)  
/perencanaan/$dppType/verifikasi       → Verif Masuk (teknis)  
/perencanaan/$dppType/rekomtek         → Form & generator Rekomtek (teknis)

Hapus route lama: `balai.*`, `teknis.*`, `sspsda.*`, `verifikasi.tsx`, `verifikasi-akhir.tsx`, `perencanaan.rincian-dpp.tsx`, `perencanaan.perubahan-dpp.tsx`, `usulan.*`.

## 4. Form Rekomtek (teknis)

Input: Kementerian/Lembaga · Unit Eselon · Satuan Kerja · Latar Belakang · Dasar Hukum · Maksud & Tujuan · Output & Outcome · Biaya & Tahapan · Waktu Pelaksanaan.
Preview dokumen dengan template formal + paragraf penutup auto-generate (mengandung nama proyek). Tombol **Cetak / Simpan PDF** via `window.print()` dengan stylesheet print khusus.

## 5. Toggle SSPSDA

- Tambah `dppAwalEnabled`, `dppPerubahanEnabled` di app-store.
- Halaman `pengaturan.tsx`: dua switch (khusus role SSPSDA).
- Layout `/perencanaan/$dppType` cek toggle: kalau non-aktif → kartu "Menu belum dapat diakses. Menunggu SSPSDA mengaktifkan." (SSPSDA tetap bisa lewat link "Buka Pengaturan").

## 6. Studi Pendahuluan

Ganti slide viewer → **daftar PDF per tahun** (grouped by tahun, tiap item: judul, ukuran, tombol Download). Pakai mock PDF (data-URL kecil) sehingga benar-benar bisa di-download.

## 7. Mock data

- Tambah field `tahap: "awal" | "perubahan"` di `Usulan`. Default existing = "awal"; tambahkan beberapa mock "perubahan".
- Hapus role `publik` dari `Role` union.

## 8.  Rekomtek

adalah menu rekomendasi teknis yang berguna untuk menampilkan daftar rekomendasi teknis yang telah diinput oleh role teknis. Hasilnya adalah PDF yang memiliki template yang sama namun ada perbedaan nilai berdasarkan inputan yang telah dilakukan oleh teknis 

## File yang berubah

- **Baru**: `routes/login.tsx`, `routes/perencanaan.$dppType.tsx` + 7 sub-route, ulang `routes/studi-pendahuluan.tsx`.
- **Edit**: `app-store.ts`, `mock-data.ts`, `__root.tsx`, `app-sidebar.tsx`, `app-header.tsx`, `index.tsx`, `pengaturan.tsx`, `routeTree.gen.ts`.
- **Hapus**: balai.*, teknis.*, sspsda.*, verifikasi*.tsx, perencanaan.rincian-dpp.tsx, perencanaan.perubahan-dpp.tsx, usulan.*.

Setuju saya eksekusi semuanya?