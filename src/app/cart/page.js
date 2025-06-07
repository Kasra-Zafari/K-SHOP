'use client';

import { useCart } from "@/app/context/CartContext";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const { cartItems, increaseQty, decreaseQty, removeFromCart } = useCart();

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-semibold mb-4 text-[#002AB3]">Your cart is empty.</h2>
        <Link href="/products/page/1" className="text-blue-600 underline">
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-[#002AB3]">Shopping Cart</h1>

      <div className="space-y-6">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 border-b pb-4"
          >
            <Image
              src={item.thumbnail}
              alt={item.title}
              width={100}
              height={100}
              className="object-cover rounded"
            />

            <div className="flex-1">
              <h3 className="text-lg font-semibold text-[#002AB3]">{item.title}</h3>
              <p className="text-gray-600">${item.price} x {item.quantity}</p>
              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={() => decreaseQty(item.id)}
                  className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => increaseQty(item.id)}
                  className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex flex-col items-end gap-2">
              <p className="font-semibold text-[#002AB3]">${item.price * item.quantity}</p>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-sm text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-10 border-t pt-4">
        <Link
          href="/products/page/1"
          className="text-[#002AB3] hover:underline text-lg"
        >
          ← Continue Shopping
        </Link>
        <p className="text-xl font-bold text-[#002AB3]">
          Total: ${totalPrice.toFixed(2)}
        </p>
      </div>
    </div>
  );
}