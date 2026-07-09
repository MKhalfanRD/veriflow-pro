// Konstanta & tipe untuk fitur Kesiapan Proyek SBSN

// ============ Types ============
export interface UploadedFile {
  nama: string;
  ukuran: string;
  waktu: string; // ISO
}

export interface LahanRow {
  id: string;
  kesiapan: string;
  jenisDok: string;
  nomorDok: string;
  file?: UploadedFile;
}

export interface DokTeknisEntry {
  status: string;
  tahun: string;
  file?: UploadedFile;
}

export interface DokTeknis {
  fs: DokTeknisEntry;
  ded: DokTeknisEntry;
  rab: DokTeknisEntry;
}

export interface IzinRow {
  id: string;
  statusIzin: string;
  jenisDok: string;
  tahun: string;
  nomor: string;
  file?: UploadedFile;
}

export interface KebijakanRow {
  id: string;
  jenis: string; // PKPN | PP | Tugas
  klaster?: string; // hanya PKPN
  detailProgram?: string; // PKPN → dari list
  detailKebijakan?: string; // PP / Tugas → manual
}

export interface TematikRow {
  id: string;
  tematik: string;
  keterangan: string;
}

export interface RtrwRow {
  id: string;
  kesesuaian: string;
  tahun: string;
  keterangan: string;
}

export interface KesiapanUsulan {
  kak?: UploadedFile;
  dskp?: UploadedFile;
  lahan: LahanRow[];
  dokTeknis: DokTeknis;
  izinLingkungan: IzinRow[];
  dukunganKebijakan: KebijakanRow[];
  dukunganTematik: TematikRow[];
  rtrw: RtrwRow[];
}

export type SectionKey =
  | "kak"
  | "dskp"
  | "lahan"
  | "dokTeknis"
  | "izinLingkungan"
  | "dukunganKebijakan"
  | "rtrw";

export type VerdictStatus =
  | "menunggu"
  | "disetujui"
  | "revisi"
  | "ditolak";

export interface SectionVerdict {
  status: VerdictStatus;
  catatan: string;
  // Untuk KAK/DSKP: checklist per komponen
  // key = kode komponen, value = { checkedItems: string[]; catatan: string }
  checklist?: Record<string, { checked: string[]; catatan: string }>;
}

export interface VerifikasiKesiapan {
  teknis: Partial<Record<SectionKey, SectionVerdict>>;
  sspsda: Partial<Record<SectionKey, SectionVerdict>>;
  history: TimelineEvent[];
}

export type TimelineEventType =
  | "upload"
  | "submit"
  | "setuju"
  | "revisi"
  | "tolak"
  | "resubmit"
  | "final";

export interface TimelineEvent {
  id: string;
  waktu: string; // ISO
  aktor: string; // e.g. "Balai / Andi Maulana" atau "Pembina Teknis / Budi Santoso"
  tipe: TimelineEventType;
  ringkasan: string;
}

// ============ Checklist KAK & DSKP (dari Excel) ============
export interface KomponenChecklist {
  kode: string;
  nama: string;
  poin: string[];
}

export const KAK_KOMPONEN: KomponenChecklist[] = [
  {
    kode: "K1",
    nama: "Latar Belakang & Alasan Pengusulan",
    poin: [
      "Analisis kebutuhan (kondisi eksisting, permasalahan, gap saat ini vs diharapkan).",
      "Urgensi & justifikasi proyek sebagai solusi paling tepat, didukung data/referensi relevan.",
      "Rumusan tujuan yang ingin dicapai.",
    ],
  },
  {
    kode: "K2",
    nama: "Maksud dan Tujuan Proyek",
    poin: [
      "Maksud pelaksanaan proyek secara jelas dan relevan dengan kebutuhan.",
      "Tujuan proyek dirumuskan secara spesifik, terukur, dan dapat dievaluasi.",
      "Manfaat atau hasil (outcome) yang diharapkan.",
    ],
  },
  {
    kode: "K3",
    nama: "Kesesuaian Strategis",
    poin: [
      "Pemetaan kontribusi proyek terhadap Prioritas Nasional dan target RPJMN 2025-2029.",
      "Keterkaitan dengan Program Prioritas / Kegiatan Prioritas / Proyek Prioritas.",
      "Rujukan terhadap arahan Presiden atau kebijakan strategis pemerintah lainnya.",
    ],
  },
  {
    kode: "K4",
    nama: "Kesesuaian Tata Ruang (RTRW)",
    poin: [
      "Penjelasan kesesuaian lokasi proyek dengan rencana pola & struktur ruang RTRW.",
      "Bukti evaluasi tata ruang berupa peta lokasi, koordinat, dan/atau overlay RTRW.",
    ],
  },
  {
    kode: "K5",
    nama: "Keterkaitan Proyek",
    poin: [
      "Hubungan dengan proyek lain (complementary, supporting, atau bagian sistem terintegrasi).",
      "Identifikasi potensi duplikasi atau tumpang tindih anggaran.",
      "Kontribusi/keterhubungan lintas sektor & dampak multiplier effect.",
      "Hubungan spasial dan konektivitas antar wilayah.",
    ],
  },
  {
    kode: "K6",
    nama: "Ruang Lingkup dan Komponen",
    poin: [
      "Jenis pekerjaan berdasarkan tahapan (Perencanaan/Review DED, Pelaksanaan, Pengawasan).",
      "Rincian komponen dan/atau output utama di setiap tahapan.",
      "Justifikasi kebutuhan dan fungsi setiap komponen proyek.",
    ],
  },
  {
    kode: "K7",
    nama: "Target dan Indikator Pencapaian",
    poin: [
      "Rumusan target kondisi/hasil akhir proyek secara spesifik.",
      "Indikator keberhasilan memenuhi kriteria SMART.",
      "Alur logis Output → Outcome → Impact.",
    ],
  },
  {
    kode: "K8",
    nama: "Lokasi Pelaksanaan Proyek",
    poin: [
      "Kejelasan wilayah administrasi (Provinsi, Kabupaten/Kota).",
      "Justifikasi rasional pemilihan lokasi sesuai tujuan proyek.",
      "Dokumentasi lengkap: foto kondisi eksisting, peta lokasi, koordinat.",
    ],
  },
  {
    kode: "K9",
    nama: "Pelaksana & Pembagian Kerja",
    poin: [
      "Rencana struktur organisasi pelaksana (unit kerja, penanggung jawab, koordinasi).",
      "Rincian pembagian tugas, peran, dan tanggung jawab masing-masing pihak.",
    ],
  },
  {
    kode: "K10",
    nama: "Jangka Waktu dan Jadwal",
    poin: [
      "Jangka waktu keseluruhan proyek & tahun anggaran pelaksanaan.",
      "Jadwal rinci (Gantt) dari persiapan → pengadaan → konstruksi → penyelesaian.",
      "Khusus MYC: pembagian tahapan dan target capaian per tahun anggaran.",
    ],
  },
  {
    kode: "K11",
    nama: "Rencana Pembiayaan",
    poin: [
      "Total kebutuhan anggaran proyek keseluruhan.",
      "Rincian pembiayaan berbasis komponen atau output proyek.",
      "Rincian alokasi per tahun anggaran (jika >1 tahun).",
      "Kejelasan sumber dana (porsi SBSN & porsi pendanaan lain jika ada).",
    ],
  },
  {
    kode: "K12",
    nama: "Rencana Penarikan Anggaran",
    poin: [
      "Rencana penarikan anggaran bulanan yang selaras dengan tahapan fisik & jadwal pelaksanaan.",
    ],
  },
  {
    kode: "K13",
    nama: "Skema Pelaksanaan",
    poin: [
      "Justifikasi pemilihan skema Kontrak Tahun Tunggal (SYC) atau Tahun Jamak (MYC).",
      "Rasionalisasi kebutuhan waktu pelaksanaan proyek yang wajar.",
    ],
  },
  {
    kode: "K14",
    nama: "Rencana Pengadaan Barang/Jasa",
    poin: [
      "Daftar rencana paket pengadaan sesuai ruang lingkup.",
      "Metode & strategi pelaksanaan pengadaan.",
      "Jadwal pengadaan selaras dengan jadwal proyek.",
      "Identifikasi ketersediaan barang/material dalam negeri (TKDN).",
      "Jika ada pengadaan luar negeri: penjelasan & rasionalisasi impor.",
      "Jika hanya pengadaan barang tanpa konstruksi: lampiran perbandingan harga min. 3 penyedia.",
    ],
  },
  {
    kode: "K15",
    nama: "Pemantauan dan Evaluasi",
    poin: [
      "Mekanisme & kepastian waktu pelaksanaan pemantauan & evaluasi internal selama proyek berjalan.",
    ],
  },
];

export const DSKP_KAJIAN: KomponenChecklist[] = [
  {
    kode: "D1",
    nama: "Kajian Teknis",
    poin: [
      "Analisis aspek teknis (pendekatan, konsep, spesifikasi utama).",
      "Matriks kelengkapan dokumen pendukung teknis (DED, FS, RAB, RPD, Amdal, Masterplan).",
      "Kesiapan fisik (lahan, akses lokasi, utilitas, sumber material, metode konstruksi).",
      "Rencana & progres pemrosesan perizinan teknis.",
      "Analisis kapasitas pelaksana (struktur organisasi, SDM, pengalaman SBSN).",
    ],
  },
  {
    kode: "D2",
    nama: "Kajian Ekonomi",
    poin: [
      "Analisis manfaat & biaya (CBA/CEA/EIRR).",
      "Penjelasan kuantifikasi manfaat ekonomi & peningkatan pelayanan publik.",
    ],
  },
  {
    kode: "D3",
    nama: "Kajian Dampak Lingkungan & Sosial",
    poin: [
      "Lingkungan: kondisi awal, identifikasi dampak, rencana pengelolaan & pemantauan, kesesuaian Green Project.",
      "Sosial: kondisi sosial, kelompok terdampak, rencana pengelolaan dampak, mitigasi risiko sosial.",
    ],
  },
  {
    kode: "D4",
    nama: "Kajian Kelembagaan",
    poin: [
      "Identifikasi stakeholders yang terlibat/terdampak.",
      "Peran, tanggung jawab & mekanisme koordinasi antarinstansi.",
      "Kapasitas kelembagaan pelaksana & tusi satker.",
      "Kebutuhan penguatan kapasitas jika ada keterbatasan.",
      "Rencana pengelolaan & operasionalisasi aset setelah proyek selesai.",
    ],
  },
  {
    kode: "D5",
    nama: "Kajian Risiko",
    poin: [
      "Identifikasi risiko komprehensif (teknis, ekonomi, kelembagaan, hukum, lingkungan, sosial, politik, pengadaan, pembiayaan).",
      "Analisis probabilitas & dampak tiap risiko.",
      "Langkah mitigasi konkret untuk mengurangi dampak risiko.",
    ],
  },
  {
    kode: "D6",
    nama: "Kajian Potensi Pemanfaatan",
    poin: [
      "Identifikasi penerima manfaat langsung & tidak langsung.",
      "Indikator/ukuran keberhasilan pemanfaatan proyek.",
      "Rencana pasca-konstruksi: unit penanggung jawab operasional, SDM, biaya O&M per tahun.",
    ],
  },
  {
    kode: "D7",
    nama: "Kajian Kesesuaian Prinsip Syariah",
    poin: [
      "Kesesuaian seluruh siklus proyek dengan prinsip syariah.",
      "Referensi terhadap ketentuan atau Fatwa DSN-MUI yang relevan.",
    ],
  },
];

// ============ Dropdown options ============
export const KESIAPAN_LAHAN_OPT = [
  "Lahan Clean and Clear",
  "Lahan dalam proses sertifikasi",
  "Lahan belum dibebaskan/sengketa",
];

export const JENIS_DOK_LAHAN_OPT = [
  "Sertifikat Hak Milik",
  "Sertifikat Hak Guna Pakai",
  "Sertifikat Hak Guna Bangun",
  "Kartu Identitas Barang",
  "Tanah Negara (Surat Pernyataan)",
];

export const STATUS_DOK_TEKNIS_OPT = ["Ada", "Dalam proses"];

export const TAHUN_2020_2040: string[] = Array.from({ length: 21 }, (_, i) => String(2020 + i));

export const STATUS_IZIN_OPT = [
  "Izin Lingkungan sudah terbit",
  "Izin Lingkungan dalam proses",
  "Izin Lingkungan belum diproses",
];

export const JENIS_IZIN_OPT = ["AMDAL", "UKL-UPL", "SPPL", "PERTEK"];

export const DUKUNGAN_KEBIJAKAN_OPT = [
  "Program Kerja Prioritas Nasional",
  "Prioritas Program (PP) K/L / Direktif Menteri",
  "Tugas Fungsi Reguler K/L / Direktif Direktur Jenderal",
];

export const DUKUNGAN_TEMATIK_OPT = [
  "Green Project",
  "Blue Economy",
  "Ketahanan Pangan",
  "Ketahanan Air",
  "Pemulihan Ekonomi",
  "Kesetaraan Gender",
];

export const RTRW_OPT = [
  "Selaras dengan RTRW Nasional (RTRWN)",
  "Selaras dengan RTRW Provinsi (RTRWP)",
  "Selaras dengan RTRW Kabupaten/Kota (RTRWK)",
  "Tidak sesuai / memerlukan revisi tata ruang",
];

// ============ Klaster PKPN & Detail Program Kerja ============
export const KLASTER_PKPN = [
  "Kedaulatan Pangan",
  "Kemandirian Energi dan Air",
  "Pendidikan",
  "Kesehatan",
  "Hilirisasi dan Industrialisasi",
  "Infrastruktur, Perumahan dan Ketahanan Bencana",
  "Ekonomi Kerakyatan dan Desa",
  "Penurunan Kemiskinan",
] as const;

export const PROGRAM_KERJA_BY_KLASTER: Record<string, string[]> = {
  "Kedaulatan Pangan": [
    "5.000 Kampung Nelayan Merah Putih",
    "4.582 Kapal Ikan Modern",
    "40.000 Lokasi Budidaya Ikan Darat Tematik",
    "Revitalisasi Tambak Nila Salin 14.090 Ha di Pantura",
    "Modeling dan Replikasi 2.000 Ha Tambak Udang Terintegrasi",
    "2.000 Ha Kawasan Sentra Industri Garam Nasional",
    "Pengembangan Kawasan Pangan Terintegrasi",
    "Pengembangan Kawasan Perkebunan (Sawit, Tebu, Kakao, Kelapa, Kopi, Jambu Mete, Rempah)",
    "Peningkatan Produksi Daging, Susu, dan Telur",
  ],
  "Kemandirian Energi dan Air": [
    "Mandatori Biodiesel 50 (B50)",
    "Mandatori Bioetanol 20 (E20)",
    "Program Pembangkit Listrik Tenaga Surya (PLTS) 100 GW",
    "Implementasi Standar Kinerja Energi Minimum (SKEM)",
    "Konversi 6 Juta Unit Motor BBM ke Motor Listrik",
    "Pembangunan Jaringan Gas Kota (Jargas) 1 Juta SR",
    "Peningkatan Lifting Minyak dan Gas Bumi",
    "10 Small Scale Green Modular Refinery and 6 Storage",
    "Eksplorasi 10 Blok Migas Baru",
    "Elektrifikasi 10.000 Desa",
    "Pengelolaan Sampah menjadi Energi Listrik (PSEL)",
    "PLTA Skala Besar Terintegrasi",
    "Kompor Listrik untuk 2-5 Juta Rumah Tangga",
    "Optimalisasi 45.000 Sumur Minyak Masyarakat",
    "Optimalisasi Lifting di 13.824 Sumur Tua",
    "Swasembada Air",
  ],
  Pendidikan: [
    "Makan Bergizi Gratis Anak Sekolah",
    "Revitalisasi Sarana dan Prasarana Sekolah/Madrasah",
    "Bantuan Perlengkapan Sekolah",
    "500 Sekolah Nasional Terintegrasi (SNT)",
    "Studio Guru",
    "Digitalisasi Pendidikan (2 Juta Papan Interaktif Digital)",
    "20 Sekolah Garuda Baru, 80 Sekolah Garuda Transformasi",
    "514 Sekolah Rakyat",
    "10 Universities Baru: Medical University berbasis STEMM",
    "500.000 Lulusan SMK Go Global",
    "Akademi Olahraga Nasional dan Pusat Pelatihan Nasional",
    "Peningkatan Kesejahteraan Guru, Transfer Langsung Tunjangan",
    "Pelindungan Anak di Ruang Digital melalui PP TUNAS",
  ],
  Kesehatan: [
    "Makan Bergizi Gratis Ibu Hamil, Ibu Menyusui, dan Balita",
    "66 Rumah Sakit Upgrade",
    "Pemeriksaan Kesehatan Gratis",
    "Penuntasan Tuberkulosis",
  ],
  "Hilirisasi dan Industrialisasi": [
    "Hilirisasi Industri Strategis (18 Proyek)",
    "Mobil Nasional",
    "Motor Nasional",
    "Ekosistem Industri Kedirgantaraan",
    "Pengembangan Industri Semikonduktor",
  ],
  "Infrastruktur, Perumahan dan Ketahanan Bencana": [
    "Giant Sea Wall",
    "Rehabilitasi dan Rekonstruksi Pasca Bencana Sumatera",
    "Gerakan ASRI (Gentengisasi, Pengendalian Sampah, Penghijauan)",
    "3 Juta Rumah: 1 Juta Rumah Baru & 2 Juta Renovasi Rumah",
    "Pengembangan Jaringan Kereta Api Nasional",
  ],
  "Ekonomi Kerakyatan dan Desa": [
    "80.000 Koperasi Desa/Kelurahan Merah Putih",
    "Percepatan Pembangunan Daerah 3T",
  ],
  "Penurunan Kemiskinan": [
    "PRO-KESRA Bantuan Sosial Terintegrasi",
    "PRO-KESRA untuk 10 Juta Penduduk Berusaha dan Bekerja",
  ],
};

// ============ Helpers ============
export function emptyKesiapan(): KesiapanUsulan {
  return {
    lahan: [],
    dokTeknis: {
      fs: { status: "", tahun: "" },
      ded: { status: "", tahun: "" },
      rab: { status: "", tahun: "" },
    },
    izinLingkungan: [],
    dukunganKebijakan: [],
    dukunganTematik: [],
    rtrw: [],
  };
}

export function emptyVerifikasi(): VerifikasiKesiapan {
  return { teknis: {}, sspsda: {}, history: [] };
}

export const SECTION_LABEL: Record<SectionKey, string> = {
  kak: "KAK — Kerangka Acuan Kerja",
  dskp: "DSKP — Dokumen Studi Kelayakan Proyek",
  lahan: "Kesiapan Lahan",
  dokTeknis: "Dokumen Perencanaan Teknis",
  izinLingkungan: "Izin Lingkungan",
  dukunganKebijakan: "Dukungan Kebijakan",
  rtrw: "Kesesuaian RTRW",
};

export const SECTION_ORDER: SectionKey[] = [
  "kak",
  "dskp",
  "lahan",
  "dokTeknis",
  "izinLingkungan",
  "dukunganKebijakan",
  "rtrw",
];

export function mockFile(prefix: string): UploadedFile {
  const ukuran = `${(Math.random() * 3 + 0.5).toFixed(1)} MB`;
  return {
    nama: `${prefix}_${Date.now()}.pdf`,
    ukuran,
    waktu: new Date().toISOString(),
  };
}

export function formatWaktu(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function newId(prefix = "id"): string {
  return `${prefix}_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
}
