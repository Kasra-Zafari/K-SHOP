import React from "react";

const AddToCartControls = ({ product }) => {
  return (
    <div className="flex gap-4 items-center">
      <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
        Add to Cart
      </button>
      <span className="text-gray-600">In Stock: {product.stock}</span>
    </div>
  );
};

export default AddToCartControls;
