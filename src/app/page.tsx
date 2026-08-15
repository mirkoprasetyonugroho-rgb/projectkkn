'use client';

import { motion } from 'framer-motion';
import {
  ArrowRight,
  BarChart3,
  Building2,
  CalendarDays,
  Camera,
  ChevronDown,
  CircleDollarSign,
  Compass,
  FileText,
  HandCoins,
  House,
  Landmark,
  Menu,
  MessageCircleMore,
  Phone,
  ScrollText,
  Send,
  ShieldCheck,
  Sparkles,
  Trees,
  UserRound,
  Wheat,
  X,
  CheckCircle2,
} from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useData } from '@/context/DataContext';

const iconMap: Record<string, any> = {
  UserRound,
  House,
  Trees,
  Building2,
  FileText,
  HandCoins,
  ScrollText,
  ShieldCheck,
  MessageCircleMore,
};

const filters = ['Semua', 'Kegiatan', 'Wisata', 'UMKM', 'Pemerintahan', 'Transparansi'];

export default function Home() {
  const { stats, services, potentials, news, gallery, profile, addComplaint } = useData();
  const [activeFilter, setActiveFilter] = useState('Semua');
  const [menuOpen, setMenuOpen] = useState(false);

  // Complaint Form State for citizens
  const [complaintFormOpen, setComplaintFormOpen] = useState(false);
  const [complaintForm, setComplaintForm] = useState({
    name: '',
    phone: '',
    category: 'Infrastruktur',
    subject: '',
    message: '',
  });
  const [complaintSubmitted, setComplaintSubmitted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const nav = document.getElementById('main-nav');
      if (nav) {
        nav.classList.toggle('bg-white/80', window.scrollY > 20);
        nav.classList.toggle('backdrop-blur-xl', window.scrollY > 20);
        nav.classList.toggle('shadow-lg', window.scrollY > 20);
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmitComplaint = (e: React.FormEvent) => {
    e.preventDefault();
    addComplaint(complaintForm);
    setComplaintSubmitted(true);
    setTimeout(() => {
      setComplaintSubmitted(false);
      setComplaintFormOpen(false);
      setComplaintForm({ name: '', phone: '', category: 'Infrastruktur', subject: '', message: '' });
    }, 2500);
  };

  return (
    <main className="min-h-screen bg-transparent text-slate-800">
      {/* Navigation */}
      <nav id="main-nav" className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 py-4 md:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/60 bg-white/70 px-4 py-3 shadow-sm backdrop-blur-md md:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-green-600 to-blue-600 text-white shadow-lg">
              <Landmark className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">Kelurahan Kriwen</p>
              <p className="text-xs text-slate-600">Website Resmi Desa</p>
            </div>
          </div>

          <div className="hidden items-center gap-6 lg:flex">
            {['Beranda', 'Profil', 'Pemerintahan', 'Layanan', 'Berita', 'Galeri', 'Video', 'Potensi Desa', 'Kontak'].map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} className="text-sm font-medium text-slate-700 transition hover:text-green-600">
                {item}
              </a>
            ))}
          </div>

          <button onClick={() => setMenuOpen(!menuOpen)} className="rounded-full border border-white/70 bg-white/70 p-2 text-slate-700 lg:hidden">
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {menuOpen && (
          <div className="mx-auto mt-3 max-w-7xl rounded-2xl border border-white/60 bg-white/95 p-4 shadow-xl backdrop-blur-lg lg:hidden">
            <div className="flex flex-col gap-3">
              {['Beranda', 'Profil', 'Pemerintahan', 'Layanan', 'Berita', 'Galeri', 'Video', 'Potensi Desa', 'Kontak'].map((item) => (
                <a key={item} href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} className="rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100" onClick={() => setMenuOpen(false)}>
                  {item}
                </a>
              ))}
              <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
                <a href="/admin/login" className="rounded-xl bg-slate-100 text-center py-2 text-sm font-semibold text-slate-800">Login Admin</a>
                <button onClick={() => { setMenuOpen(false); setComplaintFormOpen(true); }} className="rounded-xl bg-gradient-to-r from-green-600 to-blue-600 text-center py-2 text-sm font-semibold text-white">Buat Pengaduan</button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="beranda" className="relative flex min-h-screen items-center overflow-hidden bg-slate-950 px-4 py-24 md:px-8">
        <Image src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80" alt="Panorama desa" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-slate-950/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/70 via-slate-900/40 to-blue-900/60" />
        <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur">
              <Sparkles className="h-4 w-4" />
              Pemerintahan Kelurahan Modern & Transparan
            </div>
            <h1 className="text-4xl font-black leading-tight text-white sm:text-5xl lg:text-7xl">Selamat Datang di Website Resmi Kelurahan Kriwen</h1>
            <p className="mt-6 text-lg leading-8 text-slate-200 sm:text-xl">Pusat Informasi, Pelayanan Publik, dan Transparansi Pemerintahan Kelurahan Kriwen.</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#potensi-desa" className="rounded-full bg-white px-6 py-3 font-semibold text-slate-900 transition hover:scale-105 shadow-xl">Jelajahi Desa</a>
              <a href="#layanan" className="rounded-full border border-white/40 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur transition hover:scale-105">Layanan Publik</a>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.2 }} className="relative mx-auto w-full max-w-xl">
            <div className="absolute -left-6 top-10 h-24 w-24 rounded-full bg-green-400/40 blur-3xl" />
            <div className="absolute -right-8 bottom-8 h-28 w-28 rounded-full bg-blue-400/40 blur-3xl" />
            <div className="rounded-[2rem] border border-white/20 bg-white/10 p-4 shadow-2xl backdrop-blur-xl">
              <Image src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1000&q=80" alt="Kantor desa" width={900} height={900} className="h-[480px] w-full rounded-[1.5rem] object-cover" />
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 animate-bounce text-white">
          <ChevronDown className="h-7 w-7" />
        </div>
      </section>

      {/* Stats Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((item, index) => {
            const IconComponent = iconMap[item.iconName] || UserRound;
            return (
              <motion.div key={item.label} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} className="rounded-[1.75rem] border border-slate-200/70 bg-white/80 p-6 shadow-[0_20px_60px_-20px_rgba(15,23,42,0.2)] backdrop-blur">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-green-600 to-blue-600 text-white shadow-md">
                  <IconComponent className="h-6 w-6" />
                </div>
                <h3 className="text-3xl font-bold text-slate-900">{item.value.toLocaleString('id-ID')}{item.suffix}</h3>
                <p className="mt-2 text-sm font-medium text-slate-600">{item.label}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Profile Lurah */}
      <section id="profil" className="mx-auto max-w-7xl px-4 py-20 md:px-8">
        <div className="grid items-center gap-10 rounded-[2.5rem] border border-slate-200/70 bg-gradient-to-br from-white/90 to-green-50/70 p-8 shadow-[0_30px_100px_-30px_rgba(15,23,42,0.3)] lg:grid-cols-[0.8fr_1.2fr] lg:p-12">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-green-500 to-blue-500 blur-2xl opacity-40" />
              <Image unoptimized src={profile.headImage || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80'} alt={profile.headName || 'Kepala Kelurahan'} width={300} height={300} className="relative h-72 w-72 rounded-full object-cover shadow-2xl" />
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-green-600">Sambutan Kepala Kelurahan</p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">Selamat Datang di Kelurahan Kriwen</h2>
            <p className="mt-6 text-lg leading-8 text-slate-700">{profile.welcomeMessage}</p>
            <div className="mt-8 rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm">
              <p className="font-semibold text-slate-900">{profile.headName}</p>
              <p className="text-sm text-slate-600">{profile.headTitle}</p>
              <div className="mt-4 flex items-center gap-2 text-sm font-medium text-green-700"><Sparkles className="h-4 w-4" /> Pemerintahan Terbuka & Digital</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section id="layanan" className="mx-auto max-w-7xl px-4 py-20 md:px-8">
        <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Layanan Desa</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">Layanan publik yang cepat, aman, dan transparan</h2>
          </div>
          <button onClick={() => setComplaintFormOpen(true)} className="inline-flex items-center gap-2 text-sm font-semibold text-green-700 hover:underline">
            Buat Pengaduan <ArrowRight className="h-4 w-4" />
          </button>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => {
            const IconComponent = iconMap[service.iconName] || FileText;
            return (
              <motion.div key={service.id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.06 }} whileHover={{ y: -6, scale: 1.01 }} className="rounded-[1.75rem] border border-slate-200/70 bg-white/80 p-7 shadow-[0_20px_50px_-20px_rgba(15,23,42,0.25)] backdrop-blur">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-green-600 to-blue-600 text-white">
                  <IconComponent className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-xl font-bold text-slate-900">{service.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{service.desc}</p>
                <button onClick={() => setComplaintFormOpen(true)} className="mt-6 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100">{service.button}</button>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Potensi Desa */}
      <section id="potensi-desa" className="mx-auto max-w-7xl px-4 py-20 md:px-8">
        <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-green-600">Potensi Desa</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">Kekuatan ekonomi dan budaya Kelurahan Kriwen</h2>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {potentials.map((item, index) => (
            <motion.div key={item.id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }} className="overflow-hidden rounded-[1.75rem] border border-slate-200/70 bg-white/80 shadow-[0_20px_50px_-20px_rgba(15,23,42,0.25)] backdrop-blur">
              <div className="relative h-56 overflow-hidden">
                <Image unoptimized src={item.image} alt={item.title} fill className="object-cover transition duration-700 hover:scale-110" />
              </div>
              <div className="p-6">
                <div className="inline-flex rounded-full bg-green-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-green-700">{item.tag}</div>
                <h3 className="mt-4 text-xl font-bold text-slate-900">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Berita Terbaru */}
      <section id="berita" className="mx-auto max-w-7xl px-4 py-20 md:px-8">
        <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-green-600">Berita Terbaru</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">Informasi terkini dari kelurahan</h2>
          </div>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {news.map((item, index) => (
            <motion.article key={item.id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.07 }} className="overflow-hidden rounded-[1.75rem] border border-slate-200/70 bg-white/80 shadow-[0_20px_50px_-20px_rgba(15,23,42,0.25)] backdrop-blur flex flex-col justify-between">
              <div>
                <div className="relative h-48">
                  <Image unoptimized src={item.image} alt={item.title} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-blue-600">
                    <span className="rounded-full bg-blue-50 px-3 py-1">{item.category}</span>
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-slate-900">{item.title}</h3>
                  <div className="mt-3 flex items-center gap-3 text-sm text-slate-500">
                    <span>{item.date}</span>
                    <span>•</span>
                    <span>{item.author}</span>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-slate-600">{item.excerpt}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Galeri Desa */}
      <section id="galeri" className="mx-auto max-w-7xl px-4 py-20 md:px-8">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-green-600">Galeri Desa</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">Kumpulan momen dan aktivitas desa</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button key={filter} onClick={() => setActiveFilter(filter)} className={`rounded-full px-4 py-2 text-sm font-semibold transition ${activeFilter === filter ? 'bg-gradient-to-r from-green-600 to-blue-600 text-white shadow-lg' : 'bg-slate-100 text-slate-700'}`}>
                {filter}
              </button>
            ))}
          </div>
        </div>
        <div className="columns-1 gap-5 md:columns-2 xl:columns-3">
          {(activeFilter === 'Semua' ? gallery : gallery.filter((item) => item.category === activeFilter)).map((item, index) => (
            <motion.div key={item.id || index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-5 overflow-hidden rounded-[1.5rem] border border-slate-200/70 bg-white/80 shadow-sm">
              <Image unoptimized src={item.image} alt={item.category} width={700} height={900} className="w-full object-cover" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Video Preview Desa */}
      <section id="video" className="mx-auto max-w-7xl px-4 py-20 md:px-8">
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-1.5 text-xs font-bold text-green-700 mb-3 shadow-xs">
            <Sparkles className="h-3.5 w-3.5" /> Video Profil Kelurahan
          </div>
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Jelajahi Kelurahan Kriwen Lewat Video Preview</h2>
          <p className="mt-3 text-sm text-slate-600 leading-relaxed">
            Saksikan keindahan wilayah, infrastruktur publik, kegiatan kemasyarakatan, serta potensi unggulan Kelurahan Kriwen dalam tampilan video dokumenter resmi.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] border border-slate-200/80 bg-slate-950 shadow-[0_30px_100px_-20px_rgba(15,23,42,0.4)] p-2 sm:p-4"
        >
          <div className="relative aspect-video w-full overflow-hidden rounded-[2rem] bg-slate-900 shadow-2xl">
            <iframe
              className="h-full w-full rounded-[2rem]"
              src="https://www.youtube-nocookie.com/embed/o_1aF54DO60?autoplay=1&mute=1&controls=0&loop=1&playlist=o_1aF54DO60&rel=0&modestbranding=1"
              title="Video Preview Profil Kelurahan Kriwen"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </motion.div>
      </section>

      {/* Call to Action */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8 lg:hidden">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-[2.5rem] bg-gradient-to-r from-green-600 to-blue-600 p-8 text-white shadow-[0_30px_100px_-30px_rgba(15,23,42,0.35)] lg:p-12">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-green-100">Layanan Aspirasi & Pengaduan</p>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Sampaikan Keluhan & Aspirasi Anda Langsung ke Pengelola Kelurahan.</h2>
            </div>
            <div className="flex flex-wrap gap-4">
              <button onClick={() => setComplaintFormOpen(true)} className="rounded-full bg-white px-6 py-3 font-semibold text-slate-900 transition hover:scale-105 shadow-xl">Tulis Pengaduan Warga</button>
              <a href="/admin/login" className="rounded-full border border-white/40 bg-white/10 px-6 py-3 font-semibold text-white transition hover:scale-105">Login Admin Panel</a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Kontak */}
      <section id="kontak" className="mx-auto max-w-7xl px-4 py-20 md:px-8">
        <div className="grid gap-8 rounded-[2.25rem] border border-slate-200/70 bg-white/80 p-8 shadow-[0_30px_100px_-30px_rgba(15,23,42,0.3)] backdrop-blur lg:grid-cols-[1fr_0.8fr] lg:p-12">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Peta Lokasi kantor Kelurahan</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">Temui kami di Kelurahan Kriwen</h2>
            <div className="mt-6 overflow-hidden rounded-[1.5rem] border border-slate-200">
              <Image unoptimized src={profile.mapImage || 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1000&q=80'} alt="Peta desa" width={1000} height={600} className="h-72 w-full object-cover" />
            </div>
          </div>
          <div className="rounded-[1.75rem] bg-slate-50 p-6 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900">Informasi Kontak</h3>
            <div className="mt-6 space-y-4 text-sm text-slate-700">
              <div className="flex items-start gap-3"><Compass className="mt-0.5 h-5 w-5 text-green-600" /><div><p className="font-semibold">Alamat</p><p>{profile.address}</p></div></div>
              <div className="flex items-start gap-3"><Phone className="mt-0.5 h-5 w-5 text-green-600" /><div><p className="font-semibold">Telepon</p><p>{profile.phone}</p></div></div>
              <div className="flex items-start gap-3"><MessageCircleMore className="mt-0.5 h-5 w-5 text-green-600" /><div><p className="font-semibold">WhatsApp</p><a href={`https://wa.me/${profile.whatsapp}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">wa.me/{profile.whatsapp}</a></div></div>
              <div className="flex items-start gap-3"><FileText className="mt-0.5 h-5 w-5 text-green-600" /><div><p className="font-semibold">Email</p><a href={`mailto:${profile.email}`} className="text-blue-600 hover:underline">{profile.email}</a></div></div>
              <div className="flex items-start gap-3"><CalendarDays className="mt-0.5 h-5 w-5 text-green-600" /><div><p className="font-semibold">Jam Pelayanan</p><p>{profile.serviceHours}</p></div></div>
            </div>
          </div>
        </div>
      </section>

      {/* Complaint Form Modal for Public */}
      {complaintFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-md p-4">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-lg rounded-3xl bg-white p-6 md:p-8 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Form Pengaduan & Aspirasi Warga</h3>
                <p className="text-xs text-slate-500">Laporan Anda akan ditinjau langsung oleh Admin Kelurahan</p>
              </div>
              <button onClick={() => setComplaintFormOpen(false)} className="rounded-full bg-slate-100 p-2 text-slate-500 hover:bg-slate-200">
                <X className="h-5 w-5" />
              </button>
            </div>

            {complaintSubmitted ? (
              <div className="py-10 text-center space-y-3">
                <CheckCircle2 className="mx-auto h-14 w-14 text-green-600 animate-bounce" />
                <h4 className="text-lg font-bold text-slate-900">Laporan Berhasil Terkirim!</h4>
                <p className="text-xs text-slate-600">Terima kasih atas masukan Anda. Tim Kelurahan Kriwen akan menindaklanjuti laporan Anda secepatnya.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitComplaint} className="mt-4 space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Nama Lengkap Warga</label>
                  <input type="text" required value={complaintForm.name} onChange={(e) => setComplaintForm({ ...complaintForm, name: e.target.value })} placeholder="Budi Santoso" className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-800 outline-none focus:border-green-600 focus:bg-white" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">No. WhatsApp / HP</label>
                    <input type="text" required value={complaintForm.phone} onChange={(e) => setComplaintForm({ ...complaintForm, phone: e.target.value })} placeholder="081234567890" className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-800 outline-none focus:border-green-600 focus:bg-white" />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Kategori Laporan</label>
                    <select value={complaintForm.category} onChange={(e) => setComplaintForm({ ...complaintForm, category: e.target.value })} className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-800 outline-none focus:border-green-600 focus:bg-white">
                      <option value="Infrastruktur">Infrastruktur</option>
                      <option value="Kebersihan">Kebersihan</option>
                      <option value="Layanan Publik">Layanan Publik</option>
                      <option value="Keamanan">Keamanan</option>
                      <option value="Lainnya">Lainnya</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Judul / Perihal Pengaduan</label>
                  <input type="text" required value={complaintForm.subject} onChange={(e) => setComplaintForm({ ...complaintForm, subject: e.target.value })} placeholder="Lampu jalan mati di RW 02..." className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-800 outline-none focus:border-green-600 focus:bg-white" />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Detail Isi Pengaduan / Aspirasi</label>
                  <textarea rows={4} required value={complaintForm.message} onChange={(e) => setComplaintForm({ ...complaintForm, message: e.target.value })} placeholder="Tuliskan secara lengkap lokasi dan detail permasalahan..." className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-800 outline-none focus:border-green-600 focus:bg-white" />
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button type="button" onClick={() => setComplaintFormOpen(false)} className="rounded-full border border-slate-200 px-5 py-2.5 font-semibold text-slate-600 hover:bg-slate-100">Batal</button>
                  <button type="submit" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-green-600 to-blue-600 px-6 py-2.5 font-bold text-white shadow-lg transition hover:scale-105">
                    <Send className="h-4 w-4" /> Kirim Pengaduan
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-200/70 bg-white/70 px-4 py-16 backdrop-blur md:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-green-600 to-blue-600 text-white shadow-lg">
                <Landmark className="h-5 w-5" />
              </div>
              <div>
                <p className="text-base font-semibold text-slate-900">Kelurahan Kriwen</p>
                <p className="text-sm text-slate-600">Maju, Sejahtera, Bersama</p>
              </div>
            </div>
            <p className="mt-5 text-sm leading-7 text-slate-600">Kelurahan Kriwen adalah wilayah yang berfokus pada layanan publik, transparansi, dan kemajuan ekonomi masyarakat.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Menu Navigasi</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li><a href="#beranda" className="hover:text-green-600">Beranda</a></li>
              <li><a href="#profil" className="hover:text-green-600">Profil</a></li>
              <li><a href="#layanan" className="hover:text-green-600">Layanan</a></li>
              <li><a href="#berita" className="hover:text-green-600">Berita</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Layanan</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li>Surat Domisili</li>
              <li>Surat Usaha</li>
              <li>Pengaduan Warga</li>
              <li>Download Formulir</li>
            </ul>
          </div>
        </div>
        <div className="mx-auto mt-8 max-w-7xl border-t border-slate-200 pt-6 text-center text-sm text-slate-500">© 2026 Kelurahan Kriwen. Semua hak cipta dilindungi.</div>
      </footer>
    </main>
  );
}
