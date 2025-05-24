import React from "react";

const ProductImage = ({ images, title }) => {
  return (
    <div className="w-full sm:w-1/2 p-4">
      <img
        src={images?.[0]}
        alt={title}
        className="w-full h-auto rounded-xl shadow-md object-contain"
      />
    </div>
  );
};


export default ProductImage;
