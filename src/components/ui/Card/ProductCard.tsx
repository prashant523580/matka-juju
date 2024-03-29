"use client";
import { useCart } from '@/Context/cartContext';
import AddToCart from '@/components/AddToCart';
import { calculateDiscountedPrice } from '@/libs/calculator';
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function ProductCard({ product }: { product: any }) {
  const { cart, updateCart } = useCart()
  const getDays = (date: string) => {
    let day;
    if (typeof window !== "undefined") {

      let now: any = new window.Date();
      let date2 = new window.Date(date);
      let time = now.getTime() - date2.getTime();
      day = Math.ceil(time / (1000 * 3600 * 24));
      console.log(day)
    }
    return day


  }

  return (
    <div
      className='flex flex-col border  hover:shadow-md transition-all rounded-md overflow-hidden'
    // className=' py-0.5 flex bg-white border shadow-md border-gray-200'
    // className=' flex flex-row md:w-full sm:w-full w-full items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700'
    >
      <Link href={`/product/${product.slug}`} className="group relative mb-2 block w-full h-60 overflow-hidden  bg-gray-100  ">
        <Image src={product.images[0].src} fill sizes='100vw' loading="lazy" alt={product.name} className="object-cover object-center transition duration-200 group-hover:scale-110" />
        {
          product.discount > 0 &&
          <div className="absolute left-0 bottom-2 flex gap-2">
            <span className="rounded-r-lg bg-red-500 px-3 py-1.5 text-sm font-semibold uppercase tracking-wider text-white">-{product.discount}%</span>
            {/* <span className="rounded-lg bg-white px-3 py-1.5 text-sm font-bold uppercase tracking-wider text-gray-800">New</span> */}
          </div>
        }
      </Link>

      <div className="flex w-full items-start  justify-between gap-2 px-1">
        <div className="flex flex-col">
          <Link href={`/product/${product.slug}`} className="text-lg md:text-xl  text-gray-800 transition duration-100 hover:text-orange-500 font-bold  capitalize line-clamp-2">{product.name}</Link>
          
        </div>

        <div className="flex flex-col items-end py-1">
          {
            product.discount > 0 ?
              <>
                <span className="font-bold text-gray-600 lg:text-lg">Rs.{calculateDiscountedPrice(product.price, product.discount).discountedPrice}</span>
                <span className="text-sm text-red-500 line-through">Rs.{product.price}</span>
              </> :
              <div className="  lg:text-base capitalize">Rs.{product.price} / <span className="">
              {`(${product?.size == 'cup' ? "cup" : product?.size == "1/2" ? "1/2 Ltr " : product?.size == "1" && "1 Ltr" })`}
              </span></div>
          }
        </div>
      </div>
      <div className="buttons grid grid-cols-1  ">
        <AddToCart cart={product} onUpdateCart={updateCart} />
        {/* <button className='bg-orange-400 p-2 '><Link href={`product/${product?.slug}`}>Order Now</Link></button> */}
      </div>

    </div>
  )
}

export default ProductCard