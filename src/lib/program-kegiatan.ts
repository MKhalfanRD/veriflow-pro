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
export const INDIKATOR_SASARAN_KEGIATAN: Record<string, Record<string, string[]>> = {
  "7686": {
    "01": [
      "01-Jumlah Volume Luapan Lumpur yang Dialirkan ke Kali Porong",
      "02-Panjang Infrastruktur Pengendalian Lumpur Sidoarjo yang Dibangun/Ditingkatkan",
      "03-Panjang Jaringan Infrastruktur Pengendali Dampak Semburan yang Dibangun/Ditingkatkan",
      "04-Panjang Jaringan Infrastruktur Pengendali Dampak Semburan yang Dioperasi dan Dipelihara",
      "05-Luas Kawasan Sekitar Tampungan Lumpur Sidoarjo yang Ditata, Dimanfaatkan, dan/atau Dikelola",
      "06-Jumlah Dukungan Teknis Bidang Pengelolaan Lumpur Sidoarjo"
    ],
    "02": [
      "01-Tingkat Kinerja Layanan Pembinaan Pengendalian Lumpur Sidoarjo"
    ],
    "03": [
      "01-Tingkat Pelaksanaan Kepatuhan Intern dan Manajemen Risiko Unit Kerja"
    ]
  },
  "7687": {
    "01": [
      "01. Jumlah Layanan Administrasi dan Teknis Operasional DSDAN"
    ],
    "02": [
      "01. Tingkat Pelaksanaan Kepatuhan Intern dan Manajemen Risiko Unit Kerja"
    ]
  },
  "7688": {
    "01": [
      "01-Tingkat pembinaan penyusunan dan pemantauan pengelolaan SDA WS",
      "02-Tingkat Fasilitasi Penyusunan Program Jangka Panjang",
      "03-Jumlah Dokumen Pola dan Rencana yang Ditetapkan/Direvisi",
      "04-Tingkat Implementasi RPSDA WS Kewenangan Pusat"
    ],
    "02": [
      "01-Tingkat Pembinaan dan Penyelarasan Perencanaan, Pemrograman, Penganggaran Bidang Sumber Daya Air",
      "02-Tingkat Layanan Kerja Sama Luar Negeri yang Efektif Bidang Sumber Daya Air",
      "03-Rata-rata tingkat Pelaksanaan Program dan Anggaran UPT di Direktorat Jenderal SDA"
    ],
    "03": [
      "01-Tingkat Pembinaan Pemantauan dan Evaluasi",
      "02-Rata-rata nilai implementasi penyelenggaraan SAKIP pada entitas di Direktorat Jenderal SDA"
    ],
    "04": [
      "01-Tingkat Layanan Pembinaan Pengadaan Tanah Infrastruktur Sumber Daya Air",
      "02-Jumlah Luas Pengadaan Tanah Infrastruktur Sumber Daya Air"
    ],
    "05": [
      "01-Tingkat Pelaksanaan Kepatuhan Intern dan Manajemen Risiko Unit Kerja"
    ]
  },
  "7689": {
    "01": [
      "01-Tingkat Pelaksanaan Kepatuhan Intern dan Manajemen Risiko UPT",
      "02-Tingkat Pelaksanaan Kepatuhan Intern dan Manajemen Risiko Satuan Kerja",
      "03-Tingkat Pembinaan Kepatuhan Intern dan Manajemen Risiko"
    ]
  },
  "7690": {
    "01": [
      "01-Tingkat Layanan Sistem Informasi Sumber Daya Air (SISDA) Direktorat Jenderal Sumber Daya Air dan Layanan Hidrologi untuk Sistem Informasi Hidrologi, Hidroklimatologi, dan Hidrogeologi (SIH3)",
      "02-Jumlah Wilayah Sungai dengan Pengembangan Sistem Informasi Sumber Daya Air",
      "03-Jumlah Dokumen Perhitungan Nilai Indeks Ketahanan Air Wilayah Sungai",
      "04-Tingkat Kesiapan Teknis Proyek"
    ],
    "02": [
      "01-Tingkat Layanan Pengelolaan Jabatan Fungsional dan Pengembangan Profesi",
      "02-Tingkat Pembinaan Layanan Teknis Sumber Daya Air",
      "03-Tingkat Pembinaan Sistem Informasi Sumber Daya Air (SISDA) Direktorat Jenderal Sumber Daya Air dan Layanan Hidrologi untuk Sistem Informasi Hidrologi, Hidroklimatologi, dan Hidrogeologi (SIH3)",
      "04-Tingkat Penerapan NSPK, Teknologi dan Peralatan Infrastruktur Sumber Daya Air",
      "05-Tingkat Keandalan Infrastruktur Sumber Daya Air",
      "06-Jumlah Wilayah Sungai Kewenangan Pusat dengan Neraca Air Tidak dalam Kondisi Kritis/Defisit"
    ],
    "03": [
      "01-Persentase Layanan Teknis Balai Teknik/Balai",
      "02-Jumlah dokumen pengembangan dan perekayasaan Balai Teknik/Balai",
      "03-Indeks Kepuasan Masyarakat (IKM) terhadap Layanan Balai"
    ],
    "04": [
      "01-Tingkat Pelaksanaan Kepatuhan Intern dan Manajemen Risiko Unit Kerja"
    ]
  },
  "7691": {
    "01": [
      "01-Luas Layanan Irigasi yang Ketersediaan Airnya Dijamin oleh Waduk",
      "02-Jumlah Luas Layanan Irigasi yang Dibangun untuk Pertanian Multikomoditas",
      "03-Jumlah Luas Layanan Irigasi yang Direhabilitasi dan Ditingkatkan",
      "Jumlah Dukungan Teknis Bidang Irigasi dan Rawa"
    ],
    "02": [
      "01-Tingkat Kinerja Layanan Pembinaan Irigasi dan Rawa"
    ],
    "03": [
      "01-Tingkat Pelaksanaan Kepatuhan Intern dan Manajemen Risiko Unit Kerja"
    ]
  },
  "7692": {
    "01": [
      "01-Luas Kawasan yang Terlindungi dari Risiko Daya Rusak Air",
      "02-Kapasitas Prasarana Pengendali Lahar dan Sedimen",
      "03-Jumlah Kawasan yang Menerapkan Pendekatan Terpadu Struktural dan Non-Struktural",
      "04-Jumlah Dukungan Teknis Bidang Sungai dan Pantai"
    ],
    "02": [
      "01-Luas Kawasan yang Terlindungi dari Risiko Daya Rusak Air di Pantai Utara Jawa"
    ],
    "03": [
      "01-Tingkat Kinerja Layanan Pembinaan Sungai dan Pantai"
    ],
    "04": [
      "01-Tingkat Pelaksanaan Kepatuhan Intern dan Manajemen Risiko Unit Kerja"
    ]
  },
  "7693": {
    "01": [
      "01-Jumlah Bendungan yang Selesai Dibangun",
      "02-Jumlah Bendungan yang Direhabilitasi",
      "03-Jumlah Tampungan Air Alami yang Direvitalisasi",
      "04-Rasio Kapasitas Layanan Bendungan dalam Mereduksi Debit Banjir",
      "05-Dukungan Teknis Bidang Bendungan dan Danau"
    ],
    "02": [
      "01-Tingkat Kinerja Layanan Pembinaan Bendungan dan Danau"
    ],
    "03": [
      "01-Tingkat Layanan Teknis Balai Teknik Bendungan",
      "02-Indeks Kepuasan Masyarakat (IKM) terhadap Layanan Balai Teknik Bendungan"
    ],
    "04": [
      "01-Tingkat Pelaksanaan Kepatuhan Intern dan Manajemen Risiko Unit Kerja"
    ]
  },
  "7694": {
    "01": [
      "01-Jumlah Embung dan Tampungan Air Lainnya yang Dibangun",
      "02-Jumlah Embung dan Tampungan Air Lainnya yang Direhabilitasi",
      "03-Kapasitas Prasarana Air Baku yang Dibangun",
      "04-Kapasitas Prasarana Air Baku yang Direhabilitasi",
      "05-Rasio Kapasitas Air Baku Bersumber dari Bendungan terhadap Potensinya",
      "06-Jumlah Luas Irigasi Air Tanah yang Dibangun",
      "07-Jumlah Luas Irigasi Air Tanah yang Direhabilitasi",
      "08-Dukungan Teknis Bidang Air Tanah dan Air Baku"
    ],
    "02": [
      "01-Kapasitas Prasarana Air Baku yang Dibangun di Pantai Utara Jawa"
    ],
    "03": [
      "01-Tingkat Kinerja Layanan Pembinaan Air Tanah dan Air Baku"
    ],
    "04": [
      "01-Tingkat Pelaksanaan Kepatuhan Intern dan Manajemen Risiko"
    ]
  },
  "7695": {
    "01": [
      "01-Jumlah Kumulatif Tampungan Air yang Dikelola",
      "02-Jumlah Unit Pengelola yang Dibentuk/Dioperasikan",
      "03-Jumlah Sempadan yang ditetapkan",
      "04-Jumlah Kapasitas Prasarana Air Baku yang Dikelola",
      "05-Luas Layanan Irigasi yang Dikelola",
      "06-Jumlah Tenaga Kerja yang Berpartisipasi Dalam Padat Karya",
      "07-Volume Layanan Air untuk Meningkatkan Produktivitas Irigasi",
      "08-Jumlah Infrastruktur Pengendali Daya Rusak Air yang Dikelola",
      "09-Panjang Jaringan Infrastruktur Pengendali Daya Rusak Air yang Dikelola",
      "10-Jumlah Sungai yang Dipelihara",
      "11-Layanan Penanggulangan Darurat Akibat Bencana"
    ],
    "02": [
      "01-Tingkat Kinerja Layanan Pembinaan Operasi dan Pemeliharaan",
      "02-Jumlah Rekomendasi Teknis yang Disusun",
      "03-Jumlah Usulan Perizinan yang Diproses",
      "04-Jumlah Fasilitasi Penanganan Tanggap Darurat Bencana",
      "05-Jumlah  BBWS/BWS dengan Indeks River Basin Organization Performance Benchmarking Diatas 3,5",
      "06-Jumlah Kelompok Masyarakat Dengan Penguatan Kelembagaan",
      "07-Jumlah Wadah Koordinasi Pengelolaan SDA Wilayah Sungai Kewenangan Pusat yang Difasilitasi",
      "08-Jumlah Alokasi Air yang Disusun"
    ],
    "03": [
      "01-Tingkat Pelaksanaan Kepatuhan Intern dan Manajemen Risiko Unit Kerja"
    ]
  }
};
