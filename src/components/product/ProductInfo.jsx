import React from "react";

const ProductInfo = ({ product }) => {
  const { sku, title, category, brand, price, stock, dimensions } = product;

  const formattedDimensions = dimensions
    ? `${dimensions.width} x ${dimensions.height} x ${dimensions.depth} cm`
    : "N/A";

  return (
    <div className="w-full flex flex-col gap-2">
      <h1 className="text-2xl font-bold text-[#002AB3] mb-6">{title}</h1>
      <p className="text-sm text-gray-500">Code: {sku}</p>
      <p className="text-sm text-gray-500">Category: {category}</p>
      <p className="text-sm text-gray-500">Brand: {brand}</p>
      <p className="text-sm text-gray-500">Dimensions: {formattedDimensions}</p>
      <p className="text-sm text-gray-500">In Stock: {stock}</p>
      <p className="text-2xl font-semibold text-[#002AB3] my-6">${price}</p>
    </div>
  );
};

export default ProductInfo;
