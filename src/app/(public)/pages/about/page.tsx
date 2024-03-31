import { site } from '@/constent'
import { Metadata } from 'next'
import Image from 'next/image'
import React from 'react'
export const metadata: Metadata = {
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
 
        {/* <div className="group h-[150px] w-[300px]  md:h-[200px] md:w-[400px] [perspective:1000px] mx-auto">
          <div className="relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] rounded-lg shadow-xl">
            <div className="absolute inset-0  ">
              <Image width={400} height={200} src={"/images/bussiness-card/front.svg"} className='object-cover shadow-xl shadow-black/40'  alt='banner front' />
            </div>
            <div className="absolute inset-0 h-full w-full [backface-visibility:hidden] group-hover:[transform:rotateY(180deg)] ">
              <Image width={400} height={200} className='object-cover shadow-xl shadow-black/40 ' src={"/images/bussiness-card/back.svg"}  alt='banner back' />
            </div>
          </div>
        </div> */}
        <div className="mt-8">

         <div className="flip-card cursor-pointer  h-[120px] w-[18rem]  sm:h-[180px] sm:w-[400px]  md:h-[250px] md:w-[30rem] [perspective:1000px] mx-auto ">
          <div className="flip-card-inner">
            <div className="flip-card-front ">
              <Image width={500} height={200} src={"/images/bussiness-card/front.svg"} className='object-cover rounded-lg '  alt='banner front' />
            </div>
            <div className="flip-card-back">
              <Image width={500} height={200} className='object-cover  rounded-lg ' src={"/images/bussiness-card/back.svg"}  alt='banner back' />
            </div>
          </div>
        </div>
        </div>
    </div>
  )
}

export default AboutPage