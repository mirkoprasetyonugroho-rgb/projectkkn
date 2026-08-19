'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Landmark, Lock, User, Eye, EyeOff, ArrowLeft, ShieldCheck, KeyRound } from 'lucide-react';
import { useData } from '@/context/DataContext';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useData();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const success = await login(username, password);
      if (success) {
        router.push('/admin');
      } else {
        setError('Username/Email atau Password salah!');
        setLoading(false);
      }
    } catch (err) {
      setError('Gagal terhubung ke Firebase Auth');
      setLoading(false);
    }
  };

  const handleQuickLogin = async () => {
    setUsername('admin');
    setPassword('admin123');
    setLoading(true);
    const success = await login('admin', 'admin123');
    if (success) {
      router.push('/admin');
    } else {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12 text-slate-800">
      <div className="w-full max-w-md">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-900 transition mb-6"
          >
            <ArrowLeft className="h-4 w-4" /> Kembali ke Portal Kelurahan
          </a>

          <div className="flex flex-col items-center text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-600 text-white shadow-sm mb-4">
              <Landmark className="h-7 w-7" />
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
              <ShieldCheck className="h-3.5 w-3.5" /> Portal Admin Kelurahan
            </span>
            <h1 className="mt-3 text-2xl font-bold text-slate-900">Kelurahan Kriwen</h1>
            <p className="mt-1 text-xs text-slate-500">Masuk untuk mengelola data & layanan publik</p>
          </div>

          {error && (
            <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-3 text-center text-xs font-semibold text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Username</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm font-medium text-slate-900 placeholder-slate-400 outline-none focus:border-green-600 focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-11 text-sm font-medium text-slate-900 placeholder-slate-400 outline-none focus:border-green-600 focus:bg-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-full rounded-xl bg-green-600 py-3 text-sm font-bold text-white shadow-sm hover:bg-green-700 transition disabled:opacity-50"
            >
              {loading ? 'Memproses...' : 'Masuk Admin'}
            </button>
          </form>

          <div className="mt-6 border-t border-slate-100 pt-5">
            <div className="rounded-xl bg-slate-50 p-4 text-center">
              <button
                type="button"
                onClick={handleQuickLogin}
                className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition shadow-xs"
              >
                <KeyRound className="h-3.5 w-3.5 text-amber-600" /> Masuk Cepat Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
