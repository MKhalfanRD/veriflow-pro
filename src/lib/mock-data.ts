export type Role = "publik" | "balai" | "verif1" | "verif2";

export type Prioritas = "nasional" | "menteri" | "dirjen";

export const PRIORITAS_NILAI: Record<Prioritas, number> = {
  nasional: 3,
  menteri: 2,
  dirjen: 1,
};

export const PRIORITAS_LABEL: Record<Prioritas, string> = {
  nasional: "Prioritas Nasional",
  menteri: "Usulan Menteri",
  dirjen: "Usulan Dirjen",
};

export type StatusUsulan =
  | "draft"
  | "menunggu_v1"
  | "revisi"
  | "disetujui_v1"
  | "ditolak_v1"
  | "menunggu_v2"
  | "disetujui_v2"
  | "tidak_dilanjutkan";

export const STATUS_LABEL: Record<StatusUsulan, string> = {
  draft: "Draf",
  menunggu_v1: "Menunggu Verifikator 1",
  revisi: "Perlu Revisi",
  disetujui_v1: "Disetujui Verifikator 1",
  ditolak_v1: "Ditolak Verifikator 1",
  menunggu_v2: "Menunggu Verifikator 2",
  disetujui_v2: "Disetujui Verifikator 2",
  tidak_dilanjutkan: "Tidak Dilanjutkan",
};

export interface DokumenPendukung {
  nama: string;
  tipe: "teknis" | "administrasi" | "lainnya";
  ukuran: string;
}

export interface Usulan {
  id: string;
  nomor: string;
  namaKegiatan: string;
  lokasi: string;
  deskripsi: string;
  anggaran: number;
  tahun: number;
  balai: string;
  prioritas: Prioritas;
  status: StatusUsulan;
  tanggalPengajuan: string;
  tanggalVerifV1?: string;
  tanggalEdit?: string;
  diubah?: boolean;
  catatanRevisi?: string;
  alasanTidakDilanjutkan?: string;
  verifikatorV1?: string;
  verifikatorV2?: string;
  dokumen: DokumenPendukung[];
}

export const BALAI_LIST = [
  "BBWS Bengawan Solo",
  "BBWS Ciliwung Cisadane",
  "BBWS Cimanuk Cisanggarung",
  "BWS Sumatera II",
  "BWS Nusa Tenggara II",
  "BBWS Citarum",
];

/** Balai aktif untuk demo (role = balai) */
export const CURRENT_BALAI = "BBWS Bengawan Solo";

/** Tahun perencanaan (T+1) */
export const TAHUN_PERENCANAAN = new Date().getFullYear() + 1;

export const USULAN_MOCK: Usulan[] = [
  {
    id: "u1",
    nomor: "USL-2025-0012",
    namaKegiatan: "Rehabilitasi Bendungan Wonogiri",
    lokasi: "Wonogiri, Jawa Tengah",
    deskripsi:
      "Rehabilitasi struktur tubuh bendungan, perbaikan spillway, dan peningkatan kapasitas tampung untuk pengendalian banjir hilir.",
    anggaran: 125_000_000_000,
    tahun: TAHUN_PERENCANAAN,
    balai: "BBWS Bengawan Solo",
    prioritas: "nasional",
    status: "menunggu_v1",
    tanggalPengajuan: "2025-05-12",
    dokumen: [
      { nama: "KAK_Wonogiri.pdf", tipe: "teknis", ukuran: "2.4 MB" },
      { nama: "RAB_Detail.pdf", tipe: "teknis", ukuran: "1.1 MB" },
      { nama: "Surat_Pengantar.pdf", tipe: "administrasi", ukuran: "320 KB" },
    ],
  },
  {
    id: "u2",
    nomor: "USL-2025-0015",
    namaKegiatan: "Normalisasi Sungai Ciliwung Paket 2",
    lokasi: "DKI Jakarta",
    deskripsi:
      "Pengerukan sedimen, perkuatan tebing, dan pembangunan tanggul sepanjang 4,2 km untuk mengurangi risiko banjir.",
    anggaran: 87_500_000_000,
    tahun: TAHUN_PERENCANAAN,
    balai: "BBWS Ciliwung Cisadane",
    prioritas: "menteri",
    status: "revisi",
    tanggalPengajuan: "2025-05-10",
    tanggalEdit: "2025-05-18",
    diubah: true,
    catatanRevisi:
      "Mohon lengkapi DED segmen STA 2+400 hingga 3+800, serta perbarui RAB sesuai HSPK terbaru.",
    verifikatorV1: "Ir. Budi Santoso, M.T.",
    dokumen: [
      { nama: "KAK_Ciliwung.pdf", tipe: "teknis", ukuran: "3.1 MB" },
      { nama: "RAB.pdf", tipe: "teknis", ukuran: "980 KB" },
      { nama: "SK_Penetapan.pdf", tipe: "administrasi", ukuran: "210 KB" },
    ],
  },
  {
    id: "u3",
    nomor: "USL-2025-0018",
    namaKegiatan: "Pembangunan Embung Giriroto",
    lokasi: "Boyolali, Jawa Tengah",
    deskripsi:
      "Pembangunan embung kapasitas 320.000 m³ untuk irigasi pertanian 480 ha dan suplai air baku.",
    anggaran: 32_000_000_000,
    tahun: TAHUN_PERENCANAAN,
    balai: "BBWS Bengawan Solo",
    prioritas: "dirjen",
    status: "disetujui_v1",
    tanggalPengajuan: "2025-05-08",
    tanggalVerifV1: "2025-05-14",
    verifikatorV1: "Ir. Budi Santoso, M.T.",
    dokumen: [
      { nama: "KAK_Giriroto.pdf", tipe: "teknis", ukuran: "1.8 MB" },
      { nama: "DED_Embung.pdf", tipe: "teknis", ukuran: "5.2 MB" },
      { nama: "RAB.pdf", tipe: "teknis", ukuran: "620 KB" },
      { nama: "Surat_Bupati.pdf", tipe: "administrasi", ukuran: "180 KB" },
    ],
  },
  {
    id: "u4",
    nomor: "USL-2025-0021",
    namaKegiatan: "Pemeliharaan Irigasi Rentang",
    lokasi: "Majalengka, Jawa Barat",
    deskripsi:
      "Pemeliharaan rutin jaringan irigasi DI Rentang seluas 4.260 Ha, termasuk rehabilitasi bangunan bagi.",
    anggaran: 18_700_000_000,
    tahun: TAHUN_PERENCANAAN,
    balai: "BBWS Cimanuk Cisanggarung",
    prioritas: "nasional",
    status: "menunggu_v2",
    tanggalPengajuan: "2025-04-28",
    tanggalVerifV1: "2025-05-06",
    tanggalEdit: "2025-05-02",
    diubah: true,
    verifikatorV1: "Ir. Budi Santoso, M.T.",
    dokumen: [
      { nama: "KAK_Rentang.pdf", tipe: "teknis", ukuran: "2.1 MB" },
      { nama: "RAB_Pemeliharaan.pdf", tipe: "teknis", ukuran: "740 KB" },
      { nama: "Surat_Usulan.pdf", tipe: "administrasi", ukuran: "260 KB" },
    ],
  },
  {
    id: "u5",
    nomor: "USL-2025-0024",
    namaKegiatan: "Pembangunan Tanggul Kali Gading",
    lokasi: "Kalimantan Tengah",
    deskripsi:
      "Pembangunan tanggul pengendali banjir sepanjang 6 km melindungi kawasan permukiman dan pertanian.",
    anggaran: 64_300_000_000,
    tahun: TAHUN_PERENCANAAN,
    balai: "BWS Sumatera II",
    prioritas: "menteri",
    status: "disetujui_v2",
    tanggalPengajuan: "2025-04-15",
    tanggalVerifV1: "2025-04-22",
    verifikatorV1: "Ir. Budi Santoso, M.T.",
    verifikatorV2: "Dr. Ir. Hendra Wijaya",
    dokumen: [
      { nama: "KAK.pdf", tipe: "teknis", ukuran: "2.6 MB" },
      { nama: "DED.pdf", tipe: "teknis", ukuran: "4.1 MB" },
      { nama: "RAB.pdf", tipe: "teknis", ukuran: "880 KB" },
    ],
  },
  {
    id: "u6",
    nomor: "USL-2025-0027",
    namaKegiatan: "Normalisasi Drainase Utama Kota",
    lokasi: "Bandung, Jawa Barat",
    deskripsi: "Normalisasi saluran drainase primer pusat kota.",
    anggaran: 22_400_000_000,
    tahun: TAHUN_PERENCANAAN,
    balai: "BBWS Citarum",
    prioritas: "dirjen",
    status: "tidak_dilanjutkan",
    tanggalPengajuan: "2025-04-10",
    tanggalVerifV1: "2025-04-18",
    verifikatorV1: "Ir. Budi Santoso, M.T.",
    verifikatorV2: "Dr. Ir. Hendra Wijaya",
    alasanTidakDilanjutkan:
      "Kegiatan tumpang tindih dengan program pemerintah daerah tahun berjalan.",
    dokumen: [
      { nama: "KAK.pdf", tipe: "teknis", ukuran: "1.4 MB" },
      { nama: "RAB.pdf", tipe: "teknis", ukuran: "520 KB" },
    ],
  },
  {
    id: "u7",
    nomor: "USL-2025-0029",
    namaKegiatan: "Pembangunan Embung Desa Sejahtera",
    lokasi: "Sikka, NTT",
    deskripsi: "Pembangunan embung air baku 180.000 m³ untuk wilayah kering.",
    anggaran: 14_200_000_000,
    tahun: TAHUN_PERENCANAAN,
    balai: "BWS Nusa Tenggara II",
    prioritas: "dirjen",
    status: "draft",
    tanggalPengajuan: "2025-05-20",
    dokumen: [
      { nama: "KAK_Draft.pdf", tipe: "teknis", ukuran: "1.2 MB" },
    ],
  },
  {
    id: "u8",
    nomor: "USL-2025-0031",
    namaKegiatan: "Rehabilitasi Bendung Colo",
    lokasi: "Sukoharjo, Jawa Tengah",
    deskripsi: "Rehabilitasi bendung utama dan jaringan primer untuk irigasi 22.000 Ha.",
    anggaran: 48_500_000_000,
    tahun: TAHUN_PERENCANAAN,
    balai: "BBWS Bengawan Solo",
    prioritas: "menteri",
    status: "disetujui_v2",
    tanggalPengajuan: "2025-03-29",
    tanggalVerifV1: "2025-04-08",
    verifikatorV1: "Ir. Budi Santoso, M.T.",
    verifikatorV2: "Dr. Ir. Hendra Wijaya",
    dokumen: [
      { nama: "KAK_Colo.pdf", tipe: "teknis", ukuran: "2.9 MB" },
      { nama: "DED.pdf", tipe: "teknis", ukuran: "6.2 MB" },
      { nama: "RAB.pdf", tipe: "teknis", ukuran: "920 KB" },
    ],
  },
];

export function formatRupiah(n: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(n);
}

export function formatTanggal(iso: string): string {
  return new Date(iso).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
