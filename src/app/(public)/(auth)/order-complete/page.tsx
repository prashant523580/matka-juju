"use client"
import { useOrder } from '@/Context/orderContext';
import { site } from '@/constent';
import { useSession } from 'next-auth/react'
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react'

function OrderCompletePage() {
  const session = useSession();
  const { orders } = useOrder()
  if (session.status == "unauthenticated") {
    return redirect("/")
  }
  if (session?.status == "loading") {
    return <div className="h-screen">
      <h2>Loading...</h2>
    </div>
  }
  return (
    <div className='max-w-screen-lg mx-auto'>
      <div className="flex items-center justify-center py-6 md:py-16 ">
        <div className="p-8 bg-white shadow-lg shadow-black/20 rounded-md space-y-2">
          <h2 className="text-3xl font-bold mb-4 text-green-600">Order Completed!</h2>
          <p>Hi {session?.data?.user?.name},</p>
          <div className="text-gray-700">
            {
              
              orders[0]?.paymentType == "cod" ?
              <p>

              `Thank you for your order! We kindly request your confirmation for the payment of Rs.{orders[0]?.totalAmt} (Order Id: #{orders[0]?.orderId}). Attached is the screenshot of your payment for your reference.`
              </p>
              :
             <p>

          Thank you for using eSewa to make your payment. To confirm the payment, please send us a screenshot of the payment confirmation from the eSewa app to <Link className='text-green-500 font-bold hover:underline' href={`tel:${site.contact}`}>{site.contact}</Link>.
             </p>
            }

            {/* Thank you for your order! We kindly request your confirmation for the payment of Rs.{orders[0]?.totalAmt} (Order Id: #{orders[0]?.orderId}). Attached is the screenshot of your payment for your reference. */}

            {/* Thank you for your order. Your order has been successfully placed. */}
          </div>
          <Image src={"/images/QR-whatsapp.png"} className='mx-auto rounded-md ' width={250} height={250} alt='whats app QR' />
          <p className="text-gray-700 mt-4">
            {/* We will send you an email with the order details shortly. */}
            {/* Please confirm once you have successfully made the payment. Feel free to reach out if you need any assistance. */}
            If you have any questions or need assistance, feel free to reach out.

          </p>
          <div className="mt-6 flex justify-between items-center">
          <div>

            <p className='text-lg font-bold'>Best regards,</p>
            <p>{site.name}</p>
            {/* <Link href={`tel:${site.contact}`}>{site.contact}</Link> */}
          </ div>
          {/* You can add more information or links here */}

            <Link className='p-2 bg-yellow-700 hover:bg-yellow-800 text-white' href={`/account/${session?.data?.user?._id}/orders`}>Track Order</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderCompletePage