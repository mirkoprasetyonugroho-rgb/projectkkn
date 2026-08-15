export interface StatItem {
  id: string;
  label: string;
  value: number;
  suffix: string;
  iconName: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  desc: string;
  button: string;
  category?: string;
  iconName: string;
}

export interface PotentialItem {
  id: string;
  title: string;
  desc: string;
  tag: string;
  image: string;
}

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  author: string;
  category: string;
  excerpt: string;
  image: string;
  content?: string;
}

export interface AgendaItem {
  id: string;
  title: string;
  date: string;
  location: string;
  time: string;
}

export interface GalleryItem {
  id: string;
  image: string;
  category: string;
  title?: string;
}

export interface ComplaintItem {
  id: string;
  name: string;
  phone: string;
  category: string;
  subject: string;
  message: string;
  date: string;
  status: 'Menunggu' | 'Diproses' | 'Selesai';
  response?: string;
}

export interface VillageProfile {
  headName: string;
  headTitle: string;
  welcomeMessage: string;
  address: string;
  phone: string;
  whatsapp: string;
  email: string;
  serviceHours: string;
  mapImage: string;
  headImage: string;
}

export const initialStats: StatItem[] = [
  { id: '1', iconName: 'UserRound', label: 'Penduduk', value: 12540, suffix: '+' },
  { id: '2', iconName: 'House', label: 'Kepala Keluarga', value: 3120, suffix: '+' },
  { id: '3', iconName: 'Trees', label: 'Luas Wilayah', value: 48, suffix: ' km²' },
  { id: '4', iconName: 'Building2', label: 'Fasilitas Umum', value: 18, suffix: '+' },
];

export const initialServices: ServiceItem[] = [
  { id: '1', iconName: 'FileText', title: 'Surat Domisili', desc: 'Pengurusan surat keterangan domisili untuk warga.', button: 'Ajukan Surat' },
  { id: '2', iconName: 'HandCoins', title: 'Surat Usaha', desc: 'Pendataan usaha mikro dan kecil desa.', button: 'Ajukan Surat' },
  { id: '3', iconName: 'ScrollText', title: 'Surat Kelahiran', desc: 'Layanan pembuatan surat kelahiran secara cepat.', button: 'Ajukan Surat' },
  { id: '4', iconName: 'ShieldCheck', title: 'Surat Kematian', desc: 'Pengurusan administrasi kematian yang terintegrasi.', button: 'Ajukan Surat' },
  { id: '5', iconName: 'MessageCircleMore', title: 'Pengaduan Warga', desc: 'Sampaikan aspirasi dan keluhan Anda langsung ke pihak kelurahan.', button: 'Kirim Pengaduan' },
  { id: '6', iconName: 'FileText', title: 'Download Formulir', desc: 'Akses formulir yang dibutuhkan untuk berbagai layanan desa.', button: 'Unduh File' },
];

export const initialPotentials: PotentialItem[] = [
  { id: '1', image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80', title: 'Pertanian Organik', desc: 'Pertanian padi organik dan hortikultura unggulan yang produktif.', tag: 'Agribisnis' },
  { id: '2', image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80', title: 'UMKM Makanan Olahan', desc: 'Produk kuliner dan keripik olahan khas desa yang memikat pasar.', tag: 'Ekonomi' },
  { id: '3', image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80', title: 'Wisata Edukasi Eko-Desa', desc: 'Destinasi alam dan lanskap pedesaan yang asri serta ramah keluarga.', tag: 'Pariwisata' },
  { id: '4', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80', title: 'Peternakan Terpadu', desc: 'Ternak sapi potong dan kambing etawa yang menopang ekonomi warga.', tag: 'Peternakan' },
  { id: '5', image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80', title: 'Kerajinan Anyaman', desc: 'Kerajinan tangan dari bambu dan serat alam khas Kriwen.', tag: 'Budaya' },
  { id: '6', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80', title: 'Budidaya Ikan Nila', desc: 'Kolam budidaya ikan air tawar di sepanjang aliran waduk desa.', tag: 'Perikanan' },
];

export const initialNews: NewsItem[] = [
  { id: '1', title: 'Peningkatan Jalan Kelurahan Menuju Akses Wisata', date: '12 Agustus 2026', author: 'Tim Kelurahan', category: 'Pemerintahan', excerpt: 'Pembangunan jalan perkerasan beton dipercepat guna mempermudah mobilisasi warga dan wisatawan.', image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=800&q=80' },
  { id: '2', title: 'Program Tanam Serentak untuk Ketahanan Pangan', date: '08 Agustus 2026', author: 'Dinas Pertanian', category: 'Pertanian', excerpt: 'Program tanam padi serentak dilaksanakan bersama kelompok tani Kriwen.', image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=800&q=80' },
  { id: '3', title: 'Bazar UMKM Kelurahan Kriwen Berhasil Tarik Minat Warga', date: '03 Agustus 2026', author: 'Admin Desa', category: 'UMKM', excerpt: 'Bazar kuliner dan kerajinan lokal sukses mendorong transaksi ekonomi masyarakat.', image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=800&q=80' },
];

export const initialAgenda: AgendaItem[] = [
  { id: '1', date: '15 Agustus 2026', title: 'Musyawarah Perencanaan Pembangunan Desa', location: 'Balai Kelurahan Kriwen', time: '09.00 - 12.00 WIB' },
  { id: '2', date: '20 Agustus 2026', title: 'Gotong Royong Kebersihan Lingkungan & Sungai', location: 'RW 03 & Pinggir Sungai', time: '07.00 - 10.00 WIB' },
  { id: '3', date: '25 Agustus 2026', title: 'Pelatihan Digital Marketing untuk UMKM', location: 'Aula Kelurahan Kriwen', time: '13.00 - 16.00 WIB' },
];

export const initialGallery: GalleryItem[] = [
  { id: '1', image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80', category: 'Kegiatan', title: 'Penyuluhan Kesehatan Masyarakat' },
  { id: '2', image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=900&q=80', category: 'Wisata', title: 'Keindahan Alam Kelurahan Kriwen' },
  { id: '3', image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=80', category: 'UMKM', title: 'Produk Olahan Tangan Warga' },
  { id: '4', image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=900&q=80', category: 'Pemerintahan', title: 'Rapat Koordinasi Perangkat Kelurahan' },
  { id: '5', image: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=900&q=80', category: 'Transparansi', title: 'Papan Transparansi Anggaran Desa' },
  { id: '6', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=80', category: 'Kegiatan', title: 'Penghijauan dan Tanam Pohon' },
];

export const initialComplaints: ComplaintItem[] = [
  {
    id: '1',
    name: 'Budi Santoso',
    phone: '081234567891',
    category: 'Infrastruktur',
    subject: 'Lampu Penerangan Jalan RW 02 Padam',
    message: 'Lampu penerangan jalan utama dekat lapangan RW 02 sudah mati sejak 3 hari lalu. Mohon petunjuk atau perbaikan.',
    date: '06 Agustus 2026',
    status: 'Menunggu',
  },
  {
    id: '2',
    name: 'Siti Aminah',
    phone: '085712345678',
    category: 'Kebersihan',
    subject: 'Penumpukan Sampah di Tempat Penampungan Sementara',
    message: 'TPS di perbatasan RT 04 belum diangkut truk kebersihan minggu ini. Bau mulai mengganggu warga setempat.',
    date: '05 Agustus 2026',
    status: 'Diproses',
    response: 'Laporan telah diteruskan ke Dinas Lingkungan Hidup. Jadwal pengangkutan dijadwalkan besok pagi.',
  },
  {
    id: '3',
    name: 'Rudi Hermawan',
    phone: '081399887766',
    category: 'Layanan Publik',
    subject: 'Konsultasi Syarat Pengurusan Surat Usaha',
    message: 'Apakah ada biaya untuk pembuatan Surat Keterangan Usaha mikro?',
    date: '02 Agustus 2026',
    status: 'Selesai',
    response: 'Pengurusan Surat Keterangan Usaha GRATIS dan tidak dipungut biaya apapun.',
  },
];

export const initialProfile: VillageProfile = {
  headName: 'Bapak H. Ahmad Suryana',
  headTitle: 'Kepala Kelurahan Kriwen',
  welcomeMessage: 'Kami menyambut baik segala bentuk partisipasi masyarakat untuk bersama-sama membangun kelurahan yang maju, aman, dan sejahtera. Dengan semangat gotong royong, kami terus meningkatkan layanan publik, ekonomi masyarakat, dan kualitas lingkungan.',
  address: 'Jl. Raya Kelurahan Kriwen No. 12, Kecamatan Suka Maju',
  phone: '+62 812 3456 7890',
  whatsapp: '085747892689',
  email: 'mirkoprasetyonugroho@gmail.com',
  serviceHours: 'Senin – Jumat, 08.00 – 16.00 WIB',
  mapImage: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=1200&q=80',
  headImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=700&q=80',
};
