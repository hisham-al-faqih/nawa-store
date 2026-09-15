import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Tajawal } from 'next/font/google'
import './globals.css'

const tajawal = Tajawal({ subsets: ['arabic'], weight: ['400', '500', '700'], display: 'swap', variable: '--font-tajawal' })

export const metadata: Metadata = {
  title: 'نواة | اختيارات جميلة لحياة أهدأ',
  description: 'متجر نواة للمنتجات المختارة بعناية، بتجربة تسوق عصرية وسلسة.',
  generator: 'v0.app',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  alternates: { canonical: '/' },
  openGraph: {
    title: 'نواة | اختيارات جميلة لحياة أهدأ',
    description: 'متجر نواة للمنتجات المختارة بعناية، بتجربة تسوق عصرية وسلسة.',
    locale: 'ar_YE',
    type: 'website',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#773441',
  userScalable: true,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ar" dir="rtl"><body className={`${tajawal.variable} antialiased`}>{children}{process.env.NODE_ENV === 'production' && <Analytics />}</body></html>
}
