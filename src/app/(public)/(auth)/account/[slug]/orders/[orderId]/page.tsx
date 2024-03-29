import React, { Suspense } from 'react'
import OrderComponent from './OrderComponent'

function OrderPage({params} :{params:{orderId:string}}) {
  return (
    <Suspense fallback={<h2>Loading...</h2>}>

    <OrderComponent params={params}/>
    </Suspense>
  )
}

export default OrderPage