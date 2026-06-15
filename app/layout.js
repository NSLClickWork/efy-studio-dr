import '@/app/globals.css';
import Navbar from '@/app/components/Navbar/Navbar';
import Footer from '@/app/components/Footer/Footer';
import Providers from '@/app/components/Providers';

export const viewport = {
  viewportFit: 'cover',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata = {
  metadataBase: new URL('https://efy-studio.up.railway.app'),
  title: {
    default: 'EFY Studio — Boutique Pilates in Lichterfelde West, Berlin',
    template: '%s | EFY Studio Berlin',
  },
  description: 'Premium Pilates Studio in Berlin Lichterfelde West. Reformer, Barre, Mat Pilates in kleinen Gruppen. Persönliche Betreuung. Jetzt Probestunde buchen.',
  keywords: ['Pilates Berlin', 'Reformer Pilates', 'Boutique Pilates', 'Lichterfelde West', 'Barre Pilates', 'Mat Pilates', 'Prenatal Pilates', 'Pilates Studio Berlin'],
  authors: [{ name: 'EFY Studio' }],
  appleWebApp: {
    capable: true,
    title: 'EFY Studio',
    statusBarStyle: 'black-translucent',
  },
  openGraph: {
    title: 'EFY Studio — Boutique Pilates in Lichterfelde West, Berlin',
    description: 'Premium Pilates Studio in Berlin Lichterfelde West. Reformer, Barre, Mat Pilates in kleinen Gruppen.',
    url: 'https://efy-studio.up.railway.app',
    siteName: 'EFY Studio',
    locale: 'de_DE',
    type: 'website',
    images: [{ url: '/images/hero.png', width: 1200, height: 630, alt: 'EFY Studio Berlin' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EFY Studio — Boutique Pilates Berlin',
    description: 'Premium Pilates Studio in Lichterfelde West. Reformer, Barre, Mat.',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://efystudio.de',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SportsActivityLocation',
              name: 'EFY Studio',
              description: 'Boutique Pilates Studio in Berlin Lichterfelde West',
              url: 'https://efystudio.de',
              telephone: '+49 30 XXXXXXX',
              email: 'info@efystudio.de',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Curtiusstraße 9',
                postalCode: '12205',
                addressLocality: 'Berlin',
                addressRegion: 'Berlin',
                addressCountry: 'DE',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: '52.4330',
                longitude: '13.3070',
              },
              openingHoursSpecification: [
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                  opens: '08:00',
                  closes: '21:00',
                },
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: 'Saturday',
                  opens: '09:00',
                  closes: '16:00',
                },
              ],
              image: '/images/hero.png',
              priceRange: '€€',
            }),
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
