// export const calculateDiscountedPrice = (price: number,discount: number) => {
//     const discountedPrice : number = price - (price * discount) / 100;
//     return discountedPrice.toFixed(2); // Rounding to two decimal places
//   };

 export  const calculateDiscountedPrice = (price:number,discount:number) => {
    const discountedPrice = price - (price * discount) / 100;
    const amountSaved = price - discountedPrice;
    return {
      discountedPrice: discountedPrice.toFixed(2),
      amountSaved: amountSaved.toFixed(2),
    };
  };