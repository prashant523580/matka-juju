"use client"
import React from 'react'
// import withAuthRedirect from '@/hoc/withAuthRedirect'
import { useSession } from 'next-auth/react'
import { authGet } from '@/libs/fetch';
function CartsPage() {

  let session = useSession();
  async function getCarts() {
    console.log(session)
    let cart = await authGet('cart', session.data?.token)
    console.log(cart)
  }
  React.useEffect(() => {
    if(session.status === "authenticated") getCarts();
  },[session])
  return (
    <div>

    </div>
  )
}

export default CartsPage