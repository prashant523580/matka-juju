import { get } from '@/libs/fetch'
import React from 'react'
import ProductComponent from './ProductComponent'
import { Metadata } from 'next';
interface PageProps {
  params: { slug: string },
  searchParams: {
      [key: string]: string | string[] | undefined,
  }
}

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

  return (
    <div>
      <ProductComponent product={product}/>
   
    </div>
  )
}

export default ProductPage