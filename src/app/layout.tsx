import type { Metadata } from 'next'
import { Inter, Aladin, Unbounded } from 'next/font/google'
import './globals.css'
import AuthSessionProvider from './provider'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import NextTopLoader from 'nextjs-toploader'
import { site } from '@/constent'
import Script from 'next/script'
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google'

// import SessionProviders from './provider'

const inter = Unbounded({ subsets: ['latin'], weight: "400" },)

// export const metadata: Metadata = {
//   title: 'Gel Blaster Gun Nepal',
//   description: `GELBLASTERGUN.COM
//   At GELBLASTERGUN.COM, we are passionate about providing our customers with the best gel blaster products and accessories on the US market.
//   Our stock is in the United States so we can deliver quickly.
//   Our team is made up of avid gel blaster enthusiasts who have a deep understanding of the industry and what customers are looking for. We believe that everyone should have access to high-quality gel blasters, and we work hard to make that a reality for our customers.`,
// }

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL),
  alternates: {
    canonical: '/',
    // languages: {
    //   'en-US': '/en-US',
    //   'de-DE': '/de-DE',
    // },
  },
  openGraph: {
    images: ["/icons/android-chrome-512x512.png", site.icon, "/logo.png"],
    siteName: site.name,
    description: site.description,
    type: "website",
    countryName: "Nepal",
    title: site.name,
    url: "/"
  },
  title: {
    default: site.name,
    template: '%s | ' + site.name
  },
  description: site.description.slice(0,170),
  keywords: site.keywords,
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
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
let faqArray = site.faqs.map((faq) =>(  {
  "@type": "Question",
  "name": faq.question,
  "acceptedAnswer": {
    "@type": "Answer",
    "text": faq.answer
  }
}))
  const jsonLd = {
    '@context': 'https://schema.org',
    "@type": "Organization",
    name: site.name,
    image: process.env.NEXT_PUBLIC_URL + "/icons/android-chrome-720x540.png",
    url: process.env.NEXT_PUBLIC_URL,
    description: site.description,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": site.contact,
      "contactType": "Customer service",
    },
    keywords: site.keywords,
    "sameAs": [
      "https://twitter.com/Prashant62758",
      "https://www.facebook.com/chordograph/",
      "https://www.instagram.com/prshnt._.mgr/"
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Nepalgunj, Bhirkutinagar, Banke",
      "addressRegion": "NP",
      "postalCode": "21900",
      "addressCountry": "NP"
    },
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://matkajuju.com/",
        "name": "Prashant",
        "image": {
          "@type": "ImageObject",
          "inLanguage": "en-US",
          "@id": "https://matkajuju.com/#",
          "url": "https://secure.gravatar.com/avatar/7bf766960e82968a4f0a031245744036aedd60adf2c9adca0a869d4d7636231c?size=256",
          "contentUrl": "https://secure.gravatar.com/avatar/7bf766960e82968a4f0a031245744036aedd60adf2c9adca0a869d4d7636231c?size=256",
          "caption": "Prashant",
          "width": "400",
          "height": "400"
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "SiteNavigationElement",
        "name": "Home",
        "url": process.env.NEXT_PUBLIC_URL
      },
      {
        "@context": "https://schema.org",
        "@type": "SiteNavigationElement",
        "name": "Products",
        "url": "https://matkajuju.com/products"
      },
      {
        "@context": "https://schema.org",
        "@type": "SiteNavigationElement",
        "name": "About",
        "url": "https://matkajuju.com/pages/about"
      },
      {
        "@context": "https://schema.org",
        "@type": "SiteNavigationElement",
        "name": "Contact",
        "url": "https://matkajuju.com/pages/contact"
      },
      {
        "@type": "FAQPage",
        "mainEntity": faqArray
      }
    ],
  }
  return (
    <html lang="en">
      <body className={inter.className + " tracking-wider bg-gray-100"}>
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
        <AuthSessionProvider>
          {children}
        </AuthSessionProvider>
      

      </body>
      <GoogleAnalytics gaId='G-C3XKPEBXD1'/>
      <GoogleTagManager gtmId='GTM-MMDV9L43'/>
        <Script
          id='jsonld-home'
          type='application/ld+json'
          async
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd)
          }}
        />
      
    </html>
  )
}
