import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'StatusLite — Beautiful Status Pages for Modern SaaS',
  description: 'Simple, affordable status pages for indie SaaS founders. Start free, upgrade when you need more. No more paying $29+/month for basic status pages.',
  keywords: ['status page', 'SaaS', 'indie hacker', 'affordable', 'incident management', 'uptime monitoring'],
  authors: [{ name: 'StatusLite' }],
  openGraph: {
    title: 'StatusLite — Beautiful Status Pages for Modern SaaS',
    description: 'Simple, affordable status pages for indie SaaS founders.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
