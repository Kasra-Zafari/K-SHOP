'use client';

import React from 'react';
import { X } from 'lucide-react';

const CartItem = ({ item, onIncrease, onDecrease, onRemove }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow">
      {/* تصویر محصول */}
      <div className="flex items-center gap-4">
        <img
          src={item.thumbnail}
          alt={item.title}
          className="w-20 h-20 object-cover rounded"
        />
        <div>
          <h3 className="font-semibold text-lg">{item.title}</h3>
          <p className="text-gray-500">${item.price}</p>
        </div>
      </div>

      {/* کنترل‌ها */}
      <div className="flex items-center gap-4">
        {/* تعداد */}
        <div className="flex items-center border rounded">
          <button
            onClick={() => onDecrease(item.id)}
            className="px-3 py-1 text-lg"
          >
            -
          </button>
          <span className="px-3">{item.quantity}</span>
          <button
            onClick={() => onIncrease(item.id)}
            className="px-3 py-1 text-lg"
          >
            +
          </button>
        </div>

        {/* حذف */}
        <button
          onClick={() => onRemove(item.id)}
          className="text-gray-500 hover:text-red-600 transition"
        >
          <X />
        </button>
      </div>
    </div>
  );
};

export default CartItem;