"use client"
import { useCart } from '@/Context/cartContext';
import { authGet, post } from '@/libs/fetch';
import { signIn, useSession } from 'next-auth/react'
import React from 'react'

function AddToCart({cart, onUpdateCart} : {cart:any ,onUpdateCart?:any}) {
    const session = useSession();
    const { updateCart } = useCart();
    const [loading, setLoading] = React.useState(false);

    let getCarts = async () => {
      if(session?.data?.user?.role === "user"){

        let carts = await authGet("cart", session?.data?.token)
   
        updateCart(carts?.cartItems)
        onUpdateCart(carts?.cartItems)
      }
    }
    const handleAddToCart = async () => {
      try{
        setLoading(true)
        if(session.data?.user?.role === "user"){
          let payload = {
            // cartItems: {

              product:cart._id,
              // images:cart.images,
              quantity: cart?.quantity ? cart?.quantity : 1,
                // price : cart.price,
              // }
            }
            let addedCart = await post("cart",payload,session.data?.token);
            // console.log(addedCart);
            if(addedCart){

              getCarts()
            }

            // Notify the parent component about the cart update
            // updateCart(addedCart.cartItems.cartItems);
    
            // // Alternatively, you can use the provided callback
            // onUpdateCart(addedCart.cartItems.cartItems);
        }else{
          signIn()
        }
    }catch(error: any){
      console.log(error.message)
    }finally {
      setLoading(false);
    }

  }
  return (
    <button className="btn mt-auto p-2 bg-black text-white" onClick={handleAddToCart} disabled={loading}>{loading === true ? "Adding to cart.." :"Add to Carts"}</button>
    )
  }
  
export default AddToCart