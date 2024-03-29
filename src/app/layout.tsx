import type { Metadata } from 'next'
import { Inter, Aladin, Unbounded } from 'next/font/google'
import './globals.css'
import AuthSessionProvider from './provider'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import NextTopLoader from 'nextjs-toploader'
import { site } from '@/constent'

// import SessionProviders from './provider'

const inter = Unbounded({ subsets: ['latin'], weight: "400" },)

// export const metadata: Metadata = {
//   title: 'Gel Blaster Gun Nepal',
//   description: `GELBLASTERGUN.COM
//   At GELBLASTERGUN.COM, we are passionate about providing our customers with the best gel blaster products and accessories on the US market.
//   Our stock is in the United States so we can deliver quickly.
//   Our team is made up of avid gel blaster enthusiasts who have a deep understanding of the industry and what customers are looking for. We believe that everyone should have access to high-quality gel blasters, and we work hard to make that a reality for our customers.`,
// }

export const metadata : Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL),
  alternates: {
    canonical: '/',
    // languages: {
    //   'en-US': '/en-US',
    //   'de-DE': '/de-DE',
    // },
  },
  openGraph: {
    images: site.icon,
  },
  title: {
    default: site.name,
    template: '%s | ' + site.name
  },
  description: site.description,
  keywords: site.keywords,
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    }
  },
  icons: {
    icon: "/icons/android-chrome-512x512.png",
    shortcut: "/icons/android-chrome-512x512.png",
    apple: "/icons/apple-touch-icon.png",
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "/icons/apple-touch-icon.png"
    }
  },
  // manifest: "/manifest.json",
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.description,
    siteId: "",
    creator: "",
    creatorId: "",
    images: [site.icon],
  },
  generator: 'Next.js',
  applicationName: 'Next.js',
  referrer: 'origin-when-cross-origin',
  // authors: [{ name: 'PriceBaa' }, { name: 'PriceBaa', url: 'https://pricebaa.vercel.app' }],

  creator: 'Tripods Nepal',
  publisher: 'Tripods Nepal',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <AuthSessionProvider>
        <body className={inter.className + " "}>
        <NextTopLoader
          color="#333"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #2299DD,0 0 5px #2299DD"
        />
          <ToastContainer />
          {children}
        </body>
      </AuthSessionProvider>
    </html>
  )
}
