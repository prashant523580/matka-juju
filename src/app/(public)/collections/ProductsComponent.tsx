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
import { XMarkIcon, ListBulletIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
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

export default function ProductsComponent({ products, category }: { products: any[], category: any[] }) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [filterCategory, setFilterCategory] = React.useState<string[]>([]);
  const [boxView, setBoxView] = React.useState('grid');
  const searchParams: any = useSearchParams();
  const searchCategory: any = searchParams.get("category");
  const router = useRouter();
  const [currentPrice, setCurrenPrice] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  const categoryList = category.map((cate: any) => ({
    value: cate.slug,
    label: cate.name,
    checked: false
  }
  ))
  const pathname = usePathname();
  React.useEffect(() => {
    if (searchCategory) {

      setFilterCategory(JSON.parse(searchCategory))
    }
    // console.log(filterCategory)
  }, [searchCategory])

  const onCategoryChange = ({ currentTarget: input }: any) => {
    setLoading(true)
    if (input.checked) {
      // console.log(true)
      const state = [...filterCategory, input.value];
      setFilterCategory(state)
      router.push(pathname + "?" + createQueryString("category", JSON.stringify(state)))
    } else {
      const state = filterCategory?.filter((val: any) => val !== input.value)
      setFilterCategory(state)
      state?.length > 0 ?
        router.push(pathname + "?" + createQueryString('category', JSON.stringify(state)))
        :
        // router.push(pathname)
        router.replace(pathname + "?" + createQueryString('category', ''))
    }
  }
  React.useEffect(() => {
    setLoading(false)
  }, [products])
  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <div className="mt-4 border-t border-gray-200">
                    <h3 className="text-lg px-2 pb-4">Price</h3>
                    <ul role="list" className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900 px-4">
                      {priceList.map((category) => (
                        <li key={category.name}>
                          <Link href={`${pathname + "?" + createQueryString('price', category.name)}`} className='hover:underline'> Price Under {category.name}</Link>
                        </li>
                      ))}
                    </ul>


                    <Disclosure as="div" className="border-t border-gray-200 px-4 py-6">
                      {({ open }) => (
                        <>
                          <h3 className="-mx-2 -my-3 flow-root">
                            <span className="font-medium text-gray-900">Category</span>
                            {/* <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                ) : (
                                  <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                )}
                              </span>
                            </Disclosure.Button> */}
                          </h3>
                          {/* <Disclosure.Panel className="pt-6">
                          </Disclosure.Panel> */}
                          <div className="space-y-6 py-8">
                            {categoryList.map((option, optionIdx) => (
                              <div key={option.value} className="flex items-center">
                                <input
                                  id={`filter-mobile-${optionIdx}`}
                                  name={`${option.value}`}
                                  defaultValue={option.label}
                                  type="checkbox"
                                  value={option.label}
                                  onChange={(onCategoryChange)}
                                  defaultChecked={option.checked}
                                  checked={filterCategory?.includes(option.label)}
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={`filter-mobile-${optionIdx}`}
                                  className="ml-3 min-w-0 flex-1 text-gray-500 cursor-pointer"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                    </Disclosure>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <h1 className=" text-xl md:text-4xl font-bold tracking-tight text-gray-900">Collections</h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <Link
                              href={`${pathname + "?" + createQueryString('sort', option.value)}`}
                              className={classNames(
                                option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm'
                              )}
                            >
                              {option.name}
                            </Link>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7" onClick={() => setBoxView(boxView === "grid" ? "list" : "grid")}>
                {
                  boxView === "grid" ?
                    <>
                      <span className="sr-only">List grid</span>
                      <ListBulletIcon className="h-5 w-5" aria-hidden="true" />
                    </>
                    :
                    
                    <>
                    <span className="sr-only">View grid</span>
                    <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
                    </>
                }
              </button>
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <div className="hidden lg:block">
                <h3 className="text-lg px-2 pb-4">Price</h3>
                <ul role="list" className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900 px-4">
                  {priceList.map((category) => (
                    <li key={category.name} className='relative'>
                      <Link onClick={() => setCurrenPrice(category.name)} href={`${pathname + "?" + createQueryString('price', category.name)}`} className='hover:underline'> Price Under {category.name}
                      </Link>
                      {
                        category.name === currentPrice &&
                        <Link href={`${pathname + "?" + createQueryString('price', "")}`} onClick={() => setCurrenPrice("")}
                          className='absolute translate-y-[-50%] right-0 top-[50%] text-black'
                        ><IoIosClose />
                        </Link>
                      }
                    </li>
                  ))}
                </ul>


                <Disclosure as="div" className="border-t border-gray-200 px-4 py-6">
                  {({ open }) => (
                    <>
                      <h3 className="-mx-2 -my-3 flow-root">
                        <span className="font-medium text-gray-900">Category</span>
                        {/* <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                        <span className="ml-6 flex items-center">
                          {open ? (
                            <MinusIcon className="h-5 w-5" aria-hidden="true" />
                          ) : (
                            <PlusIcon className="h-5 w-5" aria-hidden="true" />
                          )}
                        </span>
                      </Disclosure.Button> */}
                      </h3>
                      {/* <Disclosure.Panel className="pt-6">
                    </Disclosure.Panel> */}
                      <div className="space-y-6 pt-8">
                        {categoryList.map((option, optionIdx) => (
                          <div key={option.value} className="flex items-center">
                            <input
                              id={`filter-mobile-${optionIdx}`}
                              name={`${option.value}`}
                              defaultValue={option.label}
                              type="checkbox"
                              value={option.label}
                              onChange={(onCategoryChange)}
                              defaultChecked={option.checked}
                              checked={filterCategory?.includes(option.label)}
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label
                              htmlFor={`filter-mobile-${optionIdx}`}
                              className="ml-3 min-w-0 flex-1 text-gray-500 cursor-pointer"
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </Disclosure>
              </div>

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
