'use client';

import React, { useState } from 'react';
import { uploadImageToImgBB } from '@/lib/imgbb';
import { Upload, Loader2, Image as ImageIcon } from 'lucide-react';

interface ImageUploadInputProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export const ImageUploadInput: React.FC<ImageUploadInputProps> = ({
  value,
  onChange,
  label = 'Gambar / Foto',
}) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError('');
    try {
      const url = await uploadImageToImgBB(file);
      onChange(url);
    } catch (err: any) {
      setError(err.message || 'Gagal mengunggah foto');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-1.5 text-xs">
      <label className="block font-semibold text-slate-700">{label}</label>

      <div className="flex items-center gap-3">
        {value ? (
          <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-slate-100 shadow-xs">
            <img src={value} alt="Preview" className="h-full w-full object-cover" />
          </div>
        ) : (
          <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 text-slate-400">
            <ImageIcon className="h-5 w-5" />
          </div>
        )}

        <div className="flex-1 space-y-1.5">
          <div className="flex items-center gap-2">
            <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl bg-slate-900 px-3 py-2 text-xs font-bold text-white shadow-xs hover:bg-slate-800 transition">
              {uploading ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" /> Uploading ke imgBB...
                </>
              ) : (
                <>
                  <Upload className="h-3.5 w-3.5 text-green-400" /> Pilih & Upload Foto
                </>
              )}
              <input
                type="file"
                accept="image/*"
                disabled={uploading}
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>

          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Atau tempelkan URL gambar langsung..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2 text-[11px] text-slate-800 outline-none focus:border-green-600 focus:bg-white"
          />
        </div>
      </div>

      {error && <p className="text-[11px] font-semibold text-red-600">{error}</p>}
    </div>
  );
};
