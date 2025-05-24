import React from "react";
import ProductImage from "@/components/product/ProductImage";
import ProductInfo from "@/components/product/ProductInfo";
import AddToCartControls from "@/components/product/AddToCartControls";
import ProductTabs from "@/components/product/ProductTabs";
import {products} from "@/data/products.json";


const ProductDetailsPage = ({ params }) => {
  const productId = params.id;
  const product = products.find((p) => p.id.toString() === productId);

  return <ProductPage product={product} />;
};
const ProductPage = ({ product }) => {
  if (!product) {
    return <div className="p-4 text-red-500">Product not found.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4">
      {/* image*/}
      <div>
        <ProductImage images={product.images} title={product.title} />
      </div>

      {/* add to cart*/}
      <div className="flex flex-col gap-4">
        <ProductInfo product={product} />
        <AddToCartControls product={product} />
      </div>

      {/* tabs */}
      <div className="col-span-1 md:col-span-2">
        <ProductTabs product={product} />
      </div>
    </div>
  );
};

export default ProductDetailsPage;
