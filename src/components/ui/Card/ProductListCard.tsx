import { useCart } from '@/Context/cartContext';
import AddToCart from '@/components/AddToCart';
import { calculateDiscountedPrice } from '@/libs/calculator';
import Image from 'next/image';
import React from 'react'
import { FaCartPlus } from "react-icons/fa";

function ProductListCard({ product }: any) {
  const { updateCart } = useCart();
  return (

    <div className="py-6">
      <div className="flex max-w-xl h-40 bg-white shadow-lg rounded-lg overflow-hidden">
        <div className=" w-40 md:w-40 bg-cover h-auto relative" style={{ backgroundImage: product.images[0].src }}>
          <Image src={product.images[0].src} fill sizes='100vw' alt={product.name} />
          {product.discount > 0 && <div className="absolute left-0 bottom-2 flex gap-2">
            <span className="rounded-r-lg bg-red-500 px-3 py-1.5 text-sm font-semibold uppercase tracking-wider text-white">-{product.discount}%</span>
            {/* <span className="rounded-lg bg-white px-3 py-1.5 text-sm font-bold uppercase tracking-wider text-gray-800">New</span> */}
          </div>}
        </div>
        <div className="w-2/4 px-2">
          <h1 className="text-gray-900 capitalize  text-base md:text-2xl line-clamp-1">{product.name}</h1>
          {/* <p className="mt-2 text-gray-600 text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit In odit exercitationem fuga id nam quia</p> */}
          {/* <div className="flex item-center mt-2">
            <svg className="w-5 h-5 fill-current text-gray-700" viewBox="0 0 24 24">
              <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"/>
            </svg>
            <svg className="w-5 h-5 fill-current text-gray-700" viewBox="0 0 24 24">
              <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"/>
            </svg>
            <svg className="w-5 h-5 fill-current text-gray-700" viewBox="0 0 24 24">
              <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"/>
            </svg>
            <svg className="w-5 h-5 fill-current text-gray-500" viewBox="0 0 24 24">
              <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"/>
            </svg>
            <svg className="w-5 h-5 fill-current text-gray-500" viewBox="0 0 24 24">
              <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"/>
            </svg>
          </div> */}
          <div className="flex md:flex-row flex-col h-[110px] md:item-center md:justify-between mt-3">
            <div className="flex  flex-col">

              {/* <h3 className="text-gray-700 font-bold text-xl">Rs.{product.price}</h3> */}
              <div className='flex flex-col'>

                {product.discount > 0 ?
                  <>
                    <span className="font-bold text-gray-600 lg:text-lg">Rs.{calculateDiscountedPrice(product.price, product.discount).discountedPrice}</span>
                    <span className="text-sm text-red-500 line-through">Rs.{product.price}</span>
                  </> :
                  <span className="  lg:text-base">Rs.{product.price}</span>}
              </div>
            </div>
            <div className="mt-auto">

              <AddToCart cart={product} onUpdateCart={updateCart} />
            </ div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductListCard