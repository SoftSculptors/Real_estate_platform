import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Real Estate NL | Uw Betrouwbare Partner in Vastgoed",
  description: "Ontdek ons uitgebreide aanbod van luxe woningen en exclusief vastgoed in Nederland. Professionele begeleiding bij elke stap van uw zoektocht naar uw droomhuis.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="nl">
      <body className={`${inter.className} antialiased min-h-screen flex flex-col`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
