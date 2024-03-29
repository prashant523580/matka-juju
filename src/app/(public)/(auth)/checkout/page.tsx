import React, { Suspense } from 'react'
import Checkout from './CheckoutComponent'

function CheckoutPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
        <Checkout/>
    </Suspense>
  )
}

export default CheckoutPage