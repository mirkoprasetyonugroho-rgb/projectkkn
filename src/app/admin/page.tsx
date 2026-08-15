'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useData } from '@/context/DataContext';
import {
  ComplaintItem,
  GalleryItem,
  NewsItem,
  PotentialItem,
  ServiceItem,
  StatItem,
} from '@/lib/data';
import {
  BarChart3,
  Building2,
  CheckCircle2,
  ChevronRight,
  Edit2,
  FileText,
  House,
  Image as ImageIcon,
  Landmark,
  MessageSquare,
  Newspaper,
  Plus,
  Save,
  Send,
  Sprout,
  Trash2,
  UserRound,
  X,
} from 'lucide-react';
import { ImageUploadInput } from '@/components/ImageUploadInput';

export default function AdminDashboardPage() {
  const {
    stats,
    services,
    potentials,
    news,
    gallery,
    complaints,
    profile,
    updateStats,
    addNews,
    updateNews,
    deleteNews,
    addPotential,
    updatePotential,
    deletePotential,
    addGallery,
    deleteGallery,
    addService,
    updateService,
    deleteService,
    updateComplaintStatus,
    deleteComplaint,
    updateProfile,
  } = useData();

  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'berita' | 'layanan' | 'potensi' | 'galeri' | 'pengaduan' | 'profil'
  >('dashboard');

  // Modals & Form States
  const [newsModal, setNewsModal] = useState<{ open: boolean; item?: NewsItem }>({ open: false });
  const [newsForm, setNewsForm] = useState({
    title: '',
    category: 'Pemerintahan',
    author: 'Tim Kelurahan',
    date: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }),
    excerpt: '',
    image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=800&q=80',
  });

  const [potentialModal, setPotentialModal] = useState<{ open: boolean; item?: PotentialItem }>({ open: false });
  const [potentialForm, setPotentialForm] = useState({
    title: '',
    tag: 'UMKM',
    desc: '',
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80',
  });

  const [galleryModal, setGalleryModal] = useState(false);
  const [galleryForm, setGalleryForm] = useState({
    category: 'Kegiatan',
    title: '',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
  });

  const [serviceModal, setServiceModal] = useState<{ open: boolean; item?: ServiceItem }>({ open: false });
  const [serviceForm, setServiceForm] = useState({
    title: '',
    desc: '',
    button: 'Ajukan Surat',
    iconName: 'FileText',
  });

  const [complaintModal, setComplaintModal] = useState<{ open: boolean; complaint?: ComplaintItem }>({
    open: false,
  });
  const [complaintResponse, setComplaintResponse] = useState('');
  const [complaintStatusSelect, setComplaintStatusSelect] = useState<'Menunggu' | 'Diproses' | 'Selesai'>(
    'Diproses'
  );
  const [complaintFilter, setComplaintFilter] = useState<'Semua' | 'Menunggu' | 'Diproses' | 'Selesai'>(
    'Semua'
  );

  const [profileForm, setProfileForm] = useState(profile);
  const [statsForm, setStatsForm] = useState<StatItem[]>(stats);
  const [profileSavedMsg, setProfileSavedMsg] = useState('');

  const pendingComplaints = complaints.filter((c) => c.status === 'Menunggu').length;

  // News Handlers
  const handleOpenNewsModal = (item?: NewsItem) => {
    if (item) {
      setNewsModal({ open: true, item });
      setNewsForm({
        title: item.title,
        category: item.category,
        author: item.author,
        date: item.date,
        excerpt: item.excerpt,
        image: item.image,
      });
    } else {
      setNewsModal({ open: true });
      setNewsForm({
        title: '',
        category: 'Pemerintahan',
        author: 'Tim Kelurahan',
        date: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }),
        excerpt: '',
        image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=800&q=80',
      });
    }
  };

  const handleSaveNews = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsModal.item) {
      updateNews(newsModal.item.id, newsForm);
    } else {
      addNews(newsForm);
    }
    setNewsModal({ open: false });
  };



  // Potential Handlers
  const handleOpenPotentialModal = (item?: PotentialItem) => {
    if (item) {
      setPotentialModal({ open: true, item });
      setPotentialForm({
        title: item.title,
        tag: item.tag,
        desc: item.desc,
        image: item.image,
      });
    } else {
      setPotentialModal({ open: true });
      setPotentialForm({
        title: '',
        tag: 'UMKM',
        desc: '',
        image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80',
      });
    }
  };

  const handleSavePotential = (e: React.FormEvent) => {
    e.preventDefault();
    if (potentialModal.item) {
      updatePotential(potentialModal.item.id, potentialForm);
    } else {
      addPotential(potentialForm);
    }
    setPotentialModal({ open: false });
  };

  // Gallery Handler
  const handleSaveGallery = (e: React.FormEvent) => {
    e.preventDefault();
    addGallery(galleryForm);
    setGalleryModal(false);
  };

  // Service Handlers
  const handleOpenServiceModal = (item?: ServiceItem) => {
    if (item) {
      setServiceModal({ open: true, item });
      setServiceForm({
        title: item.title,
        desc: item.desc,
        button: item.button,
        iconName: item.iconName || 'FileText',
      });
    } else {
      setServiceModal({ open: true });
      setServiceForm({
        title: '',
        desc: '',
        button: 'Ajukan Surat',
        iconName: 'FileText',
      });
    }
  };

  const handleSaveService = (e: React.FormEvent) => {
    e.preventDefault();
    if (serviceModal.item) {
      updateService(serviceModal.item.id, serviceForm);
    } else {
      addService(serviceForm);
    }
    setServiceModal({ open: false });
  };

  // Complaint Response Handler
  const handleOpenComplaintModal = (item: ComplaintItem) => {
    setComplaintModal({ open: true, complaint: item });
    setComplaintResponse(item.response || '');
    setComplaintStatusSelect(item.status);
  };

  const handleSaveComplaintResponse = (e: React.FormEvent) => {
    e.preventDefault();
    if (complaintModal.complaint) {
      updateComplaintStatus(complaintModal.complaint.id, complaintStatusSelect, complaintResponse);
      setComplaintModal({ open: false });
    }
  };

  // Save profile and stats
  const handleSaveProfileAndStats = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(profileForm);
    updateStats(statsForm);
    setProfileSavedMsg('Perubahan berhasil disimpan!');
    setTimeout(() => setProfileSavedMsg(''), 3000);
  };

  const filteredComplaints =
    complaintFilter === 'Semua'
      ? complaints
      : complaints.filter((c) => c.status === complaintFilter);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Simple Header Bar */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Dashboard Kelurahan Kriwen</h1>
          <p className="text-xs text-slate-500 mt-1">
            Pengelolaan data kependudukan, berita, layanan publik, dan aspirasi warga.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => handleOpenNewsModal()}
            className="inline-flex items-center gap-1.5 rounded-xl bg-green-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-green-700 transition"
          >
            <Plus className="h-4 w-4" /> Berita Baru
          </button>
          <button
            onClick={() => setActiveTab('pengaduan')}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100 transition"
          >
            <MessageSquare className="h-4 w-4 text-sky-600" /> Pengaduan ({pendingComplaints})
          </button>
        </div>
      </div>

      {/* Simplified Tabs */}
      <div className="flex overflow-x-auto gap-1 border-b border-slate-200 pb-2 text-xs font-medium no-scrollbar">
        {[
          { id: 'dashboard', label: 'Ringkasan', icon: BarChart3 },
          { id: 'berita', label: `Berita (${news.length})`, icon: Newspaper },
          { id: 'layanan', label: `Layanan (${services.length})`, icon: FileText },
          { id: 'potensi', label: `Potensi (${potentials.length})`, icon: Sprout },
          { id: 'galeri', label: `Galeri (${gallery.length})`, icon: ImageIcon },
          { id: 'pengaduan', label: `Pengaduan (${complaints.length})`, icon: MessageSquare, badge: pendingComplaints },
          { id: 'profil', label: 'Profil & Statistik', icon: Landmark },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 font-semibold transition ${
                isActive
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:bg-slate-200/60 hover:text-slate-900'
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{tab.label}</span>
              {tab.badge ? (
                <span className="rounded-full bg-amber-500 px-1.5 py-0.2 text-[10px] font-bold text-white">
                  {tab.badge}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT */}

      {/* 1. DASHBOARD OVERVIEW */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          {/* Key Stat Cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">Penduduk</span>
                <UserRound className="h-5 w-5 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mt-2">
                {stats.find((s) => s.label === 'Penduduk')?.value.toLocaleString('id-ID') || '12.540'}
              </h3>
              <p className="text-[11px] text-slate-400 mt-1">Jiwa terdaftar di kelurahan</p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">Pengaduan</span>
                <MessageSquare className="h-5 w-5 text-sky-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mt-2">{complaints.length} Laporan</h3>
              <p className="text-[11px] text-amber-600 font-medium mt-1">{pendingComplaints} perlu direspon</p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">Berita Aktif</span>
                <Newspaper className="h-5 w-5 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mt-2">{news.length} Artikel</h3>
              <p className="text-[11px] text-slate-400 mt-1">Dipublikasi di website</p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">Sektor Potensi</span>
                <Sprout className="h-5 w-5 text-amber-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mt-2">{potentials.length} Sektor</h3>
              <p className="text-[11px] text-slate-400 mt-1">Produk & UMKM Desa</p>
            </div>
          </div>

          {/* Recent Complaints */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">Pengaduan Warga Terbaru</h3>
              <button
                onClick={() => setActiveTab('pengaduan')}
                className="text-xs font-semibold text-green-600 hover:underline"
              >
                Lihat Semua
              </button>
            </div>
            <div className="mt-4 space-y-3">
              {complaints.slice(0, 3).map((item) => (
                <div key={item.id} className="rounded-xl border border-slate-100 bg-slate-50 p-3.5 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800">{item.subject}</span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                        item.status === 'Menunggu'
                          ? 'bg-amber-100 text-amber-700'
                          : item.status === 'Diproses'
                          ? 'bg-sky-100 text-sky-700'
                          : 'bg-emerald-100 text-emerald-700'
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-2">{item.message}</p>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                    <span>{item.name} • {item.date}</span>
                    <button
                      onClick={() => handleOpenComplaintModal(item)}
                      className="font-semibold text-green-600 hover:underline"
                    >
                      Respon
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 2. BERITA */}
      {activeTab === 'berita' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900">Daftar Berita Desa</h2>
            <button
              onClick={() => handleOpenNewsModal()}
              className="inline-flex items-center gap-1.5 rounded-xl bg-green-600 px-3.5 py-2 text-xs font-bold text-white shadow-sm hover:bg-green-700"
            >
              <Plus className="h-3.5 w-3.5" /> Tambah Berita
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {news.map((item) => (
              <div key={item.id} className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm flex flex-col justify-between">
                <div>
                  <img src={item.image} alt={item.title} className="h-40 w-full object-cover" />
                  <div className="p-4 space-y-2">
                    <span className="inline-block rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600">
                      {item.category}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 line-clamp-2">{item.title}</h3>
                    <p className="text-xs text-slate-500 line-clamp-2">{item.excerpt}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between border-t border-slate-100 p-3 bg-slate-50">
                  <span className="text-[11px] text-slate-400">{item.date}</span>
                  <div className="flex gap-2">
                    <button onClick={() => handleOpenNewsModal(item)} className="text-xs font-semibold text-blue-600 hover:underline">Edit</button>
                    <button onClick={() => deleteNews(item.id)} className="text-xs font-semibold text-red-600 hover:underline">Hapus</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}



      {/* 4. LAYANAN */}
      {activeTab === 'layanan' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900">Daftar Layanan Publik</h2>
            <button
              onClick={() => handleOpenServiceModal()}
              className="inline-flex items-center gap-1.5 rounded-xl bg-green-600 px-3.5 py-2 text-xs font-bold text-white shadow-sm hover:bg-green-700"
            >
              <Plus className="h-3.5 w-3.5" /> Tambah Layanan
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {services.map((item) => (
              <div key={item.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-3 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
                  <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
                </div>
                <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                  <span className="text-[11px] text-slate-400">Tombol: {item.button}</span>
                  <div className="flex gap-2">
                    <button onClick={() => handleOpenServiceModal(item)} className="text-xs font-semibold text-blue-600 hover:underline">Edit</button>
                    <button onClick={() => deleteService(item.id)} className="text-xs font-semibold text-red-600 hover:underline">Hapus</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. POTENSI */}
      {activeTab === 'potensi' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900">Potensi Ekonomi & UMKM</h2>
            <button
              onClick={() => handleOpenPotentialModal()}
              className="inline-flex items-center gap-1.5 rounded-xl bg-green-600 px-3.5 py-2 text-xs font-bold text-white shadow-sm hover:bg-green-700"
            >
              <Plus className="h-3.5 w-3.5" /> Tambah Potensi
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {potentials.map((item) => (
              <div key={item.id} className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm flex flex-col justify-between">
                <div>
                  <img src={item.image} alt={item.title} className="h-40 w-full object-cover" />
                  <div className="p-4 space-y-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-green-700 bg-green-50 px-2 py-0.5 rounded">{item.tag}</span>
                    <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
                    <p className="text-xs text-slate-500 line-clamp-2">{item.desc}</p>
                  </div>
                </div>
                <div className="flex justify-end gap-3 border-t border-slate-100 p-3 bg-slate-50">
                  <button onClick={() => handleOpenPotentialModal(item)} className="text-xs font-semibold text-blue-600 hover:underline">Edit</button>
                  <button onClick={() => deletePotential(item.id)} className="text-xs font-semibold text-red-600 hover:underline">Hapus</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. GALERI */}
      {activeTab === 'galeri' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900">Galeri Dokumentasi Foto</h2>
            <button
              onClick={() => setGalleryModal(true)}
              className="inline-flex items-center gap-1.5 rounded-xl bg-green-600 px-3.5 py-2 text-xs font-bold text-white shadow-sm hover:bg-green-700"
            >
              <Plus className="h-3.5 w-3.5" /> Upload Foto
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {gallery.map((item) => (
              <div key={item.id} className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <img src={item.image} alt={item.category} className="h-48 w-full object-cover" />
                <div className="p-3 flex items-center justify-between bg-white">
                  <span className="text-xs font-bold text-slate-700">{item.category}</span>
                  <button onClick={() => deleteGallery(item.id)} className="text-xs font-semibold text-red-600 hover:underline">Hapus</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 7. PENGADUAN */}
      {activeTab === 'pengaduan' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <h2 className="text-base font-bold text-slate-900">Laporan Pengaduan Warga</h2>

            <div className="flex gap-1 rounded-xl border border-slate-200 bg-white p-1 text-xs">
              {(['Semua', 'Menunggu', 'Diproses', 'Selesai'] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => setComplaintFilter(st)}
                  className={`rounded-lg px-3 py-1 font-semibold transition ${
                    complaintFilter === st ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {filteredComplaints.map((item) => (
              <div key={item.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{item.subject}</h3>
                    <p className="text-xs text-slate-500">Oleh {item.name} ({item.phone}) • {item.date}</p>
                  </div>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                      item.status === 'Menunggu'
                        ? 'bg-amber-100 text-amber-700'
                        : item.status === 'Diproses'
                        ? 'bg-sky-100 text-sky-700'
                        : 'bg-emerald-100 text-emerald-700'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl">{item.message}</p>

                {item.response && (
                  <div className="rounded-xl bg-green-50 border border-green-200 p-3 text-xs text-green-800">
                    <span className="font-bold">Respon Admin:</span> {item.response}
                  </div>
                )}

                <div className="flex justify-end gap-2 pt-1">
                  <button
                    onClick={() => handleOpenComplaintModal(item)}
                    className="inline-flex items-center gap-1 rounded-lg bg-green-600 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-green-700"
                  >
                    <Send className="h-3 w-3" /> Respon
                  </button>
                  <button
                    onClick={() => deleteComplaint(item.id)}
                    className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 8. PROFIL & STATISTIK */}
      {activeTab === 'profil' && (
        <form onSubmit={handleSaveProfileAndStats} className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900">Profil & Data Kelurahan</h2>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 rounded-xl bg-green-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-green-700"
            >
              <Save className="h-4 w-4" /> Simpan Perubahan
            </button>
          </div>

          {profileSavedMsg && (
            <div className="rounded-xl border border-green-200 bg-green-50 p-3 text-center text-xs font-bold text-green-700">
              {profileSavedMsg}
            </div>
          )}

          {/* Stats editor */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Angka Statistik Utama</h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {statsForm.map((st, idx) => (
                <div key={st.id} className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-600">{st.label}</label>
                  <input
                    type="number"
                    value={st.value}
                    onChange={(e) => {
                      const val = parseInt(e.target.value) || 0;
                      const next = [...statsForm];
                      next[idx].value = val;
                      setStatsForm(next);
                    }}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs font-bold text-slate-800 outline-none focus:border-green-600 focus:bg-white"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Contact and Lurah profile */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4 text-xs">
            <h3 className="text-sm font-bold text-slate-900">Informasi Kelurahan</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block font-semibold text-slate-600 mb-1">Nama Kepala Kelurahan</label>
                <input
                  type="text"
                  value={profileForm.headName}
                  onChange={(e) => setProfileForm({ ...profileForm, headName: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-slate-800 outline-none focus:border-green-600 focus:bg-white"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-600 mb-1">Jabatan</label>
                <input
                  type="text"
                  value={profileForm.headTitle}
                  onChange={(e) => setProfileForm({ ...profileForm, headTitle: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-slate-800 outline-none focus:border-green-600 focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-600 mb-1">Pesan Sambutan</label>
              <textarea
                rows={3}
                value={profileForm.welcomeMessage}
                onChange={(e) => setProfileForm({ ...profileForm, welcomeMessage: e.target.value })}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-slate-800 outline-none focus:border-green-600 focus:bg-white"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <ImageUploadInput
                label="Foto Kepala Kelurahan"
                value={profileForm.headImage}
                onChange={(url) => setProfileForm({ ...profileForm, headImage: url })}
              />
              <ImageUploadInput
                label="Foto / Peta Wilayah Kantor"
                value={profileForm.mapImage}
                onChange={(url) => setProfileForm({ ...profileForm, mapImage: url })}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label className="block font-semibold text-slate-600 mb-1">Alamat Kantor</label>
                <input
                  type="text"
                  value={profileForm.address}
                  onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-slate-800 outline-none focus:border-green-600 focus:bg-white"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-600 mb-1">No. WhatsApp</label>
                <input
                  type="text"
                  value={profileForm.whatsapp}
                  onChange={(e) => setProfileForm({ ...profileForm, whatsapp: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-slate-800 outline-none focus:border-green-600 focus:bg-white"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-600 mb-1">Email</label>
                <input
                  type="text"
                  value={profileForm.email}
                  onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-slate-800 outline-none focus:border-green-600 focus:bg-white"
                />
              </div>
            </div>
          </div>
        </form>
      )}


      {/* MODALS */}
      {/* 1. News Modal */}
      {newsModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">{newsModal.item ? 'Edit Berita' : 'Tambah Berita'}</h3>
              <button onClick={() => setNewsModal({ open: false })} className="text-slate-400 hover:text-slate-700">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleSaveNews} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Judul Berita</label>
                <input type="text" required value={newsForm.title} onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })} className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-slate-800 outline-none focus:border-green-600 focus:bg-white" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Kategori</label>
                  <select value={newsForm.category} onChange={(e) => setNewsForm({ ...newsForm, category: e.target.value })} className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-slate-800 outline-none focus:border-green-600 focus:bg-white">
                    <option value="Pemerintahan">Pemerintahan</option>
                    <option value="Pertanian">Pertanian</option>
                    <option value="UMKM">UMKM</option>
                    <option value="Kegiatan">Kegiatan</option>
                    <option value="Transparansi">Transparansi</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Penulis</label>
                  <input type="text" required value={newsForm.author} onChange={(e) => setNewsForm({ ...newsForm, author: e.target.value })} className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-slate-800 outline-none focus:border-green-600 focus:bg-white" />
                </div>
              </div>
              <ImageUploadInput
                label="Foto Sampul Berita"
                value={newsForm.image}
                onChange={(url) => setNewsForm({ ...newsForm, image: url })}
              />
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Ringkasan Berita</label>
                <textarea rows={3} required value={newsForm.excerpt} onChange={(e) => setNewsForm({ ...newsForm, excerpt: e.target.value })} className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-slate-800 outline-none focus:border-green-600 focus:bg-white" />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setNewsModal({ open: false })} className="rounded-xl border border-slate-200 px-4 py-2 font-semibold text-slate-600">Batal</button>
                <button type="submit" className="rounded-xl bg-green-600 px-4 py-2 font-bold text-white hover:bg-green-700">Simpan</button>
              </div>
            </form>
          </div>
        </div>
      )}



      {/* 3. Potential Modal */}
      {potentialModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">{potentialModal.item ? 'Edit Potensi' : 'Tambah Potensi'}</h3>
              <button onClick={() => setPotentialModal({ open: false })} className="text-slate-400 hover:text-slate-700">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleSavePotential} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Nama Sektor</label>
                <input type="text" required value={potentialForm.title} onChange={(e) => setPotentialForm({ ...potentialForm, title: e.target.value })} className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-slate-800 outline-none focus:border-green-600 focus:bg-white" />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Tag / Kategori</label>
                <input type="text" required value={potentialForm.tag} onChange={(e) => setPotentialForm({ ...potentialForm, tag: e.target.value })} className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-slate-800 outline-none focus:border-green-600 focus:bg-white" />
              </div>
              <ImageUploadInput
                label="Foto Sektor Potensi / UMKM"
                value={potentialForm.image}
                onChange={(url) => setPotentialForm({ ...potentialForm, image: url })}
              />
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Deskripsi</label>
                <textarea rows={3} required value={potentialForm.desc} onChange={(e) => setPotentialForm({ ...potentialForm, desc: e.target.value })} className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-slate-800 outline-none focus:border-green-600 focus:bg-white" />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setPotentialModal({ open: false })} className="rounded-xl border border-slate-200 px-4 py-2 font-semibold text-slate-600">Batal</button>
                <button type="submit" className="rounded-xl bg-green-600 px-4 py-2 font-bold text-white hover:bg-green-700">Simpan</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. Gallery Modal */}
      {galleryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">Upload Foto Galeri</h3>
              <button onClick={() => setGalleryModal(false)} className="text-slate-400 hover:text-slate-700">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleSaveGallery} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Judul / Caption Foto</label>
                <input type="text" required value={galleryForm.title} onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })} className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-slate-800 outline-none focus:border-green-600 focus:bg-white" />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Kategori Galeri</label>
                <select value={galleryForm.category} onChange={(e) => setGalleryForm({ ...galleryForm, category: e.target.value })} className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-slate-800 outline-none focus:border-green-600 focus:bg-white">
                  <option value="Kegiatan">Kegiatan</option>
                  <option value="Wisata">Wisata</option>
                  <option value="UMKM">UMKM</option>
                  <option value="Pemerintahan">Pemerintahan</option>
                  <option value="Transparansi">Transparansi</option>
                </select>
              </div>
              <ImageUploadInput
                label="Foto Galeri Momen"
                value={galleryForm.image}
                onChange={(url) => setGalleryForm({ ...galleryForm, image: url })}
              />
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setGalleryModal(false)} className="rounded-xl border border-slate-200 px-4 py-2 font-semibold text-slate-600">Batal</button>
                <button type="submit" className="rounded-xl bg-green-600 px-4 py-2 font-bold text-white hover:bg-green-700">Simpan Foto</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. Service Modal */}
      {serviceModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">{serviceModal.item ? 'Edit Layanan' : 'Tambah Layanan'}</h3>
              <button onClick={() => setServiceModal({ open: false })} className="text-slate-400 hover:text-slate-700">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleSaveService} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Nama Layanan</label>
                <input type="text" required value={serviceForm.title} onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })} className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-slate-800 outline-none focus:border-green-600 focus:bg-white" />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Deskripsi Singkat</label>
                <textarea rows={2} required value={serviceForm.desc} onChange={(e) => setServiceForm({ ...serviceForm, desc: e.target.value })} className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-slate-800 outline-none focus:border-green-600 focus:bg-white" />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Teks Tombol Aksi</label>
                <input type="text" required value={serviceForm.button} onChange={(e) => setServiceForm({ ...serviceForm, button: e.target.value })} className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-slate-800 outline-none focus:border-green-600 focus:bg-white" />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setServiceModal({ open: false })} className="rounded-xl border border-slate-200 px-4 py-2 font-semibold text-slate-600">Batal</button>
                <button type="submit" className="rounded-xl bg-green-600 px-4 py-2 font-bold text-white hover:bg-green-700">Simpan Layanan</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 6. Complaint Modal */}
      {complaintModal.open && complaintModal.complaint && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">Respon Pengaduan Warga</h3>
              <button onClick={() => setComplaintModal({ open: false })} className="text-slate-400 hover:text-slate-700">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="rounded-xl bg-slate-50 p-3 text-xs space-y-1">
              <p className="font-bold text-slate-900">{complaintModal.complaint.subject}</p>
              <p className="text-slate-500">Pelapor: {complaintModal.complaint.name} ({complaintModal.complaint.phone})</p>
              <p className="text-slate-700 italic pt-1">"{complaintModal.complaint.message}"</p>
            </div>

            <form onSubmit={handleSaveComplaintResponse} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Ubah Status</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Menunggu', 'Diproses', 'Selesai'] as const).map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setComplaintStatusSelect(st)}
                      className={`rounded-xl py-2 font-semibold transition border ${
                        complaintStatusSelect === st
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-slate-50 text-slate-600 border-slate-200'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Tanggapan Resmi Kelurahan</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tuliskan respon resmi kelurahan..."
                  value={complaintResponse}
                  onChange={(e) => setComplaintResponse(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-slate-800 outline-none focus:border-green-600 focus:bg-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setComplaintModal({ open: false })} className="rounded-xl border border-slate-200 px-4 py-2 font-semibold text-slate-600">Batal</button>
                <button type="submit" className="rounded-xl bg-green-600 px-4 py-2 font-bold text-white hover:bg-green-700">Kirim Tanggapan</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
