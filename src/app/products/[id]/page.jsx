import ProductImage from "@/components/product/ProductImage";
import ProductInfo from "@/components/product/ProductInfo";
import AddToCartControls from "@/components/product/AddToCartControls";
import ProductTabs from "@/components/product/ProductTabs";
import InvalidProductMessage from "@/components/InvalidProductMessage";

async function getProduct(id) {
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  if (!res.ok) return null;
  return res.json();
}

export async function generateMetadata(props) {
  const params = await props.params;
  const product = await getProduct(params.id);
  if (!product) {
    return {
      title: "Product Not Found | K-SHOP",
    };
  }
  return {
    title: `${product.title} | K-SHOP`,
    description: product.description,
  };
}

export default async function ProductDetailsPage(props) {
  const params = await props.params;
  const product = await getProduct(params.id);

  if (!product) {
    return <InvalidProductMessage />;
  }

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="bg-white p-4 md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* image box */}
          <div className="border border-[#002AB3] rounded-xl p-4 flex items-center justify-center h-full">
            <ProductImage images={product.images} title={product.title} />
          </div>

          {/* info box */}
          <div className="border border-[#002AB3] rounded-xl p-4 flex flex-col justify-between h-full">
            <ProductInfo product={product} />
            <AddToCartControls product={product} />
          </div>
        </div>

        {/* tabs box */}
        <div className="mt-8 border border-[#002AB3] rounded-xl p-4">
          <ProductTabs product={product} />
        </div>
      </div>
    </div>
  );
}