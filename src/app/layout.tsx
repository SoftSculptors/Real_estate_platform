import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import EmailProvider from '@/components/providers/EmailProvider'

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://ole-wonen.nl'),
  title: "Olé Wonen | Uw droomhuis in Spanje",
  description: "Ontdek uw droomhuis in Spanje met Olé Wonen. Wij helpen u bij het vinden en kopen van de perfecte woning in Spanje.",
  icons: {
    icon: '/favicon.ico'
  },
  openGraph: {
    type: 'website',
    locale: 'nl_NL',
    url: 'https://www.olewonen.nl',
    siteName: 'Olé Wonen',
    title: 'Olé Wonen | Uw Betrouwbare Partner in Vastgoed',
    description: 'Ontdek ons uitgebreide aanbod van luxe woningen en exclusief vastgoed in Nederland. Professionele begeleiding bij elke stap van uw zoektocht naar uw droomhuis.',
    images: [
      {
        url: '/images/ole-wonen-logo.png',
        width: 800,
        height: 600,
        alt: 'Olé Wonen Logo'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Olé Wonen | Uw Betrouwbare Partner in Vastgoed',
    description: 'Ontdek ons uitgebreide aanbod van luxe woningen en exclusief vastgoed in Nederland. Professionele begeleiding bij elke stap van uw zoektocht naar uw droomhuis.',
    images: ['/images/ole-wonen-logo.png']
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="nl" className={inter.className}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon_io/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon_io/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon_io/apple-touch-icon.png" />
      </head>
      <body className="antialiased min-h-screen flex flex-col">
        <EmailProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </EmailProvider>
      </body>
    </html>
  );
}
