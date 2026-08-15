import type { Metadata } from 'next';
import './globals.css';
import { DataProvider } from '@/context/DataContext';

export const metadata: Metadata = {
  title: 'Kelurahan Kriwen | Portal & Admin Panel Resmi',
  description: 'Website resmi & Admin Panel Pemerintahan Kelurahan Kriwen.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>
        <DataProvider>{children}</DataProvider>
      </body>
    </html>
  );
}

