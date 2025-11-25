import type { Metadata } from 'next';
import { WixProvider } from '@/lib/wix-context';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: 'Share A Cool Story',
  description: 'A community platform where people share their unique and compelling stories with a global audience.',
  keywords: ['stories', 'community', 'sharing', 'social'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <WixProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </WixProvider>
      </body>
    </html>
  );
}
