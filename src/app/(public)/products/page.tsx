import { get } from '@/libs/fetch'
import React from 'react'
import ProductsComponent from './ProductsComponent';
import { site } from '@/constent';
import { Metadata } from 'next';


export const metadata : Metadata = {
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
    title: "Matka Juju Products",
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
async function ProductsPage({ searchParams }: {
  searchParams?: {
    category?: string,
    price?: string,
    sort?:string
  }
}) {
  // console.log(searchParams?.category)
  // let productData;
  const searchParamsObject = {
    category: searchParams?.category,
    price: searchParams?.price,
    sort: searchParams?.sort,
    // Add more parameters as needed
  };
  
  const queryParams = Object.entries(searchParamsObject)
    .filter(([key, value]) => value !== undefined)
    .map(([key, value] : any) => `${key}=${encodeURIComponent(value)}`)
    .join('&');
  console.log({queryParams})
  // if (searchParams?.category) {
  //   productData = await get(`product?category=${searchParams?.category}`);
  // } else if (searchParams?.price) {
  //   productData = await get(`product?price=${searchParams?.price}`);
  // } else if (searchParams?.category && searchParams?.price) {
  //   productData = await get(`product?category=${searchParams?.category}&&price=${searchParams?.price}`)
  // }
  // else if(searchParams?.sort){
  //   productData = await get(`product?category=${searchParams.sort}`)
  // }
  // else {
  //   productData = await get(`product`)
  // }
  const productData = await get(`product${queryParams ? `?${queryParams}` : ''}`);

//   let categoryData = await get("category");
  let [products] = await Promise.all([productData])
  // console.log({ products })
  return (
    <div>
      <ProductsComponent products={products}
    //    category={category}
        />
    </div>
  )
}

export default ProductsPage