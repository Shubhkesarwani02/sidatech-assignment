import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Medence Legal - Your Personal Lawyer. On Your Side, Always.',
  description: 'Professional legal services platform offering affordable, personalized legal solutions. Get your personal lawyer for everyday legal needs with transparent pricing and expert support.',
  keywords: 'legal services, personal lawyer, affordable legal help, legal consultation, legal advice, professional lawyers',
  authors: [{ name: 'SIDA Technologies' }],
  creator: 'SIDA Technologies',
  publisher: 'Medence Legal',
  openGraph: {
    title: 'Medence Legal - Your Personal Lawyer',
    description: 'Professional legal services platform offering affordable, personalized legal solutions.',
    url: 'https://medence-legal.com',
    siteName: 'Medence Legal',
    type: 'website',
    images: [
      {
        url: '/happy-family-with-lawyer-in-professional-setting.jpg',
        width: 1200,
        height: 630,
        alt: 'Medence Legal - Professional Legal Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Medence Legal - Your Personal Lawyer',
    description: 'Professional legal services platform offering affordable, personalized legal solutions.',
    images: ['/happy-family-with-lawyer-in-professional-setting.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
