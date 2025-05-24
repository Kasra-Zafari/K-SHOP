import React from "react";

const ProductImage = ({ images, title }) => {
  return (
    <img
      src={images?.[0]}
      alt={title}
      className="w-full max-h-[400px] object-contain rounded-md"
    />
  );
};



export default ProductImage;
