// Lookup data for SDA form (mock)

export interface SatuanKerja {
  kode: string;
  nama: string;
  balai: string;
}

export const SATUAN_KERJA_LIST: SatuanKerja[] = [
  { kode: "SNVT-PJPA-BS1", nama: "SNVT PJPA BBWS Brantas", balai: "BBWS Brantas" },
  { kode: "SNVT-PJSA-BS1", nama: "SNVT PJSA BBWS Brantas", balai: "BBWS Brantas" },
  { kode: "SNVT-PJPA-CC", nama: "SNVT PJPA BBWS Citarum", balai: "BBWS Citarum" },
  { kode: "SNVT-PJSA-CC", nama: "SNVT PJSA BBWS Citarum", balai: "BBWS Citarum" },
  { kode: "SNVT-PJPA-BS2", nama: "SNVT PJPA BBWS Bengawan Solo", balai: "BBWS Bengawan Solo" },
  { kode: "SNVT-PJSA-BS2", nama: "SNVT PJSA BBWS Bengawan Solo", balai: "BBWS Bengawan Solo" },
  { kode: "SNVT-PJPA-PMP", nama: "SNVT PJPA BBWS Pemali-Juana", balai: "BBWS Pemali-Juana" },
  { kode: "SNVT-PJPA-SRO", nama: "SNVT PJPA BBWS Serayu-Opak", balai: "BBWS Serayu-Opak" },
  { kode: "SNVT-PJPA-CDN", nama: "SNVT PJPA BWS Sumatera VIII", balai: "BWS Sumatera VIII" },
  { kode: "SNVT-PLS", nama: "SNVT Pengendalian Lumpur Sidoarjo", balai: "PPLS" },
];

// Provinsi -> Kabupaten (subset yang relevan)
export const PROVINSI_KABUPATEN: Record<string, string[]> = {
  "Jawa Timur": [
    "Kab. Sidoarjo", "Kab. Malang", "Kota Malang", "Kab. Pasuruan", "Kab. Mojokerto",
    "Kab. Jombang", "Kab. Kediri", "Kab. Blitar", "Kab. Tulungagung", "Kab. Lamongan",
  ],
  "Jawa Barat": [
    "Kab. Bandung", "Kota Bandung", "Kab. Bekasi", "Kab. Karawang", "Kab. Purwakarta",
    "Kab. Subang", "Kab. Indramayu", "Kab. Cirebon",
  ],
  "Jawa Tengah": [
    "Kab. Semarang", "Kota Semarang", "Kab. Demak", "Kab. Kudus", "Kab. Pati",
    "Kab. Grobogan", "Kab. Banyumas", "Kab. Cilacap",
  ],
  "DI Yogyakarta": [
    "Kab. Sleman", "Kab. Bantul", "Kab. Gunungkidul", "Kab. Kulon Progo", "Kota Yogyakarta",
  ],
  "Sumatera Utara": [
    "Kab. Deli Serdang", "Kota Medan", "Kab. Serdang Bedagai", "Kab. Langkat", "Kab. Karo",
  ],
  "Sumatera Selatan": [
    "Kab. Ogan Komering Ulu", "Kab. Ogan Komering Ilir", "Kab. Musi Banyuasin", "Kota Palembang",
  ],
  "Sulawesi Selatan": [
    "Kab. Gowa", "Kab. Maros", "Kota Makassar", "Kab. Bone", "Kab. Wajo",
  ],
  "Kalimantan Timur": [
    "Kab. Kutai Kartanegara", "Kota Samarinda", "Kota Balikpapan", "Kab. Penajam Paser Utara",
  ],
  "Bali": ["Kab. Badung", "Kab. Gianyar", "Kab. Tabanan", "Kota Denpasar", "Kab. Buleleng"],
  "Nusa Tenggara Barat": ["Kab. Lombok Barat", "Kab. Lombok Tengah", "Kab. Lombok Timur", "Kota Mataram"],
};

export const PROVINSI_LIST = Object.keys(PROVINSI_KABUPATEN);

export const SBSN_JENIS = ["Rehabilitasi", "Pembangunan", "Peningkatan", "Optimalisasi"] as const;
export const ROMAWI = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"] as const;
export const JENIS_PAKET = ["Fisik", "Supervisi"] as const;
export const SATUAN_OUTPUT = ["km", "unit", "m3", "dt"] as const;
export const SATUAN_OUTCOME = ["Ha", "dt", "m3"] as const;
export const SKEMA_KONTRAK = ["Kontrak Tahun Tunggal", "Kontrak Tahun Jamak"] as const;
export const JENIS_PENGADAAN = ["Kontraktual", "Pengadaan Langsung", "Swakelola"] as const;

export const SBSN_START_YEAR = 2028;

export function formatRupiah(v: string | number): string {
  const n = typeof v === "string" ? Number(v.replace(/[^\d]/g, "")) : v;
  if (!n || isNaN(n)) return "Rp 0";
  return "Rp " + n.toLocaleString("id-ID");
}

export function diffDays(start: string, end: string): number {
  if (!start || !end) return 0;
  const s = new Date(start).getTime();
  const e = new Date(end).getTime();
  if (isNaN(s) || isNaN(e) || e < s) return 0;
  return Math.round((e - s) / 86400000) + 1;
}
