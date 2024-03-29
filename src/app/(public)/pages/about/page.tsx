import { site } from '@/constent'
import { Metadata } from 'next'
import React from 'react'
export const metadata : Metadata = {
    alternates: {
      canonical: '/pages/about',
      // languages: {
      //   'en-US': '/en-US',
      //   'de-DE': '/de-DE',
      // },
    },
    openGraph: {
      images: site.icon,
    },
    title: "About",
    description: "",
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
      icon: "/icons/favicon.ico",
      shortcut: "/icons/favicon.ico",
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

  }
function AboutPage() {
    return (
        <div className='p-8  space-y-4 text-center'>
            <h2 className='font-bold text-2xl'>About MATKAJUJU.COM</h2>
            <h3 className='font-bold text-xl'>Welcome to Matka Juju: Preserving Tradition, Savoring Delight</h3>
            <p>

At Matka Juju, we are passionate about preserving the rich culinary heritage of Nepal while offering a delightful culinary experience to our customers worldwide. Our journey began with a vision to share the authentic flavors of Juju Dhau, a traditional Nepalese dessert, with the world.</p>
        </div>
    )
}

export default AboutPage