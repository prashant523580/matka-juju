import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Footer() {
  return (
    
<footer className="bg-white rounded-lg shadow dark:bg-gray-900 m-4">
    <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
            <Link href="/" className="flex items-center mb-4 sm:mb-0">
                <Image src="/logo.png" width={130} height={130} className=" mx-auto sm:mr-3" alt="Flowbite Logo" />
                {/* <span className="self-center text-2xl uppercase font-semibold whitespace-nowrap dark:text-white"></span> */}
            </Link>
            <div className="flex flex-col items-center justify-center p-1">
                <p className=' text-xs text-green-600'>Scan QR To order</p>
            <Image src={"/images/QR-whatsapp.png"} className='mx-auto rounded-md' width={80} height={80} alt='whatsapp QR' />
                <p className='md:text-base sm:text-base text-sm text-green-600'>WhatsApp QR</p>
            </div>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                <li>
                    <Link href="/pages/about" className="mr-4 hover:underline md:mr-6 ">About</Link>
                </li>
                {/* <li>
                    <Link href="/pages/privacy-policy" className="mr-4 hover:underline md:mr-6">Privacy Policy</Link>
                </li> */}
              
                <li>
                    <Link href="/pages/contact" className="hover:underline">Contact</Link>
                </li>
            </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <Link href="/" className="hover:underline">MATKA JUJU™</Link>. All Rights Reserved.</span>
    </div>
</footer>


  )
}

export default Footer