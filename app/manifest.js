export default function manifest() {
  return {
    name: 'EFY Studio — Boutique Pilates',
    short_name: 'EFY Studio',
    description: 'Premium Pilates Studio in Berlin Lichterfelde West.',
    start_url: '/',
    display: 'standalone',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}
