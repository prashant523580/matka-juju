
"use client"

/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    theme: {
      extend: {
        gridTemplateRows: {
          '[auto,auto,1fr]': 'auto auto 1fr',
        },
      },
    },
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
import React, { useRef, useState } from 'react'
import { StarIcon } from '@heroicons/react/20/solid'
import { RadioGroup } from '@headlessui/react'
import Image from 'next/image'
import { useMouseOverZoom } from '@/hooks/useMouseHover'

import AddToCart from '@/components/AddToCart'
import { useCart } from '@/Context/cartContext'
import ImageComponet from './ImageComponent'
import Link from 'next/link'


const reviews = { href: '#', average: 4, totalCount: 117 }

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

export default function ProductComponent({ product }: { product: any }) {
  const productCa = {
    name: 'Basic Tee 6-Pack',
    price: '$192',
    href: '#',
    breadcrumbs: [
      { id: 1, name: 'Home', href: '/' },
      // {id:2, name:""}
      // { id: 2, name: product?.category?.name, href: `/category/${product.category?.slug}` },
    ],
    images: [
      {
        src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg',
        alt: 'Two each of gray, white, and black shirts laying flat.',
      },
      {
        src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
        alt: 'Model wearing plain black basic tee.',
      },
      {
        src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg',
        alt: 'Model wearing plain gray basic tee.',
      },
      {
        src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
        alt: 'Model wearing plain white basic tee.',
      },
    ],
    colors: [
      { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
      { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
      { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
    ],
    sizes: [
      { name: 'XXS', inStock: false },
      { name: 'XS', inStock: true },
      { name: 'S', inStock: true },
      { name: 'M', inStock: true },
      { name: 'L', inStock: true },
      { name: 'XL', inStock: true },
      { name: '2XL', inStock: true },
      { name: '3XL', inStock: true },
    ],
    description:
      'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
    highlights: [
      'Hand cut and sewn locally',
      'Dyed with our proprietary colors',
      'Pre-washed & pre-shrunk',
      'Ultra-soft 100% cotton',
    ],
    details:
      'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
  }
  // const [selectedColor, setSelectedColor] = useState(product.colors[0])

  const [quantity, setQuantity] = React.useState<number>(1);
  // const source = useRef<HTMLImageElement>(null);
  // const target = useRef<HTMLCanvasElement>(null);
  // const cursor = useRef<HTMLDivElement>(null);
  const { updateCart } = useCart();
  const size = product?.size == 'cup' ? "cup" : product?.size == "1/2" ? "1/2 Ltr " : product?.size == "1" && "1 Ltr"
  // const [selectedColor,setSelectedColor] = React.useState('');
  // call the custom hook
  // useMouseOverZoom(source, target, cursor);
  // React.useEffect(() => {
  //   console.log(selectedColor)
  // }, [selectedColor])
  return (
    <>
      <div className="bg-white">
        <div className="pt-6">
          <nav aria-label="Breadcrumb">
            <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
              {productCa.breadcrumbs.map((breadcrumb) => (
                <li key={breadcrumb.id}>
                  <div className="flex items-center">
                    <Link href={breadcrumb.href} className="mr-2 text-sm font-medium text-gray-900">
                      {breadcrumb.name}
                    </Link>
                    <svg
                      width={16}
                      height={20}
                      viewBox="0 0 16 20"
                      fill="currentColor"
                      aria-hidden="true"
                      className="h-5 w-4 text-gray-300"
                    >
                      <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                    </svg>
                  </div>
                </li>
              ))}
              <li className="text-sm">
                <a href={product.href} aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                  {product.name} {`(${size})`}
                </a>
              </li>
            </ol>
          </nav>




          <div className="flex space-x-4 px-4 md:px-8 mt-4">


            <div className="flex flex-col md:flex-row   w-full  ">
              <div className="flex justify-center w-full md:w-4/6 mx-auto">

                <ImageComponet images={product.images} title={product.name} />

              </div>
              <div className="flex flex-col w-full md:w-2/6 mx-auto">
                <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8 flex justify-between flex-col   ">
                  <h1 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">{product.name}  {`( ${size} )`}</h1>
                  <p className="text-lg md:text-3xl tracking-tight text-gray-900">RS.{product.price}</p>
                </div>

                {/* Options */}
                <div className="mt-4 lg:row-span-3 lg:mt-0">
                  <h2 className="sr-only">Product information</h2>

                  {/* Reviews */}
                  {/* <div className="mt-6">
                    <h3 className="sr-only">Reviews</h3>
                    <div className="flex items-center">
                      <div className="flex items-center">
                        {[0, 1, 2, 3, 4].map((rating) => (
                          <StarIcon
                            key={rating}
                            className={classNames(
                              reviews.average > rating ? 'text-gray-900' : 'text-gray-200',
                              'h-5 w-5 flex-shrink-0'
                            )}
                            aria-hidden="true"
                          />
                        ))}
                      </div>
                      <p className="sr-only">{reviews.average} out of 5 stars</p>
                      <a href={reviews.href} className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                        {reviews.totalCount} reviews
                      </a>
                    </div>
                  </div> */}

                  <div className="">
                  
                  
                    
                    <div className="quantity  select-none">
                      <p>Quantity</p>
                      <button className='px-3  bg-gray-300  rounded py-1' onClick={() => setQuantity(quantity > 0 ? quantity - 1 : 0)}>-</button>
                      <input type="number" className='w-2/6 text-center' value={quantity} onChange={(e: any) => setQuantity(Number(e.target.value))} readOnly />
                      {/* <span className='p-4'>{quantity}</span> */}
                      <button className='px-3  bg-gray-300  rounded py-1' onClick={() => setQuantity(quantity + 1)}>+</button>
                    </div>
                    <div className="my-2 grid">

                      <AddToCart cart={{
                        ...product,
                        quantity
                      }} onUpdateCart={updateCart} />

                      {/* <button className='bg-orange-400 p-2 '><Link href={`product/${product?.slug}`}>Order Now</Link></button> */}

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Product info */}
          <div className="mx-auto  px-4  sm:px-6 lg:grid lg:max-w-7xl  lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
            <div className="lg:col-span-2  lg:pr-8">
              {/* <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{product.name}</h1> */}
            </div>

            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>


            </div>

            <div className=" lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
              {/* Description and details */}
              <div>
                <h3 className="sr-only">Description</h3>

                <div className="space-y-6">
                  <div className="content text-base text-gray-900" dangerouslySetInnerHTML={{
                    __html: product.description
                  }} />
                </div>
              </div>

              {/* <div className="mt-10">
                <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

                <div className="mt-4">
                  <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                    {productCa.highlights.map((highlight: any) => (
                      <li key={highlight} className="text-gray-400">
                        <span className="text-gray-600">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div> */}

              {/* <div className="mt-10">
              <h2 className="text-sm font-medium text-gray-900">Details</h2>

              <div className="mt-4 space-y-6">
                <p className="text-sm text-gray-600">{product.details}</p>
              </div>
            </div> */}
            </div>
          </div>
        </div>
      </div>

      <style jsx>
        {`
        .content ul{
            list-style-type: initial;
        }
      `}
      </style>
    </>
  )
}