"use client"
import { useSession } from 'next-auth/react'
import Link from 'next/link';
import React from 'react'

function OrderCompletePage() {
  const session = useSession();
  return (
    <div>
       <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="p-8 bg-white shadow-lg rounded-md space-y-2">
        <h1 className="text-3xl font-bold mb-4 text-green-600">Order Completed!</h1>
        <p className="text-gray-600">
          Thank you for your order. Your order has been successfully placed.
        </p>
        <p className="text-gray-600 mt-4">
          We will send you an email with the order details shortly.
        </p>
        <div className="mt-4">

        <Link className='p-1 bg-gray-700 hover:bg-gray-800 text-white' href={`/account/${session?.data?.user?._id}/orders`}>Track Order</Link>
        </div>
        {/* You can add more information or links here */}
      </div>
    </div>
    </div>
  )
}

export default OrderCompletePage