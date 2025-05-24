import React from "react";
import { useCart } from "@/context/CartContext";

const ProductQuantityControl = ({ product }) => {
  const { cart, addToCart, increaseQuantity, decreaseQuantity, removeFromCart } = useCart();

  const cartItem = cart.find((item) => item.id === product.id);

  if (cartItem) {
    return (
      <div className="flex items-center gap-3 mt-4">
        {cartItem.quantity > 1 ? (
          <button
            onClick={() => decreaseQuantity(product.id)}
            className="w-8 h-8 bg-[#f0f0f0] text-lg rounded hover:bg-[#ddd]"
          >
            -
          </button>
        ) : (
          <button
            onClick={() => removeFromCart(product.id)}
            className="w-8 h-8 bg-red-200 text-lg rounded"
          >
            🗑️
          </button>
        )}
        <span className="text-lg">{cartItem.quantity}</span>
        <button
          onClick={() => increaseQuantity(product.id)}
          className="w-8 h-8 bg-[#f0f0f0] text-lg rounded hover:bg-[#ddd]"
        >
          +
        </button>
      </div>
    );
  }

  return (
    <div className="mt-4">
      <button
        onClick={() => addToCart(product)}
        className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductQuantityControl;
