"use client"
import { useOrder } from '@/Context/orderContext'
import { getCategoryById } from '@/controllers/category';
import { calculateDiscountedPrice } from '@/libs/calculator';
import { getAllCategory } from '@/libs/categories';
import { update } from '@/libs/fetch';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
// import { authGet } from '@/libs/fetch'
// import { getSession } from 'next-auth/react'
import React from 'react'

function OrderPage({ params }: { params: { slug: string } }) {
  const { orders,getOrders } = useOrder();
  const [category, setCategory] = React.useState<any[]>([]);
  const session = useSession()
const pathname = usePathname();
  React.useEffect(() => {
    let getCategory = async () => {
      let categoryData = await getAllCategory();
      setCategory(categoryData)
    }
    getCategory()
  }, [])

  // let getCategoryById = (_id: any) => {
  //   let currentCategory: any = {};
  //   if (category.length > 0) {
  //     category.filter((cate: any) => {
  //       if (cate._id == _id) {
  //         currentCategory = cate
  //       }
  //     })
  //   }
  //   return currentCategory
  // }
  // let orders = await authGet('order',) 
  const cancellationOrder = async (order: any) => {
    let cancelledOrder = await update("order", order, session.data?.token);
    if (cancelledOrder.success === true) {
      console.log(cancelledOrder)
      getOrders()
    }
  }
  return (
    <div className='py-8'>

      {
        (orders?.length > 0) &&
        orders.map((order: any, ind: number) => (
          <div key={ind} className="lg:w-4/5 mx-auto border-b bg-gray-300 px-5 mb-5">

            {/* {JSON.stringify(order)} */}
            <div className="w-full lg:pr-10 lg:py-6 py-4 mb-6 lg:mb-0">
              <div className="flex flex-col space-y-3">

                <p className="text-sm title-font text-gray-600 tracking-widest">Payment Status : <span className={`${order.paymentStatus === "pending" ? "  bg-orange-600 " : "bg-green-500"} text-white text-xs capitalize p-1`}> {order.paymentStatus} </span></p>
                <p className="text-sm title-font uppercase text-gray-800 tracking-widest">Payment Method: {order.paymentType}</p>
              </div>
              <p className="text-gray-900 text-1xl lg:text-3xl title-font mb-2">Order Id: <span className='title-font font-medium '>#{order?.orderId}</span></p>
              {/* <h2 className="text-sm title-font text-gray-800 tracking-widest">Order Status: {order.orderStatus}</h2> */}

              {/* <p className="leading-relaxed mb-4">Fam locavore kickstarter distillery. Mixtape chillwave tumeric sriracha taximy chia microdosing tilde DIY. XOXO fam inxigo juiceramps cornhole raw denim forage brooklyn. Everyday carry +1 seitan poutine tumeric. Gastropub blue bottle austin listicle pour-over, neutra jean.</p> */}

              <div className="overflow-x-auto relative">
                <table className="w-full text-left">
                  <thead className=" text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="md:py-3 p-1 text-xs md:text-sm md:px-2">
                        Product name
                      </th>
                      {/* <th scope="col" className="py-3 text-sm px-2">
                        Category
                      </th> */}
                      <th scope="col" className="md:py-3 p-1 text-xs md:text-sm md:px-2">
                        Quantity
                      </th>
                      <th scope="col" className="md:py-3 p-1 text-xs md:text-sm md:px-2">
                        Amount
                      </th>
                      <th  className="md:py-3 text-xs md:text-sm md:px-2 p-1">Sub Total Amount</th>
                      {/* <th scope="col" className="py-3 px-2">
                      Deatils
                    </th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {

                      order.items.map((item: any, ind: any) => (

                        <tr key={ind} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-sm">
                          <td scope="row" className="py-4 px-2 line-clamp-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {item.productId.name}
                            {/* {JSON.stringify(item.productId.name)} */}
                          </td>
                          {/* <td className="py-4 px-4">
                            {getCategoryById(item.productId.category).name}
                          </td> */}
                          <td className="py-4 px-4">
                            {item.purchasedQuantity}
                          </td>
                          <td className="py-4 px-4">
                            Rs.{item.productId.price}
                          </td>
                          <td className='py-4 px-4'>Rs.{Number(item.purchasedQuantity) * Number(calculateDiscountedPrice(item.productId.price, item.productId.discount).discountedPrice)}</td>
                        </tr>
                      )
                      )
                    }


                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-black ">
                      <td className='py-4 px-4 text-black text-sm md:text-base font-bold' colSpan={3}>Total Paid</td>
                      <td className='py-4 px-4 text-black text-sm md:text-base font-bold' colSpan={2}>Rs.{order.totalAmt}</td>
                    </tr>
                  </tbody>
                </table>
              </div>


              {
                order.order != "cancelled" &&
                <div className="flex mt-5 items-center">
                  {/* <p className="title-font font-medium text-xl  text-gray-900">Total Paid :<span>Rs.{order.totalAmt}</span></p> */}
                  <Link className="flex ml-auto text-white bg-gray-500 border-0 focus:outline-none px-3 py-2 hover:bg-gray-600 rounded" href={{ pathname: pathname +"/"+ order._id  }}> Track Order</Link>
                  {/* <button className="flex ml-auto text-white bg-gray-500 border-0 focus:outline-none hover:bg-gray-600 rounded">Track Order</button> */}
                  {
                    // order.orderStatus != "completed" &&
                    <button style={{
                      background: "red",
                      color: "white",
                      fontWeight: "bold",
                      margin: "0 .4em"
                    }}
                    className='px-3 py-2'
                      onClick={() => cancellationOrder(order)}
                    >Cancel Order</button>
                  }
                </div>
              }
            </div>
            {/* <Image width={100} height={100} alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src="https://dummyimage.com/400x400" /> */}
          </div>

        ))
      }
    </div>
  )
}

export default OrderPage