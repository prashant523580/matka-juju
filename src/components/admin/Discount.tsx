// pages/index.js
import { useState } from 'react';

const DiscountCalculator = () => {
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);

  const handlePriceChange = (event:any) => {
    setPrice(parseFloat(event.target.value));
  };

  const handleDiscountChange = (event : any) => {
    setDiscount(parseFloat(event.target.value));
  };

  const calculateDiscountedPrice = () => {
    const discountedPrice = price - (price * discount) / 100;
    const amountSaved = price - discountedPrice;
    return {
      discountedPrice: discountedPrice.toFixed(2),
      amountSaved: amountSaved.toFixed(2),
    };
  };

  const { discountedPrice, amountSaved } = calculateDiscountedPrice();

  return (
    <div>
      <h1>Discount Calculator</h1>
      <div>
        <label>
          Price: $<input type="number" value={price} onChange={handlePriceChange} />
        </label>
      </div>
      <div>
        <label>
          Discount (%): <input type="number" value={discount} onChange={handleDiscountChange} />
        </label>
      </div>
      <div>
        <h2>Discounted Price: ${discountedPrice}</h2>
        <h2>Amount Saved: ${amountSaved}</h2>
      </div>
    </div>
  );
};

export default DiscountCalculator;
