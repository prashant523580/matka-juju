import { get } from '@/libs/fetch'
import React from 'react'
import ProductComponent from './ProductComponent'
import { Metadata } from 'next';
import Script from 'next/script';
interface PageProps {
  params: { slug: string },
  searchParams: {
      [key: string]: string | string[] | undefined,
  }
}
export const stripHtmlTags = (html: string) => {
  if (html) {

      return html.replace(/<[^>]*>/g, '');
  } else {
      return ''
  }
};
export async function generateMetadata({ params: { slug }  }: PageProps) : Promise<Metadata> {
  try {
  
    let product = await get("product/"+slug);
    let description = product?.name + " Matka Juju"
    // console.log(product)
    return {
      alternates: {
        canonical: `/product/${slug}` ,
        // languages:{
        //   "en-CA": `en-CA/products/${productname}`
        // }
      },
      title: product?.name,
      description: product?.description ? product?.description.slice(0,160) : description ,
      keywords: product?.tags ? product?.keywords : [product?.name],
      openGraph: {
        title: product.name,
        description: product?.description ? product?.description.slice(0,160) : description,
        images: [product?.images[0]?.src],
        url: `${process.env.NEXTAUTH_URL}/product/${product?.slug}`,
        type: "article",
        locale:"en_US",
        siteName:"Chordograph",
        publishedTime:product?.createdAt,
        modifiedTime:product?.updatedAt
      },
      twitter: {
        card: "summary_large_image",
        title: product?.name,
        description: product?.description ? product?.description.slice(0,160) : description,
        siteId: "@Prashant62758",
        creator: "Prashant Thapa",
        creatorId: "@Prashant62758",
        images: [product?.images[0]?.src],
      },
      authors:{
        name:"Prashant Thapa",
        url:"https://www.facebook.com/prashant7hapa/"
      },
      // appleWebApp:{
      //   title:product?.name,
      //   capable:true,
      //   statusBarStyle:"black-translucent",
      //   startupImage:[product?.avatar?.img, product?.featureImage?.img],
    
      // },
 
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
    }
  } catch (err) {
    return {
      title: "Page Not Found",
      description: "page you looking for doesn't exists."
    }
  }
}
async function ProductPage({params :{slug}} :PageProps) {
  let product = await get("product/"+slug);
  const generateJSONLDSchema = (product : any) => {
    let schema = 
    {
      "@context": "http://schema.org",
      "@type": "Product",
      "name": product?.name,
      "description": product?.description ?  stripHtmlTags(product?.description) : product?.name,
      "brand": {
        "@type": "Brand",
        "name": [product?.category?.name],
        "logo": product?.category?.image?.src
      },
      "image": product?.images[0].src,
      "url": process.env.NEXTAUTH_URL+"/product/"+product.slug,
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": process.env.NEXTAUTH_URL
          },
          {
              "@type": "ListItem",
              "position": 4,
              "name": product?.name,
              "item": process.env.NEXTAUTH_URL +  "/product/" + product?.slug
              // href: "/category/" + post.category.slug
          },
      ]
    },
      // "sku": "MP123456",
      "offers": {
        "@type": "Offer",
        "priceCurrency": "NPR",
        "price": product?.price,
        "availability": "http://schema.org/InStock",
        "seller": {
          "@type": "Organization",
          "name": "Raj Poudel",
          "url": "http://matkajuju.com"
        }
      },
      // "aggregateRating": {
      //   "@type": "AggregateRating",
      //   "ratingValue": "4.5",
      //   "reviewCount": "100"
      // },
    "keywords": product?.tags ? product?.tags : [product.title,product?.category?.name]
    }
    return schema
}
const jsonLd = generateJSONLDSchema(product)
  return (
    <>
    <div>
      <ProductComponent product={product}/>
   
    </div>
  <Script
    async
    id='jsonld-product'
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify(jsonLd)
    }}
    />
    </>
  )
}

export default ProductPage