"use client"
import { calculateDiscountedPrice } from '@/libs/calculator';
import { authGet, post, update } from '@/libs/fetch';
import { signIn, useSession } from 'next-auth/react';
import React, { createContext, useContext, ReactNode, useState } from 'react';

interface CartContextProps {
  cart: any[]; // Modify the type according to your cart item structure
  updateCart: (newCart: any[]) => void;
  subTotal?: Number,
  userAddresses: any[],
  getAddresses: () => void,
  getCarts: () => void
  updateAddress: (newAddress: any[]) => void;
  handleAddAddress: (payload: any) => void
  cartIncrement: (cart: any) => void
  cartDecrement: (cart: any) => void
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<any[]>([]); // Modify the type according to your cart item structure
  const [subTotal, setSubTotal] = useState<Number>(0);
  const [userAddresses, setUserAddresses] = React.useState<any[]>([]);
  const session = useSession()
  let getCarts = async () => {
    let carts = await authGet("cart", session?.data?.token)
    // console.log(carts)
    setCart(carts?.cartItems)
  }
  const getAddresses = async () => {
    if (session?.data?.user?.role === "user") {
    let addressData = await authGet('address', session?.data?.token)
    setUserAddresses(addressData.address)
    }
  }
  React.useEffect(() => {
    if (session?.data?.user?.role === "user") {
      getCarts()
      getAddresses();
    }
  }, [session.data?.user])
  const updateCart = (newCart: any[]) => {
    if (session?.data?.user?.role === "user" && session.status == "authenticated") {
    setCart(newCart);
    }else{
      signIn()
    }
  };
  const updateAddress = (newAddress: any[]) => {
    setUserAddresses(newAddress)
  }
  React.useEffect(() => {
    // console.log({cart})
    let subTot = 0;
    if(cart?.length > 0){

    for (let i = 0; i < cart.length; i++) {
      // console.log(cart[i].product.price * cart[i].quantity)
      let cartPrice : Number | any = Number(calculateDiscountedPrice(cart[i].product.price, cart[i].product.discount).discountedPrice)
      subTot += cartPrice  * cart[i].quantity
    }
    // console.log({subTot})
  }
    setSubTotal(subTot)
  }, [cart])
  const cartIncrement = async (item: any) => {
    let payload = {
      product: item.product._id,
      quantity: 1
    }
    let addedCart = await post("cart", payload, session.data?.token);
    if (addedCart) {
      getCarts()
    }
  }
const cartDecrement = async (item:any) =>{
  if(item.quantity > 1){

    let payload = {
      product:item.product._id,
      quantity:-1
    }
    // console.log(payload)
    let deletedCart = await post("cart", payload, session.data?.token);
      if (deletedCart) {
          getCarts()
        }
    }else{
      let payload ={
        productId: item.product._id
      }
      let deletedCart = await update("cart", payload, session.data?.token);
      if(deletedCart){
        getCarts()
      }
      // console.log(payload)
    }
} 
const handleAddAddress = async (payload : any) => {
  let addAddress = await post('address', payload, session?.data?.token)
 
  if(addAddress.success == true){
      getAddresses()
      // setSubmitFlag(true)
  }
} 
  return (
    <CartContext.Provider value={{ cart, updateCart,getCarts,getAddresses, subTotal, userAddresses, updateAddress, cartIncrement ,cartDecrement,handleAddAddress}}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextProps => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
