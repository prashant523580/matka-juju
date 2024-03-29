"use client"
/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import React, { Fragment, useCallback, useState } from 'react'
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'

import ProductCard from '@/components/ui/Card/ProductCard'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { IoIosClose } from "react-icons/io";

import Link from 'next/link'
import ProductListCard from '@/components/ui/Card/ProductListCard'

const sortOptions = [
  // { name: 'Most Popular', href: '#', current: true },
  // { name: 'Best Rating', href: '#', current: false },
  // { name: 'Newest', href: '#', current: false },
  { name: 'Price: Low to High', value: "low-to-high", href: '#', current: false },
  { name: 'Price: High to Low', value: "high-to-low", href: '#', current: false },
]
const priceList = [
  { name: '10000', href: '#' },
  { name: '13000', href: '#' },
  { name: '15000', href: '#' },
]


function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

export default function ProductsComponent({ products}: { products: any[] }) {
  const [filterCategory, setFilterCategory] = React.useState<string[]>([]);
  const [boxView] = React.useState('grid');
  const searchParams: any = useSearchParams();
  const searchCategory: any = searchParams.get("category");
  const router = useRouter();
//   const [currentPrice, setCurrenPrice] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )


  const pathname = usePathname();
  React.useEffect(() => {
    if (searchCategory) {

      setFilterCategory(JSON.parse(searchCategory))
    }
    // console.log(filterCategory)
  }, [searchCategory])

//   const onCategoryChange = ({ currentTarget: input }: any) => {
//     setLoading(true)
//     if (input.checked) {
//       // console.log(true)
//       const state = [...filterCategory, input.value];
//       setFilterCategory(state)
//       router.push(pathname + "?" + createQueryString("category", JSON.stringify(state)))
//     } else {
//       const state = filterCategory?.filter((val: any) => val !== input.value)
//       setFilterCategory(state)
//       state?.length > 0 ?
//         router.push(pathname + "?" + createQueryString('category', JSON.stringify(state)))
//         :
//         // router.push(pathname)
//         router.replace(pathname + "?" + createQueryString('category', ''))
//     }
//   }
  React.useEffect(() => {
    setLoading(false)
  }, [products])
  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
         
          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="">
              {/* Filters */}
        
              {/* Product grid */}
              {
                boxView === "grid" ?

                  <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-start items-start">
                    {
                      loading === true ?
                        <h2>Loading.....</h2>
                        :
                        products && products?.map((product: any, ind) => (

                          <ProductCard key={ind} product={product} />
                        ))
                    }

                  </div>
                  :

                  <div className="flex flex-col col-span-3">
                    {

                      products && products?.map((product: any, ind) => (

                        <ProductListCard key={ind} product={product} />
                      ))
                    }
                  </div>
              }

            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
