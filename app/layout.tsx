import type { Metadata } from 'next';
import { Urbanist, DM_Sans } from 'next/font/google';
import localFont from 'next/font/local';
import { Toaster } from '../components/ui/sonner';
import { Nav } from '../components/nav';
import { Footer } from '../components/footer';
import './globals.css';
import 'react-loading-skeleton/dist/skeleton.css';

const urbanist = Urbanist({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-urbanist',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const padelioFont = localFont({
  src: '../public/fonts/arial_narrow_7.ttf',
  variable: '--font-padelio',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Padelio — Premium Padel Academy',
  description: 'World-class padel courts, expert coaching programs, and a vibrant community. Join Padelio today.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${urbanist.variable} ${dmSans.variable} ${padelioFont.variable}`}>
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
