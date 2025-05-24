import React from "react";

const AddToCartControls = ({ product }) => {
  return (
    <div className="flex items-center justify-center my-auto">
      <button className="bg-[#002AB3] text-white px-4 py-2 rounded hover:bg-[#72B7F2]">
        Add to Cart
      </button>
    </div>
  );
};

export default AddToCartControls;
