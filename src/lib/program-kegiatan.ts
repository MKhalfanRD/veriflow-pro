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

export interface RO { code: string; name: string; }
export interface KRO { code: string; name: string; ros: RO[]; }
export const KRO_BY_KEGIATAN: Record<string, KRO[]> = {
  "7691": [
    {
      "code": "7691.RBS",
      "name": "Prasarana Jaringan Sumber Daya Air",
      "ros": [
        {
          "code": "7691.RBS.001",
          "name": "Jaringan Irigasi Waduk"
        },
        {
          "code": "7691.RBS.003",
          "name": "Jaringan Irigasi di Sentra Produksi Lumbung Pangan"
        },
        {
          "code": "7691.RBS.004",
          "name": "Jaringan Irigasi di Lokasi Optimasi Lahan Kementerian Pertanian"
        },
        {
          "code": "7691.RBS.005",
          "name": "Jaringan Irigasi Kewenangan Pemerintah Daerah"
        },
        {
          "code": "7691.RBS.011",
          "name": "Jaringan Irigasi di Kawasan Sentra Produksi Pangan (KSPP) Kalimantan Tengah"
        },
        {
          "code": "7691.RBS.014",
          "name": "Jaringan Irigasi di Kawasan Sentra Produksi Pangan (KSPP) Papua Selatan"
        },
        {
          "code": "7691.RBS.101",
          "name": "Jaringan Irigasi Daerah Irigasi Batang Asai"
        },
        {
          "code": "7691.RBS.102",
          "name": "Jaringan Irigasi Daerah Irigasi Serayu"
        },
        {
          "code": "7691.RBS.501",
          "name": "Jaringan Irigasi DI Rentang (RIMP)"
        },
        {
          "code": "7691.RBS.502",
          "name": "Jaringan Irigasi DI Komering (KIP)"
        },
        {
          "code": "7691.RBS.503",
          "name": "Jaringan Irigasi Wilayah Barat Indonesia (URSIP)"
        },
        {
          "code": "7691.RBS.701",
          "name": "Jaringan Irigasi Daerah Irigasi Cisadane"
        },
        {
          "code": "7691.RBS.709",
          "name": "Jaringan Irigasi Daerah Irigasi Air Seluma"
        },
        {
          "code": "7691.RBS.717",
          "name": "Jaringan Irigasi DI Waduk Bening"
        },
        {
          "code": "7691.RBS.718",
          "name": "Jaringan Irigasi DI Siman"
        },
        {
          "code": "7691.RBS.719",
          "name": "Jaringan Irigasi DI Mrican"
        },
        {
          "code": "7691.RBS.720",
          "name": "Jaringan Irigasi DI Bondoyudo"
        },
        {
          "code": "7691.RBS.721",
          "name": "Jaringan Irigasi DI Pondok Waluh"
        },
        {
          "code": "7691.RBS.722",
          "name": "Jaringan Irigasi DI Talang"
        },
        {
          "code": "7691.RBS.723",
          "name": "Jaringan Irigasi DI Katon Kompleks"
        },
        {
          "code": "7691.RBS.724",
          "name": "Jaringan Irigasi DI Manganti"
        },
        {
          "code": "7691.RBS.725",
          "name": "Jaringan Irigasi DI Jatiluhur"
        },
        {
          "code": "7691.RBS.726",
          "name": "Jaringan Irigasi DI Lematang"
        },
        {
          "code": "7691.RBS.727",
          "name": "Jaringan Irigasi DI Cikunten II"
        },
        {
          "code": "7691.RBS.728",
          "name": "Jaringan Irigasi DI Kumisik"
        },
        {
          "code": "7691.RBS.729",
          "name": "Jaringan Irigasi DI Molek"
        },
        {
          "code": "7691.RBS.730",
          "name": "Jaringan Irigasi DI Komering"
        },
        {
          "code": "7691.RBS.731",
          "name": "Jaringan Irigasi DI Klambu"
        },
        {
          "code": "7691.RBS.732",
          "name": "Jaringan Irigasi DI Pemali"
        }
      ]
    },
    {
      "code": "7691.RBG",
      "name": "Prasarana Bidang SDA dan Irigasi",
      "ros": [
        {
          "code": "7691.RBG.001",
          "name": "Bangunan Irigasi di Lokasi Optimasi Lahan Kementerian Pertanian"
        },
        {
          "code": "7691.RBG.002",
          "name": "Bangunan Irigasi Kewenangan Pemerintah Daerah"
        },
        {
          "code": "7691.RBG.101",
          "name": "Bendung Cariang"
        },
        {
          "code": "7691.RBG.102",
          "name": "Bendung Jatimlerek"
        },
        {
          "code": "7691.RBG.701",
          "name": "Bendung Irigasi Pasar Baru"
        }
      ]
    }
  ],
  "7692": [
    {
      "code": "7692.RBH",
      "name": "Prasarana Bidang Penanggulangan Bencana",
      "ros": [
        {
          "code": "7692.RBH.001",
          "name": "Prasarana Pengendalian Banjir di Kawasan Metropolitan Strategis"
        },
        {
          "code": "7692.RBH.002",
          "name": "Bangunan Pendukung Pengendali Banjir IKN"
        },
        {
          "code": "7692.RBH.003",
          "name": "Prasarana Pengendali Risiko Daya Rusak Air di Perkotaan Pesisir Utara Jawa"
        },
        {
          "code": "7692.RBH.004",
          "name": "Prasarana Pengendalian Lahar/Sedimen di Kawasan Strategis Ekonomi, Kawasan Perkotaan, 3T, dan Daerah Berisiko Tinggi"
        },
        {
          "code": "7692.RBH.101",
          "name": "Prasarana Pengendali Sedimen Pulau Ternate"
        }
      ]
    },
    {
      "code": "7692.RBS",
      "name": "Prasarana Jaringan Sumber Daya Air",
      "ros": [
        {
          "code": "7692.RBS.001",
          "name": "Prasarana Pengendalian Banjir di Kawasan Metropolitan Strategis"
        },
        {
          "code": "7692.RBS.002",
          "name": "Prasarana Jaringan Pengendali Risiko Daya Rusak Air di Perkotaan Pesisir Utara Jawa"
        },
        {
          "code": "7692.RBS.003",
          "name": "Prasarana Pengendalian Banjir di Kawasan Strategis Ekonomi, Kawasan Perkotaan, 3T, dan Daerah Berisiko Tinggi dari Daya Rusak Air"
        },
        {
          "code": "7692.RBS.004",
          "name": "Prasarana Perlindungan Abrasi Kawasan Pesisir Perkotaan, Strategis Ekonomi, 3T, dan Kawasan Berisiko Abrasi Tinggi"
        },
        {
          "code": "7692.RBS.005",
          "name": "Prasarana Pengendalian Banjir Mendukung Ketahanan Pangan"
        },
        {
          "code": "7692.RBS.006",
          "name": "Prasarana Pengendalian Banjir di Kawasan Sentra Produksi Pangan (KSPP) Papua Selatan"
        },
        {
          "code": "7692.RBS.036",
          "name": "Prasarana Pengendali Banjir Kali Bekasi"
        },
        {
          "code": "7692.RBS.501",
          "name": "Prasarana Pengaman Pantai Bali (BBCP)"
        },
        {
          "code": "7692.RBS.502",
          "name": "Prasarana Perlindungan Daya Rusak Air di Sulawesi Tengah (IRSL)"
        },
        {
          "code": "7692.RBS.503",
          "name": "Prasarana Pengendalian Banjir di Kawasan Metropolitan Strategis (UFCS)"
        },
        {
          "code": "7692.RBS.504",
          "name": "Prasarana Pengendalian Banjir di Kawasan Metropolitan Strategis (NUFREP)"
        },
        {
          "code": "7692.RBS.505",
          "name": "Prasarana Perlindungan Kawasan Pantai Utara Jawa dari Daya Rusak Air (FMNJP)"
        },
        {
          "code": "7692.RBS.701",
          "name": "Prasarana Pengaman Pantai Pulau Terluar di Provinsi Kepulauan Riau"
        },
        {
          "code": "7692.RBS.704",
          "name": "Prasarana Pengaman Pantai Congot"
        },
        {
          "code": "7692.RBS.711",
          "name": "Prasarana Pengendalian Banjir di Kab. Dharmasraya"
        },
        {
          "code": "7692.RBS.737",
          "name": "Prasarana Pengaman Pantai Jakarta"
        },
        {
          "code": "7692.RBS.738",
          "name": "Prasarana Pengendalian Banjir Kota Meulaboh"
        },
        {
          "code": "7692.RBS.739",
          "name": "Prasarana Pengaman Pantai Pulau Terluar Provinsi Riau"
        },
        {
          "code": "7692.RBS.740",
          "name": "Prasarana Pengaman Pantai Bintaro"
        },
        {
          "code": "7692.RBS.741",
          "name": "Prasarana Pengendalian Banjir Sungai Cibanten"
        },
        {
          "code": "7692.RBS.742",
          "name": "Prasarana Pengendalian Banjir Sungai Jawi"
        },
        {
          "code": "7692.RBS.743",
          "name": "Prasarana Pengendalian Banjir Sudetan Floodway (Plangwoot-Sedayu Lawas)"
        },
        {
          "code": "7692.RBS.744",
          "name": "Prasarana Pengendalian Banjir Kali Konto"
        },
        {
          "code": "7692.RBS.745",
          "name": "Prasarana Pengaman Pantai Kab. Sambas"
        },
        {
          "code": "7692.RBS.746",
          "name": "Prasarana Pengendalian Banjir Sungai Klagison"
        },
        {
          "code": "7692.RBS.747",
          "name": "Prasarana Pengendalian Banjir Kali Perawan"
        },
        {
          "code": "7692.RBS.748",
          "name": "Prasarana Pengendalian Banjir dan Rob Bremi Meduri"
        }
      ]
    }
  ],
  "7693": [
    {
      "code": "7693.RBG",
      "name": "Prasarana Bidang SDA dan Irigasi",
      "ros": [
        {
          "code": "7693.RBG.004",
          "name": "Bendungan Cibeet"
        },
        {
          "code": "7693.RBG.005",
          "name": "Bendungan Cijurey"
        },
        {
          "code": "7693.RBG.006",
          "name": "Bendungan Kedunglanggar"
        },
        {
          "code": "7693.RBG.007",
          "name": "Bendungan Mbay"
        },
        {
          "code": "7693.RBG.009",
          "name": "Bendungan Jenelata"
        },
        {
          "code": "7693.RBG.013",
          "name": "Bangunan Pengarah Bendungan Rukoh"
        },
        {
          "code": "7693.RBG.015",
          "name": "Bendungan Tiga Dihaji"
        },
        {
          "code": "7693.RBG.028",
          "name": "Bendungan Jragung"
        },
        {
          "code": "7693.RBG.029",
          "name": "Bendungan Bener"
        },
        {
          "code": "7693.RBG.035",
          "name": "Bendungan Bagong"
        },
        {
          "code": "7693.RBG.045",
          "name": "Bendungan Manikin"
        },
        {
          "code": "7693.RBG.050",
          "name": "Bendungan Bulango Ulu"
        },
        {
          "code": "7693.RBG.051",
          "name": "Bendungan Budong-Budong"
        },
        {
          "code": "7693.RBG.056",
          "name": "Bendungan Way Apu"
        },
        {
          "code": "7693.RBG.068",
          "name": "Bendungan Cabean"
        },
        {
          "code": "7693.RBG.077",
          "name": "Bendungan Karangnongko"
        },
        {
          "code": "7693.RBG.501",
          "name": "Bendungan Karian"
        },
        {
          "code": "7693.RBG.502",
          "name": "Bendungan Pelosika"
        },
        {
          "code": "7693.RBG.702",
          "name": "Danau Ranau"
        },
        {
          "code": "7693.RBG.703",
          "name": "Danau Singkarak"
        },
        {
          "code": "7693.RBG.704",
          "name": "Danau Limboto"
        },
        {
          "code": "7693.RBG.705",
          "name": "Danau Ayamaru"
        }
      ]
    }
  ],
  "7694": [
    {
      "code": "7694.RBG",
      "name": "Prasarana Bidang SDA dan Irigasi",
      "ros": [
        {
          "code": "7694.RBG.001",
          "name": "Embung dan Tampungan Air Lainnya pada Kawasan IKN"
        },
        {
          "code": "7694.RBG.002",
          "name": "Prasarana Air Baku Mendukung Irigasi Kewenangan Pemerintah Daerah"
        },
        {
          "code": "7694.RBG.701",
          "name": "Prasarana Air Baku Bendung Gerak Sembayat"
        }
      ]
    },
    {
      "code": "7694.RBS",
      "name": "Prasarana Jaringan Sumber Daya Air",
      "ros": [
        {
          "code": "7694.RBS.001",
          "name": "Prasarana Penyediaan Air Baku Bersumber dari Bendungan"
        },
        {
          "code": "7694.RBS.002",
          "name": "Prasarana Air Baku IKN"
        },
        {
          "code": "7694.RBS.003",
          "name": "Prasarana Air Baku di Kawasan Sentra Produksi Pangan"
        },
        {
          "code": "7694.RBS.004",
          "name": "Jaringan Air Baku di Perkotaan Pesisir Utara Jawa"
        },
        {
          "code": "7694.RBS.005",
          "name": "Prasarana Air Baku Kawasan Metropolitan, Kawasan Perkotaan, dan Kawasan Strategis"
        },
        {
          "code": "7694.RBS.006",
          "name": "Jaringan Irigasi Air Tanah Mendukung Irigasi Kewenangan Pemerintah Daerah"
        },
        {
          "code": "7694.RBS.501",
          "name": "Prasarana Air Baku Karian Serpong (KSCS)"
        },
        {
          "code": "7694.RBS.701",
          "name": "Prasarana Air Baku Karian Serpong"
        },
        {
          "code": "7694.RBS.706",
          "name": "Prasarana Air Baku Kertasari"
        },
        {
          "code": "7694.RBS.708",
          "name": "Prasarana Air Baku DAS Kawal"
        },
        {
          "code": "7694.RBS.709",
          "name": "Prasarana Air Baku Paisu Lalamo"
        }
      ]
    }
  ]
};
