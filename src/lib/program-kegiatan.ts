export const PROGRAM_OPTIONS = ["Program Ketahanan Sumber Daya Air"] as const;

export const SASARAN_PROGRAM = [
  { kode: "01", label: "01-Meningkatnya Dukungan Swasembada Air Nasional" },
  { kode: "02", label: "02-Mentransformasi Tata Kelola Pengelolaan Sumber Daya Air Terintegrasi" },
] as const;

export const INDIKATOR_SASARAN_PROGRAM: Record<string, string[]> = {
  "01": [
    "01-Kapasitas Tampungan Air Multiguna per Kapita",
    "02-Rasio Kapasitas Air Baku Terhadap Kebutuhannya",
    "03-Persentase Luas Baku Sawah Fungsional Beririgasi",
    "04-Rasio Luas Layanan Irigasi yang Ketersediaan Airnya Dijamin oleh Waduk",
    "05-Efisiensi Pemanfaatan Air Irigasi",
    "06-Persentase Luas Kawasan Prioritas yang Dilindungi dari Daya Rusak Air",
    "07-Tingkat Kinerja Layanan Infrastruktur Sumber Daya Air",
  ],
  "02": [
    "01-Tingkat Layanan Perizinan Berusaha Penggunaan SDA, Kelembagaan Pengelolaan SDA, dan Peran Serta Masyarakat",
    "02-Tingkat Layanan Administrasi dan Teknis Operasional Dewan SDA Nasional",
    "03-Tingkat Pelaksanaan Kepatuhan Intern dan Manajemen Risiko Direktorat Jenderal SDA",
    "04-Indeks Perencanaan Pembangunan Direktorat Jenderal SDA",
    "05-Tingkat Implementasi Penyelenggaraan SAKIP Direktorat Jenderal SDA",
    "06-Tingkat Layanan Teknis Sumber Daya Air",
  ],
};

export const KEGIATAN_LIST = [
  { kode: "7686", nama: "Pengendalian Lumpur Sidoarjo" },
  { kode: "7687", nama: "Layanan Kesekretariatan Dewan Sumber Daya Air Nasional (DSDAN)" },
  { kode: "7688", nama: "Perencanaan, Pemrograman, Penganggaran, dan Evaluasi" },
  { kode: "7689", nama: "Kepatuhan Internal Direktorat Jenderal Sumber Daya Air" },
  { kode: "7690", nama: "Layanan Teknis SDA" },
  { kode: "7691", nama: "Pengembangan Jaringan Irigasi Permukaan, Rawa, dan Non-Padi" },
  { kode: "7692", nama: "Pengendalian Banjir, Lahar, Pengelolaan Drainase Utama Perkotaan, dan Pengaman Pantai" },
  { kode: "7693", nama: "Pengembangan Bendungan, Danau, dan Bangunan Penampung Air Lainnya" },
  { kode: "7694", nama: "Pengembangan Jaringan Air Tanah dan Air Baku" },
  { kode: "7695", nama: "Operasi dan Pemeliharaan Sarana Prasarana SDA serta Penanggulangan Darurat Akibat Bencana" },
] as const;

export const SASARAN_KEGIATAN: Record<string, string[]> = {
  "7686": [
    "01 Meningkatnya Ketahanan Wilayah Area yang Terdampak Lumpur Sidoarjo",
    "02 Meningkatnya Pembinaan untuk Peningkatan Ketahanan Wilayah Area yang Terdampak Lumpur Sidoarjo",
    "03 Meningkatnya Pelaksanaan Kepatuhan Intern",
  ],
  "7687": [
    "01 Meningkatnya Layanan Kesekretariatan Dewan SDA Nasional (DSDAN)",
    "02 Meningkatnya Pelaksanaan Kepatuhan Intern",
  ],
  "7688": [
    "01 Meningkatnya Penyusunan Program Jangka Panjang",
    "02 Meningkatnya Perencanaan, Pemrograman, dan Penganggaran",
    "03 Meningkatnya Pemantauan dan Evaluasi",
    "04 Meningkatnya Layanan Pengadaan Tanah Infrastruktur Sumber Daya Air",
    "05 Meningkatnya Pelaksanaan Kepatuhan Intern",
  ],
  "7689": ["01 Meningkatnya Maturitas Kepatuhan Intern"],
  "7690": [
    "01 Meningkatnya Kesiapan Teknis",
    "02 Meningkatnya Pembinaan Kesiapan dan Layanan Teknis Infrastruktur SDA",
    "03 Meningkatnya Layanan Teknis Infrastruktur SDA",
    "04 Meningkatnya Pelaksanaan Kepatuhan Intern",
  ],
  "7691": [
    "01 Meningkatnya Layanan Irigasi untuk Pertanian Multikomoditas",
    "02 Meningkatnya Pembinaan Layanan Irigasi",
    "03 Meningkatnya Pelaksanaan Kepatuhan Intern",
  ],
  "7692": [
    "01 Meningkatnya Pengelolaan Risiko Daya Rusak Air",
    "02 Meningkatnya Pengelolaan Risiko Daya Rusak Air di Pantai Utara Jawa",
    "03 Meningkatnya Pembinaan Pengelolaan Risiko Daya Rusak Air",
    "04 Meningkatnya Pelaksanaan Kepatuhan Intern",
  ],
  "7693": [
    "01 Meningkatnya Pembangunan dan Pengelolaan Infrastruktur Tampungan Sumber Air",
    "02 Meningkatnya Pembinaan Pembangunan dan Pengelolaan Infrastruktur Tampungan Sumber Air",
    "03 Meningkatnya Layanan Teknis Pembangunan dan Pengelolaan Infrastruktur Tampungan Sumber Air",
    "04 Meningkatnya Pelaksanaan Kepatuhan Intern",
  ],
  "7694": [
    "01 Meningkatnya Penyediaan Pasokan Air Berkelanjutan",
    "02 Meningkatnya Penyediaan Pasokan Air di Pantai Utara Jawa",
    "03 Meningkatnya Pembinaan Penyediaan Pasokan Air Berkelanjutan",
    "04 Meningkatnya Pelaksanaan Kepatuhan Intern",
  ],
  "7695": [
    "01 Terjaganya Layanan Infrastruktur Sumber Daya Air",
    "02 Meningkatnya Pembinaan, Layanan Perizinan, dan Tata Kelola Operasi dan Pemeliharaan",
    "03 Meningkatnya Pelaksanaan Kepatuhan Intern",
  ],
};
