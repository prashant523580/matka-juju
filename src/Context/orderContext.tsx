"use client"
import { calculateDiscountedPrice } from '@/libs/calculator';
import { authGet, post, update } from '@/libs/fetch';
import { useSession } from 'next-auth/react';
import React, { createContext, useContext, ReactNode, useState } from 'react';

interface OrderContextProps {
  orders: any[]; // Modify the type according to your cart item structure
  updateOrders: (newCart: any[]) => void;
  getOrders:() => void
}

const OrderContext = createContext<OrderContextProps | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const OrderProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [orders, setOrders] = useState<any[]>([]); // Modify the type according to your cart item structure
  
  const session = useSession()
  let getOrders= async () => {
    let orderData = await authGet("order", session?.data?.token)
    // console.log(orderdata)
    setOrders(orderData)
  }
 
  React.useEffect(() => {
    if (session?.data?.user?.role === "user") {
      getOrders()
   
    }
  }, [session])
  const updateOrders = (newCart: any[]) => {
    setOrders(newCart);
  };
  
 

  return (
    <OrderContext.Provider value={{ orders, updateOrders,getOrders}}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = (): OrderContextProps => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
