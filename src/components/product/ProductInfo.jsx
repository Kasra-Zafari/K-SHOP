import React from "react";

const ProductInfo = ({ product }) => {
  const { title, category, brand, price } = product;

  return (
    <div className="w-full sm:w-1/2 p-4 flex flex-col gap-2">
      <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
      <p className="text-sm text-gray-500">Category: {category}</p>
      <p className="text-sm text-gray-500">Brand: {brand}</p>
      <p className="text-xl font-semibold text-green-600">${price}</p>
    </div>
  );
};

export default ProductInfo;
