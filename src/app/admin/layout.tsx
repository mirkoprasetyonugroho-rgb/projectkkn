'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useData } from '@/context/DataContext';
import {
  BarChart3,
  ExternalLink,
  FileText,
  Image as ImageIcon,
  Landmark,
  LogOut,
  Menu,
  MessageSquare,
  Newspaper,
  Settings,
  Sprout,
  User,
  X,
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { logout, complaints } = useData();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Render full screen for login page
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const pendingCount = complaints.filter((c) => c.status === 'Menunggu').length;

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-800 font-sans">
      {/* Mobile Backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed bottom-0 top-0 left-0 z-50 flex w-64 flex-col border-r border-slate-200 bg-white p-5 shadow-sm transition-transform duration-200 lg:static lg:translate-x-0 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand */}
        <div className="flex items-center justify-between pb-5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-600 text-white shadow-sm">
              <Landmark className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">Kelurahan Kriwen</h2>
              <p className="text-xs text-slate-500 font-medium">Admin Dashboard</p>
            </div>
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 space-y-1 py-4">
          <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
            Menu Utama
          </p>

          <a
            href="/admin"
            className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition"
          >
            <BarChart3 className="h-4 w-4 text-green-600" /> Ringkasan Dashboard
          </a>

          <p className="pt-4 px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
            Kelola Konten
          </p>

          <a
            href="/admin#berita"
            className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition"
          >
            <Newspaper className="h-4 w-4 text-slate-400" /> Berita Desa
          </a>
          <a
            href="/admin#layanan"
            className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition"
          >
            <FileText className="h-4 w-4 text-slate-400" /> Layanan & Surat
          </a>
          <a
            href="/admin#potensi"
            className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition"
          >
            <Sprout className="h-4 w-4 text-slate-400" /> Potensi UMKM
          </a>
          <a
            href="/admin#galeri"
            className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition"
          >
            <ImageIcon className="h-4 w-4 text-slate-400" /> Galeri Foto
          </a>

          <p className="pt-4 px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
            Laporan & Setting
          </p>

          <a
            href="/admin#pengaduan"
            className="flex items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition"
          >
            <span className="flex items-center gap-3">
              <MessageSquare className="h-4 w-4 text-slate-400" /> Pengaduan Warga
            </span>
            {pendingCount > 0 && (
              <span className="rounded-full bg-amber-100 text-amber-700 px-2 py-0.5 text-[10px] font-bold">
                {pendingCount}
              </span>
            )}
          </a>
          <a
            href="/admin#profil"
            className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition"
          >
            <Settings className="h-4 w-4 text-slate-400" /> Profil Kelurahan
          </a>
        </nav>

        {/* User Footer */}
        <div className="border-t border-slate-100 pt-4 space-y-2">
          <a
            href="/"
            target="_blank"
            className="flex items-center justify-center gap-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition"
          >
            <ExternalLink className="h-3.5 w-3.5" /> Lihat Website
          </a>
          <button
            onClick={async () => {
              await logout();
              router.push('/admin/login');
            }}
            className="flex items-center justify-center gap-2 w-full rounded-xl bg-red-50 border border-red-100 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-100 transition"
          >
            <LogOut className="h-3.5 w-3.5" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content View */}
      <div className="flex flex-1 flex-col min-w-0">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white/90 px-4 backdrop-blur-md md:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-50 lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
            <h1 className="text-base font-bold text-slate-800 hidden sm:block">
              Panel Kelurahan Kriwen
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex items-center gap-2 text-xs font-medium text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full">
              <span className="h-2 w-2 rounded-full bg-emerald-500" /> Admin Active
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-200 text-slate-700 font-bold text-xs">
              <User className="h-4 w-4" />
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
