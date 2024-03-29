// 'use client'
// import { GetInitialData } from '@/GlobalRedux/actions/initial.action';
import React from 'react'
// import { useDispatch } from 'react-redux'
import Footer from './Footer';
import "../../app/globals.css"
import Navbar from './Navbar';
import Header from './Header';
import { CartProvider } from '@/Context/cartContext';
import { OrderProvider } from '@/Context/orderContext';
function PageLayout({ children }: any) {
  // const dispatch : any = useDispatch();
  // React.useEffect(() => {
  //     dispatch(GetInitialData())
  // },[dispatch])
  return (
    <>
      <CartProvider>
        <OrderProvider>

          <Header />
          <Navbar />
          {children}
          <Footer />
        </OrderProvider>
      </CartProvider>
    </>
  )
}

export default PageLayout