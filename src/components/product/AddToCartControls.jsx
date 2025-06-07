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
      <button
        onClick={() => addToCart(product)}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add to Cart
      </button>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={decrement}
        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
        aria-label="Decrease quantity"
      >
        -
      </button>
      <span className="text-lg font-semibold">{quantity}</span>
      <button
        onClick={increment}
        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}