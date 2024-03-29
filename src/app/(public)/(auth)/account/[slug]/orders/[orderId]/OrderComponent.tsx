"use client";
import { calculateDiscountedPrice } from '@/libs/calculator';
import { authGet, get } from '@/libs/fetch';
import { useSession } from 'next-auth/react';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React from 'react'

const formatDate2 = (date: any) => {
    const month = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "June",
        "July",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];
    let days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    if (date) {
        const d = new Date(date);
        return `${month[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()} 
    ${days[d.getDay()]}`;
    }
    return ''
};

function OrderComponent({ params }: {
    params: {
        orderId: any
    }
}) {
    const [order, setOrder] = React.useState<any>({});
    let session = useSession();
    const router = useRouter();
    React.useEffect(() => {
        let getOrder = async () => {

            let orderData = await authGet(`order/${params.orderId}`, session?.data?.token)
            setOrder(orderData)
        }
        if (session.status === "authenticated") {

            getOrder()
        }
    }, [session.data?.token, session.status])
    // console.log(order);
    // if (session.status == "loading") {
    //     return <>loading</>
    // } else if (session.status === "unauthenticated") {
    //     return router.push("/")
    // }
    return (
        order?.items ?
        <div>

            <section className="text-gray-600 body-font py-8">
                <div className="container px-5 mx-auto flex flex-wrap">
                    <div className="grid grid-cols-1 md:grid-cols-2 w-full my-2">

                        <h1 className="text-xl font-semibold title-font text-gray-800 tracking-widest">Order ID - <span className="font-bold">#{order.orderId}</span></h1>
                        <div className="address flex flex-col items-start md:items-end ">
                            <h2 className='font-bold text-lg text-gry-700'>Delivery Address</h2>
                            <address className="address whitespace-nowrap  bg-gray-100 p-4">
                                <p className='whitespace-nowrap '>{order?.address?.name}</p>
                                <p className='whitespace-nowrap '>{order?.address?.email}</p>
                                <p className='whitespace-nowrap '>{order?.address?.city}</p>
                                <p className='whitespace-nowrap '>{order?.address?.state}</p>
                                <p className='whitespace-nowrap '>{order?.address?.street}</p>
                            </address>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 ">
                        <div className="col-span-1 md:sticky top-20">

                            <h1 className='mb-6 font-semibold text-gray-800'>Order Status </h1>
                            {
                                order?.orderStatus && order?.orderStatus.map((statu: any, ind: any) => {
                                    return (
                                        <div className="flex relative pb-12" key={ind}>
                                            {
                                                ind != order.orderStatus.length - 1 &&
                                                <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                                                    <div className={`h-full w-1  ${statu.isCompleted ? "  bg-gray-500 " : " bg-gray-300 "} pointer-events-none`}></div>
                                                </div>
                                            }
                                            <div className={`flex-shrink-0 w-10 h-10 rounded-full ${statu.isCompleted ? "  bg-gray-500 " : " bg-gray-300 "}  inline-flex items-center justify-center text-white relative `}>
                                                {/* <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                                                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                                                            </svg> */}
                                            </div>

                                            <div className="flex-grow pl-4">
                                                <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider uppercase">{statu.type}</h2>
                                                <p className="leading-relaxed">{formatDate2(statu.date)}</p>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className='grid col-span-2 md:col-span-2 grid-cols-1 justify-center py-2 md:grid-cols-3 gap-2'>
                            {
                                order && order?.items?.map((product: any) => (
                                    <div key={product.productId._id} className='text-center '>
                                        <Image width={250} height={250} src={product.productId.images[0].src} alt={product.productId.name} className='mx-auto' />
                                        <div className="bg-gray-100">
                                            <div className="">

                                            <h2 className='text-base text-gray-700 capitalize'>{product.productId.name}</h2>
                                            <p className="">Quantity {product.purchasedQuantity}</p>
                                            </div>
                                            <div className="flex justify-center space-x-2">

                                                <p className={`${product.productId.discount > 0 ? "text-gray-500 line-through" : ""}`}> Rs.{product.productId.price} </p>
                                                {product.productId.discount > 0 && <p className='text-lg font-medium'>-{product.productId.discount}% off</p>}
                                            </div>
                                            { product.productId.discount > 0 && <div className="text-lg">{Number(calculateDiscountedPrice(product.productId.price, product.productId.discount).discountedPrice)}</div>}
                                            <p className='text-lg'>Rs.{Number(product.purchasedQuantity) * Number(calculateDiscountedPrice(product.productId.price, product.productId.discount).discountedPrice)}</p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className="total col-span-full">
                            <p className='text-lg font-bold text-gray-800 text-right'>Total Amount : Rs.{order.totalAmt}</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        :
        <p>Loading...</p>
    )
}

export default OrderComponent