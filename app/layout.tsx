import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'QuickProp - Generate Proposals in 47 Seconds',
  description: 'AI-powered proposal generation in ~47 seconds. Transform meeting notes into professional client proposals instantly.',
  keywords: ['proposals', 'AI', 'SaaS', 'sales', 'client proposals'],
  openGraph: {
    title: 'QuickProp - 47 Second Proposals',
    description: 'AI-powered proposal generation that respects your time.',
    url: 'https://quickprop.app',
    siteName: 'QuickProp',
    images: [
      {
        url: 'https://quickprop.app/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'QuickProp - 47 Second Proposals',
    description: 'AI-powered proposal generation in ~47 seconds',
    images: ['https://quickprop.app/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-dark-bg text-white antialiased">
        {children}
      </body>
    </html>
  );
}
