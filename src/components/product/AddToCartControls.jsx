'use client';

import { useState, useEffect } from "react";
import { useCart } from "@/app/context/CartContext";

export default function AddToCartControls({ product }) {
  const { cartItems, addToCart, removeFromCart, increaseQty, decreaseQty } = useCart();
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    const item = cartItems.find((item) => item.id === product.id);
    setQuantity(item ? item.quantity : 0);
  }, [cartItems, product.id]);

  function increment() {
    increaseQty(product.id);
  }

  function decrement() {
    if (quantity > 1) {
      decreaseQty(product.id);
    } else {
      removeFromCart(product.id);
    }
  }

  if (quantity === 0) {
    return (
      <div className="flex justify-center items-center">
        <button
          onClick={() => addToCart(product)}
          className="bg-[#002AB3] text-white w-40 h-10 py-1 rounded hover:bg-[#72B7F2] text-lg mb-10"
        >
          Add to Cart
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4 justify-center mb-10">
      <button
        onClick={decrement}
        className="bg-[#002AB3] text-white w-10 h-10 rounded hover:bg-[#72B7F2] text-lg"
        aria-label="Decrease quantity"
      >
        -
      </button>
      <span className="text-lg font-semibold text-[#002AB3] w-6 text-center">
        {quantity}
      </span>
      <button
        onClick={increment}
        className="bg-[#002AB3] text-white w-10 h-10 rounded hover:bg-[#72B7F2] text-lg"
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}