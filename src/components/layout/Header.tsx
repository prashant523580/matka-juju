// import { signIn, useSession } from 'next-auth/react'
"use client"
import Link from 'next/link'
import React from 'react'
import { signIn, signOut, useSession } from 'next-auth/react';
import { authGet } from '@/libs/fetch';
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { FaPhone } from "react-icons/fa6";
import SearchComponent from '../Search';
import { site } from '@/constent';

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}
function Header() {
    let session = useSession();
    //     const [carts,setCarts] = React.useState([]);
    //   let getCarts = async () => {
    //       let carts = await authGet("cart",session?.data?.token)
    //       console.log(carts)
    //         setCarts(carts.cartItems)
    //   }
    //     React.useEffect(() => {
    //         // console.log(session)
    //         if( session.status ==  "authenticated") getCarts()

    //         console.log(carts)
    //     },[session])
    return (
        <header className='grid grid-cols-2   px-4 py-8 bg-gray-100'>
            <div className="flex items-center">
                {/* <div className="contact">contact</div> */}
                <Link href={`tel:${site.contact}`} className="phone text-gray-600  flex items-center space-x-1">
                    <FaPhone/> <span> Reseller</span>
                </Link>
            </div>
            {/* <div className="search col-span-full md:col-span-1 order-3 md:order-2 mt-4 md:mt-0">
                <SearchComponent/>
            </div> */}
            <div className="account space-x-2 flex justify-end items-center order-2 md:order-3">
                {
                    // session.status === "authenticated" ?
                    session?.data?.user?.role === "user" ?
                        <AccountDropdown signOut={signOut} user={session?.data?.user}/>
                        // <button onClick={() => signOut()}>signout</button>
                        // <Link href={"/api/auth/signout"}>logout</Link>
                        :
                        <>
                            {/* <div className="div" onLoad={() => signOut()}></div> */}
                            {/* <Link href={"/api/auth/signin"}>Login</Link> */}
                            <button className='hover:underline' onClick={() => signIn()}>Login</button> &nbsp;/<Link className='hover:underline' href={"/register"}>Register</Link>
                        </>
                }
            </div>
        </header>
    )
}

export default Header

const AccountDropdown = ({signOut, user} : {signOut: any,user: any}) => {
    // console.log(user)
    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                    <span className="line-clamp-1">

                   {user?.name}
                    </span>
                    <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
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
                <Menu.Items className="absolute right-0 z-[999] mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        {/* <Menu.Item>
                            {({ active }) => (
                                <Link
                                    href={`/account/${user?._id}`}
                                    className={classNames(
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'block px-4 py-2 text-sm'
                                    )}
                                >
                                    Account settings
                                </Link>
                            )}
                        </Menu.Item> */}
                        <Menu.Item>
                            {({ active }) => (
                                <Link
                                    href={`/account/${user?._id}/orders`}
                                    className={classNames(
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'block px-4 py-2 text-sm capitalize'
                                    )}
                                >
                                    track order
                                </Link>
                            )}
                        </Menu.Item>
                        {/* 
                        <Menu.Item>
                            {({ active }) => (
                                <a
                                    href="#"
                                    className={classNames(
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'block px-4 py-2 text-sm'
                                    )}
                                >
                                    License
                                </a>
                            )}
                        </Menu.Item>
                         */}
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        type="submit"
                                        onClick={() => signOut()}
                                        className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'block w-full px-4 py-2 text-left text-sm'
                                        )}
                                    >
                                        Sign out
                                    </button>
                                )}
                            </Menu.Item>
                       
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}